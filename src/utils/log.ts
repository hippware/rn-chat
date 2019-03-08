import {logCategories, logLevels} from '../constants/logConstants'

export const levels = logLevels
export const categories = logCategories

const defaultConfig = {
  category: null,
  level: levels.VERBOSE,
}
const defaultConfigLength = Object.keys(defaultConfig).length

export const log = (...args: any[]): void => {
  // don't log on non-dev builds
  if (!__DEV__) return

  let config = args.length > 1 ? args[args.length - 1] : {}
  if (!config || typeof config !== 'object') {
    config = {}
  }
  const keys = Object.keys(config)

  if (
    !config ||
    typeof config !== 'object' ||
    !((keys.includes('category') || keys.includes('level')) && keys.length <= defaultConfigLength)
  ) {
    config = defaultConfig
  } else {
    args.pop()
  }

  // TODO: account for categories
  // (!config.category || !settings.logCategory (config.category && settings.logCategory && config.category === settings.logCategory)
  // if (config.level <= settings.logLevel) {
  //   if (config.level === levels.WARNING) {
  //     // tslint:disable-next-line
  //     console.warn(...args)
  //   } else {
  // tslint:disable-next-line
  console.log(...args)
  //   }
  // } else {
  //   // console.log('no log!', config, settings);
  // }
}

export const warn = (...args: any[]): void => {
  // don't log on non-dev builds
  if (!__DEV__) return

  // tslint:disable-next-line
  console.warn(...args)
}
