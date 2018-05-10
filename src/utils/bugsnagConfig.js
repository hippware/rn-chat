// NOTE: below is automatically generated in codepush.sh
const codeBundleId = 'test-size'

// -------------------------------------------------------------------------------------------------
// Create a singleton instance of the bugsnag client so we don't have to duplicate our configuration
// anywhere.
// -------------------------------------------------------------------------------------------------
// https://docs.bugsnag.com/platforms/react-native/#basic-configuration
import {Client, Configuration} from 'bugsnag-react-native'
const config = new Configuration()
config.notifyReleaseStages = ['testflight', 'production']
if (codeBundleId) {
  config.codeBundleId = codeBundleId
}
const client = new Client(config)

//-------------------------------------------------------------------------------------------------
export default client
