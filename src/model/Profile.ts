// tslint:disable-next-line:no_unused-variable
import {types, flow, isAlive, IType, onSnapshot, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {FileRef} from './File'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable} from './PaginableList'
import {IBotPaginableList, IBot} from './Bot'

export const Profile = types
  .compose(
    Base,
    Loadable,
    types.model('Profile', {
      id: types.identifier(types.string),
      avatar: FileRef,
      handle: types.maybe(types.string),
      status: 'unavailable',
      firstName: types.maybe(types.string),
      lastName: types.maybe(types.string),
      isBlocked: false,
      isFollowed: false,
      isFollower: false,
      isNew: false,
      followersSize: 0,
      followedSize: 0,
      botsSize: 0,
      roles: types.optional(types.array(types.string), [])
    })
  )
  .named('Profile')
  .extend(self => {
    let followers: IProfilePaginableList, followed: IProfilePaginableList, ownBots: IBotPaginableList, subscribedBots: IBotPaginableList
    const {BotPaginableList} = require('./Bot')
    return {
      actions: {
        afterAttach: () => {
          if (self.service) {
            followers = ProfilePaginableList.create({})
            followers.setRequest(self.service._loadRelations.bind(self.service, self.id, 'follower'))
            followed = ProfilePaginableList.create({})
            followed.setRequest(self.service._loadRelations.bind(self.service, self.id, 'following'))
            ownBots = BotPaginableList.create({})
            ownBots.setRequest(self.service._loadOwnBots.bind(self.service, self.id))
            subscribedBots = BotPaginableList.create({})
            subscribedBots.setRequest(self.service._loadSubscribedBots.bind(self.service, self.id))
            if (!self.loaded) {
              self.service.loadProfile(self.id)
            }
          }
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
          yield self.service._unblock(self.id)
          self.isBlocked = false
          self.isNew = false
        }),
        setStatus: (status: string) => {
          self.status = status
        }
      },
      views: {
        get snapshot() {
          const res: any = {...self._snapshot}
          delete res.status
          return res
        },
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
        get activeBots(): Array<IBot> {
          return subscribedBots.list.filter((bot: IBot) => bot.geofence && bot.guest && bot.visitorsSize)
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
            return ' (Not completed) '
          }
        }
      }
    }
  })

export const ProfilePaginableList = createPaginable(types.reference(Profile))
export type IProfilePaginableList = typeof ProfilePaginableList.Type
export type IProfile = typeof Profile.Type

export const ProfileRef = types.maybe(
  types.reference(Profile, {
    get(id: string, parent: any) {
      return parent && parent.service && parent.service.profiles && isAlive(parent.service.profiles.get(id)) && parent.service.profiles.get(id)
    },
    set(value) {
      return value.id
    }
  })
)
