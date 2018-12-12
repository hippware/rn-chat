import {types, Instance} from 'mobx-state-tree'

export const AppInfo = types
  .model({
    nativeVersion: types.string,
    jsVersion: types.string,
    systemName: types.string,
    systemVersion: types.string,
    deviceId: types.string,
    codepushVersion: '',
  })
  .views(self => ({
    get version(): string {
      const extras: string[] = [`${self.systemName} ${self.systemVersion}`, self.deviceId]
      if (self.codepushVersion) {
        extras.push(`${self.nativeVersion}-${self.codepushVersion}`)
      }
      return `${self.jsVersion} (${extras.join('; ')})`
    },
  }))

export interface IAppInfo extends Instance<typeof AppInfo> {}
