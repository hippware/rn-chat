// tslint:disable-next-line:no_unused-variable
import {IModelType, flow, destroy, IExtendedObservableMap, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, IReactionDisposer} from 'mobx'
import RosterStore from './roster'
// NOTE: this import introduces globals (from strophe) which may limit the modularity of this repo
import './XmppStropheV2'
import {Profile as P, SERVICE_NAME} from './model'
import {PaginableList as PL} from './paging'

export type IWocky = typeof Wocky.Type
export type IProfile = typeof P.Type
export type IPaginableList = typeof PL.Type
export const Wocky = RosterStore.named(SERVICE_NAME).actions(self => {
  return {
    logout: flow(function*() {
      yield self.disconnect()
      if (!self.profile) {
        destroy(self.profile!)
      }
      self.profile = null
      self.profiles.clear()
      self.roster.clear()
      //      self.files.clear()
      self.username = null
      self.password = null
    })
  }
})
export const Profile = P
export const PaginableList = PL
