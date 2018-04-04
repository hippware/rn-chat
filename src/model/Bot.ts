// tslint:disable-next-line:no_unused-variable
import {types, flow, isAlive, onSnapshot, getParent, getSnapshot, getEnv, IType, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile, ProfilePaginableList} from './Profile'
import {FileRef} from './File'
import {Location} from './Location'
import {BotPostPaginableList, BotPost} from './BotPost'
import {Address} from './Address'
import * as utils from '../transport/utils'
import {createUploadable} from './Uploadable'
import {createUpdatable} from './Updatable'
import {createPaginable, IPaginable} from './PaginableList'
import {Base} from './Base'

export const VISIBILITY_OWNER = 0
export const VISIBILITY_PUBLIC = 100

export const Bot = types
  .compose(
    Base,
    types.compose(createUploadable('image', (self: any) => `redirect:${self.service.host}/bot/${self.id}`), createUpdatable(self => self.service._updateBot(self))),
    types.model('Bot', {
      id: types.identifier(types.string),
      isSubscribed: false,
      guest: false,
      visitor: false,
      title: types.maybe(types.string),
      server: types.maybe(types.string),
      radius: 100,
      geofence: false,
      owner: types.maybe(types.reference(Profile)),
      image: FileRef,
      description: types.maybe(types.string),
      visibility: VISIBILITY_PUBLIC,
      location: types.maybe(Location),
      address: '',
      followersSize: 0,
      guestsSize: 0,
      visitorsSize: 0,
      totalItems: 0,
      addressData: types.optional(Address, {}),
      subscribers: types.optional(ProfilePaginableList, {}),
      guests: types.optional(ProfilePaginableList, {}),
      visitors: types.optional(ProfilePaginableList, {}),
      posts: types.optional(BotPostPaginableList, {}),
      error: ''
    })
  )
  .volatile(self => ({
    isNew: false,
    loading: false
  }))
  .named('Bot')
  .actions(self => ({
    setError: (value: string) => {
      self.error = value
      self.loading = false
    },
    startLoading() {
      self.loading = true
    },
    finishLoading() {
      self.loading = false
    },
    setGeofence: (value: boolean) => {
      self.geofence = value
    },
    setPublic: (value: boolean) => {
      self.visibility = value ? VISIBILITY_PUBLIC : VISIBILITY_OWNER
    },
    afterAttach: () => {
      self.subscribers.setRequest(self.service._loadBotSubscribers.bind(self.service, self.id))
      self.guests.setRequest(self.service._loadBotGuests.bind(self.service, self.id))
      self.visitors.setRequest(self.service._loadBotVisitors.bind(self.service, self.id))
      self.posts.setRequest(self.service._loadBotPosts.bind(self.service, self.id))
    },
    createPost: (content: string = '') => {
      const id = utils.generateID()
      const botPost = BotPost.create({id, content, profile: self.service.profile.id})
      self.posts.add(botPost)
      self.totalItems += 1
      return botPost
    },
    removePost: flow(function*(postId: string) {
      if (self.posts.list.find((el: any) => el.id === postId)) {
        yield self.service._removeBotPost(self.id, postId)
        self.posts.remove(postId)
        self.totalItems -= 1
      }
    }),
    subscribe: flow(function*() {
      self.isSubscribed = true
      self.service.profile!.subscribedBots.addToTop(self)
      self.followersSize = yield self.service._subscribeBot(self.id)
    }),
    subscribeGeofence: flow(function*() {
      self.isSubscribed = true
      self.guest = true
      yield self.service._subscribeGeofenceBot(self.id)
    }),
    unsubscribe: flow(function*() {
      self.guest = false
      self.isSubscribed = false
      self.service.profile!.subscribedBots.remove(self.id)
      self.followersSize = yield self.service._unsubscribeBot(self.id)
    }),
    unsubscribeGeofence: flow(function*() {
      self.guest = false
      yield self.service._unsubscribeGeofenceBot(self.id)
    }),
    share: (userIDs: string[], message: string = '', action: string = 'share') => {
      self.service._shareBot(self.id, self.server || self.service.host, userIDs, message, action)
    },
    setNew: (value: boolean) => {
      self.isNew = value
    },
    load: (d: any = {}) => {
      const data = {...d}
      if (data.addressData && typeof data.addressData === 'string') {
        data.addressData = JSON.parse(data.addressData)
      }
      Object.assign(self, data)
    }
  }))
  .actions(self => ({
    shareToFriends: (message: string = '') => {
      self.share(['friends'], message)
    },
    shareToFollowers: (message: string = '') => {
      self.share(['followers'], message)
    },
    postProcessSnapshot: (snapshot: any) => {
      const res: any = {...snapshot}
      delete res.posts
      delete res.error
      delete res.subscribers
      delete res.guests
      delete res.visitors
      return res
    }
  }))
  .views(self => ({
    get isPublic(): boolean {
      return self.visibility === VISIBILITY_PUBLIC
    },
    get coverColor(): number {
      return utils.hashCode(self.id)
    }
  }))

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IPaginable = IPaginable

export type IBotType = typeof Bot.Type
export interface IBot extends IBotType {}
export const BotPaginableList = createPaginable(types.reference(Bot))
export type IBotPaginableList = typeof BotPaginableList.Type
export const BotRef = types.reference(Bot, {
  get(id: string, parent: any) {
    return parent.service && parent.service.bots && isAlive(parent.service.bots.get(id)) && parent.service.bots.get(id)
  },
  set(value: IBot) {
    return value.id
  }
})
