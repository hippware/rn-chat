import {useEffect} from 'react'
import {AppState} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import {reaction} from 'mobx'
import {inject} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import {log} from '../utils/logger'
import {IWocky} from 'wocky-client'
import {IHomeStore} from '../store/HomeStore'
import {ILocationStore} from '../store/LocationStore'
import {IAuthStore} from 'src/store/AuthStore'
import _ from 'lodash'
import NotificationStore from 'src/store/NotificationStore'
import {bugsnagNotify} from 'src/utils/bugsnagConfig'
import BackgroundGeolocation from 'react-native-background-geolocation-android'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
  notificationStore?: NotificationStore
  locationStore?: ILocationStore
  analytics?: any
  authStore?: IAuthStore
}

const Connectivity = inject(
  'wocky',
  'homeStore',
  'notificationStore',
  'locationStore',
  'analytics',
  'authStore'
)(({wocky, homeStore, notificationStore, locationStore, analytics, authStore}: Props) => {
  let lastDisconnected = Date.now()
  let retryDelay = 1000
  let isActive = true
  let connectionInfo: any

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange)
    const netInfoUnsubscribe = NetInfo.addEventListener(_handleConnectionInfoChange)
    NetInfo.fetch().then(reach => {
      log('NETINFO INITIAL:', reach)
      _handleConnectionInfoChange(reach)
    })

    const intervalId = setInterval(async () => {
      const model = wocky!
      if (
        isActive &&
        !model.connected &&
        !model.connecting &&
        authStore!.canLogin &&
        Date.now() - lastDisconnected >= retryDelay
      ) {
        await tryReconnect(`retry: ${retryDelay}`)
      }
    }, 1000)
    const disposer = reaction(
      () => !wocky!.connected,
      () => (lastDisconnected = Date.now())
    )

    locationStore!.didMount()
    setTimeout(() => _handleAppStateChange('active'))

    return () => {
      clearInterval(intervalId)
      disposer()
      AppState.removeEventListener('change', _handleAppStateChange)
      netInfoUnsubscribe()
      locationStore!.willUnmount()
    }
  }, [])

  // reason: A string indicating why tryReconnect() was called.
  //         Useful for logging/debugging
  const tryReconnect = async reason => {
    const info = {reason, currentState: AppState.currentState}
    const model = wocky!
    if (
      AppState.currentState === 'active' &&
      !model.connected &&
      !model.connecting &&
      authStore!.canLogin
    ) {
      try {
        analytics.track('reconnect_try', {
          ...info,
          delay: retryDelay,
          connectionInfo,
        })
        await authStore!.login()
        analytics.track('reconnect_success', {...info})
        retryDelay = 1000
      } catch (e) {
        bugsnagNotify(e, 'reconnect_fail', info)
        analytics.track('reconnect_fail', {...info, error: e})
        // todo: error message will be different with GraphQL (?)
        if (e.toString().indexOf('invalid') !== -1) {
          retryDelay = 1e9
          Actions.logout()
        } else {
          retryDelay = retryDelay >= 5 * 1000 ? retryDelay : retryDelay * 1.5
          lastDisconnected = Date.now()
        }
      }
    }
  }

  // Warning: This NetInfo handler can get called when the app is in
  //   the background on a switch from wifi to cellular (and vice versa)
  const _handleConnectionInfoChange = ci => {
    const oldInfo = connectionInfo || {}
    log('CONNECTIVITY:', ci)
    connectionInfo = ci

    BackgroundGeolocation.logger.info(
      `Connectivity.tsx _handleConnectionInfoChange: ` +
        `old=(${oldInfo.type},${oldInfo.effectiveType}), ` +
        `new=(${connectionInfo.type},${connectionInfo.effectiveType})`
    )

    if (connectionInfo.type === 'unknown') {
      return
    }
    if (connectionInfo.type !== 'none') {
      debouncedDisconnect.cancel()
      setTimeout(
        () =>
          tryReconnect(
            `Connectivity: ` +
              `old=(${oldInfo.type},${oldInfo.effectiveType}), ` +
              `new=(${connectionInfo.type},${connectionInfo.effectiveType})`
          ),
        500
      )
    } else if (wocky!.connected && !wocky!.connecting) {
      debouncedDisconnect()
    }
  }

  const _handleAppStateChange = async currentAppState => {
    retryDelay = 1000
    log('CURRENT APPSTATE:', currentAppState)
    BackgroundGeolocation.logger.info(`Connectivity.tsx _handleAppStateChange(${currentAppState})`)

    // reconnect automatically
    if (currentAppState === 'active') {
      debouncedDisconnect.cancel()
      isActive = true
      notificationStore!.start()
      locationStore!.start()
      homeStore!.start()
      await tryReconnect('currentAppState: active')
    }
    if (currentAppState === 'background') {
      isActive = false
      debouncedDisconnect()
      notificationStore!.finish()
      locationStore!.finish()
      homeStore!.finish()
    }
  }

  const debouncedDisconnect = _.debounce(
    () => {
      if (!isActive) {
        wocky!.disconnect()
      }
    },
    60000,
    {
      trailing: true,
    }
  )

  return null
})

export default Connectivity
