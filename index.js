import {AppRegistry, YellowBox} from 'react-native'
import 'react-native-gesture-handler'
import App from './src/App'
require('./src/utils/setup')
import {handleFirebaseBackgroundMessage} from './src/utils/pushNotifications'

YellowBox.ignoreWarnings([
  'Required dispatch_sync to load constants', // https://github.com/Microsoft/react-native-code-push/issues/632#issuecomment-265962068
  'Warning: NetInfo', // todo: see #3424,
  'Warning: ViewPagerAndroid', // todo: see #3424,
  'Warning: Async Storage has been extracted',
  'RCTBridge required dispatch_sync to load',

  // todo: remove these after all dependencies have updated to using hooks
  'Warning: componentWillReceiveProps',
])

// Uncomment for storybook
// export default from './storybook'

// Comment for storybook
AppRegistry.registerComponent('App', () => App)

// https://rnfirebase.io/docs/v5.x.x/messaging/receiving-messages#4)-(Optional)(Android-only)-Listen-for-FCM-messages-in-the-background
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => handleFirebaseBackgroundMessage
)
