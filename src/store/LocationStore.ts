import {types, getEnv, flow, getParent, getRoot} from 'mobx-state-tree'
import {autorun, IReactionDisposer} from 'mobx'
import Permissions from 'react-native-permissions'
import BackgroundGeolocation from 'react-native-background-geolocation'
import DeviceInfo from 'react-native-device-info'
import {settings} from '../globals'
import {Location, createLocation, IWocky} from 'wocky-client'
import _ from 'lodash'
import * as RNLocalize from 'react-native-localize'
import moment from 'moment'
import {log, warn} from '../utils/logger'
import analytics from '../utils/analytics'
import Geolocation from 'react-native-geolocation-service'

const MAX_DATE1 = '2030-01-01-17:00'
const MAX_DATE2 = '2030-01-01-18:00'

export const BG_STATE_PROPS = ['distanceFilter', 'autoSyncThreshold', 'debug']

const prefix = 'BGGL'

const BackgroundLocationConfigOptions = types.model('BackgroundLocationConfigOptions', {
  autoSyncThreshold: types.maybeNull(types.number),
  distanceFilter: types.maybeNull(types.number),
  debug: types.maybeNull(types.boolean),
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
    enabled: true,
    alwaysOn: true,
    debugSounds: false,
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
    setPosition({latitude, longitude, accuracy}) {
      self.enabled = true
      if (!self.location) {
        self.location = Location.create({latitude, longitude, accuracy})
      } else {
        self.location.load({latitude, longitude, accuracy})
      }
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
        foregroundService: true, // android only
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

      if (__DEV__ || settings.isStaging) {
        config.logLevel = BackgroundGeolocation.LOG_LEVEL_VERBOSE
      }

      if (reset) {
        yield BackgroundGeolocation.reset(config)
        log(prefix, 'Reset and configure')
      } else {
        yield BackgroundGeolocation.setConfig(config)
        log(prefix, 'Configure')
      }
    }),
  }))
  .actions(self => {
    const {transport} = getEnv(self)
    const wocky: IWocky = (getParent(self) as any).wocky
    const {profile} = wocky
    let watcherID

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
      self.setPosition(position.coords)

      if (profile) {
        const data = createLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
          createdAt: new Date(position.timestamp),
          // .activity does not exist if called from Geolocation
          activity: position.activity ? position.activity.type : null,
          activityConfidence: position.activity ? position.activity.confidence : null,
        })
        profile.setLocation(data)
      }
    }

    function onLocationError(err) {
      if (err === 1) {
        // user denied location permissions
        self.enabled = false
      }

      warn(prefix, 'location error', err)
      BackgroundGeolocation.logger.error(`${prefix} onLocationError ${err}`)
      if (self.debugSounds) BackgroundGeolocation.playSound(1024) // descent
    }

    function onHttp(response) {
      log(prefix, 'on http', response)
      if (response.status >= 200 && response.status < 300) {
        if (self.debugSounds) BackgroundGeolocation.playSound(1016) // tweet sent
        // analytics.track('location_bg_success', {location: self.location})
      } else {
        if (response.status === 401 || response.status === 403) {
          BackgroundGeolocation.stop()
          BackgroundGeolocation.logger.error(`${prefix} BackgroundGeolocation.stop() due to error`)
        }

        if (self.debugSounds) BackgroundGeolocation.playSound(1024) // descent
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
      self.setAlwaysOn(provider.status === BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS)
    }

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
      if (config.debugSounds && !self.debugSounds) BackgroundGeolocation.playSound(1028) // newsflash
      self.setState({
        debugSounds: config.debugSounds,
      })

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

    function emailLog(email) {
      // emailLog doesn't work in iOS simulator so fetch and dump instead
      if (DeviceInfo.isEmulator()) {
        BackgroundGeolocation.getLog(log)
      } else {
        BackgroundGeolocation.emailLog(email)
      }
    }

    return {
      onLocation,
      onLocationError,
      onHttp,
      onMotionChange,
      onActivityChange,
      onProviderChange,
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

    const start = flow(function*() {
      const resp1 = yield Permissions.check('location', {type: 'always'})
      if (resp1 === 'authorized') {
        self.setAlwaysOn(true)
        self.setState({enabled: true})
      } else {
        self.setAlwaysOn(false)
        const resp2 = yield Permissions.check('location', {type: 'whenInUse'})
        self.setState({enabled: resp2 !== 'denied'})
      }

      reactions = [
        autorun(
          async () => {
            if (wocky.connected && wocky.profile && wocky.profile.onboarded && self.alwaysOn) {
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
      BackgroundGeolocation.on('location', self.onLocation, self.onLocationError)
      BackgroundGeolocation.onHttp(self.onHttp)
      // BackgroundGeolocation.onSchedule(state => console.log('ON SCHEDULE!!!!!!!!!' + state.enabled))
      BackgroundGeolocation.onMotionChange(self.onMotionChange)
      BackgroundGeolocation.onActivityChange(self.onActivityChange)
      BackgroundGeolocation.onProviderChange(self.onProviderChange)
      // need to run start to properly set self.alwaysOn
      yield start()
      if (self.alwaysOn) {
        yield self.configure()
        const config = yield BackgroundGeolocation.ready({reset: false})
        log(prefix, 'Ready: ', config)
        self.updateBackgroundConfigSuccess(config)
      }
    })

    function willUnmount() {
      BackgroundGeolocation.logger.info(`${prefix} willUnmount`)
      BackgroundGeolocation.un('location', self.onLocation)
      BackgroundGeolocation.un('http', self.onHttp)
      // backgroundGeolocation.un('error', ??)
      BackgroundGeolocation.un('motionchange', self.onMotionChange)
      BackgroundGeolocation.un('activitychange', self.onActivityChange)
      BackgroundGeolocation.un('providerchange', self.onProviderChange)
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

export default LocationStore
export type ILocationStore = typeof LocationStore.Type
