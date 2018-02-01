// @flow

import React from 'react';
import {Provider} from 'mobx-react/native';
import TinyRobotRouter from './components/Router';
import analytics from './utils/analytics';
// import TinyRobotRouter from './components/RouterTest';

import store from './store';

const App = () => (
  <Provider store={store} {...store} analytics={analytics}>
    <TinyRobotRouter />
  </Provider>
);

export default App;
