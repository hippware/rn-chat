import {AppRegistry, YellowBox} from 'react-native'
import App from './src/App'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated', // TODO: fixed in RN56. https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
  'Module RCTImageLoader requires main', // TODO: fixed in RN56. https://github.com/facebook/react-native/issues/17504
  'Module LRDRCTNativeEnv requires main', // react-native-native-env...but no new releases and appears unsupported
  'Module RNXMPP requires main', // not a big deal since we're moving away from XMPP gradually anyway
  'RCTBridge required dispatch_sync to load CodePush', // https://github.com/Microsoft/react-native-code-push/issues/632#issuecomment-265962068
  'Required dispatch_sync to load constants', // https://github.com/Microsoft/react-native-code-push/issues/632#issuecomment-265962068
])

AppRegistry.registerComponent('App', () => App)
