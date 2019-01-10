import {types, getParent, getEnv, flow, Instance, getRoot} from 'mobx-state-tree'
import {reaction, IReactionDisposer} from 'mobx'
import {OwnProfile} from '../model/OwnProfile'
import {Profile, IProfile, IProfilePartial} from '../model/Profile'
import {IFileService, upload} from '../transport/FileService'
import {Storages} from './Factory'
import {Base, SERVICE_NAME} from '../model/Base'
import {IBot, BotPaginableList} from '../model/Bot'
import {BotPost, IBotPost} from '../model/BotPost'
import {Chats} from '../model/Chats'
import {IChat} from '../model/Chat'
import {createMessage, IMessage, IMessageIn} from '../model/Message'
import {processMap, waitFor, generateWockyToken} from '../transport/utils'
import uuid from 'uuid/v1'
import {EventList, createEvent} from '../model/EventList'
import _ from 'lodash'
import {RequestType} from '../model/PaginableList'
import {IEventData} from '../model/Event'
import {PaginableLoadType, PaginableLoadPromise, Transport} from '../transport/Transport'
import {MediaUploadParams} from '../transport/types'
import {ILocation, ILocationSnapshot} from '../model/Location'
import {ILoginProvider} from './ILoginProvider'

export const Wocky = types
  .compose(
    Base,
    Storages,
    types.model({
      id: 'wocky',
      username: types.maybeNull(types.string),
      password: types.maybeNull(types.string),
      providerName: types.maybeNull(types.string),
      accessToken: types.maybe(types.string),
      phoneNumber: types.maybe(types.string),
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
  .views(self => {
    const transport: Transport = getEnv(self).transport
    if (!transport) {
      throw new Error('Server transport is not defined')
    }
    return {
      get transport(): Transport {
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
          self.profile = OwnProfile.create({id})
        }
        self.profile.load(data)
        // add own profile to the storage
        self.profiles.get(id, data)
        if (self.profile!.handle) self.sessionCount = 3
        return self.profile
      }
      return self.profiles.get(id, data)
    }) as (id: string) => Promise<IProfile>,
  }))
  .extend(self => {
    const {appInfo} = getEnv(self)
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
        login: flow(function*(providerName: string) {
          const provider = getRoot(self)[providerName] as ILoginProvider
          if (!provider) return false

          // Allow provider to override any default values
          const payload = {
            aud: 'Wocky',
            jti: /*self.username = */ uuid(),
            iss: appInfo.uaString,
            dvc: appInfo.uniqueId,
            ...provider.getLoginCredentials(),
          }

          self.password = generateWockyToken(payload)
          const res = yield self.transport.login(self.password, self.host)
          if (!res) {
            return false
          }

          self.providerName = providerName
          if (self.transport.username) {
            self.username = self.transport.username
          }
          // TODO: just use the returned profile in GraphQL authenticate payload to save a roundtrip here
          yield self.loadProfile(self.username!)
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
        _updateProfile: flow(function*(d: any) {
          yield self.transport.updateProfile(d)
        }),
        createChat: (otherUserId: string): IChat => {
          let chat: IChat | undefined = self.chats.get(otherUserId)
          if (!chat) {
            chat = self.chats.add({id: otherUserId, otherUser: otherUserId})
          }
          return chat
        },
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
    getBot: ({id, ...data}: {id: string; owner?: string | null}): IBot => {
      return self.bots.get(id, data)
    },
    _addMessage: (message?: IMessageIn, unread = false): void => {
      if (!message) return
      const {otherUser} = message
      const otherUserId = (otherUser as any).id || otherUser
      let existingChat = self.chats.get(otherUserId)
      const msg = createMessage(message, self)
      if (existingChat) {
        existingChat.messages.add(msg)
      } else {
        existingChat = self.createChat(otherUserId)
        existingChat.messages.add({...message, otherUser: otherUserId})
      }
      if (!existingChat.active) {
        msg!.setUnread(unread)
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
      const items: Array<{chatId: string; message: IMessageIn}> = yield self.transport.loadChats(
        max
      )
      items.forEach(item => {
        const msg = createMessage(item.message, self)
        const chat = self.createChat(item.chatId)
        chat.messages.addToTop(msg) // TODO replace existing message to avoid duplicates?
      })
    }) as (max?: number) => Promise<void>,
    loadBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      const bot = self.getBot({id})
      if (!bot.loading) {
        try {
          bot.startLoading()
          const data = yield self.transport.loadBot(id)
          bot.load(data)
        } catch (e) {
          bot.setError(JSON.stringify(e))
        } finally {
          bot.finishLoading()
        }
      }
      return bot
    }) as (id: string) => Promise<IBot>,
    removeBot: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      yield self.transport.removeBot(id)
      // const events = self.events.list.filter(event => event.bot && event.bot === id)
      // events.forEach(event => self.events.remove(event.id))
      self.deleteBot(id)
    }),
  }))
  .actions(self => {
    return {
      createBot: flow(function*() {
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
        const {list, cursor, count} = yield self.transport.loadGeofenceBots()
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
      _loadBotVisitors: flow(function*(id: string, lastId?: string, max: number = 10) {
        yield waitFor(() => self.connected)
        const {list, cursor, count} = yield self.transport.loadBotVisitors(id, lastId, max)
        return {
          list: list.map((profile: any) => self.profiles.get(profile.id, profile)),
          count,
          cursor,
        }
      }) as RequestType,
      _loadBotPosts: flow(function*(id: string, before?: string) {
        yield waitFor(() => self.connected)
        const {list, cursor, count} = yield self.transport.loadBotPosts(id, before)
        return {
          list: list.map((post: any) =>
            BotPost.create({id: post.id}).load({service: self, ...post})
          ),
          count,
          cursor,
        }
      }) as RequestType,
      _loadSubscribedBots: flow(function*(userId: string, lastId?: string, max: number = 10) {
        yield waitFor(() => self.connected)
        const {list, cursor, count} = yield self.transport.loadSubscribedBots(userId, lastId, max)
        return {list: list.map((bot: any) => self.getBot(bot)), count, cursor}
      }),
      _updateBot: flow(function*(d: any, userLocation: ILocation) {
        yield waitFor(() => self.connected)
        yield self.transport.updateBot(d, userLocation)
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
      _sendMessage: flow(function*(msg: IMessage) {
        // console.log('& sendMessage', getSnapshot(msg))
        yield self.transport.sendMessage(
          (msg.otherUser!.id || msg.otherUser!) as string,
          msg.content.length ? msg.content : undefined,
          msg.media ? msg.media.id : undefined
        )
        // console.log('& sendMessage, add', msg.media ? msg.media.id : 'no media', getSnapshot(msg))
        // TODO better IMessage to IMessageIn conversion?
        self._addMessage(msg as any, false)
      }),
      _loadChatMessages: flow(function*(userId: string, lastId?: string, max: number = 20) {
        yield waitFor(() => self.connected)
        const {list, count, cursor} = yield self.transport.loadChatMessages(userId, lastId, max)
        return {
          count,
          cursor,
          list: list.map(m => createMessage(m, self)),
        }
      }) as (userId: string, lastId?: string, max?: number) => PaginableLoadPromise<IMessageIn>,
      getLocationUploadToken: flow(function*() {
        return yield self.transport.getLocationUploadToken()
      }),
      setLocation: flow(function*(location: ILocationSnapshot) {
        return yield self.transport.setLocation(location)
      }),
      getLocationsVisited: (limit?: number): Promise<object[]> => {
        return self.transport.getLocationsVisited(limit)
      },
      _requestUpload: flow(function*({file, size, access}) {
        yield waitFor(() => self.connected)
        const data = yield self.transport.requestUpload({file, size, access})
        try {
          yield upload(data)
          return data.reference_url
        } catch (e) {
          yield self.transport.removeUpload(data.reference_url)
          throw e
        }
      }) as ({file, size, access}: MediaUploadParams) => Promise<string>,
      _removeUpload: flow(function*(tros: string) {
        yield waitFor(() => self.connected)
        yield self.transport.removeUpload(tros)
      }),
      _loadNotifications: flow(function*(lastId: string, max: number = 20) {
        yield waitFor(() => self.connected)
        const {list, count}: PaginableLoadType<IEventData> = yield self.transport.loadNotifications(
          {
            beforeId: lastId,
            limit: max,
          }
        )
        return {list: list.map(data => createEvent(data, self)), count}
      }) as RequestType,
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
          const item: any = createEvent(data, self)
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
      searchUsers: flow(function*(text: string) {
        const users: IProfilePartial[] = yield self.transport.searchUsers(text)
        return users.map(profile => self.profiles.get(profile.id, profile))
      }),
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
          afterId: mostRecentNotification && (mostRecentNotification.id as any),
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
          yield fs.downloadHttpFile(sourceUrl, fileName, {})
        }
        const {width, height} = yield fs.getImageSize(fileName)
        return {uri: fileName, width, height}
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
    downloadThumbnail(url: string, tros: string) {
      return self.downloadFile(tros, 'thumbnail', url)
    },
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
        reaction(() => self.transport.message, message => self._addMessage(message, true)),
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

        if (self.providerName) {
          const provider = getRoot(self)[self.providerName] as ILoginProvider
          if (provider) {
            yield provider.onLogout()
          }
          self.providerName = ''
        }

        self.profile = null
        clearCache()
        self.sessionCount = 0
        self.username = null
        self.password = null
        self.phoneNumber = undefined
        self.accessToken = undefined
      }),
      afterCreate: () => {
        self.notifications.setRequest(self._loadNotifications)
        self.geofenceBots.setRequest(self._loadGeofenceBots as any)
        startReactions()
      },
      startReactions,
      disposeReactions: () => {
        reactions.forEach(disposer => disposer())
        reactions = []
      },
    }
  })

export interface IWocky extends Instance<typeof Wocky> {}
