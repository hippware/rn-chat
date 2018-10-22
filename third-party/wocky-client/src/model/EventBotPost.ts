import {types} from 'mobx-state-tree'
import {EventBot, IEventBotData} from './EventBot'
import {BotPost, IBotPostData} from './BotPost'
import {IProfile} from './Profile'
import {IBot} from './Bot'
// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IProfile = IProfile

export const EventBotPost = types
  .compose(
    EventBot,
    types.model('EventBotPost', {
      post: BotPost,
    })
  )
  // .views(self => ({
  //   get target(): IProfile | null {
  //     return self.post.profile
  //   },
  // }))
  .named('EventBotPost')

export type IEventBotPostType = typeof EventBotPost.Type
export interface IEventBotPost extends IEventBotPostType {
  profile: IProfile
}

export interface IEventBotPostData extends IEventBotData {
  post: IBotPostData
}
