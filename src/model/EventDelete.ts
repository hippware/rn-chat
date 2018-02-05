// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Event} from './Event'

export const EventDelete = types
  .compose(
    Event,
    types.model('EventDelete', {
      delete: types.boolean
    })
  )
  .named('EventDelete')
