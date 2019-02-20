import {types, flow, IAnyModelType, Instance, SnapshotIn} from 'mobx-state-tree'
import {FileRef} from './File'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable} from './PaginableList'
import {BotPaginableList} from './Bot'
import {waitFor} from '../transport/utils'
import {Location, ILocationSnapshot} from './Location'

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
      location: types.maybe(Location),
      botsSize: 0,
      hasSentInvite: false,
      hasReceivedInvite: false,
      isFriend: false,
      isBlocked: false,
      sharesLocation: false,
      roles: types.optional(types.array(types.string), []),
      ownBots: types.optional(types.late((): IAnyModelType => BotPaginableList), {}),
      subscribedBots: types.optional(types.late((): IAnyModelType => BotPaginableList), {}),
    })
  )
  .named('Profile')
  .postProcessSnapshot(snapshot => {
    const res = {...snapshot}
    delete res.status
    delete res.location
    delete res.ownBots
    delete res.subscribedBots
    return res
  })
  .actions(self => ({
    sentInvite: () => {
      self.hasSentInvite = true
      if (self.hasSentInvite && self.hasReceivedInvite) {
        self.isFriend = true
        self.hasReceivedInvite = false
        self.hasSentInvite = false
      }
    },
    receivedInvite: () => {
      self.hasReceivedInvite = true
      if (self.hasSentInvite && self.hasReceivedInvite) {
        self.isFriend = true
        self.hasReceivedInvite = false
        self.hasSentInvite = false
      }
    },
    setLocation(location: ILocationSnapshot) {
      self.location = Location.create(location)
    },
    setFriend: (friend: boolean) => {
      self.isFriend = friend
      if (friend) {
        self.hasReceivedInvite = false
        self.hasSentInvite = false
      }
    },
    setBlocked: (value: boolean) => {
      self.isBlocked = value
    },
    setSharesLocation: (value: boolean) => {
      self.sharesLocation = value
    },
  }))
  .extend(self => {
    return {
      actions: {
        load({avatar, ...data}: any) {
          Object.assign(self, data)
          if (avatar) {
            self.avatar = self.service.files.get(avatar.id, avatar)
          }
        },
        invite: flow(function*() {
          yield waitFor(() => self.connected)
          self.receivedInvite()
          if (self.isFriend) {
            // remove from receivedInvitations and add to friends
            self.service.profile.receivedInvitations.remove(self.id)
            self.service.profile.friends.addToTop({
              id: self.id,
              user: self.service.profiles.get(self.id),
            })
          } else {
            self.service.profile.sentInvitations.addToTop({
              id: self.id,
              recipient: self.service.profiles.get(self.id),
              sender: self.service.profiles.get(self.service.username),
            })
          }
          yield self.transport.friendInvite(self.id)
        }),
        unfriend: flow(function*() {
          yield waitFor(() => self.connected)
          self.service.profile.friends.remove(self.id)
          self.service.profile.receivedInvitations.remove(self.id)
          self.service.profile.sentInvitations.remove(self.id)
          self.setFriend(false)
          yield self.transport.friendDelete(self.id)
        }),
        shareLocation: flow(function*(expiresAt: Date) {
          yield self.transport.userLocationShare(self.id, expiresAt)
        }),
        block: flow(function*() {
          yield self.transport.block(self.id)
          self.service.profile.addBlocked(self, new Date())
        }),
        unblock: flow(function*() {
          yield self.transport.unblock(self.id)
          self.service.profile.removeBlocked(self)
        }),
        cancelShare: flow(function*() {
          yield self.transport.userLocationCancelShare(self.id)
        }),
        afterAttach: () => {
          if (self.service) {
            self.ownBots.setRequest(self.service._loadOwnBots.bind(self.service, self.id))
            self.subscribedBots.setRequest(
              self.service._loadSubscribedBots.bind(self.service, self.id)
            )
            if (!self.loaded) {
              self.service.loadProfile(self.id)
            }
          }
        },
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
  status: string
  hidden: {
    enabled: boolean
    expires: Date
  } | null
  avatar: {
    id: string
    url: string
  } | null
}
