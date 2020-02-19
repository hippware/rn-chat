import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile} from './Profile'
import {Base} from './Base'
import {EventRequestTypes} from './EventList'

export const EventLocationShareNearbyEndType = 'LOCATION_SHARE_NEARBY_END_NOTIFICATION'
export const EventLocationShareNearbyEnd = types
  .compose(
    Base,
    Event,
    types.model({
      sharedNearbyEndWith: types.reference(Profile),
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventLocationShareNearbyEndType)
    },
  }))
  .actions(self => ({
    process: () => {
      self.sharedNearbyEndWith.setSharesLocation(false)
    },
  }))
  .named('EventLocationShareNearbyEnd')

export interface IEventLocationShareNearbyEnd
  extends Instance<typeof EventLocationShareNearbyEnd> {}

export interface IEventLocationShareNearbyEndData extends IEventData {
  sharedNearbyEndWith: IProfilePartial
}
