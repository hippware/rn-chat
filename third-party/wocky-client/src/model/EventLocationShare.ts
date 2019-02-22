import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile} from './Profile'
import {Base} from './Base'
import {EventRequestTypes} from './EventList'

export const EventLocationShareType = 'LOCATION_SHARE_NOTIFICATION'
export const EventLocationShare = types
  .compose(
    Base,
    Event,
    types.model({
      sharedWith: types.reference(Profile),
      expiresAt: types.Date,
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventLocationShareType)
    },
  }))
  .actions(self => ({
    process: () => {
      self.service.profile.addLocationSharer(self.sharedWith, self.date, self.expiresAt)
    },
  }))
  .named('EventLocationShare')

export interface IEventLocationShare extends Instance<typeof EventLocationShare> {}

export interface IEventLocationShareData extends IEventData {
  sharedWith: IProfilePartial
  expiresAt: Date
}
