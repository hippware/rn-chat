// @flow

const injects = {
  iconStore: {
    setIndex: () => {},
    iconList: [],
  },
  notificationStore: {
    flash: () => {},
    show: () => {},
  },
  locationStore: {
    start: () => {},
    stop: () => {},
  },
  log: () => {},
  warn: () => {},
  analytics: {
    track: () => {},
  },
  homeStore: {},
}

export default injects
