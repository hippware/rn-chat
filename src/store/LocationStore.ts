import {types, getEnv, flow, hasParent, getParent, isAlive} from 'mobx-state-tree'
import {reaction, autorun} from 'mobx'
import Permissions from 'react-native-permissions'
import {settings} from '../globals'
import {ILocationSnapshot, Location, IWocky} from 'wocky-client'

const METRIC = 'METRIC'
const IMPERIAL = 'IMPERIAL'
const METRIC_TYPE = types.literal(METRIC)
const IMPERIAL_TYPE = types.literal(IMPERIAL)

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
    setPosition(location: ILocationSnapshot) {
      self.enabled = true
      Object.assign(self, {location})
      if (hasParent(self) && getParent(self).wocky) {
        const wocky: IWocky = getParent(self).wocky
        wocky.setLocation(location)
      }
      self.loading = false
      // TODO: share location via wocky-client
      // this.share(this.location);
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
    setAlwaysOn(value) {
      self.alwaysOn = value
    },
    updateBackgroundConfigSuccess(state) {
      const {
        desiredAccuracy,
        distanceFilter,
        stationaryRadius,
        activityType,
        activityRecognitionInterval,
        debug,
      } = state
      Object.assign(self, {
        backgroundOptions: {
          desiredAccuracy: desiredAccuracy.toString(),
          distanceFilter,
          stationaryRadius,
          activityType: activityType.toString(),
          activityRecognitionInterval,
          debug,
        },
      })
    },
    setState(value) {
      Object.assign(self, value)
    },
  }))
  .actions(self => {
    const {logger, nativeEnv, backgroundGeolocation, backgroundFetch} = getEnv(self)

    function startBackground() {
      const wocky: IWocky = getParent(self).wocky
      if (typeof navigator !== 'undefined') {
        logger.log('BACKGROUND LOCATION START')

        backgroundFetch.configure(
          {
            stopOnTerminate: false,
          },
          () => {
            logger.log('background-fetch: Received background-fetch event')

            // todo: explicitly call for an update on position?

            // To signal completion of your task to iOS, you must call #finish!
            // If you fail to do this, iOS can kill your app.
            backgroundFetch.finish()
          },
          error => {
            logger.log('[js] RNBackgroundFetch failed to start ' + error)
          }
        )

        // // This handler fires whenever bgGeo receives a location update.
        backgroundGeolocation.on('location', position => {
          logger.log('- [js]location: ', JSON.stringify(position))
          self.setPosition(position.coords)
          // this.location = position.coords;
          // we don't need it because we have HTTP location share
          // this.share(this.location);
        })

        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        backgroundGeolocation.on(
          'http',
          (response) => {
            logger.log('- [js]http sent', response)
            // success
            if (self.debugSounds) backgroundGeolocation.playSound(1016) // tweet sent
          },
          () => {
            // fail
            if (self.debugSounds) backgroundGeolocation.playSound(1024) // descent
          }
        )

        // This handler fires whenever bgGeo receives an error
        backgroundGeolocation.on('error', error => {
          self.positionError(error)
          // var type = error.type;
          // var code = error.code;
          // alert(type + " Error: " + code);
        })

        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        backgroundGeolocation.on('motionchange', location => {
          logger.log('- [js]motionchanged: ', JSON.stringify(location))
        })

        // This event fires when a chnage in motion activity is detected
        backgroundGeolocation.on('activitychange', activityName => {
          logger.log('- Current motion activity: ', activityName) // eg: 'on_foot', 'still', 'in_vehicle'
        })

        // This event fires when the user toggles location-services
        backgroundGeolocation.on('providerchange', provider => {
          logger.log('- Location provider changed: ', provider)

          self.setAlwaysOn(provider.status === backgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS)
        })
        const url = `https://${settings.getDomain()}/api/v1/users/${wocky.username}/locations`
        logger.log(`LOCATION UPDATE URL: ${url} ${wocky.username} ${wocky.password}`)
        backgroundGeolocation.ready(
          {
            // Geolocation Config
            desiredAccuracy: backgroundGeolocation.DESIRED_ACCURACY_HIGH,
            useSignificantChangesOnly: false,
            stationaryRadius: 25,
            distanceFilter: 30,
            // Activity Recognition
            stopTimeout: 1,
            // Application config
            debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
            logLevel: backgroundGeolocation.LOG_LEVEL_ERROR,
            stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
            startOnBoot: true, // <-- Auto start tracking when device is powered-up.
            // HTTP / SQLite config
            url,
            // batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
            autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
            // maxDaysToPersist: 1, // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
            headers: {
              'X-Auth-User': wocky.username,
              'X-Auth-Token': wocky.password,
            },
            params: {
              resource: 'testing',
            },
          },
          state => {
            logger.log('- BackgroundGeolocation is configured and ready: ', state)
            self.updateBackgroundConfigSuccess(state)

            if (!state.enabled && self.alwaysOn) {
              backgroundGeolocation.start(() => {
                logger.log('- Start success')
              })
            } else if (state.enabled && !self.alwaysOn) {
              backgroundGeolocation.stop()
            }
          }
        )
      }
    }

    function stopBackground() {
      if (typeof backgroundGeolocation !== 'undefined') {
        backgroundGeolocation.stop()
      }
    }

    function initialize() {
      const system = nativeEnv.get('NSLocaleUsesMetricSystem') ? 'METRIC' : 'IMPERIAL'
      self.setMetricSystem(system)
    }

    const getCurrentPosition = flow(function*() {
      if (self.loading) return self.location
      self.loading = true
      yield new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            self.setPosition(position.coords)
            resolve()
          },
          error => {
            self.positionError(error)
            reject()
          },
          {timeout: 20000, maximumAge: 1000, enableHighAccuracy: false}
        )
      })
    })

    function setBackgroundConfig(config) {
      backgroundGeolocation.setConfig(config, self.updateBackgroundConfigSuccess)
      if (config.debugSounds && !self.debugSounds) backgroundGeolocation.playSound(1028) // newsflash
      self.setState({debugSounds: config.debugSounds})
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
    let connectivityStore
    let handler

    function afterAttach() {
      self.initialize()
      ;({wocky, connectivityStore} = getParent(self))
      autorun('LocationStore toggler', () => {
        if (connectivityStore && isAlive(connectivityStore) && connectivityStore.isActive) start()
        else finish()
      })
    }
    function start() {
      Permissions.check('location', {type: 'always'}).then(response =>
        self.setAlwaysOn(response === 'authorized')
      )
      handler = reaction(
        () => wocky.connected,
        () => {
          self.getCurrentPosition()
          self.startBackground()
        }
      )
    }

    function finish() {
      if (!self.alwaysOn) {
        self.stopBackground()
      }
      handler()
    }

    return {afterAttach, start, finish}
  })

export default LocationStore
export type ILocationStore = typeof LocationStore.Type
