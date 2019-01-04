import {types, flow, IAnyModelType, Instance, SnapshotIn} from 'mobx-state-tree'
import {FileRef} from './File'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable} from './PaginableList'
import {BotPaginableList} from './Bot'

export const Profile = types
  .compose(
    Base,
    Loadable,
    types.model({
      id: types.identifier,
      avatar: FileRef,
      handle: types.maybeNull(types.string),
      status: types.optional(types.enumeration(['ONLINE', 'OFFLINE']), 'OFFLINE'),
      firstName: types.maybeNull(types.string),
      lastName: types.maybeNull(types.string),
      isBlocked: false,
      isFollowed: false,
      isFollower: false,
      isNew: false,
      followersSize: 0,
      followedSize: 0,
      botsSize: 0,
      roles: types.optional(types.array(types.string), []),
      ownBots: types.optional(types.late((): IAnyModelType => BotPaginableList), {}),
      subscribedBots: types.optional(types.late((): IAnyModelType => BotPaginableList), {}),
      followed: types.optional(types.late((): IAnyModelType => ProfilePaginableList), {}),
      followers: types.optional(types.late((): IAnyModelType => ProfilePaginableList), {}),
    })
  )
  .named('Profile')
  .postProcessSnapshot(snapshot => {
    const res = {...snapshot}
    delete res.status
    delete res.ownBots
    delete res.subscribedBots
    delete res.followed
    delete res.followers
    return res
  })
  .extend(self => {
    return {
      actions: {
        load({avatar, ...data}: any) {
          Object.assign(self, data)
          if (avatar) {
            self.avatar = self.service.files.get(avatar.id, avatar)
          }
        },
        afterAttach: () => {
          if (self.service) {
            self.followers.setRequest(
              self.service._loadRelations.bind(self.service, self.id, 'follower')
            )
            self.followed.setRequest(
              self.service._loadRelations.bind(self.service, self.id, 'following')
            )
            self.ownBots.setRequest(self.service._loadOwnBots.bind(self.service, self.id))
            self.subscribedBots.setRequest(
              self.service._loadSubscribedBots.bind(self.service, self.id)
            )
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
        setStatus: (status: 'ONLINE' | 'OFFLINE') => {
          self.status = status
        },
      },
      views: {
        get isOwn(): boolean {
          const ownProfile = self.service && self.service.profile
          return ownProfile && self.id === ownProfile.id
        },
        get isVerified(): boolean {
          return self.roles.length ? self.roles.indexOf('verified') !== -1 : false
        },
        get isMutual(): boolean {
          return self.isFollowed && self.isFollower
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
        },
      },
    }
  })

export const ProfilePaginableList = createPaginable<IProfile>(
  types.reference(types.late(() => Profile)),
  'ProfileList'
)

export interface IProfile extends Instance<typeof Profile> {}
export interface IProfileIn extends SnapshotIn<typeof Profile> {}

// export const ProfileRef = types.reference(Profile, {
//   get(id: string, parent: any) {
//     return (
//       parent &&
//       parent.service &&
//       parent.service.profiles &&
//       isAlive(parent.service.profiles.get(id)) &&
//       parent.service.profiles.get(id)
//     )
//   },
//   set(value: any) {
//     return value.id
//   },
// })

export interface IProfilePartial {
  id: string
  handle: string
  firstName: string
  lastName: string
  botsSize: number
  followersSize: number
  followedSize: number
  hidden: {
    enabled: boolean
    expires: Date
  } | null
  avatar: {
    id: string
    url: string
  } | null
}
