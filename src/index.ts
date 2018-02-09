// tslint:disable-next-line:no_unused-variable
import {IModelType, types, flow, destroy, IExtendedObservableMap, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, IReactionDisposer} from 'mobx'
import {EventStore} from './store/EventStore'
// NOTE: this import introduces globals (from strophe) which may limit the modularity of this repo
import './store/XmppStropheV2'
import {Profile as P} from './model/Profile'
import {Base as B, SERVICE_NAME} from './model/Base'
export const Base = B
export type IWocky = typeof Wocky.Type
export type IProfile = typeof P.Type
export const Wocky = types
  .compose(
    EventStore,
    types.model({
      id: types.optional(types.identifier(types.string), 'wocky')
    })
  )
  .named(SERVICE_NAME)
  .actions(self => {
    return {
      logout: flow(function*() {
        yield self.disconnect()
        if (!self.profile) {
          destroy(self.profile!)
        }
        self.profile = null
        self.profiles.clear()
        self.roster.clear()
        self.chats.clear()
        self.bots.clear()
        self.version = ''
        self.events.refresh()
        self.updates.clear()
        self.username = null
        self.password = null
      })
    }
  })
export const Profile = P
