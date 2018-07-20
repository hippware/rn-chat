import React from 'react'
import {AppState, NetInfo} from 'react-native'
import {reaction, observable} from 'mobx'
import {inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import * as log from '../utils/log'

// TODO: need to export declaration file to make this work as expected?
import {IWocky} from 'wocky-client'

type Props = {
  wocky?: IWocky
  notificationStore?: any
  locationStore?: any
  log?: any
  analytics?: any
}

@inject('wocky', 'notificationStore', 'locationStore', 'log', 'analytics')
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
      this.props.log('NETINFO INITIAL:', reach, {level: log.levels.INFO})
      this._handleConnectionInfoChange(reach)
    })
    this.intervalId = setInterval(async () => {
      const model = this.props.wocky!
      if (
        this.isActive &&
        !model.connected &&
        !model.connecting &&
        Date.now() - this.lastDisconnected >= this.retryDelay
      ) {
        await this.tryReconnect(`retry: ${this.retryDelay}`)
      }
    }, 1000)
    this.handler = reaction(
      () => !this.props.wocky!.connected,
      () => (this.lastDisconnected = Date.now())
    )
    setTimeout(() => this._handleAppStateChange('active'))
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
    if (this.handler) this.handler()
    AppState.removeEventListener('change', this._handleAppStateChange)
    NetInfo.removeEventListener('connectionChange', this._handleConnectionInfoChange)
  }

  // reason: A string indicating why tryReconnect() was called.
  //         Useful for logging/debugging
  tryReconnect = async reason => {
    const info = {reason, currentState: AppState.currentState}
    const model = this.props.wocky!
    if (
      AppState.currentState === 'active' &&
      !model.connected &&
      !model.connecting &&
      model.username &&
      model.password &&
      model.host
    ) {
      try {
        this.props.analytics.track('reconnect_try', {
          ...info,
          delay: this.retryDelay,
          connectionInfo: this.connectionInfo,
        })
        await model.login()
        this.props.analytics.track('reconnect_success', {...info})
        this.retryDelay = 1000
      } catch (e) {
        this.props.analytics.track('reconnect_fail', {...info, error: e})
        if (e.toString().indexOf('not-authorized') !== -1) {
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
    const oldInfo = this.connectionInfo
    this.props.log('CONNECTIVITY:', connectionInfo, {level: log.levels.INFO})
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
    this.props.log('CURRENT APPSTATE:', currentAppState, {
      level: log.levels.INFO,
    })
    // reconnect automatically
    if (currentAppState === 'active') {
      this.isActive = true
      this.props.notificationStore.start()
      this.props.locationStore.start()
      await this.tryReconnect('currentAppState: active')
    }
    if (currentAppState === 'background') {
      this.isActive = false
      this.props.wocky!.disconnect()
      this.props.notificationStore.finish()
      this.props.locationStore.finish()
    }
  }

  public render() {
    return null
  }
}
