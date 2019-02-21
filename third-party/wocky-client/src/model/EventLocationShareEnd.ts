import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {Base} from './Base'
import {EventRequestTypes} from './EventList'
import {IProfilePartial, Profile} from './Profile'

export const EventLocationShareEndType = 'LOCATION_SHARE_END_NOTIFICATION'
export const EventLocationShareEnd = types
  .compose(
    Base,
    Event,
    types.model({
      sharedEndWith: types.reference(Profile),
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventLocationShareEndType)
    },
  }))
  .actions(self => ({
    process: () => {
      self.service.profile.removeLocationSharer(self.sharedEndWith)
    },
  }))
  .named('EventLocationShareEnd')

export interface IEventLocationShareEnd extends Instance<typeof EventLocationShareEnd> {}

export interface IEventLocationShareEndData extends IEventData {
  sharedEndWith: IProfilePartial
}
