import {AppRegistry, YellowBox} from 'react-native'
import App from './src/App'
require('./src/utils/setup')

YellowBox.ignoreWarnings([
  'Required dispatch_sync to load constants', // https://github.com/Microsoft/react-native-code-push/issues/632#issuecomment-265962068
  'Warning: NetInfo', // todo: see #3424,
  'Warning: ViewPagerAndroid', // todo: see #3424,
])

// Uncomment for storybook
// import storybook from './storybook'
// export default storybook

// Comment for storybook
AppRegistry.registerComponent('App', () => App)
