import {types, getEnv, flow, getParent, getRoot} from 'mobx-state-tree'
import {autorun, IReactionDisposer} from 'mobx'
import Permissions from 'react-native-permissions'
import BackgroundGeolocation from 'react-native-background-geolocation'
import DeviceInfo from 'react-native-device-info'
import {settings} from '../globals'
import {Location, IWocky} from 'wocky-client'
import _ from 'lodash'
import {IStore} from '.'

export const BG_STATE_PROPS = [
  'elasticityMultiplier',
  // 'preventSuspend',
  // 'heartbeatInterval',
  'stopTimeout',
  'desiredAccuracy',
  'distanceFilter',
  'stationaryRadius',
  'activityType',
  'activityRecognitionInterval',
  'debug',
  'logLevel',
]

const prefix = 'BGGL'

// https://github.com/transistorsoft/react-native-background-geolocation/blob/master/docs/README.md#config-integer-desiredaccuracy-0-10-100-1000-in-meters
export const LocationAccuracyChoices = {
  '-1': 'HIGH',
  '10': 'MEDIUM',
  '100': 'LOW',
  '1000': 'VERY_LOW',
}
const LocationAccuracyValues = Object.keys(LocationAccuracyChoices)

// https://github.com/transistorsoft/react-native-background-geolocation/blob/master/docs/README.md#config-integer-activitytype-activity_type_automotive_navigation-activity_type_other_navigation-activity_type_fitness-activity_type_other
export const ActivityTypeChoices = {
  '1': 'OTHER',
  '2': 'AUTOMOTIVE_NAVIGATION',
  '3': 'FITNESS',
  '4': 'OTHER_NAVIGATION',
}
const ActivityTypeValues = Object.keys(ActivityTypeChoices)

export const LogLevelChoices = {
  '0': 'OFF',
  '1': 'ERROR',
  '2': 'WARNING',
  '3': 'INFO',
  '4': 'DEBUG',
  '5': 'VERBOSE',
}
const LogLevelValues = Object.keys(LogLevelChoices)

const BackgroundLocationConfigOptions = types.model('BackgroundLocationConfigOptions', {
  elasticityMultiplier: types.maybeNull(types.number),
  stopTimeout: types.maybeNull(types.number),
  desiredAccuracy: types.maybeNull(types.enumeration(LocationAccuracyValues)),
  distanceFilter: types.maybeNull(types.number),
  stationaryRadius: types.maybeNull(types.number),
  debug: types.maybeNull(types.boolean),
  activityType: types.maybeNull(types.enumeration(ActivityTypeValues)),
  activityRecognitionInterval: types.maybeNull(types.number),
  logLevel: types.maybeNull(types.enumeration(LogLevelValues)),
})

const LocationStore = types
  .model('LocationStore', {
    // should we persist location?
    location: types.maybeNull(Location),
    backgroundOptions: types.optional(BackgroundLocationConfigOptions, {}),
  })
  .volatile(() => ({
    enabled: true,
    alwaysOn: true,
    loading: false,
    debugSounds: false,
  }))
  .views(self => ({
    get isMetric() {
      const {nativeEnv} = getEnv(self)
      return nativeEnv.get('NSLocaleUsesMetricSystem')
    },
  }))
  .views(self => ({
    distance: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371000 // Radius of the earth in m
      const dLat = (lat2 - lat1) * Math.PI / 180 // deg2rad below
      const dLon = (lon2 - lon1) * Math.PI / 180
      const a =
        0.5 -
        Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos(dLon)) / 2

      const res = R * 2 * Math.asin(Math.sqrt(a))
      const result = self.isMetric ? res : res * 3.2808399
      return result
    },
    distanceToString: (distance: number): string => {
      let base, unit
      if (self.isMetric) {
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
      self.loading = false
    },
    positionError(error: any) {
      if (error.code === 1) {
        // user denied location permissions
        self.enabled = false
      }
      self.loading = false
      const logger = getEnv(self).logger
      // @TODO: how do we handle timeout or other error?
      logger.log('LOCATION ERROR:', error, error.message, {level: logger.levels.ERROR})
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
          desiredAccuracy: options.desiredAccuracy.toString(),
          activityType: options.activityType.toString(),
          logLevel: options.logLevel.toString(),
        },
      })
    },
    setState(value) {
      Object.assign(self, value)
    },

    // Set reset to true to reset to defaults
    configure: flow(function*(reset = false) {
      const {logger} = getEnv(self)
      const config = {
        startOnBoot: true,
        stopOnTerminate: false,
        disableLocationAuthorizationAlert: true,
      } as any

      // For non-Prod, don't configure settings which are user configurable
      if (settings.isProduction) {
        config.stopTimeout = 1
        config.distanceFilter = 10
      }

      if (reset) {
        yield BackgroundGeolocation.reset(config)
        logger.log(prefix, 'Reset and configure')
      } else {
        yield BackgroundGeolocation.setConfig(config)
        logger.log(prefix, 'Configure')
      }
    }),
  }))
  .actions(self => {
    const {logger, analytics} = getEnv(self)
    const wocky: IWocky = (getParent(self) as any).wocky

    function onLocation(position) {
      logger.log(prefix, 'location: ', JSON.stringify(position))
      self.setPosition(position.coords)
    }

    function onLocationError(err) {
      logger.warn(prefix, 'location error', err)
      if (self.debugSounds) BackgroundGeolocation.playSound(1024) // descent
    }

    function onHttp(response) {
      logger.log(prefix, 'on http', response)
      if (response.status >= 200 && response.status < 300) {
        if (self.debugSounds) BackgroundGeolocation.playSound(1016) // tweet sent
        // analytics.track('location_bg_success', {location: self.location})
      } else {
        if (response.status === 401 || response.status === 403) {
          BackgroundGeolocation.stop()
          BackgroundGeolocation.logger.error(`${prefix} BackgroundGeolocation.stop() due to error`)
        }

        if (self.debugSounds) BackgroundGeolocation.playSound(1024) // descent
        // analytics.track('location_bg_fail', {response})
      }
    }

    function onHttpError(err) {
      logger.log(prefix, 'on http error', err)

      if (err.status === 401 || err.status === 403) {
        BackgroundGeolocation.stop()
        BackgroundGeolocation.logger.error(
          `${prefix} BackgroundGeolocation.stop() due to http error`
        )
      }

      if (self.debugSounds) BackgroundGeolocation.playSound(1024) // descent
      analytics.track('location_bg_error', {error: err})
    }

    function onMotionChange(location) {
      logger.log(prefix, 'motionchanged:', location)
    }

    function onActivityChange(activityName) {
      logger.log(prefix, 'Current motion activity:', activityName)
    }

    function onProviderChange(provider) {
      logger.log(prefix, 'Location provider changed:', provider)
      const info = JSON.stringify(provider)
      BackgroundGeolocation.logger.info(`${prefix} onProviderChange(${info})`)
      self.setAlwaysOn(provider.status === BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS)
    }

    const refreshCredentials = flow(function*() {
      try {
        const token = yield getEnv(self).transport.getLocationUpdateToken()
        yield BackgroundGeolocation.setConfig({
          url: `https://${settings.getDomain()}/api/v1/users/${wocky.username}/locations`,
          headers: {
            Accept: 'application/json',
            Authentication: `Bearer ${token}`,
          },
          params: {
            device: wocky.transport.resource,
          },
        })
        logger.log(prefix, `refreshCredentials token: ${token}`)
        BackgroundGeolocation.logger.info(`${prefix} refreshCredentials`)
      } catch (err) {
        logger.log(prefix, 'refreshCredentials error', err)
      }
    })

    const invalidateCredentials = flow(function*() {
      yield BackgroundGeolocation.setConfig({
        headers: {},
        params: {},
        url: '',
      })
      logger.log(prefix, 'invalidateCredentials')
      BackgroundGeolocation.logger.info(`${prefix} invalidateCredentials`)
    })

    const getCurrentPosition = flow(function*() {
      logger.log(prefix, 'get current position')
      if (self.loading) return self.location

      self.loading = true
      try {
        const position = yield BackgroundGeolocation.getCurrentPosition({
          timeout: 20,
          maximumAge: 1000,
        })
        self.setPosition(position.coords)
      } catch (err) {
        self.positionError(err)
      }
    })

    function setBackgroundConfig(config) {
      if (config.debugSounds && !self.debugSounds) BackgroundGeolocation.playSound(1028) // newsflash
      self.setState({
        debugSounds: config.debugSounds,
      })

      // For some reason, these parameters must be ints, not strings
      config.activityType = parseInt(config.activityType)
      config.logLevel = parseInt(config.logLevel)
      BackgroundGeolocation.setConfig(config, self.updateBackgroundConfigSuccess)
    }

    function emailLog(email) {
      // emailLog doesn't work in iOS simulator so fetch and dump instead
      if (DeviceInfo.isEmulator()) {
        BackgroundGeolocation.getLog(log => {
          // tslint:disable-next-line
          console.log(log)
        })
      } else {
        BackgroundGeolocation.emailLog(email)
      }
    }

    return {
      onLocation,
      onLocationError,
      onHttp,
      onHttpError,
      onMotionChange,
      onActivityChange,
      onProviderChange,
      refreshCredentials,
      invalidateCredentials,
      getCurrentPosition,
      setBackgroundConfig,
      emailLog,
    }
  })
  .actions(self => {
    const {wocky, onceStore} = getRoot<IStore>(self)
    let reactions: IReactionDisposer[] = []
    const {logger} = getEnv(self)

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
            if (wocky.connected && onceStore.onboarded) {
              try {
                await self.refreshCredentials()
                await self.getCurrentPosition()
                await BackgroundGeolocation.start()
                logger.log(prefix, 'Start')
              } catch (err) {
                // prevent unhandled promise rejection
                logger.log(prefix, 'Start onConnected reaction error', err)
                const errInfo = JSON.stringify(err)
                BackgroundGeolocation.logger.error(
                  `${prefix} Start onConnected reaction error ${errInfo}`
                )
              }
            }
          },
          {name: 'LocationStore: Start RNBGL after connected'}
        ),
        autorun(() => !self.location && onceStore.onboarded && self.getCurrentPosition(), {
          delay: 500,
          name: 'LocationStore: Get current location after cache reset',
        }),
      ]
    })

    function finish() {
      reactions.forEach(disposer => disposer())
      reactions = []
    }

    const didMount = flow(function*() {
      BackgroundGeolocation.logger.info(`${prefix} didMount`)
      yield self.configure()

      BackgroundGeolocation.on('location', self.onLocation, self.onLocationError)
      BackgroundGeolocation.on('http', self.onHttp, self.onHttpError)
      // TODO: figure out how to track RNBGL errors in new version
      // backgroundGeolocation.on('error', self.positionError)
      BackgroundGeolocation.on('motionchange', self.onMotionChange)
      BackgroundGeolocation.on('activitychange', self.onActivityChange)
      BackgroundGeolocation.on('providerchange', self.onProviderChange)

      const config = yield BackgroundGeolocation.ready({})
      logger.log(prefix, 'Ready: ', config)
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
      yield BackgroundGeolocation.stop()
      logger.log(prefix, 'Stop')
    })

    return {
      start,
      finish,
      didMount,
      willUnmount,
      logout,
    }
  })

export default LocationStore
export type ILocationStore = typeof LocationStore.Type
