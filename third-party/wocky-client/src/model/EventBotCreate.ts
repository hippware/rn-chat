import {types, Instance} from 'mobx-state-tree'
import {EventBot} from './EventBot'
import {EventRequestTypes} from './EventList'

export const EventBotCreateType = 'BOT_CREATE_NOTIFICATION'
export const EventBotCreate = types
  .compose(
    EventBot,
    types.model({
      created: types.boolean,
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventBotCreateType)
    },
  }))
  .named('EventBotCreate')

export interface IEventBotCreate extends Instance<typeof EventBotCreate> {}
