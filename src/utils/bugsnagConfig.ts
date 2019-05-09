// https://docs.bugsnag.com/platforms/react-native/#basic-configuration
import {Client, Configuration} from 'bugsnag-react-native'
import getCodeBundleId from './bugsnagCodeBundleId'
import {settings} from '../globals'
import {Platform} from 'react-native'

const API_KEY = 'f108fb997359e5519815d5fc58c79ad3'
const config = new Configuration(API_KEY) // should be passed to work with Android
config.notifyReleaseStages = ['testflight', 'production']
config.codeBundleId = getCodeBundleId(Platform.OS)

// For android tinyrobotStaging, releaseStage should not be 'production'
if (!__DEV__ && Platform.OS === 'android' && settings.isStaging) config.releaseStage = 'testflight'

const client = new Client(config)
export default client
