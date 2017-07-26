// @flow

// import SunCalc from 'suncalc';
import autobind from 'autobind-decorator';
import {observable, computed} from 'mobx';
import locationSvc from './xmpp/locationService';
import profileStore from './profileStore';
import Location from '../model/Location';
import * as log from '../utils/log';
import {settings} from '../globals';
import model from '../model/model';

export const METRIC = 'METRIC';
export const IMPERIAL = 'IMPERIAL';

@autobind
class LocationStore {
  @observable system: string = METRIC;
  @observable date: Date = new Date();
  watch;
  started = false;
  dateInterval;
  @observable location: ?Object = null;
  @observable enabled: boolean = true;
  @computed
  get isDay(): boolean {
    return true;
    // if (!this.location) {
    //     return true;
    // } else {
    //     const times = SunCalc.getTimes(this.date, this.location.latitude, this.location.longitude);
    //     const res = this.date < times.night && this.date > times.nightEnd;
    //     // log.log("IS DAY:", res, this.dateAsString);
    //     return res;
    // }
  }

  constructor() {
    locationSvc.delegate = this;
  }

  // share(coords){
  //   return locationSvc.share(coords);
  // }
  //
  setMetricSystem(type) {
    if (type !== METRIC && type !== IMPERIAL) {
      console.error('Unknown type', type);
    }
    this.system = type;
  }

  distance(lat1, lon1, lat2, lon2) {
    var R = 6371000; // Radius of the earth in m
    var dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = 0.5 - Math.cos(dLat) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;

    const res = R * 2 * Math.asin(Math.sqrt(a));
    const result = this.system === METRIC ? res : res * 3.2808399;
    return result;
  }

  distanceToString(distance) {
    const limit = this.system === METRIC ? 1000 : 5280;
    // if (distance>limit){
    return this.system === METRIC ? `${Math.round(distance / 100) / 10} km` : `${Math.round(distance * 0.00189393939) / 10} mi`;
    // } else {
    //   return this.system === METRIC ? `${Math.trunc(distance)} m` : `${Math.trunc(distance/0.3048)} ft`;
    // }
  }

  onLocationChange(user, {lat, lon, accuracy}) {
    const profile = profileStore.create(user);
    profile.location = new Location({latitude: lat, longitude: lon, accuracy});
  }

  getCurrentPosition() {
    // the first time this runs after the app is installed the user will see the default location permissions popup
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // log.log('SLOCATION:', position.coords);
        this.enabled = true;
        this.location = position.coords;
        // this.share(this.location);
      },
      (error) => {
        if (error.code === 1) {
          // user denied location permissions
          this.enabled = false;
        }
        // @TODO: how do we handle timeout or other error?
        log.log('LOCATION ERROR:', error, error.message, {level: log.levels.ERROR});
      },
      {timeout: 20000, maximumAge: 1000},
    );
  }

  start() {
    typeof navigator !== 'undefined' && this.getCurrentPosition();

    if (this.started) {
      return;
    }
    this.started = true;
    log.log('LOCATION START', {level: log.levels.VERBOSE});

    // this.dateInterval = setInterval(() => {this.date = new Date();this.getCurrentPosition()
    //    }, 60*1000);
    if (typeof navigator !== 'undefined') {
      // we don't need own watching because RNBL does it
      this.watch = navigator.geolocation.watchPosition(
        (position) => {
          log.log('GLOCATION:', position.coords, {level: log.levels.VERBOSE});
          this.location = position.coords;
          //          this.share(this.location);
        },
        () => {},
        {timeout: 20000, maximumAge: 1000},
      );
      this.startBackground();
    } else {
      log.log('NAVIGATOR IS NULL!', {level: log.levels.ERROR});
    }
  }

  startBackground() {
    log.log('BACKGROUND LOCATION START', model.user, model.password);
    if (typeof navigator !== 'undefined') {
      const BackgroundGeolocation = require('react-native-background-geolocation');
      const BackgroundFetch = require('react-native-background-fetch');

      BackgroundFetch.configure(
        {
          stopOnTerminate: false,
        },
        () => {
          log.log('[js] Received background-fetch event');

          // To signal completion of your task to iOS, you must call #finish!
          // If you fail to do this, iOS can kill your app.
          BackgroundFetch.finish();
        },
        (error) => {
          log.log('[js] RNBackgroundFetch failed to start');
        },
      );

      // // This handler fires whenever bgGeo receives a location update.
      BackgroundGeolocation.on('location', (position) => {
        log.log('- [js]location: ', JSON.stringify(position));
        this.location = position.coords;
        // we don't need it because we have HTTP location share
        // this.share(this.location);
      });

      // This handler fires when movement states changes (stationary->moving; moving->stationary)
      BackgroundGeolocation.on('http', (response) => {
        log.log('- [js]http: ', response.responseText);
        //        log.log('- [js]http: ', JSON.parse(response.responseText));
      });
      // This handler fires whenever bgGeo receives an error
      BackgroundGeolocation.on('error', (error) => {
        var type = error.type;
        var code = error.code;
        // alert(type + " Error: " + code);
      });

      // This handler fires when movement states changes (stationary->moving; moving->stationary)
      BackgroundGeolocation.on('motionchange', (location) => {
        log.log('- [js]motionchanged: ', JSON.stringify(location));
      });

      // This event fires when a chnage in motion activity is detected
      BackgroundGeolocation.on('activitychange', (activityName) => {
        log.log('- Current motion activity: ', activityName); // eg: 'on_foot', 'still', 'in_vehicle'
      });

      // This event fires when the user toggles location-services
      BackgroundGeolocation.on('providerchange', (provider) => {
        log.log('- Location provider changed: ', provider.enabled);
      });
      let url = `https://${settings.getDomain()}/api/v1/users/${model.user}/location`;
      url = url.replace('staging.dev', 'staging.prod');
      // log.log(`LOCATION UPDATE URL: ${url}`);
      BackgroundGeolocation.configure(
        {
          // Geolocation Config
          desiredAccuracy: 0,
          useSignificantChangesOnly: true,
          stationaryRadius: 20,
          distanceFilter: 30,
          // Activity Recognition
          stopTimeout: 1,
          // Application config
          debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
          //        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
          stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
          startOnBoot: false, // <-- Auto start tracking when device is powered-up.
          // HTTP / SQLite config
          url,
          batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
          autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
          maxDaysToPersist: 1, // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
          headers: {
            // <-- Optional HTTP headers
            'X-Auth-User': model.user,
            'X-Auth-Token': model.password,
          },
          params: {
            // <-- Optional HTTP params
            resource: 'testing',
          },
        },
        (state) => {
          log.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

          if (!state.enabled) {
            BackgroundGeolocation.start(() => {
              log.log('- Start success');
            });
          }
        },
      );
    }
  }

  backgroundStop() {
    const BackgroundGeolocation = require('react-native-background-geolocation');
    if (typeof BackgroundGeolocation !== 'undefined') {
      BackgroundGeolocation.stop();
    }
  }

  finish() {
    this.started = false;
    // this.backgroundStop();
    log.log('LOCATION FINISH');
    if (this.watch) {
      navigator.geolocation.clearWatch(this.watch);
      this.watch = null;
    }
    if (this.dateInterval) {
      clearInterval(this.dateInterval);
    }
  }
}

export default new LocationStore();
