import {types, flow, getSnapshot, getEnv, isAlive} from 'mobx-state-tree'
import {Profile, ProfilePaginableList, IProfilePartial, IProfile} from './Profile'
import {FileRef} from './File'
import {Location} from './Location'
import {BotPostPaginableList, BotPost} from './BotPost'
import {Address} from './Address'
import * as utils from '../transport/utils'
import {createUploadable} from './Uploadable'
import {createUpdatable} from './Updatable'
import {createPaginable, IPaginable} from './PaginableList'
import {Base} from './Base'

const Invitation = types.model('BotInvitation', {
  id: types.string,
  accepted: types.boolean,
})

export const Bot = types
  .compose(
    Base,
    types.compose(
      createUploadable('image', (self: any) => `redirect:${self.service.host}/bot/${self.id}`),
      createUpdatable((self, data) =>
        self.service._updateBot(
          {...getSnapshot(self), isNew: self.isNew, ...data},
          self.userLocation
        )
      )
    ),
    types.model('Bot', {
      id: types.identifier(types.string),
      isSubscribed: false,
      guest: false,
      visitor: false,
      icon: '',
      title: types.maybe(types.string),
      server: types.maybe(types.string),
      radius: 100,
      owner: types.maybe(types.reference(Profile)),
      image: FileRef,
      description: '',
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
      error: '',
      invitation: types.maybe(Invitation),
    })
  )
  .volatile(() => ({
    isNew: false,
    loading: false,
    userLocation: types.maybe(Location),
  }))
  .named('Bot')
  .actions(self => ({
    setUserLocation: (location: any) => {
      self.userLocation = location
    },
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
      self.guest = true
      self.service.profile!.subscribedBots.addToTop(self)
      self.service.geofenceBots.addToTop(self)
      self.followersSize = yield self.service._subscribeBot(self.id)
    }),
    acceptInvitation: flow(function*() {
      yield self.service._acceptBotInvitation(self.invitation.id)
      self.invitation.accepted = true
      self.isSubscribed = true
      self.guest = true
      self.service.profile!.subscribedBots.addToTop(self)
      self.service.geofenceBots.addToTop(self)
    }),
    unsubscribe: flow(function*() {
      self.guest = false
      self.isSubscribed = false
      self.service.profile!.subscribedBots.remove(self.id)
      self.service.geofenceBots.remove(self.id)
      self.followersSize = yield self.service._unsubscribeBot(self.id)
    }),
    share: (userIDs: string[], message: string = '', action: string = 'share') => {
      self.service._shareBot(self.id, self.server || self.service.host, userIDs, message, action)
    },
    invite: (userIDs: string[]): Promise<any> => {
      return self.service._inviteBot(self.id, userIDs)
    },
    setNew: (value: boolean) => {
      self.isNew = value
    },
    load: (d: any = {}) => {
      const data = {...d}
      if (data.addressData && typeof data.addressData === 'string') {
        try {
          data.addressData = JSON.parse(data.addressData)
        } catch (e) {
          data.addressData = Address.create({})
        }
      }

      // Something causes addressData to be null (or so could JSON.parse)
      if (data.addressData === null) {
        data.addressData = Address.create({})
      }

      // load visitors
      if (data.visitors) {
        self.visitors.refresh()
        data.visitors.forEach(p => self.visitors.add(self.service.profiles.get(p.id, p)))
        delete data.visitors
      }
      Object.assign(self, data)
    },
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
      return res
    },
  }))
  .actions(self => {
    const {geocodingStore} = getEnv(self)
    return {
      save: flow(function*() {
        if (geocodingStore) {
          const data = yield geocodingStore.reverse(self.location)
          self.load({addressData: data.meta, address: data.address})
        }
        yield self.update({})
      }),
      afterAttach: () => {
        self.subscribers.setRequest(self.service._loadBotSubscribers.bind(self.service, self.id))
        self.guests.setRequest(self.service._loadBotGuests.bind(self.service, self.id))
        self.visitors.setRequest(self.service._loadBotVisitors.bind(self.service, self.id))
        self.posts.setRequest(self.service._loadBotPosts.bind(self.service, self.id))
      },
    }
  })
  .views(self => ({
    get coverColor(): number {
      return utils.hashCode(self.id)
    },
  }))

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
// export type __IPaginable = IPaginable

export type IBotType = typeof Bot.Type
export interface IBot extends IBotType {
  visitors: IPaginable<IProfile>
  subscribers: IPaginable<IProfile>
}

export interface IBotData {
  id: string
  isSubscribed: boolean
  guest: boolean
  visitor: boolean
  icon: string
  title?: string
  server?: string
  radius: number
  owner?: IProfilePartial
  image: any
  description?: string
  public: boolean
  location: any // TODO
  address?: string
  followersSize: number
  guestsSize: number
  visitorsSize: number
  totalItems: number
  addressData?: any
  subscribers?: any
  guests?: any
  visitors?: any
  posts?: any
  error?: string
  invitation?: {
    id: string
    accepted: boolean
  }
}

export const BotPaginableList = createPaginable<IBot>(types.reference(Bot))
export type IBotPaginableList = typeof BotPaginableList.Type
export const BotRef = types.reference(Bot, {
  get(id: string, parent: any) {
    return (
      parent.service &&
      parent.service.bots &&
      isAlive(parent.service.bots.get(id)) &&
      parent.service.bots.get(id)
    )
  },
  set(value: IBot) {
    return value.id
  },
})
