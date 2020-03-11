import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {Base} from './Base'
import {EventRequestTypes} from './EventList'
import {IProfilePartial, Profile} from './Profile'

export const EventUserBeFriendType = 'USER_BEFRIEND_NOTIFICATION'
export const EventUserBeFriend = types
  .compose(
    Base,
    Event,
    types.model({
      userBeFriend: types.reference(Profile),
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventUserBeFriendType)
    },
  }))
  .actions(self => ({
    process: () => {
      //      self.service.profile.addFriend(self.userBeFriend)
    },
  }))
  .named('EventUserBefriend')

export interface IEventUserBefriend extends Instance<typeof EventUserBeFriend> {}

export interface IEventUserBeFriendData extends IEventData {
  userBeFriend: IProfilePartial
}
