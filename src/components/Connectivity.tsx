import React from 'react'
import {AppState, NetInfo} from 'react-native'
import {reaction, observable} from 'mobx'
import {inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import {log} from '../utils/logger'
import {IWocky} from 'wocky-client'
import {IHomeStore} from '../store/HomeStore'
import {ILocationStore} from '../store/LocationStore'
import {IAuthStore} from 'src/store/AuthStore'
import {IStore} from 'src/store'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
  notificationStore?: any
  locationStore?: ILocationStore
  analytics?: any
  authStore?: IAuthStore
  store?: IStore
}

@inject(
  'wocky',
  'homeStore',
  'notificationStore',
  'locationStore',
  'analytics',
  'authStore',
  'store'
)
export default class Connectivity extends React.Component<Props> {
  @observable lastDisconnected = Date.now()
  retryDelay = 1000
  isActive = true
  handler: any
  intervalId: any
  connectionInfo: any

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
    NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange)
    NetInfo.getConnectionInfo().then(reach => {
      log('NETINFO INITIAL:', reach)
      this._handleConnectionInfoChange(reach)
    })
    // todo: refactor. Since interval is hardcoded here exponential backoff won't work...it checks every second regardless of changes to retryDelay
    this.intervalId = setInterval(async () => {
      const model = this.props.wocky!
      if (
        this.isActive &&
        !model.connected &&
        !model.connecting &&
        this.props.authStore!.canLogin &&
        Date.now() - this.lastDisconnected >= this.retryDelay
      ) {
        await this.tryReconnect(`retry: ${this.retryDelay}`)
      }
    }, 1000)
    this.handler = reaction(
      () => !this.props.wocky!.connected,
      () => (this.lastDisconnected = Date.now())
    )

    this.props.locationStore!.didMount()
    setTimeout(() => this._handleAppStateChange('active'))
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
    if (this.handler) this.handler()
    AppState.removeEventListener('change', this._handleAppStateChange)
    NetInfo.removeEventListener('connectionChange', this._handleConnectionInfoChange)

    this.props.locationStore!.willUnmount()
  }

  // reason: A string indicating why tryReconnect() was called.
  //         Useful for logging/debugging
  tryReconnect = async reason => {
    const info = {reason, currentState: AppState.currentState}
    const model = this.props.wocky!
    const {authStore, store} = this.props
    if (
      AppState.currentState === 'active' &&
      !model.connected &&
      !model.connecting &&
      store!.hydrated
    ) {
      try {
        this.props.analytics.track('reconnect_try', {
          ...info,
          delay: this.retryDelay,
          connectionInfo: this.connectionInfo,
        })
        await authStore!.login()
        this.props.analytics.track('reconnect_success', {...info})
        this.retryDelay = 1000
      } catch (e) {
        this.props.analytics.track('reconnect_fail', {...info, error: e})
        // todo: error message will be different with GraphQL (?)
        if (e.toString().indexOf('invalid') !== -1) {
          this.retryDelay = 1e9
          Actions.logout()
        } else {
          this.retryDelay = this.retryDelay >= 5 * 1000 ? this.retryDelay : this.retryDelay * 1.5
          this.lastDisconnected = Date.now()
        }
      }
    }
  }

  // Warning: This NetInfo handler can get called when the app is in
  //   the background on a switch from wifi to cellular (and vice versa)
  _handleConnectionInfoChange = connectionInfo => {
    const oldInfo = this.connectionInfo || {}
    log('CONNECTIVITY:', connectionInfo)
    this.connectionInfo = connectionInfo
    if (connectionInfo.type === 'unknown') {
      // @TODO: mixpanel submit info?
      return
    }
    if (connectionInfo.type !== 'none') {
      setTimeout(
        () =>
          this.tryReconnect(
            `Connectivity: ` +
              `old=(${oldInfo.type},${oldInfo.effectiveType}), ` +
              `new=(${connectionInfo.type},${connectionInfo.effectiveType})`
          ),
        500
      )
    } else if (this.props.wocky!.connected && !this.props.wocky!.connecting) {
      this.props.wocky!.disconnect()
    }
  }

  _handleAppStateChange = async currentAppState => {
    this.retryDelay = 1000
    const {notificationStore, locationStore, homeStore, wocky} = this.props
    log('CURRENT APPSTATE:', currentAppState)
    // reconnect automatically
    if (currentAppState === 'active') {
      this.isActive = true
      notificationStore.start()
      locationStore!.start()
      homeStore!.start()
      await this.tryReconnect('currentAppState: active')
    }
    if (currentAppState === 'background') {
      this.isActive = false
      wocky!.disconnect()
      notificationStore.finish()
      locationStore!.finish()
      homeStore!.finish()
    }
  }

  public render() {
    return null
  }
}
