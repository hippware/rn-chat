import {types, getSnapshot, flow, Instance} from 'mobx-state-tree'
import {Profile, IProfile} from './Profile'
import {createUpdatable} from './Updatable'
import {createUploadable} from './Uploadable'
import {InvitationPaginableList, Invitation} from './Invitation'
import {ContactPaginableList, Contact} from './Contact'
import {waitFor} from '../transport/utils'

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
    })
  )
  .views(self => ({
    get sortedFriends(): IProfile[] {
      return self.friends.list
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
      profile.receiveInvite()
    },
    // Does this get used anywhere?
    friendDelete: flow(function*(username: string) {
      yield waitFor(() => self.connected)
      yield self.transport.friendDelete(username)
    }),
    hide: flow(function*(value: boolean, expires: Date | undefined) {
      yield self.service._hideUser(value, expires)
      self.hidden = Hidden.create({enabled: value, expires})
    }),
  }))
  .actions(self => ({
    load({avatar, receivedInvitations = [], sentInvitations = [], friends = [], ...data}: any) {
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
    },
  }))
  .named('OwnProfile')

export interface IOwnProfile extends Instance<typeof OwnProfile> {}
