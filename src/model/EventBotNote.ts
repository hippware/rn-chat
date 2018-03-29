// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {EventBot} from './EventBot'

export const EventBotNote = types
  .compose(
    EventBot,
    types.model('EventBotNote', {
      note: types.string
    })
  )
  .named('EventBotNote')

export type IEventBotNote = typeof EventBotNote.Type
