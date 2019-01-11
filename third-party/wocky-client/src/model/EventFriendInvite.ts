import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile} from './Profile'

export const EventFriendInvite = types
  .compose(
    Event,
    types.model({
      user: types.reference(Profile),
    })
  )
  .named('EventFriendInvite')

export interface IEventFriendInvite extends Instance<typeof EventFriendInvite> {}

export interface IEventFriendInviteData extends IEventData {
  user: IProfilePartial
}
