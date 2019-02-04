import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile} from './Profile'
import {Base} from './Base'
import {EventRequestTypes} from './EventList'

export const EventFriendInviteType = 'USER_INVITATION_NOTIFICATION'
export const EventFriendInvite = types
  .compose(
    Base,
    Event,
    types.model({
      user: types.reference(Profile),
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventFriendInviteType)
    },
  }))
  .actions(self => ({
    process: () => {
      self.service.profile.receiveInvitation(self.user)
    },
  }))
  .named('EventFriendInvite')

export interface IEventFriendInvite extends Instance<typeof EventFriendInvite> {}

export interface IEventFriendInviteData extends IEventData {
  user: IProfilePartial
}
