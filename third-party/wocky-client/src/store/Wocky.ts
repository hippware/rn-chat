import {types, getParent, getEnv, flow, Instance} from 'mobx-state-tree'
import {reaction, IReactionDisposer, autorun} from 'mobx'
import {OwnProfile} from '../model/OwnProfile'
import {IProfile, IProfilePartial, FriendShareTypeEnum} from '../model/Profile'
import {Storages} from './Factory'
import {Base, SERVICE_NAME} from '../model/Base'
import Timer from './Timer'
import {IBot, BotPaginableList} from '../model/Bot'
import {BotPost, IBotPost} from '../model/BotPost'
import {Chats} from '../model/Chats'
import {iso8601toDate, processMap, waitFor} from '../transport/utils'
import {EventList, createEvent, EventEntity, IEventEntity} from '../model/EventList'
import _ from 'lodash'
import {RequestType} from '../model/PaginableList'
import {ILocation, ILocationSnapshot, createLocation} from '../model/Location'
import {log} from '../logger'

export const Wocky = types
  .compose(
    Base,
    Storages,
    types.model({
      id: 'wocky',
      username: types.maybeNull(types.string),
      host: types.string,
      sessionCount: 0,
      profile: types.maybeNull(OwnProfile),
      notifications: types.optional(EventList, {}),
      geofenceBots: types.optional(BotPaginableList, {}),
      // geoBots: types.optional(types.map(types.reference(Bot)), {} as ObservableMap),
      chats: types.optional(Chats, {}),
      localBots: types.optional(BotPaginableList, {}),
      timer: types.optional(Timer, {}),
      notification: types.maybe(types.reference(EventEntity)), // allow the app to observe new notifications
    })
  )
  .postProcessSnapshot(snapshot => {
    const res: any = {...snapshot}
    delete res.notification
    return res
  })
  .named(SERVICE_NAME)
  .actions(self => ({
    bugsnagNotify: (e: Error, name?: string, extra?: {[name: string]: any}): void => {
      const env = getEnv(self)
      if (env.bugsnagNotify) {
        env.bugsnagNotify(e, name, extra)
      }
    },
    loadProfile: flow(function*(id: string) {
      yield waitFor(() => self.connected)
      const isOwn = id === self.username
      const data = yield self.transport.loadProfile(id)
      if (isOwn) {
        // Somehow, self.profile can be old and have a different (old?) id.
        //   If so, recreate it
        if (!self.profile || self.profile.id !== id) {
          self.profile = OwnProfile.create({id}, getEnv(self))
        }
        if (data) {
          self.profile.load(data)
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
        // get updatesToAdd(): IEventEntity[] {
        //   return self.updates.filter((e: IEventEntity) => {
        //     return getType(e).name !== EventDelete.name
        //   })
        // },
      },
      actions: {
        login: flow(function*(token: string) {
          const res = yield self.transport.login(token, self.host)
          if (!res) {
            return false
          }

          if (self.transport.username) {
            self.username = self.transport.username
          }
          // TODO: just use the returned profile in GraphQL authenticate payload to save a roundtrip here
          yield self.loadProfile(self.username!)
          self.sessionCount++
          return true
        }) as (token: string) => Promise<boolean>,
        disconnect: flow(function*() {
          yield self.transport.disconnect()
        }),
        remove: flow(function*() {
          yield self.transport.remove()
        }),
        _updateProfile: flow(function*(d: any) {
          yield self.transport.updateProfile(d)
        }),
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
  }))
  .actions(self => ({
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
    getBot: ({id, ...data}: {id: string; owner?: string | null; isSubscribed?: boolean}): IBot => {
      return self.bots.get(id, data)
    },
    deleteBot: (id: string) => {
      self.notifications!.result.forEach((event: any) => {
        if (event.bot && event.bot.id === id) {
          event.remove(event.id)
        }
      })
      self.profile!.subscribedBots.remove(id)
      self.profiles.get(self.username!)!.subscribedBots.remove(id)
      self.geofenceBots.remove(id)
      self.localBots.remove(id)
      self.bots.delete(id)
    },
  }))
  .actions(self => ({
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
        const bot = self.getBot({id, owner: self.username, isSubscribed: true})
        bot.setNew(true)
        return bot
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
        arr.forEach(bot => {
          self.localBots.add(self.getBot(bot))
        })
      }),
      getLocationUploadToken: flow(function*() {
        return yield self.transport.getLocationUploadToken()
      }),
      setLocation: flow(function*(location: ILocationSnapshot) {
        return yield self.transport.setLocation(location)
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
      _onRosterItem({user, relationship}: {user: IProfile; relationship: string}) {
        const profile = self.profiles.get(user.id, user)
        if (relationship === 'FRIEND') {
          profile.setFriend(true)
          self.profile!.addFriend(profile)
        }
        if (relationship === 'NONE') {
          profile.setFriend(false)
          self.profile!.friends.remove(user.id)
        }
      },
      setNotification(event: IEventEntity | undefined) {
        if (event) {
          self.notification = undefined // remove previous event to avoid InvalidReferenceError error
          self.notification = event
        }
      },
      // _onNotification: flow(function*(data: any) {
      _onNotification(data: any, pastEvent: boolean = false): IEventEntity | undefined {
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

        if (data.deletedId) {
          const deletedEvent: any = self.notifications.remove(data.deletedId)
          if (deletedEvent && deletedEvent.bot) {
            self.deleteBot(deletedEvent.bot)
          }
          return
        }

        try {
          // need to deep clone here to prevent mobx error "[mobx] Dynamic observable objects cannot be frozen"
          data = _.cloneDeep(data)
          const item = createEvent(data, self)
          self.notifications.addToTop(item)
          if (!pastEvent) {
            item.process()
          }
          return item
        } catch (e) {
          log('ONNOTIFICATION ERROR: ' + e.message)
        }
        // }
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
      enablePush: flow(function*(token: string, platform: 'FCM' | 'APNS') {
        yield waitFor(() => self.connected)
        yield self.transport.enablePush(token, platform)
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
      userInviteGetSender: flow(function*(code) {
        const potentialProfile = yield self.transport.userInviteGetSender(code)
        return potentialProfile ? self.profiles.get(potentialProfile.id, potentialProfile) : null
      }),
      userInviteMakeUrl: self.transport.userInviteMakeUrl,
    }
  })
  .actions(self => ({
    _loadNewNotifications: flow(function*() {
      yield waitFor(() => self.connected)
      const mostRecentNotification = self.notifications.first
      const limit = 20
      const {list} = yield self.transport.loadNotifications({
        afterId: mostRecentNotification && (mostRecentNotification.id as any),
        limit,
        types: undefined,
      })
      if (list.length === limit) {
        // there are potentially more new notifications so purge the old ones (to ensure paging works as expected)
        self.notifications.refresh()
      }
      list.reverse().forEach(e => {
        self._onNotification(e, true)
      })

      self.notifications.cursor = self.notifications.last && self.notifications.last.id
      // console.log(
      //   '& notifications list after initial load',
      //   self.notifications.list.map(n => n.id)
      // )
    }),
    userInviteRedeemCode(code: string, shareType?: FriendShareTypeEnum): Promise<void> {
      return self.transport.userInviteRedeemCode(code, shareType)
    },
    userBulkLookup: flow(function*(phoneNumbers: string[]) {
      yield waitFor(() => self.connected)
      const data = yield self.transport.userBulkLookup(phoneNumbers)
      data.forEach(d => {
        if (d.user) {
          const profile = self.profiles.get(d.user.id, d.user)
          // if (d.relationship === 'FRIEND') {
          //   profile.setFriend(true)
          //   self.profile!.addFriend(profile, new Date())
          // }
          d.user = profile
        }
      })

      return data
    }) as (phoneNumbers: string[]) => Promise<any[]>,
    friendInvite: (phoneNumber: string, shareType: FriendShareTypeEnum): Promise<void> => {
      return self.transport.userInviteSend(phoneNumber, shareType)
    },
    triggerSilentPush(userId: string): Promise<void> {
      return self.transport.triggerSilentPush(userId)
    },
  }))
  .actions(self => {
    function clearCache() {
      self.geofenceBots.refresh()
      self.chats.clear()
      // self.geoBots.clear()
      self.localBots.refresh()
      self.notifications.refresh()
      self.bots.clear()
      self.profiles.clear()
    }
    let reactions: IReactionDisposer[] = []
    function startReactions() {
      reactions = [
        reaction(
          () => !!self.profile && self.connected,
          (connected: boolean) => {
            if (connected) {
              self.chats.loadChats()
              self.geofenceBots.load({force: true})
              self._loadNewNotifications()
            } else {
              Array.from(self.profiles.storage.values()).forEach((profile: any) =>
                profile.setStatus('OFFLINE')
              )
            }
          }
        ),
        // reaction(() => self.transport.geoBot, self._onGeoBot),
        reaction(
          () => self.transport.presence,
          ({id, status, statusUpdatedAt}) => {
            const profile = self.profiles.get(id)
            profile.setStatus(status, statusUpdatedAt)
            if (profile.isOwn && self.profile) {
              self.profile!.setStatus(status, statusUpdatedAt)
            }
          }
        ),
        reaction(
          () => self.transport.sharedLocation,
          ({id, location}) => {
            const profile = self.profiles.get(id)
            if (profile) {
              profile.setLocation(
                createLocation({...location, createdAt: iso8601toDate(location.capturedAt)})
              )
            }
          }
        ),
        reaction(
          () => self.transport.message,
          message => self.chats.addMessage({...message} as any, true)
        ),
        reaction(
          () => self.transport.notification,
          data => {
            const event = self._onNotification(data)
            self.setNotification(event)
          }
        ),
        reaction(() => self.transport.rosterItem, self._onRosterItem),
        reaction(() => self.transport.botVisitor, self._onBotVisitor),
        autorun(
          () => {
            if (self.connected && !!self.profile && !!self.profile.hidden) {
              self.transport.setPresenceStatusOnline(!self.profile.hidden.enabled)
            }
          },
          {
            delay: 1000,
          }
        ),
        autorun(() => {
          if (!self.connected && self.profile) {
            self.profile.setStatus('OFFLINE')
          }
        }),
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
      }),
      startReactions,
      disposeReactions: () => {
        reactions.forEach(disposer => disposer())
        reactions = []
      },
    }
  })
  .actions(self => ({
    afterCreate: () => {
      self.geofenceBots.setRequest(self._loadGeofenceBots as any)
      self.startReactions()
    },
    beforeDestroy: () => {
      self.disposeReactions()
      self.clearCache()
    },
  }))

export interface IWocky extends Instance<typeof Wocky> {}
