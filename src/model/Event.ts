// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Timeable} from './Timeable'
import {Base} from './Base'
import {IProfile} from './Profile'
import {Loadable} from './Loadable'

export const Event = types
  .compose(Base, Timeable, Loadable)
  .named('Event')
  .views(self => ({
    get target(): IProfile {
      throw 'Abstract method!'
    }
  }))
  .named('Event')
