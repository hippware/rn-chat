// @flow

import React from 'react';
import {View} from 'react-native';
import {Provider} from 'mobx-react/native';
import TinyRobotRouter from './components/Router';
import analytics from './utils/analytics';
import store, {notificationStore, codePushStore, reportStore, pushStore} from './store';
import NotificationBanner from './components/NotificationBanner';
import ErrorHandler from './components/common/ErrorHandler';
import * as logger from './utils/log';
// import TinyRobotRouter from './components/RouterTest';
// require('./utils/reactotron');

const App = () => (
  <Provider
    store={store}
    {...store}
    analytics={analytics}
    codePushStore={codePushStore}
    notificationStore={notificationStore}
    reportStore={reportStore}
    pushStore={pushStore}
    {...logger}
  >
    <ErrorHandler>
      <View style={{flex: 1}}>
        <TinyRobotRouter />
        <NotificationBanner />
      </View>
    </ErrorHandler>
  </Provider>
);

export default App;
