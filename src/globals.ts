import Config from 'react-native-config'
import {error} from './utils/log'

export type Settings = {
  configurableLocationSettings: boolean
  host: string
  dynamicLinkDomain: string
  iosBundleId: string
  iosAppStoreId: string
  friendlyErrorMessage: boolean
  allowDebugScreen: boolean
  allowProfileDelete: boolean
  allowBypassLogin: boolean
  uriPrefix: string
  navBarButtonColor: string
  codePushFlavor: string
  mixPanelApiToken: string
}

if (!Config || !Config.HOST) {
  error('Invalid config!', process.env.ENVFILE, Config)
}

const isStaging = Config.IS_STAGING === 'true'

export const settings: Settings = {
  configurableLocationSettings: isStaging,
  host: Config.HOST,
  dynamicLinkDomain: Config.DYNAMIC_LINK_DOMAIN,
  iosBundleId: Config.IOS_BUNDLE_ID,
  iosAppStoreId: Config.IOS_APP_STORE_ID,
  friendlyErrorMessage: isStaging,
  allowDebugScreen: isStaging,
  allowProfileDelete: isStaging,
  allowBypassLogin: isStaging,
  uriPrefix: Config.URI_PREFIX,
  navBarButtonColor: isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)',
  codePushFlavor: __DEV__ ? 'local' : isStaging ? 'staging' : 'production',
  mixPanelApiToken: Config.MIXPANEL_API_TOKEN,
}
