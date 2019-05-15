import {types, Instance, getParent, flow} from 'mobx-state-tree'
import uuid from 'uuid/v1'
import {IStore} from './store'
import DeviceInfo from 'react-native-device-info'
const jwt = require('react-native-pure-jwt').default

const systemName = DeviceInfo.getSystemName()
const systemVersion = DeviceInfo.getSystemVersion()
const deviceId = DeviceInfo.getDeviceId()
const uniqueId = DeviceInfo.getUniqueID()

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
        if (codePushStore.updateInfo) {
          extras.push(`${self.nativeVersion}-${codePushStore.updateInfo}`)
        }
        return `TinyRobot/${self.jsVersion} (${extras.join('; ')})`
      },
    }
  })
  .actions(self => ({
    token: flow(function*(credentials: Credentials) {
      // HACK: short circuit login in case of no credentials. This sometimes happens with reconnect in Connectivity.tsx
      // assert(
      //   credentials && credentials.typ && credentials.sub && credentials.phone_number,
      //   'bad credentials:' + credentials
      // )
      const payload = {
        aud: 'Wocky',
        jti: uuid(),
        iss: self.uaString,
        dvc: uniqueId,
        ...credentials,
      }

      // const password = generateWockyToken(payload)
      const magicKey = '0xszZmLxKWdYjvjXOxchnV+ttjVYkU1ieymigubkJZ9dqjnl7WPYLYqLhvC10TaH'
      const res = yield jwt.sign(payload, magicKey, {alg: 'HS512'})
      // const header = {alg: 'HS512', typ: 'JWT'}
      // const jwt = jsrsasign.jws.JWS.sign('HS512', header, payload, {utf8: magicKey})
      // const jwt = jsrsasign.jws.JWS.sign('HS512', header, payload, {utf8: magicKey})
      return res
    }),
  }))

export interface IAppInfo extends Instance<typeof AppInfo> {}
