// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Bot} from './Bot'
import {Event} from './Event'
import {IProfile} from './Profile'

export const EventBot = types
  .compose(
    Event,
    types.model('EventBot', {
      bot: types.reference(Bot)
    })
  )
  .views(self => ({
    get target(): IProfile {
      return self.bot.owner!
    }
  }))
  .named('EventBot')
