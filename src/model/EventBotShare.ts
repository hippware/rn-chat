// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {EventBot} from './EventBot'
import {Message} from './Message'
import {IProfile} from './Profile'

export const EventBotShare = types
  .compose(
    EventBot,
    types.model('EventBotShare', {
      message: Message,
      action: types.string
    })
  )
  .views(self => ({
    get target(): IProfile {
      return self.message.from!
    }
  }))

  .named('EventBotShare')
