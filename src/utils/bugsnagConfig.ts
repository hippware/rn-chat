// codeBundleId is filled in by codepush.sh
const codeBundleId = ''

// -------------------------------------------------------------------------------------------------
// Create a singleton instance of the bugsnag client so we don't have to duplicate our configuration
// anywhere.
// -------------------------------------------------------------------------------------------------
// https://docs.bugsnag.com/platforms/react-native/#basic-configuration
import {Client, Configuration} from 'bugsnag-react-native'

const API_KEY = 'f108fb997359e5519815d5fc58c79ad3'
const config = new Configuration(API_KEY) // should be passed to work with Android
config.notifyReleaseStages = ['testflight', 'production']
if (codeBundleId) {
  config.codeBundleId = codeBundleId
}
const client = new Client(config)

//-------------------------------------------------------------------------------------------------
export default client
