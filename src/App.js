// @flow

import React from 'react';
import {View} from 'react-native';
import {Provider} from 'mobx-react/native';
import TinyRobotRouter from './components/Router';
import analytics from './utils/analytics';
import store, {notificationStore, codePushStore, reportStore} from './store';
import NotificationBanner from './components/NotificationBanner';
// import TinyRobotRouter from './components/RouterTest';

// if (__DEV__) {
//   const Reactotron = require('reactotron-react-native').default;
//   const {trackGlobalErrors, openInEditor, overlay, asyncStorage, networking} = require('reactotron-react-native');
//   const {mst} = require('reactotron-mst');

//   Reactotron.configure({
//     name: 'Tinyrobot',
//   })
//     .use(trackGlobalErrors())
//     .use(openInEditor())
//     .use(overlay())
//     .use(asyncStorage())
//     .use(networking())
//     .use(mst())
//     .connect();

//   Reactotron.trackMstNode(store);
// }

const App = () => (
  <Provider store={store} {...store} analytics={analytics} codePushStore={codePushStore} notificationStore={notificationStore} reportStore={reportStore}>
    <View style={{flex: 1}}>
      <TinyRobotRouter />
      <NotificationBanner />
    </View>
  </Provider>
);

export default App;
