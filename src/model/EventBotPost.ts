import {types, Instance} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {BotPost, IBotPostIn} from './BotPost'
import {EventRequestTypes} from './EventList'

export const EventBotPostType = 'BOT_ITEM_NOTIFICATION'
export const EventBotPost = types
  .compose(
    EventBot,
    types.model('EventBotPost', {
      post: BotPost,
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventBotPostType)
    },
  }))
  .named('EventBotPost')

export interface IEventBotPost extends Instance<typeof EventBotPost> {}

export interface IEventBotPostData extends IEventBotData {
  post: IBotPostIn
}
