// @flow

import React from 'react';
import {Provider} from 'mobx-react/native';
import TinyRobotRouter from './components/Router';
import analytics from './utils/analytics';
import store from './store';
import codePushStore from './store/CodePushStore';
// import TinyRobotRouter from './components/RouterTest';
import Reactotron, {trackGlobalErrors, openInEditor, overlay, asyncStorage, networking} from 'reactotron-react-native';
import {mst} from 'reactotron-mst';

Reactotron.configure({
  name: 'Tinyrobot',
})
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .use(mst())
  .connect();

Reactotron.trackMstNode(store);

const App = () => (
  <Provider store={store} {...store} analytics={analytics} codePushStore={codePushStore}>
    <TinyRobotRouter />
  </Provider>
);

export default App;
