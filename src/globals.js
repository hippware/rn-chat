// @flow

// require('es6-symbol/implement');
import Kefir from 'kefir';
import {log} from './constants';
import {observable} from 'mobx';
import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

// coefficient for scaling for smaller devices like iPhone 5S
export const k = height / 667;

export const DEV_HOST = 'testing.dev.tinyrobot.com';
export const PROD_HOST = 'us1.prod.tinyrobot.com';
export const STAGING_HOST = 'staging.dev.tinyrobot.com';

class Settings {
  isTesting: boolean = false;
  isStaging: boolean = false;
  @observable token: string;
  logLevel: number = log.logLevels.INFO;
  logCategory: ?string = null;

  constructor() {
    if (process.env.NODE_ENV === 'test') {
      this.isStaging = process.env.STAGING;
      this.isTesting = !this.isStaging;
    } else {
      const NativeEnv = require('react-native-native-env').default;
      this.isTesting = NativeEnv.get('TESTING');
      this.isStaging = NativeEnv.get('STAGING');
      this.version = NativeEnv.get('VERSION_NAME');
    }
  }

  getDomain() {
    return this.isTesting ? DEV_HOST : this.isStaging ? STAGING_HOST : PROD_HOST;
  }
}
export const settings = new Settings();

export const USE_IOS_XMPP = process.env.NODE_ENV !== 'test' && !settings.isTesting;
export const DEBUG = settings.isTesting;
export const PERSIST = !settings.isTesting;

global.combine = function (...args) {
  return Kefir.combine(args, (x, y, z) => ({...x, ...y, ...z}));
};

export const defaultCover = [
  require('../images/defaultCover0.png'),
  require('../images/defaultCover1.png'),
  require('../images/defaultCover2.png'),
  require('../images/defaultCover3.png'),
];
