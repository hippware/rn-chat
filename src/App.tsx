import React from 'react'
import {View} from 'react-native'
import {Provider} from 'mobx-react/native'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import store, {iconStore, notificationStore, reportStore, pushStore} from './store'
import NotificationBanner from './components/NotificationBanner'
import Connectivity from './components/Connectivity'
import * as logger from './utils/log'
// import TinyRobotRouter from './components/RouterTest';
// require('./utils/reactotron');
import ErrorHandler from './components/common/ErrorHandler'
import geocodingStore from './store/geocodingStore'

const App = () => (
  <Provider
    store={store}
    {...store}
    analytics={analytics}
    notificationStore={notificationStore}
    reportStore={reportStore}
    pushStore={pushStore}
    iconStore={iconStore}
    geocodingStore={geocodingStore}
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
