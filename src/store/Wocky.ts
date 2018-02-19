// tslint:disable-next-line:no_unused-variable
import {IModelType, types, clone, IType, getType, getParent, getEnv, flow, destroy, IExtendedObservableMap, ISnapshottable, getSnapshot} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, IReactionDisposer, when, reaction, autorun} from 'mobx'
import {XmppTransport} from './XmppTransport'
import {OwnProfile} from '../model/OwnProfile'
import {Profile, IProfile} from '../model/Profile'
export {Profile, IProfile} from '../model/Profile'
import {Storages} from './Factory'
import {Base, SERVICE_NAME} from '../model/Base'
export {Base, SERVICE_NAME} from '../model/Base'
import {Bot, IBot} from '../model/Bot'
import {BotPost, IBotPost} from '../model/BotPost'
import {EventBotCreate} from '../model/EventBotCreate'
import {EventBotPost} from '../model/EventBotPost'
import {EventBotNote} from '../model/EventBotNote'
import {EventBotShare} from '../model/EventBotShare'
import {EventBotGeofence} from '../model/EventBotGeofence'
import {EventDelete} from '../model/EventDelete'
import {createPaginable} from '../model/PaginableList'
import {Chats} from '../model/Chats'
import {Chat, IChat} from '../model/Chat'
import {Message, IMessage} from '../model/Message'
import {processMap} from './utils'
export const EventEntity = types.union(EventBotPost, EventBotNote, EventBotShare, EventBotCreate, EventBotGeofence, EventDelete)
export type IEventEntity = typeof EventEntity.Type
export const EventList = createPaginable(EventEntity)
export type IEventList = typeof EventList.Type

export const Wocky = types
  .compose(
    Base,
    Storages,
    types.model({
      id: 'wocky',
      username: types.maybe(types.string),
      password: types.maybe(types.string),
      resource: types.string,
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
  .extend(self => {
    const {provider, fileService} = getEnv(self)
    let transport: XmppTransport
    return {
      views: {
        get snapshot() {
          const data = {...self._snapshot}
          if (self.events.length > 10) {
            data.events = {result: data.events.result.slice(0, 10)}
          }
          delete data.geoBots
          delete data.files
          return data
        },
        get transport() {
          return transport
        },
        get connected() {
          return transport.connected
        },
        get connecting() {
          return transport.connecting
        },
        get sortedRoster() {
          return self.roster
            .values()
            .filter(x => x.handle)
            .sort((a, b) => {
              return a.handle.toLocaleLowerCase().localeCompare(b.handle.toLocaleLowerCase())
            })
        }
      },
      actions: {
        afterCreate: () => {
          transport = new XmppTransport(provider, fileService, self.resource)
        },
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
          yield transport.login(self.username!, self.password!, self.host)
          self.sessionCount++
          return true
        }),
        disconnect: flow(function*() {
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
          const res = yield transport.testRegister(data)
          Object.assign(self, res)
          return true
        }),
        loadProfile: flow(function*(id: string) {
          const isOwn = id === self.username
          const data = yield transport.loadProfile(id)
          let res: IProfile = self.profiles.get(id, data)
          if (isOwn) {
            if (!self.profile) {
              self.profile = self.create(OwnProfile, {id, ...data, status: 'available'})
            } else {
              self.load(self.profile, data)
            }
          }
          return res
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
    }
  }))
  .actions(self => ({
    _follow: flow(function*(username: string) {
      yield self.transport.follow(username)
    }),
    _unfollow: flow(function*(username: string) {
      yield self.transport.unfollow(username)
    }),
    _block: flow(function*(username: string) {
      yield self.transport.block(username)
    }),
    _unblock: flow(function*(username: string) {
      yield self.transport.unblock(username)
    }),
    requestRoster: flow(function*() {
      const roster = yield self.transport.requestRoster()
      roster.forEach(self.addRosterItem)
    }),
    loadChats: flow(function*(max: number = 50) {
      const items = yield self.transport.loadChats(max)
      items.forEach((item: {id: string; message: any}) => {
        const msg = self.create(Message, item.message)
        const chat = self.createChat(item.id)
        chat.addMessage(msg)
      })
    }),
    loadBot: flow(function*(id: string, server: any) {
      return self.getBot(yield self.transport.loadBot(id, server))
    })
  }))
  .actions(self => ({
    createBot: flow<IBot>(function*() {
      const id = yield self.transport.generateId()
      const bot = self.getBot({id, owner: self.username})
      bot.setNew(true)
      return bot
    }),
    removeBot: flow(function*(id: string) {
      yield self.transport.removeBot(id)
      // const events = self.events.list.filter(event => event.bot && event.bot === id)
      // events.forEach(event => self.events.remove(event.id))
      self.profile!.ownBots.remove(id)
      self.profiles.get(self.username!)!.ownBots.remove(id)
      self.geoBots.delete(id)
      self.bots.delete(id)
    }),
    _loadOwnBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
      const {list, count} = yield self.transport.loadOwnBots(userId, lastId, max)
      return {list: list.map((bot: any) => self.getBot(bot)), count}
    }),
    _loadBotSubscribers: flow(function*(id: string, lastId?: string, max: number = 10) {
      const {list, count} = yield self.transport.loadBotSubscribers(id, lastId, max)
      return {list: list.map((profile: any) => self.profiles.get(profile.id, profile)), count}
    }),
    _loadBotPosts: flow(function*(id: string, before?: string) {
      const {list, count} = yield self.transport.loadBotPosts(id, before)
      return {list: list.map((post: any) => self.create(BotPost, post)), count}
    }),
    _loadSubscribedBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
      const {list, count} = yield self.transport.loadSubscribedBots(userId, lastId, max)
      return {list: list.map((bot: any) => self.getBot(bot)), count}
    }),
    _updateBot: flow(function*(bot: IBot) {
      yield self.transport.updateBot(bot)
      self.profile!.ownBots.addToTop(bot)
      self.profiles.get(self.username!)!.ownBots.addToTop(bot)
      return {isNew: false}
    }),
    _removeBotPost: flow(function*(id: string, postId: string) {
      yield self.transport.removeBotPost(id, postId)
    }),
    _shareBot: (id: string, server: string, recepients: string[], message: string, type: string) => {
      self.transport.shareBot(id, server, recepients, message, type)
    },
    _publishBotPost: flow(function*(post: IBotPost) {
      let parent = getParent(post)
      while (!parent.id) parent = getParent(parent)
      const botId = parent.id
      yield self.transport.publishBotPost(botId, post)
    }),
    _subscribeBot: flow(function*(id: string) {
      return yield self.transport.subscribeBot(id)
    }),
    _unsubscribeBot: flow(function*(id: string) {
      return yield self.transport.unsubscribeBot(id)
    }),
    geosearch: flow(function*({latitude, longitude, latitudeDelta, longitudeDelta}: any) {
      yield self.transport.geosearch({latitude, longitude, latitudeDelta, longitudeDelta})
    }),
    _loadRelations: flow(function*(userId: string, relation: string = 'following', lastId?: string, max: number = 10) {
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
      return yield self.transport.requestUpload({file, size, width, height, access})
    }),
    _loadUpdates: flow(function*() {
      const {list, count, bots, version} = yield self.transport.loadUpdates(self.version)
      bots.forEach(self.getBot)
      self.version = version
      return {list: list.map((data: any) => self.create(EventEntity, data)), count}
    }),
    _loadHomestream: flow(function*(lastId: any, max: number = 3) {
      const {list, count, bots, version} = yield self.transport.loadHomestream(lastId, max)
      bots.forEach(self.getBot)
      self.version = version
      return {list: list.map((data: any) => self.create(EventEntity, data)), count}
    }),
    _subscribeToHomestream: (version: string) => {
      self.transport.subscribeToHomestream(version)
    },
    _onNotification: flow(function*({changed, version, ...data}: any) {
      if (changed && data.bot) {
        yield self.loadBot(data.bot.id, data.bot.server)
      } else {
        const item: any = self.create(EventEntity, data)
        if (item.bot && !item.bot.owner) {
          yield self.loadBot(item.bot.id, null)
        }
        self.updates.push(item)
      }
      if (!version) {
        console.error('No version for notification:', JSON.stringify(data))
      }
      self.version = version
    }),
    incorporateUpdates: () => {
      for (let i = self.updates.length - 1; i >= 0; i--) {
        const id = self.updates[i].id
        // delete item
        self.events.remove(id)
        if (getType(self.updates[i]).name !== EventDelete.name) {
          self.events.addToTop(clone(self.updates[i]))
        }
      }
      self.updates.clear()
    },
    _onGeoBot: (bot: any) => {
      self.geoBots.put(self.getBot(bot))
    },
    enablePush: flow(function*(token: string) {
      yield self.transport.enablePush(token)
    }),
    disablePush: flow(function*() {
      yield self.transport.disablePush()
    }),
    setSessionCount: (value: number) => {
      self.sessionCount = value
    }
  }))
  .actions(self => ({
    logout: flow(function*() {
      yield self.disablePush()
      yield self.disconnect()
      self.username = null
      self.password = null
      self.profile = null
      self.profiles.clear()
      self.roster.clear()
      self.chats.clear()
      self.bots.clear()
      self.geoBots.clear()
      self.sessionCount = 0
      self.version = ''
      self.events.refresh()
      self.updates.clear()
      self.username = null
      self.password = null
    }),
    afterCreate: () => {
      self.events.setRequest(self._loadHomestream)
      autorun('ProfileStore', async () => {
        if (self.connected && self.username) {
          try {
            await self.loadProfile(self.username)
            self.profile!.setStatus('available')
            await self.loadChats()
            self.requestRoster()
          } catch (e) {
            console.error(e)
          }
        } else {
          if (self.profile) {
            self.profile!.setStatus('unavailable')
          }
        }
      })
      reaction(
        () => self.connected,
        async () => {
          if (!self.version) {
            await self.events.load()
          } else {
            await self._loadUpdates()
          }
          self._subscribeToHomestream(self.version)
        }
      )
      reaction(() => self.transport.geoBot, self._onGeoBot)
      // reaction(
      //   () => self.transport.presence,
      //   ({id, status}) => {
      //     const profile = self.profiles.get(id)
      //     profile.setStatus(status)
      //   }
      // )
      reaction(() => self.transport.rosterItem, self.addRosterItem)
      reaction(() => self.transport.message, self._addMessage)
      reaction(() => self.transport.notification, self._onNotification)
    }
  }))

export type IWocky = typeof Wocky.Type
