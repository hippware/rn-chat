import {types, getParent, getEnv, flow} from 'mobx-state-tree'
import {reaction, IReactionDisposer} from 'mobx'
import {OwnProfile} from '../model/OwnProfile'
import {Profile, IProfile, IProfilePartial} from '../model/Profile'
import {IFileService, upload} from '../transport/FileService'
import {Storages} from './Factory'
import {Base, SERVICE_NAME} from '../model/Base'
import {IBot, BotPaginableList} from '../model/Bot'
import {BotPost, IBotPost} from '../model/BotPost'
import {Chats} from '../model/Chats'
import {Chat, IChat} from '../model/Chat'
import {Message, IMessage} from '../model/Message'
import {processMap, waitFor} from '../transport/utils'
import {IWockyTransport, ILocation, ILocationSnapshot} from '..'
import {EventList, EventEntity} from '../model/EventList'
import _ from 'lodash'

export const Wocky = types
  .compose(
    Base,
    Storages,
    types.model({
      id: 'wocky',
      username: types.maybeNull(types.string),
      password: types.maybeNull(types.string),
      host: types.string,
      sessionCount: 0,
      roster: types.optional(types.map(types.reference(Profile)), {}),
      profile: types.maybeNull(OwnProfile),
      notifications: types.optional(EventList, {}),
      hasUnreadNotifications: false,
      geofenceBots: types.optional(BotPaginableList, {}),
      // geoBots: types.optional(types.map(types.reference(Bot)), {} as ObservableMap),
      chats: types.optional(Chats, {}),
    })
  )
  .named(SERVICE_NAME)
  .postProcessSnapshot((snapshot: any) => {
    const data = {...snapshot}
    // delete data.geoBots
    delete data.files
    return data
  })
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
            ...data,
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
        if (self.profile!.handle) self.sessionCount = 3
        return self.profile
      }
      return self.profiles.get(id, data)
    }) as (id: string) => Promise<IProfile>,
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
            .slice()
            .sort((a, b) => {
              return a.handle!.toLocaleLowerCase().localeCompare(b.handle!.toLocaleLowerCase())
            })
        },
        // get updatesToAdd(): IEventEntity[] {
        //   return self.updates.filter((e: IEventEntity) => {
        //     return getType(e).name !== EventDelete.name
        //   })
        // },
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
          if (!self.password || !self.host) {
            throw new Error(
              `Cannot login without username/password/host:${self.username},${self.password},${
                self.host
              }`
            )
          }
          yield self.transport.login(self.username!, self.password!, self.host)
          // set username
          if (!self.username && self.transport.username) {
            self.username = self.transport.username
          }
          // TODO: just use the returned profile in GraphQL authenticate payload to save a roundtrip here
          yield self.loadProfile(self.username!)
          self.sessionCount++
          return true
        }) as (user?: string, password?: string, host?: string) => Promise<boolean>,
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
        .slice()
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
      self.notifications!.result.forEach((event: any) => {
        if (event.bot && event.bot.id === id) {
          self.notifications.remove(event.id)
        }
      })
      self.profile!.subscribedBots.remove(id)
      self.profile!.ownBots.remove(id)
      self.profiles.get(self.username!)!.ownBots.remove(id)
      self.profiles.get(self.username!)!.subscribedBots.remove(id)
      self.geofenceBots.remove(id)
      // self.geoBots.delete(id)
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
    _hideUser: flow(function*(value: boolean, expire?: Date) {
      yield waitFor(() => self.connected)
      yield self.transport.hideUser(value, expire)
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
    }) as (max?: number) => Promise<void>,
    loadBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      const bot = self.getBot({id})
      if (!bot.loading) {
        try {
          bot.startLoading()
          const data = yield self.transport.loadBot(id)
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
  .actions(self => {
    // Typescript type for flow
    // https://spectrum.chat/thread/eb6b60fb-9b1b-45d0-90e0-9559e5cb6ad2?m=MTUyNDA2MDkwNjA0Mw==
    const searchUsers = flow(function*(text: string) {
      const users: IProfilePartial[] = yield self.transport.searchUsers(text)
      return Promise.all(users.map(u => (self.getProfile as any)(u.id, u)))
    }) as (a1: string) => Promise<IProfile[]>

    return {
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
        if (list.length) {
          self.profile!.setHasUsedGeofence(true)
        }
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
      _updateBot: flow(function*(d: any, userLocation: ILocation) {
        yield waitFor(() => self.connected)
        yield self.transport.updateBot(d, userLocation)
        self.profile!.setHasUsedGeofence(true) // all bots now are geofence
        // subscribe owner to his bot
        const bot = self.bots.storage.get(d.id)
        self.profile!.ownBots.addToTop(bot)
        self.profiles.get(self.username!)!.ownBots.addToTop(bot)
        return {isNew: false}
      }) as (data: any, userLocation: ILocation) => Promise<{isNew: boolean}>,
      _removeBotPost: flow(function*(id: string, postId: string) {
        yield waitFor(() => self.connected)
        yield self.transport.removeBotPost(id, postId)
      }),
      // _shareBot: (
      //   id: string,
      //   server: string,
      //   recepients: string[],
      //   message: string,
      //   action: string
      // ) => {
      //   self.transport.shareBot(id, server, recepients, message, action)
      // },
      _inviteBot: flow(function*(botId: string, recepients: string[]) {
        yield self.transport.inviteBot(botId, recepients)
      }),
      _publishBotPost: flow(function*(post: IBotPost) {
        yield waitFor(() => self.connected)
        let parent: any = getParent(post)
        while (!parent.id) parent = getParent(parent)
        const botId = parent.id
        yield self.transport.publishBotPost(botId, post)
      }),
      _subscribeBot: flow(function*(id: string) {
        yield waitFor(() => self.connected)
        return yield self.transport.subscribeBot(id)
      }),
      _unsubscribeBot: flow(function*(id: string) {
        yield waitFor(() => self.connected)
        return yield self.transport.unsubscribeBot(id)
      }),
      _acceptBotInvitation: flow(function*(inviteId: string, userLocation: ILocation) {
        yield waitFor(() => self.connected)
        return yield self.transport.inviteBotReply(inviteId, userLocation)
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
      }) as (a) => Promise<IBot[]>,
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
          const profile = yield self.getProfile(id, undefined)
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
      _loadNotifications: flow(function*(lastId: any, max: number = 20) {
        // console.log('& load', lastId)
        yield waitFor(() => self.connected)
        const {list, count} = yield self.transport.loadNotifications({
          beforeId: lastId,
          limit: max,
        })
        // console.log('& load notifications list', list)
        return {list: list.map((data: any) => self.create(EventEntity, data)), count}
      }),
      _onBotVisitor: flow(function*({bot, action, visitor}: any) {
        // console.log('ONBOTVISITOR', action, visitor.id, bot.visitorsSize)
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
      // _onNotification: flow(function*(data: any) {
      _onNotification(data: any) {
        // console.log('& ONNOTIFICATION', self.username, JSON.stringify(data))
        // if (!version) {
        //   throw new Error('No version for notification:' + JSON.stringify(data))
        // }
        // self.version = version
        // // ignore /changed and /description delete
        // // delete creation event if we have also delete event
        // if (data.delete) {
        //   if (data.id.indexOf('/changed') !== -1 || data.id.indexOf('/description') !== -1) {
        //     return
        //   }
        //   let existed = self.updates.findIndex((u: any) => u.id === data.id)
        //   if (existed !== -1 && getType(self.updates[existed]).name === EventBotCreate.name) {
        //     while (existed !== -1) {
        //       self.updates.splice(existed, 1)
        //       existed = self.updates.findIndex((u: any) => u.id === data.id)
        //     }
        //     return
        //   }
        //   if (!self.events.exists(data.id)) return
        //   // if (!self.notifications.exists(data.id)) return
        //   // self.events.remove(data.id) DON'T remove HS item until user presses 'New Updates'
        // }
        // if (changed && data.bot) {
        //   yield self.loadBot(data.bot.id, data.bot.server)
        // } else {

        if (!data) return

        try {
          // need to deep clone here to prevent mobx error "[mobx] Dynamic observable objects cannot be frozen"
          data = _.cloneDeep(data)
          const item: any = self.create(EventEntity, data)
          self.notifications.remove(item.id)
          self.notifications.addToTop(item)
          self.hasUnreadNotifications = true
        } catch (e) {
          getEnv(self).logger.log('& ONNOTIFICATION ERROR: ' + e.message)
        }
        // }
      },
      viewNotifications() {
        self.hasUnreadNotifications = false
      },
      // incorporateUpdates: () => {
      //   for (let i = self.updates.length - 1; i >= 0; i--) {
      //     const {id} = self.updates[i]
      //     // delete item
      //     self.notifications.remove(id)
      //     if (getType(self.updates[i]).name !== EventDelete.name) {
      //       const event: any = self.updates[i]
      //       if (event.bot && isAlive(event.bot)) {
      //         self.notifications.addToTop(clone(event))
      //       }
      //     } else {
      //       const parts = id.split('/')
      //       self.deleteBot(parts[parts.length - 1])
      //     }
      //   }
      //   self.updates.clear()
      // },
      // _onGeoBot: (bot: any) => {
      //   if (!self.geoBots.has(bot.id)) {
      //     self.geoBots.set(bot.id, self.getBot(bot))
      //   }
      // },
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
      searchUsers,
    }
  })
  .actions(self => {
    const fs: IFileService = getEnv(self).fileService
    return {
      _loadNewNotifications: flow(function*() {
        yield waitFor(() => self.connected)
        const mostRecentNotification = self.notifications.first
        const limit = 20
        const {list} = yield self.transport.loadNotifications({
          afterId: mostRecentNotification && mostRecentNotification.id,
          limit,
        })
        if (list.length === limit) {
          // there are potentially more new notifications so purge the old ones (to ensure paging works as expected)
          self.notifications.refresh()
        }
        const beforeCount = self.notifications.length
        list.reverse().forEach(self._onNotification)
        const afterCount = self.notifications.length
        if (afterCount === beforeCount) {
          self.hasUnreadNotifications = false
        } else if (beforeCount === 0) {
          // first app load or after cache reset
          self.hasUnreadNotifications = true
        }
        self.notifications.cursor = self.notifications.last && self.notifications.last.id
        // console.log(
        //   '& notifications list after initial load',
        //   self.notifications.list.map(n => n.id)
        // )
      }),
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
      userInviteMakeCode(): Promise<string> {
        return self.transport.userInviteMakeCode()
      },
      userInviteRedeemCode(code: string): Promise<void> {
        return self.transport.userInviteRedeemCode(code)
      },
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
      self.chats.clear()
      // self.geoBots.clear()
      self.notifications.refresh()
      self.bots.clear()
      self.roster.clear()
      self.profiles.clear()
    }
    let reactions: IReactionDisposer[] = []
    function startReactions() {
      reactions = [
        reaction(
          () => !!self.profile && self.connected,
          (connected: boolean) => {
            if (connected) {
              self.geofenceBots.load({force: true})
              self.transport.subscribeNotifications()
              self.requestRoster()
              self._loadNewNotifications()
            } else {
              Array.from(self.profiles.storage.values()).forEach((profile: any) =>
                profile.setStatus('unavailable')
              )
            }
          }
        ),
        // reaction(() => self.transport.geoBot, self._onGeoBot),
        reaction(
          () => self.transport.presence,
          ({id, status}) => {
            // no need to update own profile's status
            if (id !== self.username) {
              const profile = self.profiles.get(id)
              profile.setStatus(status)
              if (profile.isOwn && self.profile) {
                self.profile!.setStatus(status)
              }
            }
          }
        ),
        reaction(() => self.transport.rosterItem, self.addRosterItem),
        reaction(() => self.transport.message, self._addMessage),
        reaction(() => self.transport.notification, self._onNotification),
        reaction(() => self.transport.botVisitor, self._onBotVisitor),
      ]
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
        self.username = null
        self.password = null
      }),
      afterCreate: () => {
        self.notifications.setRequest(self._loadNotifications)
        self.geofenceBots.setRequest(self._loadGeofenceBots)
        startReactions()
      },
      startReactions,
      disposeReactions: () => {
        reactions.forEach(disposer => disposer())
        reactions = []
      },
    }
  })

export type IWockyType = typeof Wocky.Type
export interface IWocky extends IWockyType {}
