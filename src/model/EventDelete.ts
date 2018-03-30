// tslint:disable-next-line:no_unused-variable
import {types, flow, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Event} from './Event'
import {IProfile} from './Profile'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IProfile = IProfile

export const EventDelete = types
  .compose(
    Event,
    types.model('EventDelete', {
      delete: types.boolean
    })
  )
  .named('EventDelete')
