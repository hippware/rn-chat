import {AppRegistry, YellowBox} from 'react-native'
import 'react-native-gesture-handler'
import App from './src/App'
require('./src/utils/setup')
import {handleFirebaseBackgroundMessage} from './src/utils/pushNotifications'

YellowBox.ignoreWarnings([
  'Required dispatch_sync to load constants', // https://github.com/Microsoft/react-native-code-push/issues/632#issuecomment-265962068
  'Warning: NetInfo', // todo: see #3424,
  'RCTBridge required dispatch_sync to load',

  // todo: remove these after all dependencies have updated to using hooks
  'Warning: componentWillReceiveProps',
  'Warning: componentWillUpdate',

  'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
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
