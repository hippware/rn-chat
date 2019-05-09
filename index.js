import {AppRegistry, YellowBox} from 'react-native'
import 'react-native-gesture-handler'
import App from './src/App'
require('./src/utils/setup')

YellowBox.ignoreWarnings([
  'Required dispatch_sync to load constants', // https://github.com/Microsoft/react-native-code-push/issues/632#issuecomment-265962068
  'Warning: NetInfo', // todo: see #3424,
  'Warning: ViewPagerAndroid', // todo: see #3424,
  'Warning: Async Storage has been extracted',
])

// Uncomment for storybook
// export default from './storybook'

// Comment for storybook
AppRegistry.registerComponent('App', () => App)
