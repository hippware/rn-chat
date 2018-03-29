// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {EventBot} from './EventBot'
import {BotPost} from './BotPost'

export const EventBotPost = types
  .compose(
    EventBot,
    types.model('EventBotPost', {
      post: BotPost
    })
  )
  .named('EventBotPost')

export type IEventBotPost = typeof EventBotPost.Type
