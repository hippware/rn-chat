import {types} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile} from './Profile'

export const EventUserFollow = types
  .compose(
    Event,
    types.model('EventUserFollow', {
      user: types.reference(Profile),
    })
  )
  .named('EventUserFollow')

type EventUserFollowType = typeof EventUserFollow.Type
export interface IEventUserFollow extends EventUserFollowType {}

export interface IEventUserFollowData extends IEventData {
  user: IProfilePartial
}
