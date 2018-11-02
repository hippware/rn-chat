import {types, getEnv, flow, getParent} from 'mobx-state-tree'
import {when, autorun, IReactionDisposer} from 'mobx'
import Permissions from 'react-native-permissions'
import {settings} from '../globals'
import {Location, IWocky} from 'wocky-client'
import _ from 'lodash'

const METRIC = 'METRIC'
const IMPERIAL = 'IMPERIAL'
const METRIC_TYPE = types.literal(METRIC)
const IMPERIAL_TYPE = types.literal(IMPERIAL)
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

// TODO any idea how to move these vars inside LocationStore as volatile with ts strict mode enabled?
let backgroundGeolocation: any
let watch: number | null = null

const LocationStore = types
  .model('LocationStore', {
    // should we persist location?
    location: types.maybeNull(Location),
    backgroundOptions: types.optional(BackgroundLocationConfigOptions, {}),
  })
  .volatile(() => ({
    enabled: true,
    alwaysOn: true,
    system: types.optional(types.union(METRIC_TYPE, IMPERIAL_TYPE), METRIC),
    loading: false,
    debugSounds: false,
  }))
  .actions(self => ({
    disposeBackgroundGeolocation: () => {
      if (backgroundGeolocation) {
        backgroundGeolocation.stop()
        backgroundGeolocation.removeListeners()
        backgroundGeolocation = null
      }
    },
  }))
  .views(self => ({
    get isMetric() {
      return METRIC_TYPE.is(self.system)
    },
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
    setMetricSystem(type) {
      self.system = type
    },
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
    setAlwaysOn: flow(function*(value: boolean) {
      self.alwaysOn = value
      if (!value) {
        self.disposeBackgroundGeolocation()
      }
    }),
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
  }))
  .actions(self => {
    const {logger, nativeEnv, analytics} = getEnv(self)

    function onLocation(position) {
      logger.log(prefix, 'location: ', JSON.stringify(position))
      self.setPosition(position.coords)
    }

    function onLocationError(err) {
      logger.warn(prefix, 'location error', err)
      if (self.debugSounds && backgroundGeolocation) backgroundGeolocation.playSound(1024) // descent
    }

    function onHttp(response) {
      logger.log(prefix, 'on http', response)
      if (response.status >= 200 && response.status < 300) {
        if (self.debugSounds && backgroundGeolocation) backgroundGeolocation.playSound(1016) // tweet sent
        // analytics.track('location_bg_success', {location: self.location})
      } else {
        if (self.debugSounds && backgroundGeolocation) backgroundGeolocation.playSound(1024) // descent
        // analytics.track('location_bg_fail', {response})
      }
    }

    function onHttpError(err) {
      logger.log(prefix, 'on http error', err)
      if (self.debugSounds && backgroundGeolocation) backgroundGeolocation.playSound(1024) // descent
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
      self.setAlwaysOn(provider.status === 3)
      if (!self.alwaysOn) {
        self.disposeBackgroundGeolocation()
      }
    }

    const startBackground = flow(function*() {
      const wocky: IWocky = (getParent(self) as any).wocky
      // don't run background service if user doesn't enable alwaysOn
      if (!self.alwaysOn) {
        return
      }
      if (!backgroundGeolocation) {
        backgroundGeolocation = require('react-native-background-geolocation').default
        backgroundGeolocation.on('location', onLocation, onLocationError)
        backgroundGeolocation.on('http', onHttp, onHttpError)
        // TODO: figure out how to track RNBGL errors in new version
        // backgroundGeolocation.on('error', self.positionError)
        backgroundGeolocation.on('motionchange', onMotionChange)
        backgroundGeolocation.on('activitychange', onActivityChange)
        backgroundGeolocation.on('providerchange', onProviderChange)
        backgroundGeolocation = backgroundGeolocation
      }

      const url = `https://${settings.getDomain()}/api/v1/users/${wocky.username}/locations`

      const headers = {
        Accept: 'application/json',
        'X-Auth-User': wocky.username!,
        'X-Auth-Token': wocky.password!,
      }

      logger.log(prefix, 'BACKGROUND LOCATION START')
      logger.log(`LOCATION UPDATE URL: ${url}`)

      const params = {
        resource: wocky.transport.resource,
      }

      // initial config (only applies to first app boot without explicitly setting `reset: true`)
      const state = yield backgroundGeolocation.ready({
        // reset: true,
        desiredAccuracy: backgroundGeolocation.DESIRED_ACCURACY_HIGH,
        elasticityMultiplier: 1,
        preventSuspend: false,
        useSignificantChangesOnly: false,
        stationaryRadius: 25,
        distanceFilter: 30,
        stopTimeout: 0, // https://github.com/transistorsoft/react-native-background-geolocation/blob/master/docs/README.md#config-integer-minutes-stoptimeout
        debug: false,
        // logLevel: backgroundGeolocation.LOG_LEVEL_VERBOSE,
        logLevel: backgroundGeolocation.LOG_LEVEL_ERROR,
        // stopOnTerminate: false,
        // startOnBoot: true,
        url,
        autoSync: true,
        params,
        headers,
      })

      // .ready() doesn't always apply configuration.
      // Here are some things that we have to configure everytime.
      // Note: If any user-configurable/debug settings appear here,
      //   they will be overwritten
      yield backgroundGeolocation.setConfig({
        startOnBoot: true,
        stopOnTerminate: false,
        headers,
        params,
        url,
      })

      logger.log(prefix, 'is configured and ready: ', state)
      self.updateBackgroundConfigSuccess(state)

      if (!state.enabled && self.alwaysOn) {
        backgroundGeolocation.start(() => {
          logger.log(prefix, 'Start success')
        })
      } else if (state.enabled && !self.alwaysOn) {
        self.disposeBackgroundGeolocation()
      }
    })

    function stopBackground() {
      self.disposeBackgroundGeolocation()
    }

    function initialize() {
      const system = nativeEnv.get('NSLocaleUsesMetricSystem') ? 'METRIC' : 'IMPERIAL'
      self.setMetricSystem(system)
    }

    const getCurrentPosition = flow(function*() {
      logger.log(prefix, 'get current position')
      if (self.loading) return self.location
      // run own GPS watcher if backgroundGeolocation is not available
      if (!backgroundGeolocation) {
        if (navigator && watch === null) {
          watch = navigator.geolocation.watchPosition(
            position => {
              self.setPosition(position.coords)
            },
            undefined,
            {
              timeout: 20,
              maximumAge: 1000,
              enableHighAccuracy: false,
            }
          )
        }
        return
      }
      self.loading = true
      try {
        const position = yield backgroundGeolocation.getCurrentPosition({
          timeout: 20,
          maximumAge: 1000,
          enableHighAccuracy: false,
        })
        self.setPosition(position.coords)
      } catch (err) {
        self.positionError(err)
      }
    })

    function setBackgroundConfig(config) {
      if (config.debugSounds && !self.debugSounds && backgroundGeolocation)
        backgroundGeolocation.playSound(1028) // newsflash
      self.setState({
        debugSounds: config.debugSounds,
      })
      if (backgroundGeolocation) {
        // For some reason, these parameters must be ints, not strings
        config.activityType = parseInt(config.activityType)
        config.logLevel = parseInt(config.logLevel)
        backgroundGeolocation.setConfig(config, self.updateBackgroundConfigSuccess)
      }
    }

    function emailLog(email) {
      if (backgroundGeolocation) {
        backgroundGeolocation.emailLog(email)
      }
    }

    return {
      stopBackground,
      startBackground,
      getCurrentPosition,
      initialize,
      setBackgroundConfig,
      emailLog,
    }
  })
  .actions(self => {
    let wocky
    let reactions: IReactionDisposer[] = []

    function afterAttach() {
      self.initialize()
      ;({wocky} = getParent(self) as any)
    }

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

      if (!self.alwaysOn) {
        self.stopBackground()
      }

      reactions = [
        when(() => wocky.connected, () => self.startBackground().then(self.getCurrentPosition), {
          name: 'LocationStore: Start background after connected',
        }),
        autorun(() => !self.location && self.getCurrentPosition(), {
          delay: 500,
          name: 'LocationStore: Get current location after cache reset',
        }),
      ]
    })

    function finish() {
      reactions.forEach(disposer => disposer())
      reactions = []
      if (navigator && watch !== null) {
        navigator.geolocation.clearWatch(watch!)
        watch = null
      }
    }

    return {
      afterAttach,
      start,
      finish,
    }
  })

export default LocationStore
export type ILocationStore = typeof LocationStore.Type
