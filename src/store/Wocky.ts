// tslint:disable-next-line:no_unused-variable
import {IModelType, types, isAlive, clone, IType, getType, getParent, getEnv, flow, destroy, IExtendedObservableMap, ISnapshottable, getSnapshot} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, IReactionDisposer, when, reaction, autorun} from 'mobx'
import {OwnProfile} from '../model/OwnProfile'
import {Profile, IProfile} from '../model/Profile'
import {Storages} from './Factory'
import {Base, SERVICE_NAME} from '../model/Base'
import {Bot, IBot} from '../model/Bot'
import {BotPost, IBotPost} from '../model/BotPost'
import {EventBotCreate} from '../model/EventBotCreate'
import {EventBotPost} from '../model/EventBotPost'
import {EventBotNote} from '../model/EventBotNote'
import {EventBotShare} from '../model/EventBotShare'
import {EventBotGeofence} from '../model/EventBotGeofence'
import {EventDelete} from '../model/EventDelete'
import {createPaginable, IPaginable} from '../model/PaginableList'
import {Chats} from '../model/Chats'
import {Chat, IChat} from '../model/Chat'
import {Message, IMessage} from '../model/Message'
import {processMap, waitFor} from '../transport/utils'
import {IWockyTransport} from '..'
export const EventEntity = types.union(EventBotPost, EventBotNote, EventBotShare, EventBotCreate, EventBotGeofence, EventDelete)
export type IEventEntity = typeof EventEntity.Type
// export interface IEventEntity extends IEventEntityType {}
export const EventList = createPaginable(EventEntity)
export type IEventListType = typeof EventList.Type
export interface IEventList extends IEventListType {}

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IPaginable = IPaginable
export type __IProfile = IProfile

export const Wocky = types
  .compose(
    Base,
    Storages,
    types.model({
      id: 'wocky',
      username: types.maybe(types.string),
      password: types.maybe(types.string),
      host: types.string,
      sessionCount: 0,
      roster: types.optional(types.map(types.reference(Profile)), {}),
      profile: types.maybe(OwnProfile),
      updates: types.optional(types.array(EventEntity), []),
      events: types.optional(EventList, {}),
      geoBots: types.optional(types.map(types.reference(Bot)), {}),
      chats: types.optional(Chats, Chats.create()),
      version: ''
    })
  )
  .named(SERVICE_NAME)
  .actions(self => {
    const transport: IWockyTransport = getEnv(self).transport
    return {
      loadProfile: flow(function*(id: string) {
        const isOwn = id === self.username
        const data = yield transport.loadProfile(id)
        if (isOwn) {
          if (!self.profile) {
            const profile = self.create(OwnProfile, {id, ...self._registerReferences(Profile, data), loaded: true, status: 'available'})
            self.profile = profile
          } else {
            self.load(self.profile, data)
          }
          if (self.profile.handle) self.sessionCount = 3
        }
        return self.profiles.get(id, data)
      })
    }
  })
  .extend(self => {
    const transport: IWockyTransport = getEnv(self).transport
    if (!transport) {
      throw 'Server transport is not defined'
    }
    return {
      views: {
        get snapshot() {
          const data = {...self._snapshot}
          if (self.events.length > 20) {
            const result = data.events.result.slice(0, 20)
            const cursor = result[result.length - 1].id
            data.events = {result, cursor}
          }
          delete data.geoBots
          delete data.files
          return data
        },
        get transport(): IWockyTransport {
          return transport
        },
        get connected() {
          return transport.connected
        },
        get connecting() {
          return transport.connecting
        },
        get sortedRoster(): Array<IProfile> {
          return [...self.roster.values()].filter(x => x.handle).sort((a, b) => {
            return a.handle!.toLocaleLowerCase().localeCompare(b.handle!.toLocaleLowerCase())
          })
        },
        get updatesToAdd(): IEventEntity[] {
          return self.updates.filter((e: IEventEntity) => {
            return getType(e).name !== EventDelete.name
          })
        }
      },
      actions: {
        login: flow(function*(user?: string, password?: string, host?: string) {
          if (user) {
            self.username = user
          }
          if (password) {
            self.password = password
          }
          if (host) {
            self.host = host
          }
          if (!self.username || !self.password || !self.host) {
            throw `Cannot login without username/password/host:${self.username},${self.password},${self.host}`
          }
          yield transport.login(self.username!, self.password!, self.host)
          yield self.loadProfile(self.username)

          self.sessionCount++
          return true
        }),
        disconnect: flow(function*() {
          if (self.profile) {
            self.profile!.status = 'unavailable'
          }
          yield transport.disconnect()
        }),
        remove: flow(function*() {
          yield transport.remove()
        }),
        register: flow(function*(data: any, providerName = 'digits') {
          const res = yield transport.register(data, self.host, providerName)
          Object.assign(self, res)
          return true
        }),
        testRegister: flow(function*(data: any) {
          const res = yield transport.testRegister(data, self.host)
          Object.assign(self, res)
          return true
        }),
        _requestProfiles: flow(function*(users: string[]) {
          const arr = yield transport.requestProfiles(users)
          return arr.map((user: any) => self.profiles.get(user.id, user))
        }),
        _updateProfile: flow(function*(d: Object) {
          yield transport.updateProfile(d)
        }),
        lookup: flow<string>(function*(handle: string) {
          const profile = yield transport.lookup(handle)
          return self.profiles.get(profile.id, profile)
        }),
        createChat: (id: string): IChat => self.chats.get(id) || self.chats.add(Chat.create({id}))
      }
    }
  })
  .views(self => ({
    get all() {
      return self.sortedRoster.filter(x => !x.isBlocked)
    },
    get blocked() {
      return self.sortedRoster.filter(x => x.isBlocked)
    },
    get friends() {
      return self.sortedRoster.filter(x => x.isMutual)
    },
    get followers() {
      return self.sortedRoster.filter(x => !x.isBlocked && x.isFollower)
    },
    get newFollowers() {
      return self.sortedRoster.filter(x => !x.isBlocked && x.isFollower && x.isNew)
    },
    get followed() {
      return self.sortedRoster.filter(x => !x.isBlocked && x.isFollowed)
    }
  }))
  .actions(self => ({
    addRosterItem: (profile: any) => {
      self.roster.put(self.profiles.get(profile.id, profile))
    },
    getProfile: flow(function*(id: string, data: {[key: string]: any} = {}) {
      const profile = self.profiles.get(id, processMap(data))
      if (!profile.handle) {
        yield self.loadProfile(id)
      }
      return profile
    }),
    createProfile: (id: string, data: {[key: string]: any} = {}) => {
      return self.profiles.get(id, processMap(data))
    },
    getBot: ({id, server, ...data}: any): IBot => {
      const bot = self.bots.storage.get(id) ? self.bots.get(id, data) : self.bots.get(id, {server, owner: data.owner})
      if (data && Object.keys(data).length) {
        self.load(bot, data)
      }
      return bot
    },
    _addMessage: ({id, message}: {id: string; message: any}) => {
      const existingChat = self.chats.get(id)
      const msg = self.create(Message, message)
      if (existingChat) {
        existingChat.addMessage(msg)
        if (existingChat.active) {
          msg.read()
        }
      } else {
        const chat = self.createChat(id)
        chat.addMessage(msg)
      }
    },
    deleteBot: (id: string) => {
      self.events.result.forEach((event: any) => {
        if (event.bot && event.bot.id === id) {
          self.events.remove(event.id)
        }
      })
      self.profile!.subscribedBots.remove(id)
      self.profile!.ownBots.remove(id)
      self.profiles.get(self.username!)!.ownBots.remove(id)
      self.geoBots.delete(id)
      self.bots.delete(id)
    }
  }))
  .actions(self => ({
    _follow: flow(function*(username: string) {
      yield waitFor(() => self.connected)
      yield self.transport.follow(username)
    }),
    _unfollow: flow(function*(username: string) {
      yield waitFor(() => self.connected)
      yield self.transport.unfollow(username)
    }),
    _block: flow(function*(username: string) {
      yield waitFor(() => self.connected)
      yield self.transport.block(username)
    }),
    _unblock: flow(function*(username: string) {
      yield waitFor(() => self.connected)
      yield self.transport.unblock(username)
    }),
    requestRoster: flow(function*() {
      yield waitFor(() => self.connected)
      const roster = yield self.transport.requestRoster()
      roster.forEach(self.addRosterItem)
    }),
    loadChats: flow(function*(max: number = 50) {
      yield waitFor(() => self.connected)
      const items = yield self.transport.loadChats(max)
      items.forEach((item: {id: string; message: any}) => {
        const msg = self.create(Message, item.message)
        const chat = self.createChat(item.id)
        chat.addMessage(msg)
      })
    }),
    loadBot: flow(function*(id: string, server: any) {
      yield waitFor(() => self.connected)
      const bot = self.getBot({id, server})
      if (!bot.loading) {
        try {
          bot.startLoading()
          const data = yield self.transport.loadBot(id, server)
          self.load(bot, data)
        } catch (e) {
          console.error(e)
          bot.setError(JSON.stringify(e))
        } finally {
          bot.finishLoading()
        }
      }
      return bot
    }),
    removeBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      yield self.transport.removeBot(id)
      // const events = self.events.list.filter(event => event.bot && event.bot === id)
      // events.forEach(event => self.events.remove(event.id))
      self.deleteBot(id)
    })
  }))
  .actions(self => ({
    createBot: flow<IBot>(function*() {
      yield waitFor(() => self.connected)
      const id = yield self.transport.generateId()
      const bot = self.getBot({id, owner: self.username})
      bot.setNew(true)
      return bot
    }),
    _loadOwnBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadOwnBots(userId, lastId, max)
      return {list: list.map((bot: any) => self.getBot(bot)), count}
    }),
    _loadBotSubscribers: flow(function*(id: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadBotSubscribers(id, lastId, max)
      return {list: list.map((profile: any) => self.profiles.get(profile.id, profile)), count}
    }),
    _loadBotGuests: flow(function*(id: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadBotGuests(id, lastId, max)
      return {list: list.map((profile: any) => self.profiles.get(profile.id, profile)), count}
    }),
    _loadBotVisitors: flow(function*(id: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadBotVisitors(id, lastId, max)
      return {list: list.map((profile: any) => self.profiles.get(profile.id, profile)), count}
    }),
    _loadBotPosts: flow(function*(id: string, before?: string) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadBotPosts(id, before)
      return {list: list.map((post: any) => self.create(BotPost, post)), count}
    }),
    _loadSubscribedBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadSubscribedBots(userId, lastId, max)
      return {list: list.map((bot: any) => self.getBot(bot)), count}
    }),
    _updateBot: flow(function*(bot: IBot) {
      yield waitFor(() => self.connected)
      yield self.transport.updateBot(bot)
      // subscribe owner to his bot
      self.profile!.ownBots.addToTop(bot)
      self.profiles.get(self.username!)!.ownBots.addToTop(bot)
      return {isNew: false}
    }),
    _removeBotPost: flow(function*(id: string, postId: string) {
      yield waitFor(() => self.connected)
      yield self.transport.removeBotPost(id, postId)
    }),
    _shareBot: (id: string, server: string, recepients: string[], message: string, action: string) => {
      self.transport.shareBot(id, server, recepients, message, action)
    },
    _publishBotPost: flow(function*(post: IBotPost) {
      yield waitFor(() => self.connected)
      let parent = getParent(post)
      while (!parent.id) parent = getParent(parent)
      const botId = parent.id
      yield self.transport.publishBotPost(botId, post)
    }),
    _subscribeGeofenceBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      return yield self.transport.subscribeBot(id, true)
    }),
    _subscribeBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      return yield self.transport.subscribeBot(id, false)
    }),
    _unsubscribeGeofenceBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      return yield self.transport.subscribeBot(id, false)
    }),
    _unsubscribeBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      return yield self.transport.unsubscribeBot(id, false)
    }),
    geosearch: flow(function*({latitude, longitude, latitudeDelta, longitudeDelta}: any) {
      yield waitFor(() => self.connected)
      yield self.transport.geosearch({latitude, longitude, latitudeDelta, longitudeDelta})
    }),
    _loadRelations: flow(function*(userId: string, relation: string = 'following', lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadRelations(userId, relation, lastId, max)
      const res: any = []
      for (let i = 0; i < list.length; i++) {
        const {id} = list[i]
        // TODO avoid extra request to load profile (server-side)
        const profile = yield self.getProfile(id)
        res.push(profile)
      }
      return {list: res, count}
    }),
    _sendMessage: (msg: IMessage) => {
      self.transport.sendMessage(msg)
      self._addMessage({id: msg.to, message: msg})
    },
    loadChat: flow(function*(userId: string, lastId?: string, max: number = 20) {
      yield waitFor(() => self.connected)
      yield self.transport.loadChat(userId, lastId, max)
    }),
    downloadURL: flow(function*(tros: string) {
      return yield self.transport.downloadURL(tros)
    }),
    downloadFile: flow(function*(tros: string, name: string, sourceUrl: string) {
      return yield self.transport.downloadFile(tros, name, sourceUrl)
    }),
    downloadThumbnail: flow(function*(url: string, tros: string) {
      return yield self.transport.downloadThumbnail(url, tros)
    }),
    downloadTROS: flow(function*(tros: string) {
      return yield self.transport.downloadTROS(tros)
    }),
    _requestUpload: flow(function*({file, size, width, height, access}: any) {
      yield waitFor(() => self.connected)
      return yield self.transport.requestUpload({file, size, width, height, access})
    }),
    _loadUpdates: flow(function*() {
      yield waitFor(() => self.connected)
      const {list, bots, version} = yield self.transport.loadUpdates(self.version)
      bots.forEach(self.getBot)
      self.version = version
      list.forEach((data: any) => {
        if (data.id.indexOf('/changed') !== -1 || data.id.indexOf('/description') !== -1) {
          return
        }
        const item = self.create(EventEntity, data)
        self.updates.unshift(item)
      })
    }),
    _loadHomestream: flow(function*(lastId: any, max: number = 3) {
      // console.log('wocky loadHomestream', lastId, max)
      yield waitFor(() => self.connected)
      const {list, count, bots, version} = yield self.transport.loadHomestream(lastId, max)
      // console.log('wocky loadHomestream result', list, count)
      bots.forEach(self.getBot)
      self.version = version
      return {list: list.map((data: any) => self.create(EventEntity, data)), count}
    }),
    _subscribeToHomestream: (version: string) => {
      self.transport.subscribeToHomestream(version)
    },
    _onNotification: flow(function*({changed, version, ...data}: any) {
      // console.log('ONNOTIFICATION', self.username, JSON.stringify(data))
      if (!version) {
        console.error('No version for notification:', JSON.stringify(data))
      }
      self.version = version
      // ignore /changed and /description delete
      // delete creation event if we have also delete event
      if (data.delete) {
        if (data.id.indexOf('/changed') !== -1 || data.id.indexOf('/description') !== -1) {
          return
        }
        let existed = self.updates.findIndex((u: any) => u.id === data.id)
        if (existed !== -1 && getType(self.updates[existed]).name === EventBotCreate.name) {
          while (existed !== -1) {
            self.updates.splice(existed, 1)
            existed = self.updates.findIndex((u: any) => u.id === data.id)
          }
          return
        }
        if (!self.events.exists(data.id)) return
      }
      if (changed && data.bot) {
        yield self.loadBot(data.bot.id, data.bot.server)
      } else {
        const item: any = self.create(EventEntity, data)
        if (item.bot && !item.bot.owner) {
          yield self.loadBot(item.bot.id, null)
        }
        const existed = self.updates.findIndex((u: any) => u.id === item.id)
        if (existed !== -1) {
          self.updates.splice(existed, 1)
        }
        self.updates.unshift(item)
      }
    }),
    incorporateUpdates: () => {
      for (let i = self.updates.length - 1; i >= 0; i--) {
        const {id} = self.updates[i]
        // delete item
        self.events.remove(id)
        if (getType(self.updates[i]).name !== EventDelete.name) {
          const event: any = self.updates[i]
          if (event.bot && isAlive(event.bot)) {
            self.events.addToTop(clone(event))
          }
        } else {
          const parts = id.split('/')
          self.deleteBot(parts[parts.length - 1])
        }
      }
      self.updates.clear()
    },
    _onGeoBot: (bot: any) => {
      self.geoBots.put(self.getBot(bot))
    },
    enablePush: flow(function*(token: string) {
      yield waitFor(() => self.connected)
      yield self.transport.enablePush(token)
    }),
    disablePush: flow(function*() {
      yield waitFor(() => self.connected)
      yield self.transport.disablePush()
    }),
    setSessionCount: (value: number) => {
      self.sessionCount = value
    }
  }))
  .actions(self => {
    function clearCache() {
      self.profiles.clear()
      self.roster.clear()
      self.chats.clear()
      self.bots.clear()
      self.geoBots.clear()
      self.events.refresh()
      self.updates.clear()
    }
    return {
      clearCache,
      logout: flow(function* logout() {
        if (self.connected) {
          yield self.disablePush()
          yield self.disconnect()
        }
        self.profile = null
        clearCache()
        self.sessionCount = 0
        self.version = ''
        self.username = null
        self.password = null
      }),
      afterCreate: () => {
        self.events.setRequest(self._loadHomestream)
        reaction(
          () => self.profile && self.connected,
          async (connected: boolean) => {
            if (connected) {
              await self.loadChats()
              self.requestRoster()
              if (!self.version) {
                await self.events.load()
              } else {
                await self._loadUpdates()
              }
              self._subscribeToHomestream(self.version)
            } else {
              self.profiles.storage.values().forEach((profile: any) => profile.setStatus('unavailable'))
            }
          }
        )
        reaction(() => self.transport.geoBot, self._onGeoBot)
        reaction(
          () => self.transport.presence,
          ({id, status}) => {
            const profile = self.profiles.get(id)
            profile.setStatus(status)
            if (profile.isOwn && self.profile) {
              self.profile!.setStatus(status)
            }
          }
        )
        reaction(() => self.transport.rosterItem, self.addRosterItem)
        reaction(() => self.transport.message, self._addMessage)
        reaction(() => self.transport.notification, self._onNotification)
      }
    }
  })

export type IWockyType = typeof Wocky.Type
export interface IWocky extends IWockyType {}
