import {types} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {Profile, IProfilePartial} from './Profile'
import {IBot} from './Bot'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

export const EventBotGeofence = types
  .compose(
    EventBot,
    types.model('EventBotGeofence', {
      isEnter: types.boolean,
      profile: types.reference(Profile),
    })
  )
  .named('EventBotGeofence')

export type IEventBotGeofence = typeof EventBotGeofence.Type

export interface IEventBotGeofenceData extends IEventBotData {
  isEnter: boolean
  profile: IProfilePartial
}
