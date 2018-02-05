// tslint:disable-next-line:no_unused-variable
import {types, flow, onSnapshot, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile} from './Profile'
import {createUpdatable} from './Updatable'
import {createUploadable} from './Uploadable'

export const OwnProfile = types
  .compose(
    types.compose(Profile, createUploadable('avatar', 'all'), createUpdatable((self, data) => self.service._updateProfile(data))),
    types.model('OwnProfile', {
      email: '',
      phoneNumber: ''
    })
  )
  .named('OwnProfile')
