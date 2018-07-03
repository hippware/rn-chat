import {
  types,
  isAlive,
  clone,
  getType,
  getParent,
  getEnv,
  flow,
  ISnapshottable,
  IType,
  IModelType,
  IExtendedObservableMap,
} from 'mobx-state-tree'
import {reaction, IObservableArray, ObservableMap} from 'mobx'
import {OwnProfile} from '../model/OwnProfile'
import {Profile, IProfile} from '../model/Profile'
import {IFileService, upload} from '../transport/FileService'
import {Storages} from './Factory'
import {Base, SERVICE_NAME} from '../model/Base'
import {Bot, IBot, BotPaginableList} from '../model/Bot'
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
import {IWockyTransport, ILocationSnapshot} from '..'
export const EventEntity = types.union(
  EventBotPost,
  EventBotNote,
  EventBotShare,
  EventBotCreate,
  EventBotGeofence,
  EventDelete
)
export type IEventEntity = typeof EventEntity.Type
export type __IModelType = IModelType<any, any>
export type __IType = IType<any, any>
export type __IObservableArray = IObservableArray<any>
export type __ISnapshotable = ISnapshottable<any>
export type __IExtendedObservableMap = IExtendedObservableMap<any>
// export interface IEventEntity extends IEventEntityType {}
export const EventList = createPaginable(EventEntity).actions(() => ({
  postProcessSnapshot: (snapshot: any) => {
    if (snapshot.result.length > 20) {
      const result = snapshot.result.slice(0, 20)
      const cursor = result[result.length - 1].id
      return {...snapshot, result, cursor}
    }
    return snapshot
  },
}))
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
      roster: types.optional(types.map(types.reference(Profile)), {} as ObservableMap),
      profile: types.maybe(OwnProfile),
      updates: types.optional(types.array(EventEntity), []),
      events: types.optional(EventList, {}),
      geofenceBots: types.optional(BotPaginableList, {}),
      geoBots: types.optional(types.map(types.reference(Bot)), {} as ObservableMap),
      chats: types.optional(Chats, Chats.create()),
      version: '',
    })
  )
  .named(SERVICE_NAME)
  .views(self => {
    const transport: IWockyTransport = getEnv(self).transport
    if (!transport) {
      throw new Error('Server transport is not defined')
    }
    return {
      get transport(): IWockyTransport {
        return transport
      },
      get connected() {
        return transport.connected
      },
    }
  })
  .actions(self => ({
    loadProfile: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      const isOwn = id === self.username
      const data = yield self.transport.loadProfile(id)
      if (isOwn) {
        if (!self.profile) {
          const profile = self.create(OwnProfile, {
            id,
            ...self._registerReferences(Profile, data),
            loaded: true,
            status: 'available',
          })
          self.profile = profile
        } else {
          self.load(self.profile, data)
        }
        // add own profile to the storage
        self.profiles.get(id, data)
        if (self.profile.handle) self.sessionCount = 3
        return self.profile
      }
      return self.profiles.get(id, data)
    }),
  }))
  .extend(self => {
    return {
      views: {
        get connecting() {
          return self.transport.connecting
        },
        get sortedRoster(): IProfile[] {
          return (Array.from(self.roster.values()) as IProfile[])
            .filter(x => x.handle)
            .sort((a, b) => {
              return a.handle!.toLocaleLowerCase().localeCompare(b.handle!.toLocaleLowerCase())
            })
        },
        get updatesToAdd(): IEventEntity[] {
          return self.updates.filter((e: IEventEntity) => {
            return getType(e).name !== EventDelete.name
          })
        },
      },
      actions: {
        postProcessSnapshot: (snapshot: any) => {
          const data = {...snapshot}
          delete data.geoBots
          delete data.files
          return data
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
          if (!self.username || !self.password || !self.host) {
            throw new Error(
              `Cannot login without username/password/host:${self.username},${self.password},${
                self.host
              }`
            )
          }
          yield self.transport.login(self.username!, self.password!, self.host)
          yield self.loadProfile(self.username)

          self.sessionCount++
          return true
        }),
        disconnect: flow(function*() {
          if (self.profile) {
            self.profile!.status = 'unavailable'
          }
          yield self.transport.disconnect()
        }),
        remove: flow(function*() {
          yield self.transport.remove()
        }),
        register: flow(function*(data: any, providerName: string) {
          const res = yield self.transport.register(data, self.host, providerName)
          Object.assign(self, res)
          return true
        }),
        testRegister: flow(function*(data: any) {
          const res = yield self.transport.testRegister(data, self.host)
          Object.assign(self, res)
          return true
        }),
        _requestProfiles: flow(function*(users: string[]) {
          const arr = yield self.transport.requestProfiles(users)
          return arr.map((user: any) => self.profiles.get(user.id, user))
        }),
        _updateProfile: flow(function*(d: any) {
          yield self.transport.updateProfile(d)
        }),
        lookup: flow<string>(function*(handle: string) {
          const profile = yield self.transport.lookup(handle)
          return self.profiles.get(profile.id, profile)
        }),
        createChat: (id: string): IChat => self.chats.get(id) || self.chats.add(Chat.create({id})),
      },
    }
  })
  .views(self => ({
    get activeBots(): IBot[] {
      const arr = self.geofenceBots.list
        .filter((bot: IBot) => bot.visitorsSize)
        .map((data, index) => ({data, index}))
      return arr
        .sort((a, b) => {
          if (a.data.visitor && !b.data.visitor) return -1
          if (!a.data.visitor && b.data.visitor) return 1
          return a.index - b.index
        })
        .map(rec => rec.data)
    },
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
    },
  }))
  .actions(self => ({
    addRosterItem: (profile: any) => {
      self.roster.set(profile.id, self.profiles.get(profile.id, profile))
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
    getBot: ({id, server, ...data}: {id: string; server?: string; owner?: string | null}): IBot => {
      const bot = self.bots.storage.get(id)
        ? self.bots.get(id, data)
        : self.bots.get(id, {server, owner: data.owner})
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
      self.geofenceBots.remove(id)
      self.geoBots.delete(id)
      self.bots.delete(id)
    },
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
    // TODO: make server an optional param
    loadBot: flow(function*(id: string, server: any) {
      yield waitFor(() => self.connected)
      const bot = self.getBot({id, server})
      if (!bot.loading) {
        try {
          bot.startLoading()
          const data = yield self.transport.loadBot(id, server)
          self.load(bot, data)
        } catch (e) {
          // console.error(e) TODO
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
    }),
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
      const {list, cursor, count} = yield self.transport.loadOwnBots(userId, lastId, max)
      return {list: list.map(self.getBot), count, cursor}
    }),
    _loadGeofenceBots: flow(function*(lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, cursor, count} = yield self.transport.loadGeofenceBots(lastId, max)
      return {list: list.map(self.getBot), count, cursor}
    }),
    _loadBotSubscribers: flow(function*(id: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, cursor, count} = yield self.transport.loadBotSubscribers(id, lastId, max)
      return {
        list: list.map((profile: any) => self.profiles.get(profile.id, profile)),
        count,
        cursor,
      }
    }),
    _loadBotGuests: flow(function*(id: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, cursor, count} = yield self.transport.loadBotGuests(id, lastId, max)
      return {
        list: list.map((profile: any) => self.profiles.get(profile.id, profile)),
        count,
        cursor,
      }
    }),
    _loadBotVisitors: flow(function*(id: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, cursor, count} = yield self.transport.loadBotVisitors(id, lastId, max)
      return {
        list: list.map((profile: any) => self.profiles.get(profile.id, profile)),
        count,
        cursor,
      }
    }),
    _loadBotPosts: flow(function*(id: string, before?: string) {
      yield waitFor(() => self.connected)
      const {list, cursor, count} = yield self.transport.loadBotPosts(id, before)
      return {list: list.map((post: any) => self.create(BotPost, post)), count, cursor}
    }),
    _loadSubscribedBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
      yield waitFor(() => self.connected)
      const {list, cursor, count} = yield self.transport.loadSubscribedBots(userId, lastId, max)
      return {list: list.map((bot: any) => self.getBot(bot)), count, cursor}
    }),
    _updateBot: flow(function*(d: any) {
      yield waitFor(() => self.connected)
      yield self.transport.updateBot(d)
      if (d.geofence) {
        self.profile!.setHasUsedGeofence(true)
      }
      // subscribe owner to his bot
      const bot = self.bots.storage.get(d.id)
      self.profile!.ownBots.addToTop(bot)
      self.profiles.get(self.username!)!.ownBots.addToTop(bot)
      return {isNew: false}
    }),
    _removeBotPost: flow(function*(id: string, postId: string) {
      yield waitFor(() => self.connected)
      yield self.transport.removeBotPost(id, postId)
    }),
    _shareBot: (
      id: string,
      server: string,
      recepients: string[],
      message: string,
      action: string
    ) => {
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
      self.profile!.setHasUsedGeofence(true)
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
    loadLocalBots: flow(function*({latitude, longitude, latitudeDelta, longitudeDelta}: any) {
      yield waitFor(() => self.connected)
      const arr = yield self.transport.loadLocalBots({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      })
      return arr.map(self.getBot)
    }),
    _loadRelations: flow(function*(
      userId: string,
      relation: string = 'following',
      lastId?: string,
      max: number = 10
    ) {
      yield waitFor(() => self.connected)
      const {list, count} = yield self.transport.loadRelations(userId, relation, lastId, max)
      const res: any = []
      for (const rec of list) {
        const {id} = rec
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
    setLocation: flow(function*(location: ILocationSnapshot) {
      return yield self.transport.setLocation(location)
    }),
    getLocationsVisited: (limit?: number): Promise<object[]> => {
      return self.transport.getLocationsVisited(limit)
    },
    _requestUpload: flow(function*({file, size, width, height, access}: any) {
      yield waitFor(() => self.connected)
      const data = yield self.transport.requestUpload({file, size, width, height, access})
      try {
        yield upload(data)
        return data.reference_url
      } catch (e) {
        yield self.transport.removeUpload(data.reference_url)
        throw e
      }
    }),
    _removeUpload: flow(function*(tros: string) {
      yield waitFor(() => self.connected)
      yield self.transport.removeUpload(tros)
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
    _onBotVisitor: flow(function*({bot, action, visitor}: any) {
      // console.log('ONBOTVISITOR', action, JSON.stringify(bot), visitor)
      const id = visitor.id
      const botModel: IBot = self.bots.get(bot.id, bot)
      if (action === 'ARRIVE') {
        if (id === self.username) {
          botModel.visitor = true
        }
        self.geofenceBots.remove(botModel.id)
        self.geofenceBots.addToTop(botModel)
      } else {
        if (id === self.username) {
          botModel.visitor = false
        }
      }
    }),
    _onNotification: flow(function*({changed, version, ...data}: any) {
      // console.log('ONNOTIFICATION', self.username, JSON.stringify(data))
      if (!version) {
        throw new Error('No version for notification:' + JSON.stringify(data))
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
        // self.events.remove(data.id) DON'T remove HS item until user presses 'New Updates'
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
      if (!self.geoBots.has(bot.id)) {
        self.geoBots.set(bot.id, self.getBot(bot))
      }
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
    },
  }))
  .actions(self => {
    const fs: IFileService = getEnv(self).fileService
    return {
      downloadFile: flow(function*(tros: string, name: string, sourceUrl: string) {
        const folder = `${fs.tempDir}/${tros.split('/').slice(-1)[0]}`
        if (!(yield fs.fileExists(folder))) {
          yield fs.mkdir(folder)
        }
        // check main cached picture first
        let fileName = `${folder}/main.jpeg`
        let cached = yield fs.fileExists(fileName)

        // check thumbnail
        if (!cached && name !== 'main') {
          fileName = `${folder}/${name}.jpeg`
          cached = yield fs.fileExists(fileName)
        }
        if (!cached) {
          yield waitFor(() => self.connected)
          let url = sourceUrl
          let headers = {}
          // request S3 URL if it is not passed
          if (!url) {
            const data = yield self.downloadURL(tros)
            url = data.url
            headers = data.headers
          }
          yield fs.downloadHttpFile(url, fileName, headers)
        }
        const {width, height} = yield fs.getImageSize(fileName)
        return {uri: fileName, contentType: 'image/jpeg', cached, width, height}
      }),
    }
  })
  .actions(self => ({
    downloadThumbnail: flow(function*(url: string, tros: string) {
      return yield self.downloadFile(tros, 'thumbnail', url)
    }),
    downloadTROS: flow(function*(tros: string) {
      return yield self.downloadFile(tros, 'main', '')
    }),
  }))
  .actions(self => {
    function clearCache() {
      self.geofenceBots.refresh()
      self.roster.clear()
      self.chats.clear()
      self.geoBots.clear()
      self.events.refresh()
      self.updates.clear()
      self.profiles.clear()
      self.bots.clear()
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
        self.geofenceBots.setRequest(self._loadGeofenceBots)
        reaction(
          () => self.profile && self.connected,
          async (connected: boolean) => {
            if (connected) {
              self.geofenceBots.load({force: true})
              await self.loadChats()
              self.requestRoster()
              if (!self.version) {
                await self.events.load()
              } else {
                await self._loadUpdates()
              }
              self._subscribeToHomestream(self.version)
            } else {
              Array.from(self.profiles.storage.values()).forEach((profile: any) =>
                profile.setStatus('unavailable')
              )
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
        reaction(() => self.transport.botVisitor, self._onBotVisitor)
      },
    }
  })

export type IWockyType = typeof Wocky.Type
export interface IWocky extends IWockyType {}
