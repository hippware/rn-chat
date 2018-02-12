// @flow

import React from 'react';
import {View} from 'react-native';
import {Provider} from 'mobx-react/native';
import TinyRobotRouter from './components/Router';
import analytics from './utils/analytics';
import store, {notificationStore, codePushStore, reportStore} from './store';
import NotificationBanner from './components/NotificationBanner';
// import TinyRobotRouter from './components/RouterTest';
// require('./utils/reactotron');

const App = () => (
  <Provider store={store} {...store} analytics={analytics} codePushStore={codePushStore} notificationStore={notificationStore} reportStore={reportStore}>
    <View style={{flex: 1}}>
      <TinyRobotRouter />
      <NotificationBanner />
    </View>
  </Provider>
);

export default App;
