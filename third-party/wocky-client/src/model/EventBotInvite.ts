import {types, Instance} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {Profile} from './Profile'

export const EventBotInvite = types
  .compose(
    EventBot,
    types.model('EventBotInvite', {
      sender: types.reference(Profile),
      isAccepted: types.maybeNull(types.boolean),
      isResponse: types.boolean,
    })
  )
  .named('EventBotInvite')

export interface IEventBotInvite extends Instance<typeof EventBotInvite> {}

export interface IEventBotInviteData extends IEventBotData {
  sender: string
  isAccepted?: boolean
  isResponse: boolean
  inviteId: number
}
