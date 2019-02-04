import {types, Instance} from 'mobx-state-tree'
import {Timeable, ITimeableData} from './Timeable'
import {Base, IBaseData} from './Base'
import {IProfile} from './Profile'

export const Event = types
  .compose(Base, Timeable, types.model({id: types.identifier, unread: true}))
  .named('Event')
  .views(() => ({
    get target(): IProfile {
      throw new Error('Abstract method!')
    },
  }))
  .actions(self => ({
    read: () => {
      self.unread = false
    },
    process: () => {
      // do nothing
    },
  }))
  .named('Event')

export interface IEvent extends Instance<typeof Event> {}

export interface IEventData extends IBaseData, ITimeableData {}
