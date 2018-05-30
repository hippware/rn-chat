import {types, getSnapshot} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createUpdatable} from './Updatable'
import {createUploadable} from './Uploadable'
import {IBot} from './Bot'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

export const OwnProfile = types
  .compose(
    types.compose(
      Profile,
      createUploadable('avatar', 'all'),
      createUpdatable((self, data) => self.service._updateProfile({...getSnapshot(self), ...data}))
    ),
    types.model('OwnProfile', {
      email: types.maybe(types.string),
      phoneNumber: types.maybe(types.string),
      hasUsedGeofence: false,
    })
  )
  .actions(self => ({
    setHasUsedGeofence: value => {
      self.hasUsedGeofence = value
    },
  }))
  .named('OwnProfile')

export type IOwnProfileType = typeof OwnProfile.Type
export interface IOwnProfile extends IOwnProfileType {}
