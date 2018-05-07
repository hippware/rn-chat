// tslint:disable-next-line:no_unused-variable
import {types, flow, isAlive, IModelType, IType, ISnapshottable} from 'mobx-state-tree'
import {FileRef} from './File'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable, IPaginable} from './PaginableList'
import {IBotPaginableList} from './Bot'
import {IObservableArray} from 'mobx'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IObs = IObservableArray<any>
export type __ISnap = ISnapshottable<any>
export type __IPaginable = IPaginable

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
    let followers: IProfilePaginableListType, followed: IProfilePaginableListType, ownBots: IBotPaginableList, subscribedBots: IBotPaginableList
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
        },
        postProcessSnapshot: (snapshot: any) => {
          const res: any = {...snapshot}
          delete res.status
          return res
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
        get followers(): IProfilePaginableListType {
          return followers
        },
        get followed(): IProfilePaginableListType {
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
            return ' (Not completed) '
          }
        }
      }
    }
  })

export const ProfilePaginableList = createPaginable(types.reference(Profile))
export type IProfilePaginableListType = typeof ProfilePaginableList.Type
export interface IProfilePaginableList extends IProfilePaginableListType {}
export type IProfileType = typeof Profile.Type
export interface IProfile extends IProfileType {}

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

export interface IProfilePartial {
  id: string
  handle: string
  firstName: string
  lastName: string
  botsSize: number
  followersSize: number
  followedSize: number
  avatar: {
    id: string
    url: string
  } | null
}
