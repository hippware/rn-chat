// @flow

const injects = {
  notificationStore: {
    flash: () => {},
    show: () => {},
  },
  logger: {
    log: () => {},
    warn: () => {},
  },
  analytics: {
    track: () => {},
  },
};

export default injects;
