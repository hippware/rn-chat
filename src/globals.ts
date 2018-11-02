import {log} from './constants'

const DEV_HOST = 'testing.dev.tinyrobot.com'
const PROD_HOST = 'us1.prod.tinyrobot.com'
const STAGING_HOST = 'staging.dev.tinyrobot.com'
// coefficient for scaling for smaller devices like iPhone 5S

class Settings {
  isTesting: boolean = false
  isStaging: boolean = false
  isProduction: boolean = false
  logLevel: number = log.logLevels.VERBOSE
  logCategory = null
  version: string

  constructor() {
    if (process.env.NODE_ENV === 'test') {
      this.isStaging = !!process.env.STAGING
      this.isTesting = !this.isStaging
      this.version = '0.0.0'
    } else {
      const NativeEnv = require('react-native-native-env').default
      this.isTesting = NativeEnv.get('TESTING')
      this.isStaging = NativeEnv.get('STAGING')
      this.version = NativeEnv.get('VERSION_NAME')
    }

    this.isProduction = !this.isTesting && !this.isStaging
  }

  getDomain() {
    return this.isTesting ? DEV_HOST : this.isStaging ? STAGING_HOST : PROD_HOST
  }
}
export const settings = new Settings()

export const DEBUG = settings.isTesting
