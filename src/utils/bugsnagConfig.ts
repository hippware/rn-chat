// codeBundleId is filled in by codepush.sh
const codeBundleId = ''

// https://docs.bugsnag.com/platforms/react-native/#basic-configuration
import {Client, Configuration} from 'bugsnag-react-native'
import getCodeBundleId from './bugsnagCodeBundleId'
import {Platform} from 'react-native'

const API_KEY = 'f108fb997359e5519815d5fc58c79ad3'
const config = new Configuration(API_KEY) // should be passed to work with Android
config.notifyReleaseStages = ['testflight', 'production']
config.codeBundleId = codeBundleId.length > 0 ? codeBundleId : getCodeBundleId(Platform.OS)
const client = new Client(config)
export default client
