// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {EventBot} from './EventBot'
import {Profile, IProfile} from './Profile'
import {IBot} from './Bot'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

export const EventBotGeofence = types
  .compose(
    EventBot,
    types.model('EventBotGeofence', {
      isEnter: types.boolean,
      profile: types.reference(Profile)
    })
  )
  .views(self => ({
    get target(): IProfile {
      return self.profile
    }
  }))
  .named('EventBotGeofence')

export type IEventBotGeofence = typeof EventBotGeofence.Type
