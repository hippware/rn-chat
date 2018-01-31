// tslint:disable-next-line:no_unused-variable
import {types, flow, onSnapshot, getEnv, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile, ProfilePaginableList, IProfilePaginableList} from './Profile'
import {File} from './File'
import {Location} from './Location'
import {BotPostPaginableList, IBotPostPaginableList} from './BotPost'
import moment = require('moment')
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
      radius: 30,
      owner: types.reference(Profile),
      image: types.maybe(types.reference(File)),
      description: types.maybe(types.string),
      visibility: VISIBILITY_PUBLIC,
      location: types.maybe(Location),
      address: '',
      followersSize: 0,
      totalItems: 0,
      time: types.optional(types.number, () => Date.now()),
      addressData: types.maybe(Address)
    })
  )
  .named('Bot')
  .extend(self => {
    let subscribers: IProfilePaginableList, posts: IBotPostPaginableList

    return {
      actions: {
        afterAttach: () => {
          subscribers = ProfilePaginableList.create({})
          subscribers.setRequest(self.service._loadRelations.bind(self.service, self.id, 'follower'))
          posts = BotPostPaginableList.create({})
          posts.setRequest(self.service._loadRelations.bind(self.service, self.id, 'following'))
        },
        subscribe: flow(function*() {
          self.isSubscribed = true
          self.followersSize = yield self.service._subscribeBot(self.id)
        }),
        unsubscribe: flow(function*() {
          self.isSubscribed = false
          self.followersSize = yield self.service._unsubscribeBot(self.id)
        })
      },
      views: {
        get subscribers(): IProfilePaginableList {
          return subscribers
        },
        get posts(): IBotPostPaginableList {
          return posts
        }
      }
    }
  })
  .views(self => ({
    get isNew(): boolean {
      return self.server === null
    },
    get date(): Date {
      return new Date(self.time)
    },
    get dateAsString(): string {
      return moment(self.time).calendar()
    },
    get isPublic(): boolean {
      return self.visibility === VISIBILITY_PUBLIC
    },
    get coverColor(): number {
      return utils.hashCode(self.id)
    }
  }))

export type IBot = typeof Bot.Type
export const BotPaginableList = createPaginable(types.reference(Bot))
export type IBotPaginableList = typeof BotPaginableList.Type
