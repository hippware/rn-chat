import {autorunAsync} from 'mobx'
// import {IWocky} from 'wocky-client'
import {types, getEnv, getParent} from 'mobx-state-tree'

export const DELAY = 1000

type State = {
  isActive?: boolean
  retryCount?: number
  netConnected?: boolean
  retryDelay?: number
  reconnecting?: boolean
}

const ConnectivityStore = types
  .model('ConnectivityStore', {})
  .volatile(() => ({
    isActive: true,
    retryCount: 0,
    netConnected: true,
    retryDelay: DELAY,
    reconnecting: false,
  }))
  .actions(self => ({
    setState(state: State) {
      Object.assign(self, state)
    },
  }))
  .actions(self => {
    let wocky
    let logger
    let appState
    let netInfo

    function afterAttach() {
      wocky = getParent(self).wocky
      ;({logger, appState, netInfo} = getEnv(self))

      appState.addEventListener('change', _handleAppStateChange)
      netInfo.addEventListener('connectionChange', _handleConnectionInfoChange)
      netInfo.getConnectionInfo().then(reach => {
        logger.log('NETINFO INITIAL:', reach)
        _handleConnectionInfoChange(reach)
      })

      autorunAsync(
        'Connectivity: tryReconnect',
        () => {
          const {netConnected, isActive} = self
          const {username, password, connected, connecting} = getParent(self).wocky
          if (netConnected && isActive && username && password && !(connected || connecting)) {
            tryReconnect()
          }
        },
        DELAY
      )
    }

    async function tryReconnect(force?: boolean) {
      const {username, password, host, login, connected, connecting, profile} = wocky
      if (username && password && host && (!self.reconnecting || force)) {
        try {
          self.setState({retryCount: self.retryCount + 1, reconnecting: true})
          await login()
          self.setState({
            retryDelay: DELAY,
            retryCount: 0,
            reconnecting: false,
          })
        } catch (e) {
          self.setState({
            retryDelay: self.retryDelay >= 5000 ? self.retryDelay : self.retryDelay * 1.5,
          })
          setTimeout(() => tryReconnect(true), self.retryDelay)
        }
      } else {
        wocky.disconnect()
      }
    }

    async function _handleAppStateChange(currentAppState: any) {
      logger.log('& CURRENT APPSTATE:', currentAppState)
      if (currentAppState === 'active') {
        self.setState({isActive: true})
      }
      if (currentAppState === 'background') {
        self.setState({isActive: false})
        wocky.disconnect()
      }
    }

    async function _handleConnectionInfoChange(connectionInfo: any) {
      logger.log('& CONNECTIVITY:', connectionInfo)
      if (connectionInfo.type === 'unknown') {
        self.setState({netConnected: true})
        return
      }
      if (connectionInfo.type === 'none') {
        self.setState({netConnected: false})
        if (wocky.connected && !wocky.connecting) {
          wocky.disconnect()
        }
      } else {
        self.setState({netConnected: true})
      }
    }

    return {afterAttach}
  })

export default ConnectivityStore
export type IConnectivityStore = typeof ConnectivityStore.Type
