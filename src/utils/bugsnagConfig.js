// codeBundleId is filled in by codepush.sh
const codeBundleId = 'StagingPavel_2019-02-12_15-54-04_+0100'

// -------------------------------------------------------------------------------------------------
// Create a singleton instance of the bugsnag client so we don't have to duplicate our configuration
// anywhere.
// -------------------------------------------------------------------------------------------------
// https://docs.bugsnag.com/platforms/react-native/#basic-configuration
import {Client, Configuration} from 'bugsnag-react-native'
import DeviceInfo from 'react-native-device-info'

const config = new Configuration()
config.notifyReleaseStages = ['testflight', 'production']
if (codeBundleId) {
  config.codeBundleId = codeBundleId
} else {
  const version = require('../../package.json').version
  const buildNumber = process.env.NODE_ENV === 'test' ? 0 : DeviceInfo.getBuildNumber()
  config.appVersion = `${version} (${buildNumber})`
}
const client = new Client(config)

//-------------------------------------------------------------------------------------------------
export default client
