import {types, Instance} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {Profile, IProfilePartial} from './Profile'

export const EventBotInviteType = 'BOT_INVITATION_NOTIFICATION'
export const EventBotInviteResponseType = 'BOT_INVITATION_RESPONSE_NOTIFICATION'

export const EventBotInvite = types
  .compose(
    EventBot,
    types.model('EventBotInvite', {
      sender: types.reference(Profile),
      isAccepted: types.maybeNull(types.boolean),
      isResponse: types.boolean,
    })
  )
  .views(self => ({
    get isRequest() {
      return self.isResponse ? false : true
    },
  }))
  .named('EventBotInvite')

export interface IEventBotInvite extends Instance<typeof EventBotInvite> {}

export interface IEventBotInviteData extends IEventBotData {
  sender: IProfilePartial
  isAccepted?: boolean
  isResponse: boolean
  inviteId: number
}
