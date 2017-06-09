// @flow

import {settings} from '../globals';
import {logCategories, logLevels} from '../constants/logConstants';

export const levels = logLevels;
export const categories = logCategories;

const defaultConfig = {
  category: null,
  level: levels.VERBOSE,
};
const defaultConfigLength = Object.keys(defaultConfig).length;

// type Config = {
//   category?: string,
//   level?: number
// };

export const log = (...args: any): void => {
  let config = args.length > 1 ? args[args.length - 1] : {};
  const keys = Object.keys(config);
  // console.log('&&& keys is ', keys);

  // @TODO: more thorough testing for the case where the last arg is an obj we want to log AND has 'category' or 'level' properties
  if (!config || typeof config !== 'object' || !((keys.includes('category') || keys.includes('level')) && keys.length <= defaultConfigLength)) {
    // console.log('&&& going with default config', keys);
    config = defaultConfig;
  } else {
    // console.log('&&& going with specified config', keys);
    args.pop();
  }

  // TODO: account for categories
  // (!config.category || !settings.logCategory (config.category && settings.logCategory && config.category === settings.logCategory)
  if (config.level <= settings.logLevel) {
    console.log.apply(console, args);
  } else {
    // console.log('no log!', config, settings);
  }
};
