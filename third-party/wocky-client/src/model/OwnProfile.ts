import {types, getSnapshot, flow} from 'mobx-state-tree'
import {Profile} from './Profile'
import {createUpdatable} from './Updatable'
import {createUploadable} from './Uploadable'
import {IBot} from './Bot'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IBot = IBot

const Hidden = types
  .model('HiddenType', {
    enabled: false,
    expires: types.maybe(types.Date),
  })
  .actions(self => ({
    setEnabled: (value: boolean) => {
      self.enabled = value
    },
  }))
  .actions(self => {
    let timerId
    return {
      afterAttach: () => {
        // change a value when it is expired!
        if (self.enabled && self.expires) {
          timerId = setTimeout(() => self.setEnabled(false), self.expires.getTime() - Date.now())
        }
      },
      beforeDestroy: () => {
        if (timerId !== undefined) {
          clearTimeout(timerId)
        }
      },
    }
  })
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
      hidden: types.optional(Hidden, {}),
    })
  )
  .actions(self => ({
    setHasUsedGeofence: value => {
      self.hasUsedGeofence = value
    },
    hide: flow(function*(value: boolean, expires: Date) {
      yield self.service._hideUser(value, expires)
      self.hidden = Hidden.create({enabled: value, expires})
    }),
  }))
  .named('OwnProfile')

export type IOwnProfileType = typeof OwnProfile.Type
export interface IOwnProfile extends IOwnProfileType {}
