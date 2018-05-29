import {AppRegistry, YellowBox} from 'react-native'
import App from './src/App'

// remove this after upgrade to RN 0.56+
// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

AppRegistry.registerComponent('App', () => App)
