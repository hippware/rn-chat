import {types, IAnyModelType, flow, Instance} from 'mobx-state-tree'
import {FileRef} from './File'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable} from './PaginableList'
import {BotPaginableList} from './Bot'
import {waitFor} from '../transport/utils'

export const Profile = types
  .compose(
    Base,
    Loadable,
    types.model({
      id: types.identifier,
      avatar: FileRef,
      handle: types.maybeNull(types.string),
      status: 'unavailable',
      firstName: types.maybeNull(types.string),
      lastName: types.maybeNull(types.string),
      botsSize: 0,
      roles: types.optional(types.array(types.string), []),
      ownBots: types.optional(types.late((): IAnyModelType => BotPaginableList), {}),
      subscribedBots: types.optional(types.late((): IAnyModelType => BotPaginableList), {}),
    })
  )
  .named('Profile')
  .postProcessSnapshot(snapshot => {
    const res = {...snapshot}
    delete res.status
    delete res.ownBots
    delete res.subscribedBots
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
        invite: flow(function*() {
          yield waitFor(() => self.connected)
          self.service.profile.sendInvitations.addToTop({
            id: self.id,
            recipient: self.service.profiles.get(self.id),
            sender: self.service.profiles.get(self.service.username),
          })
          yield self.transport.friendInvite(self.id)
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
        setStatus: (status: string) => {
          self.status = status
        },
      },
      views: {
        get isOwn(): boolean {
          const ownProfile = self.service && self.service.profile
          return ownProfile && self.id === ownProfile.id
        },
        get hasSentInvite(): boolean {
          // check list of received invitation for given user
          return self.service.profile.receivedInvitations.exists(self.id)
        },
        get hasReceivedInvite(): boolean {
          // check list of own sent invitations for given user
          return self.service.profile.sendInvitations.exists(self.id)
        },
        get isFriend(): boolean {
          return self.service.profile.friends.exists(self.id)
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
