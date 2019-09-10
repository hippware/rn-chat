import {types, Instance, getParent, flow} from 'mobx-state-tree'
import uuid from 'uuid/v1'
import {IStore} from './store'
import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
const jwt = require('react-native-pure-jwt').default

const systemName = DeviceInfo.getSystemName()
const systemVersion = DeviceInfo.getSystemVersion()
const deviceId = DeviceInfo.getDeviceIdSync()
const uniqueId = DeviceInfo.getUniqueIdSync()

export type Credentials = {typ: string; sub: string; phone_number?: string}

export const AppInfo = types
  .model('AppInfo', {
    nativeVersion: types.string,
    jsVersion: types.string,
  })
  .views(self => {
    const {codePushStore} = getParent<IStore>(self)
    return {
      get longVersion(): string {
        return `${self.jsVersion}${
          codePushStore.updateInfo ? ` (${self.nativeVersion}-${codePushStore.updateInfo})` : ''
        }`
      },
      get uaString(): string {
        const extras: string[] = [`${systemName} ${systemVersion}`, deviceId]

        if (Platform.OS === 'android') {
          extras.push(DeviceInfo.getManufacturerSync())
          extras.push(DeviceInfo.getModelSync())
        }

        if (codePushStore.updateInfo) {
          extras.push(`${self.nativeVersion}-${codePushStore.updateInfo}`)
        }
        return `TinyRobot/${self.jsVersion} (${extras.join('; ')})`
      },
    }
  })
  .actions(self => ({
    token: flow(function*(credentials: Credentials) {
      const payload = {
        aud: 'Wocky',
        jti: uuid(),
        iss: self.uaString,
        dvc: uniqueId,
        ...credentials,
      }

      // This passes in a fake decoy key. The 48th character has been changed.
      return jwt.sign(payload, '0xszZmLxKWdYjvjXOxchnV+ttjVYkU1ieymigubkJZ9dqjnI7WPYLYqLhvC10TaH', {
        alg: 'HS512',
      })
    }),
  }))

export interface IAppInfo extends Instance<typeof AppInfo> {}
