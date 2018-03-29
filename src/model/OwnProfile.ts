// tslint:disable-next-line:no_unused-variable
import {types, flow, onSnapshot, getSnapshot, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile} from './Profile'
import {createUpdatable} from './Updatable'
import {createUploadable} from './Uploadable'
import {IBot} from './Bot'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

export const OwnProfile = types
  .compose(
    types.compose(Profile, createUploadable('avatar', 'all'), createUpdatable((self, data) => self.service._updateProfile(getSnapshot(self)))),
    types.model('OwnProfile', {
      email: types.maybe(types.string),
      phoneNumber: types.maybe(types.string)
    })
  )
  .named('OwnProfile')
