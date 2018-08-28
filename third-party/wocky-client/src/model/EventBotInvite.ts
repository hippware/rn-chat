import {types} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {Profile, IProfilePartial} from './Profile'

const EventBotInvite = types
  .compose(
    EventBot,
    types.model('EventBotInvite', {
      sender: types.maybe(types.reference(Profile)),
      isAccepted: types.boolean,
    })
  )
  .named('EventBotShare')

export default EventBotInvite

type EventBotInviteType = typeof EventBotInvite.Type
export interface IEventBotInvite extends EventBotInviteType {}

export interface IEventBotInviteData extends IEventBotData {
  sender: IProfilePartial
  isAccepted: boolean
}
