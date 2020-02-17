import {types, getEnv, flow, getParent, getRoot} from 'mobx-state-tree'
import {autorun, IReactionDisposer} from 'mobx'
import {AppState, Platform} from 'react-native'
import BackgroundGeolocation from 'react-native-background-geolocation-android'
import BackgroundFetch from 'react-native-background-fetch'
import DeviceInfo from 'react-native-device-info'
import {settings} from '../globals'
import {Location, createLocation, IWocky} from 'wocky-client'
import _ from 'lodash'
import * as RNLocalize from 'react-native-localize'
import moment from 'moment'
import {log, warn} from '../utils/logger'
import analytics from '../utils/analytics'
import {checkLocation} from '../utils/permissions'
import Geolocation from 'react-native-geolocation-service'
import {bugsnagNotify} from 'src/utils/bugsnagConfig'

const MAX_DATE1 = '2030-01-01-17:00'
const MAX_DATE2 = '2030-01-01-18:00'

export const BG_STATE_PROPS = ['distanceFilter', 'autoSyncThreshold']

const prefix = 'BGGL'

const BackgroundLocationConfigOptions = types.model('BackgroundLocationConfigOptions', {
  autoSyncThreshold: types.maybeNull(types.number),
  distanceFilter: types.maybeNull(types.number),
})

// todo: https://github.com/hippware/rn-chat/issues/3434
const isMetric = RNLocalize.usesMetricSystem()
const LocationStore = types
  .model('LocationStore', {
    // should we persist location?
    location: types.maybeNull(Location),
    backgroundOptions: types.optional(BackgroundLocationConfigOptions, {}),
  })
  .volatile(() => ({
    alwaysOn: true,
  }))
  .views(self => ({
    distance: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371000 // Radius of the earth in m
      const dLat = ((lat2 - lat1) * Math.PI) / 180 // deg2rad below
      const dLon = ((lon2 - lon1) * Math.PI) / 180
      const a =
        0.5 -
        Math.cos(dLat) / 2 +
        (Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          (1 - Math.cos(dLon))) /
          2

      const res = R * 2 * Math.asin(Math.sqrt(a))
      const result = isMetric ? res : res * 3.2808399
      return result
    },
    distanceToString: (distance: number): string => {
      let base, unit
      if (isMetric) {
        base = distance / 1000
        unit = 'km'
      } else {
        base = distance * 0.000189394
        unit = 'mi'
      }
      return `${base < 10 ? base.toFixed(1) : Math.round(base)} ${unit}`
    },
  }))
  .views(self => ({
    distanceFromBot: (botLoc: {latitude: number; longitude: number} | null): string | undefined => {
      const {location, distanceToString, distance} = self
      if (location && botLoc) {
        return distanceToString(
          distance(location.latitude, location.longitude, botLoc.latitude, botLoc.longitude)
        )
      }
      return undefined
    },
  }))
  .actions(self => ({
    setPosition(position) {
      self.location = createLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        accuracy: position.coords.accuracy,
        createdAt: new Date(position.timestamp),
        // .activity does not exist if called from Geolocation
        activity: position.activity ? position.activity.type : null,
        activityConfidence: position.activity ? position.activity.confidence : null,
      })
    },
    setAlwaysOn(value: boolean) {
      BackgroundGeolocation.logger.info(`${prefix} setAlwaysOn(${value})`)
      self.alwaysOn = value
    },
    updateBackgroundConfigSuccess(state) {
      const options = _.pick(state, BG_STATE_PROPS)
      Object.assign(self, {
        backgroundOptions: {
          ...options,
        },
      })
    },
    setState(value) {
      Object.assign(self, value)
    },

    // Set reset to true to reset to defaults
    configure: flow(function*(reset = false) {
      const config = {
        batchSync: true,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        enableHeadless: true,
        foregroundService: true, // android only
        logLevel:
          __DEV__ || settings.configurableLocationSettings
            ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
            : BackgroundGeolocation.LOG_LEVEL_OFF,
        maxRecordsToPersist: 20,
        notification: {
          // android only
          channelName: 'Location Service',
          priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN,
        },
        startOnBoot: true,
        stopOnTerminate: false,
        stopTimeout: 1,
        disableLocationAuthorizationAlert: true,
      } as any

      if (!settings.configurableLocationSettings) {
        config.distanceFilter = 10
      }

      if (reset) {
        yield BackgroundGeolocation.reset(config)
        log(prefix, 'Reset and configure')
      } else {
        yield BackgroundGeolocation.setConfig(config)
        log(prefix, 'Configure')
      }

      setUploadRate(true)
    }),
  }))
  .actions(self => {
    const {transport} = getEnv(self)
    const wocky: IWocky = (getParent(self) as any).wocky
    let watcherID

    const refreshCredentials = flow(function*() {
      try {
        const token = yield wocky.getLocationUploadToken()
        yield BackgroundGeolocation.setConfig({
          url: `https://${settings.host}/api/v1/users/${wocky.username}/locations`,
          headers: {
            Accept: 'application/json',
            Authentication: `Bearer ${token}`,
          },
          params: {
            device: transport.resource,
          },
        })
        log(prefix, `refreshCredentials token: ${token}`)
        BackgroundGeolocation.logger.info(`${prefix} refreshCredentials`)
      } catch (err) {
        log(prefix, 'refreshCredentials error', err)
        BackgroundGeolocation.logger.error(`${prefix} refreshCredentials ${err}`)
      }
    })

    const invalidateCredentials = flow(function*() {
      yield BackgroundGeolocation.setConfig({
        headers: {},
        params: {},
        url: '',
      })
      log(prefix, 'invalidateCredentials')
      BackgroundGeolocation.logger.info(`${prefix} invalidateCredentials`)
    })

    const getCurrentPosition = flow(function*() {
      log(prefix, 'get current position')
      yield BackgroundGeolocation.getCurrentPosition({
        timeout: 20,
        maximumAge: 1000,
      })
    })

    function setBackgroundConfig(config) {
      // For some reason, these parameters must be ints, not strings
      config.autoSyncThreshold = parseInt(config.autoSyncThreshold)
      BackgroundGeolocation.setConfig(config, self.updateBackgroundConfigSuccess)
    }

    function startStandaloneGeolocation() {
      log(prefix, `startStandaloneGeolocation`)
      BackgroundGeolocation.logger.info(`${prefix} startStandaloneGeolocation`)

      _stopStandaloneGeolocation()
      watcherID = Geolocation.watchPosition(
        onStandaloneLocation,
        error => warn('GPS ERROR:', error),
        {
          timeout: 20,
          maximumAge: 1000,
          enableHighAccuracy: true,
          distanceFilter: 10,
        }
      )
    }

    function stopStandaloneGeolocation() {
      log(prefix, `stopStandaloneGeolocation`)
      BackgroundGeolocation.logger.info(`${prefix} stopStandaloneGeolocation`)

      _stopStandaloneGeolocation()
    }

    function _stopStandaloneGeolocation() {
      if (watcherID !== undefined) {
        Geolocation.clearWatch(watcherID)
        watcherID = undefined
      }
    }

    function onStandaloneLocation(position) {
      position.isStandalone = true
      onLocation(position)
    }

    async function emailLog(email) {
      // emailLog doesn't work in iOS simulator so fetch and dump instead
      if (await DeviceInfo.isEmulator()) {
        log(prefix, await BackgroundGeolocation.logger.getLog())
      } else {
        await BackgroundGeolocation.logger.emailLog(email)
      }
    }

    return {
      refreshCredentials,
      invalidateCredentials,
      getCurrentPosition,
      setBackgroundConfig,
      startStandaloneGeolocation,
      stopStandaloneGeolocation,
      emailLog,
    }
  })
  .actions(self => {
    const {wocky} = getRoot<any>(self)
    let reactions: IReactionDisposer[] = []

    const init = flow(function*() {
      const resp1 = yield checkLocation()
      if (resp1) {
        self.setAlwaysOn(true)
      } else {
        self.setAlwaysOn(false)
      }
    })

    const start = flow(function*() {
      if (reactions.length) {
        finish()
      }
      yield init()

      reactions = [
        autorun(
          async () => {
            if (
              wocky.connected &&
              wocky.profile &&
              wocky.profile.hidden &&
              wocky.profile.clientData.onboarded &&
              self.alwaysOn
            ) {
              try {
                await self.refreshCredentials()
                if (!wocky.profile.hidden.enabled) {
                  await BackgroundGeolocation.start()
                  await self.getCurrentPosition()
                  log(prefix, 'Start')
                } else {
                  log(prefix, 'Not started because user has invisible mode')
                  self.startStandaloneGeolocation()
                }
              } catch (err) {
                // prevent unhandled promise rejection
                log(prefix, 'Start onConnected reaction error', err)
                BackgroundGeolocation.logger.error(
                  `${prefix} Start onConnected reaction error ${err}`
                )
              }
            }
          },
          {name: 'LocationStore: Start RNBGL after connected'}
        ),
      ]
    })

    function finish() {
      reactions.forEach(disposer => disposer())
      reactions = []
      // self.stopStandaloneGeolocation()
    }

    const didMount = flow(function*() {
      BackgroundGeolocation.logger.info(`${prefix} didMount`)

      singleton = self as any

      if (Platform.OS === 'ios') {
        BackgroundFetch.status(status => {
          log(prefix, `BackgroundFetch status=${status}`)
          BackgroundGeolocation.logger.info(`${prefix} BackgroundFetch status=${status}`)
        })

        BackgroundFetch.configure(
          {
            minimumFetchInterval: 15,
          },
          () => {
            log(prefix, `BackgroundFetch callback`)
            BackgroundGeolocation.logger.info(`${prefix} BackgroundFetch callback`)
            BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
          },
          _error => {
            log(prefix, `BackgroundFetch failed to start`)
            BackgroundGeolocation.logger.info(`${prefix} BackgroundFetch failed to start`)
          }
        )
      }

      BackgroundGeolocation.onLocation(onLocation, onLocationError)
      BackgroundGeolocation.onHttp(onHttp)
      BackgroundGeolocation.onMotionChange(onMotionChange)
      BackgroundGeolocation.onActivityChange(onActivityChange)
      BackgroundGeolocation.onProviderChange(onProviderChange)
      BackgroundGeolocation.onConnectivityChange(onConnectivityChange)

      yield self.configure()
      const config = yield BackgroundGeolocation.ready({reset: false})
      log(prefix, 'Ready: ', config)
      self.updateBackgroundConfigSuccess(config)
    })

    function willUnmount() {
      BackgroundGeolocation.logger.info(`${prefix} willUnmount`)
      BackgroundGeolocation.removeAllListeners()
    }

    const logout = flow(function*() {
      yield self.invalidateCredentials()
      yield BackgroundGeolocation.stopSchedule()
      yield BackgroundGeolocation.stop()
      log(prefix, 'Stop')
    })

    return {
      start,
      finish,
      didMount,
      willUnmount,
      logout,
    }
  })
  .actions(self => ({
    hide: flow(function*(value: boolean, expires: Date | undefined) {
      log(prefix, `Hide(${value}, ${expires})`)
      BackgroundGeolocation.logger.info(`${prefix} hide(${value}, ${expires})`)
      self.finish()
      self.stopStandaloneGeolocation()
      if (value) {
        yield BackgroundGeolocation.stopSchedule()
        yield BackgroundGeolocation.stop()
        const expiresDate = expires ? moment(expires).format('YYYY-MM-DD-HH:mm') : MAX_DATE1
        const schedule = `${expiresDate} ${MAX_DATE2}`
        // console.log(`SCHEDULE: ${schedule}`)
        BackgroundGeolocation.setConfig({schedule: [schedule]})
        yield BackgroundGeolocation.startSchedule()
        self.startStandaloneGeolocation()
      } else {
        yield BackgroundGeolocation.stopSchedule()
        self.start()
      }
    }),
  }))
// .postProcessSnapshot((snapshot: any) => {
//   return {} // huge performance optimization: don't persist frequently changed location and display only real location to an user
// })

let singleton: typeof LocationStore.Type

function onLocation(position) {
  if (__DEV__ || settings.isStaging) {
    const text = `${position.isStandalone ? 'Standalone ' : ''}location: ${JSON.stringify(
      position
    )}`
    log(prefix, text)

    if (position.isStandalone) {
      BackgroundGeolocation.logger.info(`${prefix} ${text}`)
    }
  }

  if (AppState.currentState !== 'background' && singleton) {
    singleton.setPosition(position)
  }
}

function onLocationError(err) {
  warn(prefix, 'location error', err)
  BackgroundGeolocation.logger.error(`${prefix} onLocationError ${err}`)
}

// Use closure to define a function with a static variable
// For some reason, _autoSyncThreshold is only static if setUploadRate is defined at the top scope.
const setUploadRate = (() => {
  let _autoSyncThreshold: number = -1

  return (fast: boolean) => {
    const autoSyncThreshold = fast ? 0 : 10
    if (autoSyncThreshold !== _autoSyncThreshold) {
      BackgroundGeolocation.logger.info(`${prefix} setUploadRate(${fast})`)
      log(prefix, `setUploadRate(${fast})`)
      BackgroundGeolocation.setConfig({
        autoSyncThreshold,
      })
      _autoSyncThreshold = autoSyncThreshold

      // Update locationStore if available
      if (singleton) {
        singleton.setState({
          backgroundOptions: {
            ...singleton.backgroundOptions,
            autoSyncThreshold,
          },
        })
      }
    }
  }
})()

function onHttp(response) {
  log(prefix, 'on http', response)
  if (response.status >= 200 && response.status < 300) {
    BackgroundGeolocation.logger.info(`${prefix} onHttp success: ${JSON.stringify(response)}`)
    // analytics.track('location_bg_success', {location: self.location})

    let data: any = false
    try {
      data = response.responseText && JSON.parse(response.responseText)
    } catch (e) {
      // no-op
    }

    if (data) {
      setUploadRate(!!data.watched)
    }
  } else {
    if (response.status === 401 || response.status === 403) {
      BackgroundGeolocation.stop()
      BackgroundGeolocation.stopSchedule()

      BackgroundGeolocation.getState(
        state => {
          bugsnagNotify(
            new Error('BackgroundGeolocation.stop() due to forbidden'),
            'location_store_onhttp_4xx',
            {
              response,
              headers: state.headers,
              params: state.params,
              url: state.url,
            }
          )
        },
        error => {
          bugsnagNotify(new Error(error), 'location_store_getState', {
            response,
            error,
          })
        }
      )
      BackgroundGeolocation.logger.error(`${prefix} BackgroundGeolocation.stop() due to forbidden`)
    }

    BackgroundGeolocation.logger.error(`${prefix} onHttp error: ${JSON.stringify(response)}`)
    analytics.track('location_bg_error', {error: response})
  }
}

function onMotionChange(location) {
  log(prefix, 'motionchanged:', location)
}

function onActivityChange(activityName) {
  log(prefix, 'Current motion activity:', activityName)
}

function onProviderChange(provider) {
  log(prefix, 'Location provider changed:', provider)
  const info = JSON.stringify(provider)
  BackgroundGeolocation.logger.info(`${prefix} onProviderChange(${info})`)

  if (singleton) {
    singleton.setAlwaysOn(provider.status === BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS)
  }
}

function onConnectivityChange(event) {
  BackgroundGeolocation.logger.info(`${prefix} onConnectivityChange(${JSON.stringify(event)})`)
}

async function HeadlessTask(event) {
  switch (event.name) {
    case 'location':
      // It's not known how to distinguish between a location and a
      //   location error event.
      // To be on the safe side, call onLocation if the params are clearly
      //   a location event, otherwise just log it for future debugging.
      if (event.params && event.params.coords) {
        return onLocation(event.params)
      } else {
        const text = `Unknown headless task event: ${JSON.stringify(event)}`
        log(prefix, text)
        BackgroundGeolocation.logger.info(`${prefix} ${text}`)
        bugsnagNotify(new Error(text), 'headless_task_fail', {event})
      }
      break
    case 'http':
      return onHttp(event.params)
    case 'motionchange':
      return onMotionChange(event.params)
    case 'activitychange':
      return onActivityChange(event.params)
    case 'providerchange':
      return onProviderChange(event.params)
    case 'connectivitychange':
      return onConnectivityChange(event.params)
  }
}
BackgroundGeolocation.registerHeadlessTask(HeadlessTask)

export default LocationStore
export type ILocationStore = typeof LocationStore.Type
