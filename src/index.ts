// tslint:disable-next-line:no_unused-variable
import {IModelType, IExtendedObservableMap, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray, IReactionDisposer} from 'mobx'
import W from './roster'
// NOTE: this import introduces globals (from strophe) which may limit the modularity of this repo
import './XmppStropheV2'
import {Profile as P} from './model'
import {PaginableList as PL} from './paging'

export type IWocky = typeof Wocky.Type
export type IProfile = typeof P.Type
export type IPaginableList = typeof PL.Type
export const Wocky = W
export const Profile = P
export const PaginableList = PL
