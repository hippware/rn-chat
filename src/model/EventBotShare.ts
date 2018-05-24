import {types} from 'mobx-state-tree'
import {EventBot} from './EventBot'
import {Message} from './Message'
import {IProfile} from './Profile'
import {IBot} from './Bot'
// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

export const EventBotShare = types
  .compose(
    EventBot,
    types.model('EventBotShare', {
      message: Message,
      action: types.string,
    })
  )
  .views(self => ({
    get target(): IProfile {
      return self.message.from!
    },
  }))

  .named('EventBotShare')

export type IEventBotShare = typeof EventBotShare.Type
