// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {EventBot} from './EventBot'
import {Profile, IProfile} from './Profile'

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
