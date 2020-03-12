import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile} from './Profile'
import {Base} from './Base'
import {EventRequestTypes} from './EventList'

export const EventLocationShareNearbyStartType = 'LOCATION_SHARE_NEARBY_START_NOTIFICATION'
export const EventLocationShareNearbyStart = types
  .compose(
    Base,
    Event,
    types.model({
      sharedNearbyWith: types.reference(Profile),
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventLocationShareNearbyStartType)
    },
  }))
  .actions(self => ({
    process: () => {
      self.sharedNearbyWith.setSharesLocation(true)
    },
  }))
  .named('EventLocationShareNearbyStart')

export interface IEventLocationShareNearbyStart
  extends Instance<typeof EventLocationShareNearbyStart> {}

export interface IEventLocationShareNearbyStartData extends IEventData {
  sharedNearbyWith: IProfilePartial
}
