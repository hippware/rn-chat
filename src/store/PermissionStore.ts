import {types, Instance, flow, getParent} from 'mobx-state-tree'
import {autorun} from 'mobx'
import {Platform} from 'react-native'
import {checkMotion, checkNotifications, checkLocation} from '../utils/permissions'

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
      const checkPromises = [checkLocation().then(res => self.setAllowsLocation(res))]
      if (Platform.OS === 'ios') {
        checkPromises.push(
          checkMotion().then(res =>
            // NOTE: accelerometer checks always come back as "restricted" on a simulator
            self.setAllowsAccelerometer(res)
          ),
          checkNotifications().then(res => self.setAllowsNotification(res))
        )
      } else {
        // on Android...
        self.setAllowsNotification(true)
        self.setAllowsAccelerometer(true)
      }
      yield Promise.all(checkPromises)
    }),
  }))
  .actions(self => ({
    afterAttach() {
      const {wocky} = getParent<any>(self)
      autorun(async () => {
        if (wocky.profile) {
          await self.checkAllPermissions()
          self.setLoaded(true)
        } else {
          self.setLoaded(false)
        }
      })
    },
  }))
  .postProcessSnapshot(() => {
    // No need to persist this store
    return {}
  })

export interface IPermissionStore extends Instance<typeof PermissionStore> {}
