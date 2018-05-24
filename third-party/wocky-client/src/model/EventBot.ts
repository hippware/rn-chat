import {types} from 'mobx-state-tree'
import {Bot, IBot} from './Bot'
import {Event} from './Event'
import {IProfile} from './Profile'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

export const EventBot = types
  .compose(
    Event,
    types.model('EventBot', {
      bot: types.reference(Bot),
    })
  )
  .views(self => ({
    get target(): IProfile {
      return self.bot.owner!
    },
  }))
  .named('EventBot')

export type IEventBotType = typeof EventBot.Type
export interface IEventBot extends IEventBotType {}
