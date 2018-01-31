// tslint:disable-next-line:no_unused-variable
import {types, flow, getEnv, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile, ProfilePaginableList, IProfilePaginableList} from './Profile'
import {File} from './File'
import {Location} from './Location'
import {BotPostPaginableList, IBotPostPaginableList} from './BotPost'
import {Base} from './Base'
import moment = require('moment')
import {Address} from './Address'
import utils from '../store/utils'
import {IWocky} from '../index'

export const VISIBILITY_OWNER = 0
export const VISIBILITY_PUBLIC = 100

export const Bot = types
  .compose(
    Base,
    types.model('Bot', {
      id: types.identifier(types.string),
      isSubscribed: false,
      title: types.maybe(types.string),
      server: types.maybe(types.string),
      owner: types.reference(Profile),
      image: types.maybe(types.reference(File)),
      description: types.maybe(types.string),
      visibility: VISIBILITY_PUBLIC,
      location: Location,
      address: '',
      followersSize: 0,
      totalItems: 0,
      time: types.optional(types.number, () => Date.now()),
      addressData: types.maybe(Address)
    })
  )
  .volatile(self => ({
    isNew: true
  }))
  .extend(self => {
    let subscribers: IProfilePaginableList, posts: IBotPostPaginableList

    return {
      actions: {
        afterAttach: () => {
          subscribers = ProfilePaginableList.create({})
          subscribers.setRequest((self.service as IWocky).loadRelations.bind(self.service, self.id, 'follower'))
          posts = BotPostPaginableList.create({})
          posts.setRequest((self.service as IWocky).loadRelations.bind(self.service, self.id, 'following'))
        }
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
    get updated(): Date {
      return new Date(self.time)
    },
    get date(): string {
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
