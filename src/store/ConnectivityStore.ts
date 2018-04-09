import {observable, autorunAsync, computed} from 'mobx'
import {IWocky} from 'wocky-client'

type ConnectivityStoreParams = {
  wocky: IWocky
  AppState: any
  NetInfo: any
  logger: any
}

export const DELAY = 1000

export default class Connectivity {
  @observable isActive: boolean = true
  @observable retryCount: number = 0
  @observable netConnected: boolean = true

  private wocky: IWocky
  private logger: any
  // private timeout: number;
  private retryDelay: number

  constructor({wocky, AppState, NetInfo, logger}: ConnectivityStoreParams) {
    this.wocky = wocky
    this.logger = logger
    this.retryDelay = DELAY

    AppState.addEventListener('change', this._handleAppStateChange)
    NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange)
    NetInfo.getConnectionInfo().then(reach => {
      this.logger.log('NETINFO INITIAL:', reach)
      this._handleConnectionInfoChange(reach)
    })

    autorunAsync(
      'Connectivity: tryReconnect',
      () => {
        if (this.netConnected && this.isActive && !this.loggedOut) {
          this.tryReconnect()
        }
      },
      500
    )
  }

  @computed
  get loggedOut() {
    const {connected, profile, connecting} = this.wocky
    return !connected && !connecting && !profile
  }

  tryReconnect = async () => {
    this.logger.log('tryReconnect')
    const {username, password, host, login} = this.wocky
    if (username && password && host) {
      try {
        this.retryCount += 1
        await login()
        this.retryDelay = DELAY
        this.retryCount = 0
      } catch (e) {
        // TODO: failed login Mixpanel call
        this.retryDelay = this.retryDelay >= 5000 ? this.retryDelay : this.retryDelay * 1.5
        setTimeout(this.tryReconnect, this.retryDelay)
      }
    } else {
      this.wocky.disconnect()
    }
  }

  _handleConnectionInfoChange = connectionInfo => {
    this.logger.log('CONNECTIVITY:', connectionInfo)
    if (connectionInfo.type === 'unknown') {
      this.netConnected = false
      // @TODO: mixpanel submit info?
      return
    }
    if (connectionInfo.type === 'none') {
      this.netConnected = false
      if (this.wocky.connected && !this.wocky.connecting) {
        this.wocky.disconnect()
      }
    } else {
      // TODO: store the connection type ('wifi' or 'cellular')
      // MIXPANEL
      this.netConnected = true
    }
  }

  _handleAppStateChange = async currentAppState => {
    this.logger.log('CURRENT APPSTATE:', currentAppState)
    if (currentAppState === 'active') {
      this.isActive = true
    }
    if (currentAppState === 'background') {
      this.isActive = false
      this.wocky.disconnect()
    }
  }
}
