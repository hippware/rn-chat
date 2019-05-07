import {types, Instance, flow} from 'mobx-state-tree'
import Permissions from 'react-native-permissions'

const AUTHORIZED = 'authorized'

export const PermissionStore = types
  .model('PermissionStore', {
    allowsNotification: false,
    allowsAccelerometer: false,
    allowsLocation: false,
    allowsContacts: false,
    loaded: false,
  })
  .actions(self => ({
    setAllowsNotification(value: boolean) {
      self.allowsNotification = value
    },
    setAllowsAccelerometer(value: boolean) {
      self.allowsAccelerometer = value
    },
    setAllowsLocation(value: boolean) {
      self.allowsLocation = value
    },
    setAllowsContacts(value: boolean) {
      self.allowsContacts = value
    },
    setLoaded(value: boolean) {
      self.loaded = value
    },
  }))
  .actions(self => ({
    checkAllPermissions: flow(function*() {
      // check all permissions in parallel
      const checkPromises = [
        Permissions.check('location', {type: 'always'}).then(check =>
          self.setAllowsLocation(check === AUTHORIZED)
        ),
        Permissions.check('motion').then(check =>
          // NOTE: accelerometer checks always come back as "restricted" on a simulator
          self.setAllowsAccelerometer(check === AUTHORIZED)
        ),
        Permissions.check('notification').then(check =>
          self.setAllowsNotification(check === AUTHORIZED)
        ),
      ]
      yield Promise.all(checkPromises)
    }),
  }))
  .actions(self => ({
    afterAttach: flow(function*() {
      yield self.checkAllPermissions()
      self.setLoaded(true)
    }),
  }))
  .postProcessSnapshot(() => {
    // No need to persist this store
    return {}
  })

export interface IPermissionStore extends Instance<typeof PermissionStore> {}
