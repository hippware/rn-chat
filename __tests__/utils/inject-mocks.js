// @flow

const injects = {
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
};

export default injects;
