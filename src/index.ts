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

const PUSH_NS = 'hippware.com/hxep/notifications'

export const Wocky = types
  .compose(
    EventStore,
    types.model({
      id: types.optional(types.identifier(types.string), 'wocky')
    })
  )
  .views(self => ({
    get snapshot() {
      const data = {...self._snapshot}
      if (self.events.length > 10) {
        data.events = {result: data.events.result.slice(0, 10)}
      }
      delete data.geoBots
      return data
    }
  }))
  .named(SERVICE_NAME)
  .actions(self => {
    return {
      enablePush: flow(function*(token: string) {
        const iq = $iq({type: 'set'}).c('enable', {
          xmlns: PUSH_NS,
          platform: 'apple',
          device: token
        })
        const data = yield self.sendIQ(iq)
        if (!data || !(data.enabled || data.enabled === '')) throw data
      }),
      disablePush: flow(function*() {
        const iq = $iq({type: 'set'}).c('disable', {xmlns: PUSH_NS})
        const data = yield self.sendIQ(iq)
        if (!data || !(data.disabled || data.disabled === '')) throw data
      }),
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
