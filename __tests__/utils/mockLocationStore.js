import LocationStore from '../../src/store/LocationStore';

const nativeEnv = {
  get: () => null,
};

const geolocation = {
  watchPosition: () => {},
  getCurrentPosition: () => {},
};

export default LocationStore.create({}, {geolocation, nativeEnv, logger: {log: () => {}}});
