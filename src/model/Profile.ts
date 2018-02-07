// tslint:disable-next-line:no_unused-variable
import {types, flow, IType, onSnapshot, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {File} from './File'
import {Base} from './Base'
import {createPaginable} from './PaginableList'
import {IBotPaginableList} from './Bot'

export const Profile = types
  .compose(
    Base,
    types.model('Profile', {
      id: types.identifier(types.string),
      avatar: types.maybe(types.reference(File)),
      handle: '',
      firstName: '',
      lastName: '',
      isBlocked: false,
      isFollowed: false,
      isFollower: false,
      followersSize: 0,
      followedSize: 0,
      botsSize: 0,
      roles: types.optional(types.array(types.string), [])
    })
  )
  .named('Profile')
  .volatile(self => ({
    isNew: false,
    status: 'unavailable'
  }))
  .extend(self => {
    let followers: IProfilePaginableList, followed: IProfilePaginableList, ownBots: IBotPaginableList, subscribedBots: IBotPaginableList
    const {BotPaginableList} = require('./Bot')
    return {
      actions: {
        afterAttach: () => {
          followers = ProfilePaginableList.create({})
          followers.setRequest(self.service._loadRelations.bind(self.service, self.id, 'follower'))
          followed = ProfilePaginableList.create({})
          followed.setRequest(self.service._loadRelations.bind(self.service, self.id, 'following'))
          ownBots = BotPaginableList.create({})
          ownBots.setRequest(self.service._loadOwnBots.bind(self.service, self.id))
          subscribedBots = BotPaginableList.create({})
          subscribedBots.setRequest(self.service._loadSubscribedBots.bind(self.service, self.id))
        },
        follow: flow(function*() {
          yield self.service._follow(self.id)
          self.isFollowed = true
        }),
        unfollow: flow(function*() {
          yield self.service._unfollow(self.id)
          self.isFollowed = false
        }),
        block: flow(function*() {
          yield self.service._block(self.id)
          self.isFollowed = false
          self.isBlocked = true
          self.isNew = false
        }),
        unblock: flow(function*() {
          yield self.service._block(self.id)
          self.isBlocked = false
          self.isNew = false
        }),
        setStatus: (status: string) => {
          self.status = status
        }
      },
      views: {
        get isOwn(): boolean {
          const ownProfile = self.service.profile
          return ownProfile && self.id === ownProfile.id
        },
        get isVerified(): boolean {
          return self.roles.length ? self.roles.indexOf('verified') !== -1 : false
        },
        get isMutual(): boolean {
          return self.isFollowed && self.isFollower
        },
        get followers(): IProfilePaginableList {
          return followers
        },
        get followed(): IProfilePaginableList {
          return followed
        },
        get ownBots(): IBotPaginableList {
          return ownBots
        },
        get subscribedBots(): IBotPaginableList {
          return subscribedBots
        },
        get displayName(): string {
          if (self.firstName && self.lastName) {
            return `${self.firstName} ${self.lastName}`
          }
          if (self.firstName) {
            return self.firstName
          } else if (self.lastName) {
            return self.lastName
          } else if (self.handle) {
            return self.handle
          } else {
            return '(Not completed)'
          }
        }
      }
    }
  })

export const ProfileRef = types.maybe(
  types.reference(Profile, {
    get(id: string, parent: any) {
      if (!parent.service.profiles.get(id)) {
        parent.service.profiles.put(Profile.create({id}))
      }
      return parent.service.profiles.get(id)
    },
    set(value: IProfile) {
      return value.id
    }
  })
)

export const ProfilePaginableList = createPaginable(types.reference(Profile))
export type IProfilePaginableList = typeof ProfilePaginableList.Type
export type IProfile = typeof Profile.Type
