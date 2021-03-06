import {types, Instance} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {Profile, IProfilePartial} from './Profile'
import {EventRequestTypes} from './EventList'

export const EventBotGeofenceType = 'GEOFENCE_EVENT_NOTIFICATION'
export const EventBotGeofence = types
  .compose(
    EventBot,
    types.model({
      isEnter: types.boolean,
      profile: types.reference(Profile),
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventBotGeofenceType)
    },
  }))
  .named('EventBotGeofence')

export interface IEventBotGeofence extends Instance<typeof EventBotGeofence> {}

export interface IEventBotGeofenceData extends IEventBotData {
  isEnter: boolean
  profile: IProfilePartial
}
