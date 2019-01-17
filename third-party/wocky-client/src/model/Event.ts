import {types, Instance} from 'mobx-state-tree'
import {Timeable, ITimeableData} from './Timeable'
import {Base, IBaseData} from './Base'
import {IProfile} from './Profile'

export const Event = types
  .compose(Base, Timeable, types.model({id: types.identifier}))
  .named('Event')
  .views(() => ({
    get target(): IProfile {
      throw new Error('Abstract method!')
    },
  }))
  .actions(() => ({
    process: () => {
      // do nothing
    },
  }))
  .named('Event')

export interface IEvent extends Instance<typeof Event> {}

export interface IEventData extends IBaseData, ITimeableData {}
