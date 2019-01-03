import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile} from './Profile'

export const EventUserFollow = types
  .compose(
    Event,
    types.model({
      user: types.reference(Profile),
    })
  )
  .named('EventUserFollow')

export interface IEventUserFollow extends Instance<typeof EventUserFollow> {}

export interface IEventUserFollowData extends IEventData {
  user: IProfilePartial
}
