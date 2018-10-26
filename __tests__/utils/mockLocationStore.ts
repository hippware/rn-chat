import LocationStore from '../../src/store/LocationStore'

const nativeEnv = {
  get: () => null,
}

const geolocation = {
  watchPosition: () => {
    // noop
  },
  getCurrentPosition: () => {
    // noop
  },
}

export default LocationStore.create(
  {},
  {
    geolocation,
    nativeEnv,
    logger: {
      log: () => {
        // noop
      },
    },
  }
)
