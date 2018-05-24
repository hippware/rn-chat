import {types} from 'mobx-state-tree'
import {Timeable} from './Timeable'
import {Base} from './Base'
import {IProfile} from './Profile'

export const Event = types
  .compose(Base, Timeable)
  .named('Event')
  .views(() => ({
    get target(): IProfile {
      throw new Error('Abstract method!')
    },
  }))
  .named('Event')

export type IEventType = typeof Event.Type
export interface IEvent extends IEventType {}
