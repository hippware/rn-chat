import React from 'react'
import {View} from 'react-native'
import {Provider} from 'mobx-react/native'
import TinyRobotRouter from './components/Router'
import analytics from './utils/analytics'
import store, {notificationStore, reportStore, pushStore} from './store'
import NotificationBanner from './components/NotificationBanner'
import ErrorHandler from './components/common/ErrorHandler'
import Connectivity from './components/Connectivity'
import * as logger from './utils/log'
// import TinyRobotRouter from './components/RouterTest';
// require('./utils/reactotron');

const App = () => (
  <Provider
    store={store}
    {...store}
    analytics={analytics}
    notificationStore={notificationStore}
    reportStore={reportStore}
    pushStore={pushStore}
    {...logger}
  >
    <ErrorHandler>
      <View style={{flex: 1}} testID="wrapper">
        <TinyRobotRouter />
        <NotificationBanner />
        <Connectivity />
      </View>
    </ErrorHandler>
  </Provider>
)

export default App
