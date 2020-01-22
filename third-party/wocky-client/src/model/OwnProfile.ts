import {types, getSnapshot, flow, Instance, getRoot} from 'mobx-state-tree'
import {Profile, IProfile, ProfilePaginableList, FriendShareTypeEnum} from './Profile'
import {createUpdatable} from './Updatable'
import {createUploadable} from './Uploadable'
import {InvitationPaginableList, Invitation} from './Invitation'
import {BlockedUserPaginableList, BlockedUser} from './BlockedUser'
import {LocationSharePaginableList, LocationShare} from './LocationShare'
import ClientData from './ClientData'
import {reaction, IReactionDisposer} from 'mobx'

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
      sentInvitations: types.optional(InvitationPaginableList, {}),
      receivedInvitations: types.optional(InvitationPaginableList, {}),
      friends: types.optional(ProfilePaginableList, {}),
      blocked: types.optional(BlockedUserPaginableList, {}),
      locationShares: types.optional(LocationSharePaginableList, {}),
      locationSharers: types.optional(LocationSharePaginableList, {}),
      clientData: types.optional(ClientData, {}),
    })
  )
  .postProcessSnapshot(snapshot => {
    const res = {...snapshot}
    delete res.locationShares
    return res
  })
  .views(self => ({
    get hidden() {
      return self.clientData.hidden
    },
    get location() {
      const {locationStore} = getRoot(self)
      return locationStore ? locationStore.location : self._location
    },
    get isLocationShared() {
      return self.locationShares.length > 0
    },
    get sortedFriends(): IProfile[] {
      return self.friends.list
        .filter(x => x.handle)
        .slice()
        .sort((a, b) => {
          return a.handle!.toLocaleLowerCase().localeCompare(b.handle!.toLocaleLowerCase())
        })
    },
    get allFriends(): IProfile[] {
      function compare(a: boolean, b: boolean) {
        return b === a ? 0 : b ? 1 : -1
      }
      return self.friends.list.sort((a: IProfile, b: IProfile) => {
        return (
          compare(!!a.unreadCount, !!b.unreadCount) ||
          (!!a.unreadCount && b.unreadTime - a.unreadTime) ||
          compare(a.sharesLocation, b.sharesLocation) ||
          (a.sharesLocation && a.distance - b.distance) ||
          a.handle!.toLocaleLowerCase().localeCompare(b.handle!.toLocaleLowerCase())
        )
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
    addFriend: (profile: IProfile) => {
      self.friends.add(profile)
      self.shareType = FriendShareTypeEnum.DISABLED // TODO pass it as parameter to addFriend?
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
    removeLocationSharer: (profile: IProfile) => {
      self.locationSharers.remove(profile.id)
      profile.setSharesLocation(false)
    },
    removeLocationShare: (profile: IProfile) => {
      self.locationShares.remove(profile.id)
      profile.setReceivesLocationShare(false)
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
  }))
  .actions(self => {
    const timers: any[] = []
    let reactions: IReactionDisposer[] = []
    const {locationStore} = getRoot(self)

    return {
      hide: flow(function*(value: boolean, expires: Date | undefined) {
        if (locationStore) {
          yield locationStore.hide(value, expires)
        }
        self.clientData.hide(value, expires)
      }),
      addLocationSharer(sharedWith: IProfile, createdAt: number, expiresAt: number) {
        self.locationSharers.add(
          LocationShare.create({
            id: sharedWith.id,
            createdAt,
            expiresAt,
            sharedWith: sharedWith.id,
          })
        )
        sharedWith.setSharesLocation(true)
        timers.push(setTimeout(() => self.removeLocationSharer(sharedWith), expiresAt - Date.now()))
      },
      addLocationShare(sharedWith: IProfile, createdAt: number, expiresAt: number) {
        self.locationShares.add(
          LocationShare.create({
            id: sharedWith.id,
            createdAt,
            expiresAt,
            sharedWith: sharedWith.id,
          })
        )
        sharedWith.setReceivesLocationShare(true)
        timers.push(setTimeout(() => self.removeLocationShare(sharedWith), expiresAt - Date.now()))
      },
      afterCreate() {
        reactions = []
        if (locationStore) {
          reactions.push(
            reaction(() => locationStore.location, self.maybeUpdateActivity, {
              name: 'maybeUpdateActivity when location changes',
            })
          )
        }
      },
      beforeDestroy() {
        reactions.forEach(disposer => disposer())
        reactions = []
        timers.forEach(clearInterval)
      },
    }
  })
  .actions(self => ({
    setOnboarded: () => {
      self.clientData.flip('onboarded')
    },
    load({
      avatar,
      blocked = [],
      receivedInvitations = [],
      sentInvitations = [],
      friends = [],
      locationShares = [],
      locationSharers = [],
      clientData,
      ...data
    }: any) {
      Object.assign(self, data)
      if (clientData) {
        self.clientData.load(clientData)
      }
      if (avatar) {
        self.avatar = self.service.files.get(avatar.id, avatar)
      }
      receivedInvitations.forEach(({createdAt, user}) =>
        self.receiveInvitation(self.service.profiles.get(user.id, user), createdAt)
      )
      sentInvitations.forEach(({createdAt, user}) =>
        self.sendInvitation(self.service.profiles.get(user.id, user), createdAt)
      )
      friends.forEach(profile => self.addFriend(self.service.profiles.get(profile.id, profile)))
      blocked.forEach(({createdAt, user}) => {
        user.isBlocked = true
        self.addBlocked(self.service.profiles.get(user.id, user), createdAt)
      })
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
