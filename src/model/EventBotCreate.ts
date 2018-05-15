import {types} from 'mobx-state-tree'
import {EventBot} from './EventBot'
import {IProfile} from './Profile'
import {IBot} from './Bot'
// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IProfile = IProfile

export const EventBotCreate = types
  .compose(
    EventBot,
    types.model('EventBotCreate', {
      created: types.boolean
    })
  )
  .named('EventBotCreate')

export type IEventBotCreate = typeof EventBotCreate.Type
