import {types, Instance} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {Profile, IProfilePartial} from './Profile'

export const EventBotGeofence = types
  .compose(
    EventBot,
    types.model({
      isEnter: types.boolean,
      profile: types.reference(Profile),
    })
  )
  .named('EventBotGeofence')

export interface IEventBotGeofence extends Instance<typeof EventBotGeofence> {}

export interface IEventBotGeofenceData extends IEventBotData {
  isEnter: boolean
  profile: IProfilePartial
}
