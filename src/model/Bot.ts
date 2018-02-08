// tslint:disable-next-line:no_unused-variable
import {types, flow, onSnapshot, getEnv, IType, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile, ProfilePaginableList, IProfilePaginableList} from './Profile'
import {File} from './File'
import {Location} from './Location'
import {BotPostPaginableList, BotPost} from './BotPost'
import {Address} from './Address'
import utils from '../store/utils'
import {createUploadable} from './Uploadable'
import {createUpdatable} from './Updatable'
import {createPaginable} from './PaginableList'
import {Base} from './Base'

export const VISIBILITY_OWNER = 0
export const VISIBILITY_PUBLIC = 100

export const Bot = types
  .compose(
    Base,
    types.compose(
      createUploadable('image', (self: any) => `redirect:${self.server}/bot/${self.id}`),
      createUpdatable(self => self.service._updateBot(self))
    ),
    types.model('Bot', {
      id: types.identifier(types.string),
      isSubscribed: false,
      title: types.maybe(types.string),
      server: types.maybe(types.string),
      posts: types.optional(BotPostPaginableList, {}),
      radius: 30,
      owner: types.reference(Profile),
      image: types.maybe(types.reference(File)),
      description: types.maybe(types.string),
      visibility: VISIBILITY_PUBLIC,
      location: types.maybe(Location),
      address: '',
      followersSize: 0,
      totalItems: 0,
      addressData: types.maybe(Address)
    })
  )
  .volatile(self => ({
    isNew: false
  }))
  .named('Bot')
  .extend(self => {
    let subscribers: IProfilePaginableList

    return {
      actions: {
        setPublic: (value: boolean) => {
          self.visibility = value ? VISIBILITY_PUBLIC : VISIBILITY_OWNER
        },
        afterAttach: () => {
          subscribers = ProfilePaginableList.create({})
          subscribers.setRequest(self.service._loadBotSubscribers.bind(self.service, self.id))
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
          if (self.posts.list.find(el => el.id === postId)) {
            yield self.service._removeBostPost(self.id, postId)
            self.posts.remove(postId)
          }
        }),
        subscribe: flow(function*() {
          self.isSubscribed = true
          self.followersSize = yield self.service._subscribeBot(self.id)
        }),
        unsubscribe: flow(function*() {
          self.isSubscribed = false
          self.followersSize = yield self.service._unsubscribeBot(self.id)
        }),
        share: (userIDs: string[], message: string = '', type = 'headline') => {
          self.service._shareBot(self.id, self.server || self.service.host, userIDs, message, type)
        }
      },
      views: {
        get subscribers(): IProfilePaginableList {
          return subscribers
        }
      }
    }
  })
  .actions(self => ({
    shareToFriends: (message: string = '', type = 'headline') => {
      self.share(['friends'], message, type)
    },
    shareToFollowers: (message: string = '', type = 'headline') => {
      self.share(['followers'], message, type)
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
  .views(self => ({
    get isPublic(): boolean {
      return self.visibility === VISIBILITY_PUBLIC
    },
    get coverColor(): number {
      return utils.hashCode(self.id)
    }
  }))
export const BotRef = types.maybe(
  types.reference(Profile, {
    get(id: string, parent: any) {
      return parent.service.bots.get(id) || parent.service.getBot({id})
    },
    set(value: IBot) {
      return value.id
    }
  })
)

export type IBot = typeof Bot.Type
export const BotPaginableList = createPaginable(types.reference(Bot))
export type IBotPaginableList = typeof BotPaginableList.Type
