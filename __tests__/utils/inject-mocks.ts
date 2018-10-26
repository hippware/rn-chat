const injects = {
  iconStore: {
    setIcon: () => {
      /*noop*/
    },
    setIndex: () => {
      /*noop*/
    },
    iconList: [],
  },
  notificationStore: {
    flash: () => {
      /*noop*/
    },
    show: () => {
      /*noop*/
    },
  },
  locationStore: {
    start: () => {
      /*noop*/
    },
    stop: () => {
      /*noop*/
    },
  },
  log: () => {
    /*noop*/
  },
  warn: () => {
    /*noop*/
  },
  analytics: {
    track: () => {
      /*noop*/
    },
  },
  homeStore: {},
}

export default injects
