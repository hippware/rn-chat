import {
  types,
  flow,
  getSnapshot,
  getRoot,
  isAlive,
  IAnyModelType,
  Instance,
  SnapshotIn,
} from 'mobx-state-tree'
import {Profile, ProfilePaginableList, IProfilePartial} from './Profile'
import {FileRef} from './File'
import {Location, ILocation} from './Location'
import {BotPostPaginableList, BotPost, IBotPost} from './BotPost'
import {Address} from './Address'
import * as utils from '../transport/utils'
import {createUploadable} from './Uploadable'
import {createUpdatable} from './Updatable'
import {createPaginable} from './PaginableList'
import {Base} from './Base'
import {IPaginableList} from '../transport/types'

const Invitation = types.model('BotInvitation', {
  id: types.string,
  accepted: types.boolean,
})
const LazyProfileList = types.late('LazyProfileRef', (): IAnyModelType => ProfilePaginableList)
export const Bot = types
  .compose(
    Base,
    createUploadable('image', (self: any) => `redirect:${self.service.host}/bot/${self.id}`),
    createUpdatable((self, data) =>
      self.service._updateBot({...getSnapshot(self), isNew: self.isNew, ...data}, self.userLocation)
    ),
    types.model({
      id: types.identifier,
      isSubscribed: false,
      visitor: false,
      icon: '',
      title: types.maybeNull(types.string),
      server: types.maybeNull(types.string),
      radius: 100,
      owner: types.maybeNull(types.reference(types.late((): IAnyModelType => Profile))),
      image: FileRef,
      description: '',
      location: types.maybeNull(Location),
      address: '',
      followersSize: 0,
      visitorsSize: 0,
      totalItems: 0,
      addressData: types.optional(Address, {}),
      subscribers: types.optional(LazyProfileList, {}),
      visitors: types.optional(LazyProfileList, {}),
      posts: types.optional(BotPostPaginableList, {}),
      error: '',
      invitation: types.maybeNull(Invitation),
      // _accessedAt is a field that we compute. It does not exist at the server.
      _accessedAt: types.optional(types.Date, () => new Date(0)),
    })
  )
  .volatile(() => ({
    isNew: false,
    loading: false,
    userLocation: types.maybeNull(Location),
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
      self.posts.addToTop(botPost) // because the server shows latest at the top
      self.totalItems += 1
      return botPost
    },
    removePost: flow(function*(postId: string) {
      if (self.posts.list.find((el: any) => el.id === postId)) {
        yield self.service._removeBotPost(self.id, postId)
        self.posts.remove(postId)
        self.totalItems -= 1
      }
    }) as (postId: string) => Promise<void>,
    acceptInvitation: flow(function*(userLocation: ILocation) {
      if (self.invitation) {
        yield self.service._acceptBotInvitation(self.invitation.id, userLocation)
        self.invitation.accepted = true
        self.isSubscribed = true
        self.service.profile!.subscribedBots.addToTop(self)
        self.service.geofenceBots.addToTop(self)
        self.service.localBots.add(self.id)
      }
    }),
    unsubscribe: flow(function*() {
      self.isSubscribed = false
      self.service.localBots.remove(self.id)
      self.service.notifications!.result.forEach((event: any) => {
        if (event.bot && event.bot.id === self.id && !event.isRequest) {
          event.remove(event.id)
        }
      })
      self.service.profile!.subscribedBots.remove(self.id)
      self.service.geofenceBots.remove(self.id)
      yield self.service._unsubscribeBot(self.id)
    }),
    invite: (userIDs: string[]): Promise<any> => {
      return self.service._inviteBot(self.id, userIDs)
    },
    setNew: (value: boolean) => {
      self.isNew = value
    },
    load: (d: any = {}) => {
      const data = {...d}
      // console.log('bot load', d)
      if (data.owner) {
        self.owner =
          typeof data.owner === 'object'
            ? self.service.profiles.get(data.owner.id, data.owner)
            : self.service.profiles.get(data.owner)
        delete data.owner
      }
      if (data.image) {
        self.image = self.service.files.get(data.image.id, data.image)
        delete data.image
      }
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

      // load visitors/guests/subscribers
      if (data.visitors) {
        ;(self.visitors as IPaginableList<any>).loadWithData({
          list: data.visitors,
          count: data.visitors.length,
          force: true,
          addMiddleware: p => self.service.profiles.get(p.id, p),
        })
      }
      delete data.visitors
      if (data.posts) {
        ;(self.posts as IPaginableList<IBotPost>).loadWithData({
          list: data.posts,
          count: data.posts.length,
          force: true,
          addMiddleware: p => BotPost.create({id: p.id}).load({service: self.service, ...p}),
        })
      }
      delete data.posts

      // Only assign if _accessedAt is newer
      if (self._accessedAt < data._accessedAt) {
        Object.assign(self, data)
      }
    },
  }))
  .postProcessSnapshot((snapshot: any) => {
    const res: any = {...snapshot}
    delete res.posts
    delete res.error
    delete res.subscribers
    return res
  })
  .actions(self => {
    return {
      save: flow(function*() {
        const {geocodingStore} = getRoot(self)
        if (geocodingStore) {
          const data = yield geocodingStore.reverse(self.location)
          self.load({addressData: data.meta, address: data.address})
        }
        yield self.update({})
      }),
      afterAttach: () => {
        self.subscribers.setRequest(self.service._loadBotSubscribers.bind(self.service, self.id))
        self.visitors.setRequest(self.service._loadBotVisitors.bind(self.service, self.id))
        self.posts.setRequest(self.service._loadBotPosts.bind(self.service, self.id) as any)
      },
    }
  })
  .views(self => ({
    get coverColor(): number {
      return utils.hashCode(self.id)
    },
  }))

export interface IBot extends Instance<typeof Bot> {}
export interface IBotIn extends SnapshotIn<typeof Bot> {}

export interface IBotData {
  id: string
  isSubscribed: boolean
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
  visitorsSize: number
  totalItems: number
  addressData?: any
  subscribers?: any
  visitors?: any
  posts?: any
  error?: string
  invitation?: {
    id: string
    accepted: boolean
  }
}

export const BotPaginableList = createPaginable<IBot>(types.reference(Bot), 'BotList')

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
