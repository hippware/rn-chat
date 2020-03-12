import {types} from 'mobx-state-tree'
import {Bot, IBotData} from './Bot'
import {Event, IEventData} from './Event'

export const EventBot = types
  .compose(
    Event,
    types.model({
      bot: types.reference(Bot),
    })
  )
  .named('EventBot')
  .views(self => ({
    get target() {
      return self.bot!.owner!
    },
  }))
  .named('EventBot')

export type IEventBotType = typeof EventBot.Type
export interface IEventBot extends IEventBotType {}

export interface IEventBotData extends IEventData {
  bot: IBotData
}
