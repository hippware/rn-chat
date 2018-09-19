import {types} from 'mobx-state-tree'
import {Timeable, ITimeableData} from './Timeable'
import {Base, IBaseData} from './Base'
import {IProfile} from './Profile'

export const Event = types
  .compose(
    Base,
    Timeable,
    types.model('Event', {
      cursor: types.string,
    })
  )
  .named('Event')
  .views(() => ({
    get target(): IProfile {
      throw new Error('Abstract method!')
    },
  }))
  .named('Event')

type IEventType = typeof Event.Type
export interface IEvent extends IEventType {}

export interface IEventData extends IBaseData, ITimeableData {
  cursor: string
}
