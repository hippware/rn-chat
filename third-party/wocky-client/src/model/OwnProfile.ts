import {types, getSnapshot, flow, Instance} from 'mobx-state-tree'
import {Profile, IProfile} from './Profile'
import {createUpdatable} from './Updatable'
import {createUploadable} from './Uploadable'
import {InvitationPaginableList, Invitation} from './Invitation'
import {ContactPaginableList, Contact} from './Contact'
import {BlockedUserPaginableList, BlockedUser} from './BlockedUser'
import {LocationSharePaginableList, LocationShare} from './LocationShare'

const Hidden = types
  .model('HiddenType', {
    enabled: false,
    expires: types.maybeNull(types.Date),
  })
  .actions(self => ({
    setEnabled: (value: boolean) => {
      self.enabled = value
    },
  }))
  .actions(self => {
    let timerId
    return {
      afterAttach: () => {
        // change a value when it is expired!
        if (self.enabled && self.expires) {
          timerId = setTimeout(() => self.setEnabled(false), self.expires.getTime() - Date.now())
        }
      },
      beforeDestroy: () => {
        if (timerId !== undefined) {
          clearTimeout(timerId)
        }
      },
    }
  })
export const OwnProfile = types
  .compose(
    types.compose(
      Profile,
      createUploadable('avatar', 'all'),
      createUpdatable((self, data) => self.service._updateProfile({...getSnapshot(self), ...data}))
    ),
    types.model('OwnProfile', {
      email: types.maybeNull(types.string),
      phoneNumber: types.maybeNull(types.string),
      hidden: types.optional(Hidden, {}),
      sentInvitations: types.optional(InvitationPaginableList, {}),
      receivedInvitations: types.optional(InvitationPaginableList, {}),
      friends: types.optional(ContactPaginableList, {}),
      blocked: types.optional(BlockedUserPaginableList, {}),
      locationShares: types.optional(LocationSharePaginableList, {}),
      locationSharers: types.optional(LocationSharePaginableList, {}),
    })
  )
  .postProcessSnapshot(snapshot => {
    const res = {...snapshot}
    delete res.locationShares
    return res
  })
  .views(self => ({
    get isLocationShared() {
      return self.locationShares.length > 0
    },
    get sortedFriends(): IProfile[] {
      return self.friends.list
        .map(contact => contact.user)
        .filter(x => x.handle)
        .slice()
        .sort((a, b) => {
          return a.handle!.toLocaleLowerCase().localeCompare(b.handle!.toLocaleLowerCase())
        })
    },
    get sortedBlocked(): IProfile[] {
      return self.blocked.list
        .map(contact => contact.user)
        .filter(x => x.handle)
        .slice()
        .sort((a, b) => {
          return a.handle!.toLocaleLowerCase().localeCompare(b.handle!.toLocaleLowerCase())
        })
    },
  }))
  .actions(self => ({
    addFriend: (profile: IProfile, createdAt: Date, name: string = '') => {
      self.friends.add(
        Contact.create({
          id: profile.id,
          createdAt,
          name,
          user: profile.id,
        })
      )
      self.receivedInvitations.remove(profile.id)
      self.sentInvitations.remove(profile.id)
      profile.setFriend(true)
    },
    addBlocked: (profile: IProfile, createdAt: Date) => {
      self.blocked.add(
        BlockedUser.create({
          id: profile.id,
          createdAt,
          user: profile.id,
        })
      )
      profile.setBlocked(true)
    },
    addLocationShare: (sharedWith: IProfile, createdAt: Date, expiresAt: Date) => {
      self.locationShares.add(
        LocationShare.create({
          id: sharedWith.id,
          createdAt,
          expiresAt,
          sharedWith: sharedWith.id,
        })
      )
    },
    removeLocationSharer: (profile: IProfile) => {
      self.locationSharers.remove(profile.id)
      profile.setSharesLocation(false)
    },
    addLocationSharer: (sharedWith: IProfile, createdAt: Date, expiresAt: Date) => {
      self.locationSharers.add(
        LocationShare.create({
          id: sharedWith.id,
          createdAt,
          expiresAt,
          sharedWith: sharedWith.id,
        })
      )
      sharedWith.setSharesLocation(true)
    },
    removeLocationShare: (profile: IProfile) => {
      self.locationShares.remove(profile.id)
    },
    removeBlocked: (profile: IProfile) => {
      self.blocked.remove(profile.id)
      profile.setBlocked(false)
    },
    receiveInvitation: (profile: IProfile, createdAt = new Date()) => {
      self.receivedInvitations.add(
        Invitation.create({
          id: profile.id,
          createdAt,
          sender: profile.id,
          recipient: self.id,
        })
      )
      profile.sentInvite()
    },
    sendInvitation: (profile: IProfile, createdAt = new Date()) => {
      self.sentInvitations.add(
        Invitation.create({
          id: profile.id,
          createdAt,
          recipient: profile.id,
          sender: self.id,
        })
      )
      profile.receivedInvite()
    },
    hide: flow(function*(value: boolean, expires: Date | undefined) {
      yield self.transport.hideUser(value, expires)
      self.hidden = Hidden.create({enabled: value, expires})
    }),
    cancelAllLocationShares: flow(function*() {
      yield self.transport.userLocationCancelAllShares()
      self.locationShares.refresh()
      self.sharesLocation = false
    }),
  }))
  .actions(self => ({
    load({
      avatar,
      blocked = [],
      receivedInvitations = [],
      sentInvitations = [],
      friends = [],
      locationShares = [],
      locationSharers = [],
      ...data
    }: any) {
      Object.assign(self, data)
      if (avatar) {
        self.avatar = self.service.files.get(avatar.id, avatar)
      }
      receivedInvitations.forEach(({createdAt, user}) =>
        self.receiveInvitation(self.service.profiles.get(user.id, user), createdAt)
      )
      sentInvitations.forEach(({createdAt, user}) =>
        self.sendInvitation(self.service.profiles.get(user.id, user), createdAt)
      )
      friends.forEach(({createdAt, user, name}) =>
        self.addFriend(self.service.profiles.get(user.id, user), createdAt, name)
      )
      blocked.forEach(({createdAt, user}) =>
        self.addBlocked(self.service.profiles.get(user.id, user), createdAt)
      )
      locationShares.forEach(({createdAt, expiresAt, sharedWith}) =>
        self.addLocationShare(
          self.service.profiles.get(sharedWith.id, sharedWith),
          createdAt,
          expiresAt
        )
      )
      locationSharers.forEach(({createdAt, expiresAt, sharedWith}) =>
        self.addLocationSharer(
          self.service.profiles.get(sharedWith.id, sharedWith),
          createdAt,
          expiresAt
        )
      )
    },
  }))
  .named('OwnProfile')

export interface IOwnProfile extends Instance<typeof OwnProfile> {}
