import {types, Instance} from 'mobx-state-tree'
import jsrsasign from 'jsrsasign'
import uuid from 'uuid/v1'

export type Credentials = {typ: string; sub: string; phone_number?: string}

export const AppInfo = types
  .model({
    nativeVersion: types.string,
    jsVersion: types.string,
    systemName: types.string,
    systemVersion: types.string,
    deviceId: types.string,
    uniqueId: types.string,
    codepushVersion: '',
  })
  .views(self => ({
    get longVersion(): string {
      return `${self.jsVersion}${
        self.codepushVersion ? ` (${self.nativeVersion}-${self.codepushVersion})` : ''
      }`
    },
    get uaString(): string {
      const extras: string[] = [`${self.systemName} ${self.systemVersion}`, self.deviceId]
      if (self.codepushVersion) {
        extras.push(`${self.nativeVersion}-${self.codepushVersion}`)
      }
      return `TinyRobot/${self.jsVersion} (${extras.join('; ')})`
    },
  }))
  .actions(self => ({
    token(credentials: Credentials) {
      // HACK: short circuit login in case of no credentials. This sometimes happens with reconnect in Connectivity.tsx
      // assert(
      //   credentials && credentials.typ && credentials.sub && credentials.phone_number,
      //   'bad credentials:' + credentials
      // )
      const payload = {
        aud: 'Wocky',
        jti: uuid(),
        iss: self.uaString,
        dvc: self.uniqueId,
        ...credentials,
      }

      // const password = generateWockyToken(payload)
      const magicKey = '0xszZmLxKWdYjvjXOxchnV+ttjVYkU1ieymigubkJZ9dqjnl7WPYLYqLhvC10TaH'
      const header = {alg: 'HS512', typ: 'JWT'}
      const jwt = jsrsasign.jws.JWS.sign('HS512', header, payload, {utf8: magicKey})
      return jwt
    },
  }))

export interface IAppInfo extends Instance<typeof AppInfo> {}
