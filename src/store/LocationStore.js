// @flow

import {types, getEnv, flow, getParent} from 'mobx-state-tree';
import {when, autorun, reaction} from 'mobx';
import Permissions from 'react-native-permissions';
import {settings} from '../globals';

export const Location = types.model('Location', {
  longitude: types.number,
  latitude: types.number,
  accuracy: types.number,
});

const METRIC = 'METRIC';
const IMPERIAL = 'IMPERIAL';

const LocationStore = types
  .model('LocationStore', {})
  .volatile(self => ({
    // TODO: should we persist location?
    location: types.maybe(Location),
    enabled: true,
    alwaysOn: true,
    system: types.optional(types.enumeration('Metric system', [METRIC, IMPERIAL]), METRIC),
    loading: false,
  }))
  .views(self => ({
    distance: (lat1, lon1, lat2, lon2) => {
      var R = 6371000; // Radius of the earth in m
      var dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = 0.5 - Math.cos(dLat) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;

      const res = R * 2 * Math.asin(Math.sqrt(a));
      const result = self.system === METRIC ? res : res * 3.2808399;
      return result;
    },

    distanceToString: (distance) => {
      const limit = self.system === METRIC ? 1000 : 5280;
      // if (distance>limit){
      return self.system === METRIC ? `${Math.round(distance / 100) / 10} km` : `${Math.round(distance * 0.00189393939) / 10} mi`;
      // } else {
      //   return this.system === METRIC ? `${Math.trunc(distance)} m` : `${Math.trunc(distance/0.3048)} ft`;
      // }
    },

    distanceFromBot: (botLoc: {latitude: number, longitude: number}) => {
      const {location, distanceToString, distance} = self;
      if (location && botLoc) {
        return distanceToString(distance(location.latitude, location.longitude, botLoc.latitude, botLoc.longitude));
      }
      return null;
    },
  }))
  .actions((self) => {
    const {logger, geolocation, nativeEnv} = getEnv(self);
    let wocky, watch, handler;

    function afterAttach() {
      ({wocky} = getParent(self));
      self.initialize();
      self.start();
    }
    function start() {
      Permissions.check('location', {type: 'always'}).then((response) => self.setAlwaysOn(response === 'authorized'));
      handler = reaction(
        () => wocky.connected,
        () => {
          self.startBackground();
        },
      );
      self.getCurrentPosition();
    }

    function finish() {
      if (!self.alwaysOn) {
        self.stopBackground();
      }
      handler();
    }

    function startBackground() {
      const model = getParent(self).wocky;
      const {backgroundGeolocation, backgroundFetch} = getEnv(self);
      if (typeof navigator !== 'undefined') {
        logger.log('BACKGROUND LOCATION START');

        backgroundFetch.configure(
          {
            stopOnTerminate: false,
          },
          () => {
            logger.log('background-fetch: Received background-fetch event');

            // todo: explicitly call for an update on position?

            // To signal completion of your task to iOS, you must call #finish!
            // If you fail to do this, iOS can kill your app.
            backgroundFetch.finish();
          },
          (error) => {
            logger.log('[js] RNBackgroundFetch failed to start');
          },
        );

        // // This handler fires whenever bgGeo receives a location update.
        backgroundGeolocation.on('location', (position) => {
          logger.log('- [js]location: ', JSON.stringify(position));
          self.setPosition(position);
          // this.location = position.coords;
          // we don't need it because we have HTTP location share
          // this.share(this.location);
        });

        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        backgroundGeolocation.on('http', (response) => {
          logger.log('- [js]http: ', response.responseText);
          //        logger.log('- [js]http: ', JSON.parse(response.responseText));
        });

        // This handler fires whenever bgGeo receives an error
        backgroundGeolocation.on('error', (error) => {
          self.positionError(error);
          // var type = error.type;
          // var code = error.code;
          // alert(type + " Error: " + code);
        });

        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        backgroundGeolocation.on('motionchange', (location) => {
          logger.log('- [js]motionchanged: ', JSON.stringify(location));
        });

        // This event fires when a chnage in motion activity is detected
        backgroundGeolocation.on('activitychange', (activityName) => {
          logger.log('- Current motion activity: ', activityName); // eg: 'on_foot', 'still', 'in_vehicle'
        });

        // This event fires when the user toggles location-services
        backgroundGeolocation.on('providerchange', (provider) => {
          logger.log('- Location provider changed: ', provider);

          self.setAlwaysOn(provider.status === backgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS);
        });
        const url = `https://${settings.getDomain()}/api/v1/users/${model.username}/locations`;
        logger.log(`LOCATION UPDATE URL: ${url} ${model.username} ${model.password}`);
        backgroundGeolocation.configure(
          {
            // Geolocation Config
            desiredAccuracy: 0,
            useSignificantChangesOnly: false,
            stationaryRadius: 20,
            distanceFilter: 30,
            // Activity Recognition
            stopTimeout: 1,
            // Application config
            debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
            // logLevel: backgroundGeolocation.LOG_LEVEL_VERBOSE,
            stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
            startOnBoot: true, // <-- Auto start tracking when device is powered-up.
            // HTTP / SQLite config
            url,
            // batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
            autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
            // maxDaysToPersist: 1, // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
            headers: {
              // <-- Optional HTTP headers
              'X-Auth-User': model.username,
              'X-Auth-Token': model.password,
            },
            params: {
              // <-- Optional HTTP params
              resource: 'testing',
            },
          },
          (state) => {
            logger.log('- BackgroundGeolocation is configured and ready: ', state);

            if (!state.enabled && self.alwaysOn) {
              backgroundGeolocation.start(() => {
                logger.log('- Start success');
              });
            } else if (state.enabled && !self.alwaysOn) {
              backgroundGeolocation.stop();
            }
          },
        );
      }
    }

    function stopBackground() {
      const {backgroundGeolocation} = getEnv(self);
      if (typeof backgroundGeolocation !== 'undefined') {
        backgroundGeolocation.stop();
      }
    }

    function initialize() {
      const system = nativeEnv.get('NSLocaleUsesMetricSystem') ? 'METRIC' : 'IMPERIAL';
      setMetricSystem(system);
    }

    function setMetricSystem(type) {
      self.system = type;
    }

    const getCurrentPosition = flow(function* getCurrentPosition() {
      if (self.loading) return self.location;
      self.loading = true;
      yield new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            self.setPosition(position);
            resolve();
          },
          (error) => {
            self.positionError(error);
            reject();
          },
          {timeout: 20000, maximumAge: 1000, enableHighAccuracy: false},
        );
      });
    });

    function setPosition(position) {
      self.enabled = true;
      self.location = position.coords;
      self.loading = false;
      // TODO: share location via wocky-client
      // this.share(this.location);
    }

    function positionError(error) {
      if (error.code === 1) {
        // user denied location permissions
        self.enabled = false;
      }
      self.loading = false;
      // @TODO: how do we handle timeout or other error?
      logger.log('LOCATION ERROR:', error, error.message, {level: logger.levels.ERROR});
    }

    function watchPosition() {
      if (!watch) {
        watch = geolocation.watchPosition(self.setPosition, self.positionError, {
          timeout: 20000,
          maximumAge: 60000,
          enableHighAccuracy: false,
        });
      }
    }

    function setAlwaysOn(value) {
      self.alwaysOn = value;
    }

    return {start, finish, afterAttach, setAlwaysOn, watchPosition, setPosition, stopBackground, startBackground, positionError, getCurrentPosition, initialize};
  });

export default LocationStore;
