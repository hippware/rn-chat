import {types, getEnv, flow, getParent} from 'mobx-state-tree'
import {when} from 'mobx'
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
    fetchResult: 0,
  })
  .volatile(() => ({
    enabled: true,
    alwaysOn: true,
    backgroundGeolocation: null,
    watch: null,
    system: types.optional(types.union(METRIC_TYPE, IMPERIAL_TYPE), METRIC),
    loading: false,
    debugSounds: false,
  }))
  .actions(self => ({
    disposeBackgroundGeolocation: () => {
      if (self.backgroundGeolocation) {
        self.backgroundGeolocation.stop()
        self.backgroundGeolocation.removeListeners()
        self.backgroundGeolocation = null
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
        },
      })
    },
    setState(value) {
      Object.assign(self, value)
    },
  }))
  .actions(self => {
    const {logger, nativeEnv, backgroundFetch, analytics} = getEnv(self)

    function onLocation(position) {
      logger.log(prefix, 'location: ', JSON.stringify(position))
      self.setPosition(position.coords)
    }

    function onLocationError(err) {
      logger.warn(prefix, 'location error', err)
      if (self.debugSounds && self.backgroundGeolocation) self.backgroundGeolocation.playSound(1024) // descent
    }

    function onHttp(response) {
      logger.log(prefix, 'on http', response)
      if (response.status >= 200 && response.status < 300) {
        if (self.debugSounds && self.backgroundGeolocation)
          self.backgroundGeolocation.playSound(1016) // tweet sent
        // analytics.track('location_bg_success', {location: self.location})
      } else {
        if (self.debugSounds && self.backgroundGeolocation)
          self.backgroundGeolocation.playSound(1024) // descent
        // analytics.track('location_bg_fail', {response})
      }
    }

    function onHttpError(err) {
      logger.log(prefix, 'on http error', err)
      if (self.debugSounds && self.backgroundGeolocation) self.backgroundGeolocation.playSound(1024) // descent
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

    async function sendLastKnownLocation(extraParams?: object): Promise<void> {
      if (!self.backgroundGeolocation) {
        return
      }
      logger.log(prefix, 'send last known location')
      if (self.location) {
        const {latitude, longitude, accuracy} = self.location
        const {url, headers, params} = await self.backgroundGeolocation.getState()
        logger.log(prefix, 'options:', url, headers, params)
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              ...headers,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...extraParams,
              location: [
                {
                  coords: {latitude, longitude, accuracy},
                },
              ],
              resource: params.resource,
            }),
          })
          onHttp(res)
        } catch (err) {
          onHttpError(err)
        }
      } else {
        analytics.track('location_bg_error', {error: 'no location stored'})
      }
    }

    const startBackground = flow(function*() {
      const wocky: IWocky = getParent(self).wocky
      // don't run background service if user doesn't enable alwaysOn
      if (!self.alwaysOn) {
        return
      }
      if (!self.backgroundGeolocation) {
        self.backgroundGeolocation = require('react-native-background-geolocation').default
        self.backgroundGeolocation.on('location', onLocation, onLocationError)
        self.backgroundGeolocation.on('http', onHttp, onHttpError)
        self.backgroundGeolocation.on('error', self.positionError)
        self.backgroundGeolocation.on('motionchange', onMotionChange)
        self.backgroundGeolocation.on('activitychange', onActivityChange)
        self.backgroundGeolocation.on('providerchange', onProviderChange)
        self.backgroundGeolocation = self.backgroundGeolocation
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
      const state = yield self.backgroundGeolocation.ready({
        // reset: true,
        desiredAccuracy: self.backgroundGeolocation.DESIRED_ACCURACY_HIGH,
        elasticityMultiplier: 1,
        preventSuspend: false,
        useSignificantChangesOnly: false,
        stationaryRadius: 25,
        distanceFilter: 30,
        stopTimeout: 0, // https://github.com/transistorsoft/react-native-background-geolocation/blob/master/docs/README.md#config-integer-minutes-stoptimeout
        debug: false,
        // logLevel: self.backgroundGeolocation.LOG_LEVEL_VERBOSE,
        logLevel: self.backgroundGeolocation.LOG_LEVEL_ERROR,
        stopOnTerminate: false,
        startOnBoot: true,
        url,
        autoSync: true,
        params,
        headers,
      })
      // apply this change every load to prevent stale auth headers
      yield self.backgroundGeolocation.setConfig({headers, params, url})
      logger.log(prefix, 'is configured and ready: ', state)
      self.updateBackgroundConfigSuccess(state)

      if (!state.enabled && self.alwaysOn) {
        self.backgroundGeolocation.start(() => {
          logger.log(prefix, 'Start success')
        })
      } else if (state.enabled && !self.alwaysOn) {
        self.disposeBackgroundGeolocation()
      }

      if (settings.isStaging) {
        // guarantee updates when user isn't moving enough to trigger rnbgl events
        backgroundFetch.configure(
          {
            minimumFetchInterval: 15, // (15 minutes is minimum allowed)
          },
          async () => {
            try {
              analytics.track('location_bg_fetch_start')
              await sendLastKnownLocation({isFetch: true})
            } catch (err) {
              onHttpError(err)
            }
            analytics.track('location_bg_fetch_finish', {result: self.fetchResult})
            backgroundFetch.finish(self.fetchResult)
          },
          error => {
            logger.log('RNBackgroundFetch failed to start', error)
          }
        )
      }
    })

    function stopBackground() {
      self.disposeBackgroundGeolocation()
      backgroundFetch.stop()
    }

    function initialize() {
      const system = nativeEnv.get('NSLocaleUsesMetricSystem') ? 'METRIC' : 'IMPERIAL'
      self.setMetricSystem(system)
    }

    const getCurrentPosition = flow(function*() {
      logger.log(prefix, 'get current position')
      if (self.loading) return self.location
      // run own GPS watcher if backgroundGeolocation is not available
      if (!self.backgroundGeolocation) {
        if (navigator && self.watch === null) {
          self.watch = navigator.geolocation.watchPosition(
            position => {
              self.setPosition(position.coords)
            },
            null,
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
        const position = yield self.backgroundGeolocation.getCurrentPosition({
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
      if (config.debugSounds && !self.debugSounds) self.backgroundGeolocation.playSound(1028) // newsflash
      self.setState({
        debugSounds: config.debugSounds,
        fetchResult: Number.parseInt(config.fetchResult) || 0,
      })
      self.backgroundGeolocation.setConfig(config, self.updateBackgroundConfigSuccess)
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
      handler = when(
        () => wocky.connected,
        () => {
          self.startBackground().then(() => {
            self.getCurrentPosition()
          })
        }
      )
    })

    function finish() {
      if (handler) handler()
      if (navigator && self.watch !== null) {
        navigator.geolocation.clearWatch(self.watch)
        self.watch = null
      }
    }

    return {afterAttach, start, finish}
  })

export default LocationStore
export type ILocationStore = typeof LocationStore.Type
