// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {EventBot} from './EventBot'

export const EventBotCreate = types
  .compose(
    EventBot,
    types.model('EventBotCreate', {
      created: types.boolean
    })
  )
  .named('EventBotCreate')
