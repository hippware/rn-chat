import {types, Instance} from 'mobx-state-tree'
import {EventBot} from './EventBot'

export const EventBotCreate = types
  .compose(
    EventBot,
    types.model({
      created: types.boolean,
    })
  )
  .named('EventBotCreate')

export interface IEventBotCreate extends Instance<typeof EventBotCreate> {}
