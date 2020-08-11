import {types, Instance, getParent, flow, getEnv} from 'mobx-state-tree'
import uuid from 'uuid/v1'
import {IStore} from './store'
import {Platform} from 'react-native'
import {TRDeviceInfo} from '../utils/deviceInfoFetch'
import jsrsasign from 'jsrsasign'

export type Credentials = {typ: string; sub: string; phone_number?: string}

export const AppInfo = types
  .model('AppInfo', {
    nativeVersion: types.string,
    jsVersion: types.string,
  })
  .views(self => {
    const {codePushStore} = getParent<IStore>(self)
    const {systemName, systemVersion, deviceId, manufacturer, model} = getEnv(self)
      .deviceInfo as TRDeviceInfo
    return {
      get longVersion(): string {
        return `${self.jsVersion}${
          codePushStore.updateInfo ? ` (${self.nativeVersion}-${codePushStore.updateInfo})` : ''
        }`
      },
      get uaString(): string {
        const extras: string[] = [`${systemName} ${systemVersion}`, deviceId]

        if (Platform.OS === 'android') {
          extras.push(manufacturer)
          extras.push(model)
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
        dvc: getEnv(self).deviceInfo.uniqueId,
        ...credentials,
      }

      // This passes in a fake decoy key. The 48th character has been changed.
      const magicKey = 'CgKG3D0OfVBMh3JiJfQGkS0SyTrBaaGfrl1MozWnjesSuhVLnMTHDwyXDC/f2dtu'
      const header = {alg: 'HS512', typ: 'JWT'}
      return jsrsasign.jws.JWS.sign('HS512', header, payload, {utf8: magicKey})
    }),
  }))

export interface IAppInfo extends Instance<typeof AppInfo> {}
