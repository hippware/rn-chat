import {types, flow, IAnyModelType, Instance, SnapshotIn, getRoot} from 'mobx-state-tree'
import {FileRef} from './File'
import {Base} from './Base'
import {Loadable} from './Loadable'
import {createPaginable} from './PaginableList'
import {BotPaginableList} from './Bot'
import {waitFor} from '../transport/utils'
import {Location, ILocationSnapshot} from './Location'
import {UserActivityType} from '../transport/types'
import moment from 'moment'
import {Address} from './Address'
import {when} from 'mobx'
import _ from 'lodash'

export const Profile = types
  .compose(
    Base,
    Loadable,
    types.model({
      id: types.identifier,
      avatar: FileRef,
      handle: types.maybeNull(types.string),
      status: types.optional(types.enumeration(['ONLINE', 'OFFLINE']), 'OFFLINE'),
      statusUpdatedAt: types.optional(types.Date, () => new Date(0)),
      firstName: types.maybeNull(types.string),
      lastName: types.maybeNull(types.string),
      _location: types.maybe(Location),
      _activity: types.maybe(Location),
      botsSize: 0,
      hasSentInvite: false,
      hasReceivedInvite: false,
      isFriend: false,
      isBlocked: false,
      sharesLocation: false, // pseudo-calculated property for correct FlatList rendering
      receivesLocationShare: false, // pseudo-calculated property for correct FlatList rendering
      roles: types.optional(types.array(types.string), []),
      subscribedBots: types.optional(
        types.late((): IAnyModelType => BotPaginableList),
        {}
      ),
      addressData: types.optional(Address, {}),
    })
  )
  .named('Profile')
  .postProcessSnapshot(snapshot => {
    const res = {...snapshot}
    delete res.status
    delete res.statusUpdatedAt
    delete res.sharesLocation
    delete res.receivesLocationShare
    // delete res.location - need to preserve location because now it is passed only via subscriptions
    delete res.subscribedBots
    return res
  })
  .views(self => ({
    get location() {
      return self._location
    },
  }))
  .actions(self => ({
    maybeUpdateActivity() {
      if (self.location && self.location.activity && self.location.activityConfidence! >= 50) {
        // MST doesn't allow a node to be two children of the same parent so shallow clone
        self._activity = _.clone(self.location) // this way it will work for OwnProfile too
      }
    },
  }))
  .actions(self => ({
    setSharesLocation(value: boolean) {
      self.sharesLocation = value
    },
    setReceivesLocationShare(value: boolean) {
      self.receivesLocationShare = value
    },
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
      self._location = Location.create(location)
      self.maybeUpdateActivity()
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
  }))
  .extend(self => {
    const superLoad = self.load
    return {
      actions: {
        load({avatar, ...data}: any) {
          if (avatar) {
            self.avatar = self.service.files.get(avatar.id, avatar)
          }
          superLoad(data)

          if (data.status && data.statusUpdatedAt && self.statusUpdatedAt < data.statusUpdatedAt) {
            self.status = data.status
            self.statusUpdatedAt = data.statusUpdatedAt
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
          self.service.profile.addLocationShare(self, new Date(), expiresAt)
        }),
        cancelShareLocation: flow(function*() {
          yield self.transport.userLocationCancelShare(self.id)
          self.service.profile.removeLocationShare(self)
        }),
        block: flow(function*() {
          yield self.transport.block(self.id)
          self.service.profile.addBlocked(self, new Date())
        }),
        unblock: flow(function*() {
          yield self.transport.unblock(self.id)
          self.service.profile.removeBlocked(self)
        }),
        afterAttach: () => {
          if (self.service) {
            self.subscribedBots.setRequest(
              self.service._loadSubscribedBots.bind(self.service, self.id)
            )
          }
        },
        setStatus: (status: 'ONLINE' | 'OFFLINE', updatedAt?: Date) => {
          if (updatedAt === undefined) {
            self.status = status
            self.statusUpdatedAt = new Date(0)
          } else {
            if (self.statusUpdatedAt < updatedAt) {
              self.status = status
              self.statusUpdatedAt = updatedAt
            }
          }
        },
        asyncFetchRoughLocation: (): void => {
          const {geocodingStore} = getRoot(self)
          if (geocodingStore) {
            when(
              () => !!self.location,
              () => {
                geocodingStore
                  .reverse(self.location)
                  .then(data => {
                    if (data && data.meta) {
                      self.load({addressData: data.meta})
                    }
                  })
                  .catch(e => {
                    /* prevent app crash */
                  })
              }
            )
          }
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
        get unreadCount(): number {
          const chat = (getRoot(self) as any).wocky.chats.get(self.id)
          return chat ? chat.unreadCount : 0
        },
        get unreadTime(): number {
          const chat = (getRoot(self) as any).wocky.chats.get(self.id)
          return chat ? chat.time : 0
        },
        get distance(): number {
          const {locationStore} = getRoot(self)
          const ownProfile = self.service && self.service.profile
          if (!self._location || !locationStore || !ownProfile || !ownProfile.location) {
            return Number.MAX_SAFE_INTEGER
          }
          const loc1 = self._location
          const loc2 = ownProfile.location
          return locationStore.distance(
            loc1.latitude,
            loc1.longitude,
            loc2.latitude,
            loc2.longitude
          )
        },
        get isLocationShared() {
          return !!self._location && self.sharesLocation
        },
        get activity(): UserActivityType | null {
          const data = self._activity
          if (!data) return null

          const now: Date = (getRoot(self) as any).wocky.timer.minute
          const activity = data && data.activity ? data.activity : null
          const minsSinceLastUpdate = moment(now).diff(data!.createdAt, 'minutes')
          if (activity === 'still') {
            // delay 5 minutes before showing a user as 'still'
            return minsSinceLastUpdate > 5 ? 'still' : null
          }

          // return null activity if no updates in last 5 mins
          return minsSinceLastUpdate > 5 ? null : activity
        },
        get whenLastLocationSent(): string {
          // console.log('& when', self.location)

          if (self.location) {
            (getRoot(self) as any).wocky.debugLog(`WOCKY PROFILE whenLastLocationSent user=${self.id} loc_id=${self.location.id} createdAt=${self.location.createdAt} location=`, self.location)
          }

          return self.location ? moment(self.location!.createdAt).fromNow() : 'a while ago'
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
  statusUpdatedAt: Date
  hidden: {
    enabled: boolean
    expires: Date
  } | null
  avatar: {
    id: string
    url: string
  } | null
}
