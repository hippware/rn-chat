import {types, Instance, getParent} from 'mobx-state-tree'
import {Timeable, ITimeableData} from './Timeable'
import {Base, IBaseData} from './Base'
import {IProfile} from './Profile'
import {flow} from 'mobx'

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
    remove: flow(function*() {
      const parent: any = getParent(getParent(self))
      yield self.transport.notificationDelete(self.id)
      parent.remove(self.id)
    }),
    removeAfterDelay: flow(function*(seconds: number) {
      const parent: any = getParent(getParent(self))
      yield self.transport.notificationDelete(self.id)
      setTimeout(() => parent.remove(self.id), seconds * 1000)
    }),
    process: () => {
      // do nothing
    },
  }))
  .named('Event')

export interface IEvent extends Instance<typeof Event> {}

export interface IEventData extends IBaseData, ITimeableData {}
