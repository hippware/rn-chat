import React from 'react'
import {View} from 'react-native'
import {Provider} from 'mobx-react/native'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import store, {iconStore, notificationStore, reportStore, contactStore} from './store'
import NotificationBanner from './components/NotificationBanner'
import Connectivity from './components/Connectivity'
import * as logger from './utils/log'
// import TinyRobotRouter from './components/RouterTest';
import ErrorHandler from './components/common/ErrorHandler'
import geocodingStore from './store/geocodingService'

// if (__DEV__) {
//   require('./utils/reactotron')
// }

const App = () => (
  <Provider
    store={store}
    {...store}
    analytics={analytics}
    notificationStore={notificationStore}
    reportStore={reportStore}
    iconStore={iconStore}
    geocodingStore={geocodingStore}
    contactStore={contactStore}
    {...logger}
  >
    <View style={{flex: 1}} testID="wrapper">
      <ErrorHandler>
        <TinyRobotRouter />
        <NotificationBanner />
        <Connectivity />
      </ErrorHandler>
    </View>
  </Provider>
)

export default App
