import {types, getEnv, flow, getParent} from 'mobx-state-tree'
import {autorun} from 'mobx'
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

const BackgroundLocationConfigOptions = types.model('BackgroundLocationConfigOptions', {
  elasticityMultiplier: types.maybe(types.number),
  preventSuspend: true,
  heartbeatInterval: types.maybe(types.number),
  stopTimeout: types.maybe(types.number),
  desiredAccuracy: types.maybe(types.enumeration(LocationAccuracyValues)),
  distanceFilter: types.maybe(types.number),
  stationaryRadius: types.maybe(types.number),
  debug: types.maybe(types.boolean),
  activityType: types.maybe(types.enumeration(ActivityTypeValues)),
  activityRecognitionInterval: types.maybe(types.number),
})

const LocationStore = types
  .model('LocationStore', {
    // should we persist location?
    location: types.maybe(Location),
    backgroundOptions: types.optional(BackgroundLocationConfigOptions, {}),
  })
  .volatile(() => ({
    enabled: true,
    alwaysOn: true,
    system: types.optional(types.union(METRIC_TYPE, IMPERIAL_TYPE), METRIC),
    loading: false,
    debugSounds: false,
  }))
  .views(self => ({
    get isMetric() {
      return METRIC_TYPE.is(self.system)
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
      // const limit = self.system === METRIC ? 1000 : 5280
      // if (distance>limit){
      return self.isMetric
        ? `${Math.round(distance / 100) / 10} km`
        : `${Math.round(distance * 0.00189393939) / 10} mi`
      // } else {
      //   return this.system === METRIC ? `${Math.trunc(distance)} m` : `${Math.trunc(distance/0.3048)} ft`;
      // }
    },
  }))
  .views(self => ({
    distanceFromBot: (botLoc: {latitude: number; longitude: number}): string | undefined => {
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
        const {backgroundGeolocation} = getEnv(self)
        backgroundGeolocation.removeListeners()
      }
    }),
    updateBackgroundConfigSuccess(state) {
      const options = _.pick(state, BG_STATE_PROPS)
      Object.assign(self, {
        backgroundOptions: {
          ...options,
          desiredAccuracy: options.desiredAccuracy.toString(),
          activityType: options.activityType.toString(),
        },
      })
    },
    setState(value) {
      Object.assign(self, value)
    },
  }))
  .actions(self => {
    const {logger, nativeEnv, backgroundGeolocation, backgroundFetch} = getEnv(self)

    // function onHeartbeat(data) {
    //   logger.log(prefix, 'heartbeat:', JSON.stringify(data))
    //   backgroundGeolocation.getCurrentPosition(
    //     location => {
    //       logger.log(prefix, 'Current position received: ', JSON.stringify(location))
    //     },
    //     errorCode => {
    //       logger.log(prefix, 'A location error occurred: ' + errorCode)
    //     },
    //     {
    //       timeout: 30, // 30 second timeout to fetch location
    //       maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
    //       desiredAccuracy: 10, // Try to fetch a location with an accuracy of `10` meters.
    //       samples: 3, // How many location samples to attempt.
    //     }
    //   )
    // }

    function onLocation(position) {
      logger.log(prefix, 'location: ', JSON.stringify(position))
      self.setPosition(position.coords)
    }

    function onLocationError(err) {
      logger.warn(prefix, 'location error', err)
      if (self.debugSounds) backgroundGeolocation.playSound(1024) // descent
    }

    function onHttp(response) {
      logger.log(prefix, 'http sent:', response)
      if (response.status >= 200 && response.status < 300) {
        if (self.debugSounds) backgroundGeolocation.playSound(1016) // tweet sent
      } else {
        if (self.debugSounds) backgroundGeolocation.playSound(1024) // descent
      }
    }

    function onHttpError(err) {
      logger.warn(prefix, 'http error:', err)
      if (self.debugSounds) backgroundGeolocation.playSound(1024) // descent
    }

    function onMotionChange(location) {
      logger.log(prefix, 'motionchanged:', location)
    }

    function onActivityChange(activityName) {
      logger.log(prefix, 'Current motion activity:', activityName)
    }

    function onProviderChange(provider) {
      logger.log(prefix, 'Location provider changed:', provider)
      self.setAlwaysOn(provider.status === backgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS)
    }

    const startBackground = flow(function*() {
      const wocky: IWocky = getParent(self).wocky
      logger.log(prefix, 'BACKGROUND LOCATION START')

      const url = `https://${settings.getDomain()}/api/v1/users/${wocky.username}/locations`
      logger.log(`LOCATION UPDATE URL: ${url}`)

      const headers = {
        Accept: 'application/json',
        'X-Auth-User': wocky.username!,
        'X-Auth-Token': wocky.password!,
      }

      const params = {
        resource: wocky.transport.resource,
      }

      // initial config (only applies to first app boot without explicitly setting `reset: true`)
      const state = yield backgroundGeolocation.ready({
        // reset: true,
        desiredAccuracy: backgroundGeolocation.DESIRED_ACCURACY_HIGH,
        elasticityMultiplier: 1,
        preventSuspend: false,
        // heartbeatInterval: 60,
        useSignificantChangesOnly: false,
        stationaryRadius: 25,
        distanceFilter: 30,
        stopTimeout: 0, // https://github.com/transistorsoft/react-native-background-geolocation/blob/master/docs/README.md#config-integer-minutes-stoptimeout
        debug: false,
        // logLevel: backgroundGeolocation.LOG_LEVEL_VERBOSE,
        logLevel: backgroundGeolocation.LOG_LEVEL_ERROR,
        stopOnTerminate: false,
        startOnBoot: true,
        url,
        autoSync: true,
        params,
        headers,
      })
      // apply this change every load to prevent stale auth headers
      yield backgroundGeolocation.setConfig({headers, params})
      logger.log(prefix, 'is configured and ready: ', state)
      self.updateBackgroundConfigSuccess(state)

      if (!state.enabled && self.alwaysOn) {
        backgroundGeolocation.start(() => {
          logger.log(prefix, 'Start success')
        })
      } else if (state.enabled && !self.alwaysOn) {
        backgroundGeolocation.stop()
      }

      // guarantee updates when user isn't active enough to trigger rnbgl events
      backgroundFetch.configure(
        {
          minimumFetchInterval: 15, // (15 minutes is minimum allowed)
        },
        async () => {
          try {
            // send last known location
            if (self.location) {
              const {latitude, longitude, accuracy} = self.location
              await fetch(url, {
                method: 'POST',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  location: [
                    {
                      coords: {latitude, longitude, accuracy},
                    },
                  ],
                  resource: wocky.transport.resource,
                }),
              })
            }
          } catch (err) {
            logger.log('fetch error', err)
          }
          backgroundFetch.finish()
        },
        error => {
          logger.log('RNBackgroundFetch failed to start', error)
        }
      )
    })

    function stopBackground() {
      backgroundGeolocation.stop()
      backgroundFetch.stop()
    }

    function initialize() {
      const system = nativeEnv.get('NSLocaleUsesMetricSystem') ? 'METRIC' : 'IMPERIAL'
      self.setMetricSystem(system)

      backgroundGeolocation.on('location', onLocation, onLocationError)
      backgroundGeolocation.on('http', onHttp, onHttpError)
      backgroundGeolocation.on('error', self.positionError)
      backgroundGeolocation.on('motionchange', onMotionChange)
      // backgroundGeolocation.on('heartbeat', onHeartbeat)
      backgroundGeolocation.on('activitychange', onActivityChange)
      backgroundGeolocation.on('providerchange', onProviderChange)
    }

    const getCurrentPosition = flow(function*() {
      logger.log(prefix, 'get current position')
      if (self.loading) return self.location
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
      if (config.debugSounds && !self.debugSounds) backgroundGeolocation.playSound(1028) // newsflash
      self.setState({debugSounds: config.debugSounds})
      backgroundGeolocation.setConfig(config, self.updateBackgroundConfigSuccess)
    }

    return {
      stopBackground,
      startBackground,
      getCurrentPosition,
      initialize,
      setBackgroundConfig,
    }
  })
  .actions(self => {
    let wocky
    let handler

    function afterAttach() {
      self.initialize()
      ;({wocky} = getParent(self))
    }

    function start() {
      Permissions.check('location', {type: 'always'}).then(response =>
        self.setAlwaysOn(response === 'authorized')
      )
      handler = autorun(() => {
        if (wocky.connected) {
          self.startBackground().then(() => {
            self.getCurrentPosition()
          })
        }
      })
    }

    function finish() {
      if (!self.alwaysOn) {
        // is this necessary? Might turn off automatically without call
        self.stopBackground()
      }
      if (handler) handler()
    }

    return {afterAttach, start, finish}
  })

export default LocationStore
export type ILocationStore = typeof LocationStore.Type
