// @flow

import {types, getEnv, flow} from 'mobx-state-tree';

const Location = types.model('Location', {
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
    system: types.optional(types.enumeration('Metric system', [METRIC, IMPERIAL]), METRIC),
  })).views(self => ({
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
    }

  }))
  .actions((self) => {
    const {logger, geolocation, nativeEnv} = getEnv(self);
    const {wocky} = self;
    let watch;

    function afterCreate() {
      self.getCurrentPosition();

      const system = nativeEnv.get('NSLocaleUsesMetricSystem') ? 'METRIC' : 'IMPERIAL';
      setMetricSystem(system);

      watch = geolocation.watchPosition(
        (position) => {
          logger.log('GLOCATION:', position.coords, {level: logger.levels.VERBOSE});
          this.location = position.coords;
          // this.share(this.location);
        },
        () => {},
        {
          timeout: 20000,
          maximumAge: 20000,
          enableHighAccuracy: false,
        },
      );
    }

    function setMetricSystem(type) {
      self.system = type;
    }

    const getCurrentPosition = flow(function* getCurrentPosition() {
      yield new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            self.setPosition(position);
            resolve(position);
          },
          (error) => {
            self.positionError(error);
            reject(error);
          },
          {timeout: 20000, maximumAge: 1000, enableHighAccuracy: false},
        );
      });
    });

    function beforeDestroy() {
      // logger.log('LOCATION FINISH');
      if (watch) {
        geolocation.clearWatch(watch);
        watch = null;
      }
      // if (this.dateInterval) {
      //   clearInterval(this.dateInterval);
      // }
    }

    function setPosition(position) {
      logger.log('SLOCATION:', position.coords);
      self.enabled = true;
      self.location = position.coords;
      // this.share(this.location);
    }

    function positionError(error) {
      if (error.code === 1) {
        // user denied location permissions
        self.enabled = false;
      }
      // @TODO: how do we handle timeout or other error?
      logger.log('LOCATION ERROR:', error, error.message, {level: logger.levels.ERROR});
    }


    return {afterCreate, beforeDestroy, setPosition, positionError, getCurrentPosition};
  });

export default LocationStore;
