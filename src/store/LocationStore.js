// @flow

import {types, getEnv, flow} from 'mobx-state-tree';

const Location = types.model('Location', {
  longitude: types.number,
  latitude: types.number,
  accuracy: types.number,
});

const LocationStore = types
  .model('LocationStore', {})
  .volatile(self => ({
    // TODO: should we persist location?
    location: types.maybe(Location),
    enabled: true,
  }))
  .actions((self) => {
    const {logger, geolocation} = getEnv(self);
    const {wocky} = self;
    let watch;

    function afterCreate() {
      self.getCurrentPosition();

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
