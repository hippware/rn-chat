// tslint:disable-next-line:no_unused-variable
import {types, flow, getEnv, IModelType} from 'mobx-state-tree'
import {when} from 'mobx'
import {Base} from '../model/Base'

export default types
  .compose(
    Base,
    types.model('XmppConnect', {
      username: types.maybe(types.string),
      password: types.maybe(types.string),
      resource: types.string,
      host: types.string,
      sessionCount: 0
    })
  )
  .named('ConnectStore')
  .volatile(self => ({
    connected: false,
    connecting: false
  }))
  .named('Connect')
  .actions(self => {
    return {
      onConnect: () => {
        self.connected = true
      },
      onDisconnect: () => {
        self.connected = false
      }
    }
  })
  .actions(self => {
    const {provider} = getEnv(self)
    return {
      setSessionCount: (count: number) => {
        self.sessionCount = count
      },
      afterCreate: () => {
        provider.onConnected = self.onConnect
        provider.onDisconnected = self.onDisconnect
      },
      beforeDestroy: () => {
        provider.onConnected = null
        provider.onDisconnected = null
      },
      login: flow(function*(user?: string, password?: string, host?: string) {
        try {
          if (user) {
            self.username = user
          }
          if (password) {
            self.password = password
          }
          if (host) {
            self.host = host
          }
          self.connecting = true
          yield provider.login(self.username, self.password, self.host, self.resource)
          self.sessionCount++
          return true
        } catch (e) {
          throw e
        } finally {
          self.connecting = false
        }
      }),
      sendStanza: provider.sendStanza,
      disconnect: flow(function*() {
        provider.disconnectAfterSending()
        yield new Promise(resolve => when(() => !self.connected, resolve))
      })
    }
  })
