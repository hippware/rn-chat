// @flow

import {settings} from '../globals';

export const categories = {
    MAP: 'MAP',
    HOME: 'HOME',
    // @TODO: fill out categories
};

export const levels = {
    VERBOSE: 4,
    INFO: 3,
    WARNING: 2,
    ERROR: 1,
};

const defaultConfig = {
    category: null,
    level: levels.VERBOSE,
};

export const log = (...args: any): void => {
    let config = args.length > 1 ? args[args.length - 1] : null;

    // @TODO: more thorough testing for the case where the last arg is an obj we want to log but has 'category' or 'level' properties
    if (!config || typeof config !== 'object' || !(config.category || config.level)) {
        config = defaultConfig;
    } else {
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
