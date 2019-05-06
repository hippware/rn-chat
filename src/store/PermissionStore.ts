import {types, Instance, flow} from 'mobx-state-tree'
import Permissions from 'react-native-permissions'
import PushNotification from 'react-native-push-notification'

const AUTHORIZED = 'authorized'

export const PermissionStore = types
  .model('PermissionStore', {
    allowsNotification: false,
    allowsAccelerometer: false,
    allowsLocation: false,
    allowsContacts: false,
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
  }))
  .actions(self => ({
    afterAttach: flow(function*() {
      let check: string = yield Permissions.check('location', {type: 'always'})
      self.setAllowsLocation(check === AUTHORIZED)
      check = yield Permissions.check('motion', {type: 'always'})
      self.setAllowsAccelerometer(check === AUTHORIZED)

      PushNotification.checkPermissions(({alert, badge, sound}) => {
        self.setAllowsNotification(!!(alert || badge || sound))
      })
    }),
  }))
  .postProcessSnapshot(() => {
    // No need to persist this store
    return {}
  })

export interface IPermissionStore extends Instance<typeof PermissionStore> {}
