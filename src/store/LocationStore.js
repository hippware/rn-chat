// @flow

import {types, getEnv} from 'mobx-state-tree';

const Location = types.model('Location', {
  longitude: types.number,
  latitude: types.number,
  accuracy: types.number,
});

const LocationStore = types
  .model('LocationStore', {
    // TODO: model defined in wocky?
    location: types.maybe(Location),
    enabled: true,
  })
  .actions((self) => {
    const {logger, geolocation} = getEnv(self);
    const {wocky} = self;
    let watch;

    function afterCreate() {
      navigator.geolocation.getCurrentPosition(self.setPosition, self.positionError, {timeout: 20000, maximumAge: 1000});

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

    function beforeDestroy() {
      logger.log('LOCATION FINISH');
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

    return {afterCreate, beforeDestroy, setPosition, positionError};
  });

export default LocationStore;
