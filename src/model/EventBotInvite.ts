import {types} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {Profile} from './Profile'

export const EventBotInvite = types
  .compose(
    EventBot,
    types.model('EventBotInvite', {
      sender: types.reference(Profile),
      isAccepted: types.maybe(types.boolean),
      isResponse: types.boolean,
    })
  )
  .named('EventBotInvite')

type EventBotInviteType = typeof EventBotInvite.Type
export interface IEventBotInvite extends EventBotInviteType {}

export interface IEventBotInviteData extends IEventBotData {
  sender: string
  isAccepted?: boolean
  isResponse: boolean
}
