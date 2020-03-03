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
    checkMotionPermissions: (): Promise<boolean> =>
      checkMotion().then(res => {
        // NOTE: accelerometer checks always come back as "restricted" on a simulator
        self.setAllowsAccelerometer(res)
        return res
      }),
  }))
  .actions(self => ({
    checkAllPermissions: flow(function*() {
      // check all permissions in parallel
      const checkPromises: Array<Promise<any>> = [
        checkLocation().then(res => self.setAllowsLocation(res)),
        self.checkMotionPermissions(),
      ]
      if (Platform.OS === 'ios') {
        checkPromises.push(checkNotifications().then(res => self.setAllowsNotification(res)))
      } else {
        // on Android...
        self.setAllowsNotification(true)
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
