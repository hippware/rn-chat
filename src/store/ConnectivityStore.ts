import {autorunAsync, reaction, observable, action} from 'mobx'
import {IWocky} from 'wocky-client'

export const DELAY = 1000

class ConnectivityStore {
  @observable isActive: boolean = true
  // @observable netConnected: boolean = true
  // @observable connectionInfoType: string = 'none'
  @observable retryCount: number = 0
  // @observable connectionInfoType: string = 'none'
  retryDelay: number = DELAY
  reconnecting: boolean = false

  private wocky?: IWocky
  private logger?: any
  private disposer?: () => void
  // private disposer2?: () => void
  private started: boolean = false
  private timeout?: any

  @action
  start(wocky: IWocky, logger: any, appState: any /*, netInfo: any*/) {
    if (this.started) return
    this.started = true

    this.wocky = wocky
    this.logger = logger
    this.logger.log('ConnectivityStore START')

    appState.addEventListener('change', this._handleAppStateChange)
    // netInfo.addEventListener('connectionChange', this._handleConnectionInfoChange)
    // netInfo.getConnectionInfo().then((reach: any) => {
    //   logger.log('NETINFO INITIAL:', reach)
    //   this._handleConnectionInfoChange(reach)
    // })

    this.disposer = autorunAsync(
      'Connectivity: reconnect on foreground',
      () => {
        const {username, password, host, connected, connecting} = this.wocky!
        if (this.isActive && username && password && host && !(connected || connecting)) {
          this.tryReconnect()
        } else {
          this.reset()
        }
      },
      1000
    )

    // this.disposer2 = reaction(
    //   () => this.connectionInfoType,
    //   (type: string) => {
    //     if (type === 'unknown') {
    //       this.netConnected = true
    //     } else if (type === 'none') {
    //       this.netConnected = false
    //       if (this.wocky && this.wocky.connected && !this.wocky.connecting) {
    //         this.wocky.disconnect()
    //       }
    //     } else {
    //       this.netConnected = true
    //     }
    //   },
    //   {
    //     delay: 100,
    //   }
    // )
  }

  @action
  reset() {
    this.retryCount = 0
    this.retryDelay = DELAY
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
    this.reconnecting = false
  }

  // do we want this to finish ever?
  @action
  finish() {
    this.logger.log('ConnectivityStore STOP')
    if (this.disposer) this.disposer()
    if (this.disposer2) this.disposer2()
    this.reset()
  }

  @action
  private async tryReconnect(force: boolean = false) {
    if (!this.wocky) {
      this.logger.warn('connectivity: no wocky!', this.retryCount)
      return
    }
    const {username, password, host, login, connected, connecting} = this.wocky
    if (
      !(connected || connecting) &&
      username &&
      password &&
      host &&
      (!this.reconnecting || force) &&
      this.isActive
    ) {
      try {
        this.retryCount += 1
        this.reconnecting = true
        await login()
        this.reset()
      } catch (e) {
        this.retryDelay = this.retryDelay >= 5000 ? this.retryDelay : this.retryDelay * 1.5
        this.timeout = setTimeout(() => this.tryReconnect(true), this.retryDelay)
      }
    }
  }

  @action
  private _handleAppStateChange = (currentAppState: any) => {
    if (currentAppState === 'active') {
      this.isActive = true
    }
    if (currentAppState === 'background') {
      this.isActive = false
      if (this.wocky) this.wocky.disconnect()
    }
  }

  // @action
  // private _handleConnectionInfoChange = (connectionInfo: any) => {
  //   this.logger.log('_handleConnectionInfoChange', JSON.stringify(connectionInfo))
  //   if (connectionInfo.type !== 'none') {
  //     // setTimeout(() => (this.connectionInfoType = connectionInfo.type), 50) // dirty hack to fix thebug with NetInfo
  //   } else {
  //     // this.connectionInfoType = connectionInfo.type
  //   }
  // }
}

export default new ConnectivityStore()
