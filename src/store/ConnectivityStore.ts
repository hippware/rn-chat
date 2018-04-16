import {autorunAsync, observable} from 'mobx'
import {IWocky} from 'wocky-client'

export const DELAY = 1000

class ConnectivityStore {
  @observable isActive: boolean = true
  @observable netConnected: boolean = true
  retryCount: number = 0
  retryDelay: number = DELAY
  reconnecting: boolean = false

  private wocky?: IWocky
  private logger?: any
  private disposer?: () => void
  private started: boolean = false

  start(wocky: IWocky, logger, appState, netInfo) {
    if (this.started) return
    this.started = true

    this.wocky = wocky
    this.logger = logger
    this.logger.log('ConnectivityStore START')

    appState.addEventListener('change', this._handleAppStateChange)
    netInfo.addEventListener('connectionChange', this._handleConnectionInfoChange)
    netInfo.getConnectionInfo().then(reach => {
      logger.log('NETINFO INITIAL:', reach)
      this._handleConnectionInfoChange(reach)
    })

    this.disposer = autorunAsync(
      'Connectivity: tryReconnect',
      () => {
        const {netConnected, isActive} = this
        const {username, password, connected, connecting} = this.wocky!
        // if the app "should connect", has the necessary info, and isn't already trying...
        if (netConnected && isActive && username && password && !(connected || connecting)) {
          this.tryReconnect()
        }
      },
      DELAY
    )
  }

  // do we want this to finish ever?
  finish() {
    this.logger.log('ConnectivityStore STOP')
    if (this.disposer) this.disposer()
  }

  private async tryReconnect(force: boolean = false) {
    if (!this.wocky) return
    const {username, password, host, login} = this.wocky
    if (username && password && host && (!this.reconnecting || force)) {
      try {
        this.retryCount += 1
        this.reconnecting = true
        await login()
        this.retryDelay = DELAY
        this.retryCount = 0
        this.reconnecting = false
      } catch (e) {
        this.retryDelay = this.retryDelay >= 5000 ? this.retryDelay : this.retryDelay * 1.5
        setTimeout(() => this.tryReconnect(true), this.retryDelay)
      }
    }
  }

  private _handleAppStateChange = (currentAppState: any) => {
    if (currentAppState === 'active') {
      this.isActive = true
    }
    if (currentAppState === 'background') {
      this.isActive = false
      if (this.wocky) this.wocky.disconnect()
    }
  }

  private _handleConnectionInfoChange = (connectionInfo: any) => {
    if (connectionInfo.type === 'unknown') {
      this.netConnected = true
    } else if (connectionInfo.type === 'none') {
      this.netConnected = false
      if (this.wocky && this.wocky.connected && !this.wocky.connecting) {
        this.wocky.disconnect()
      }
    } else {
      this.netConnected = true
    }
  }
}

export default new ConnectivityStore()
