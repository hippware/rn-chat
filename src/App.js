// @flow

import React from 'react';
import {Provider} from 'mobx-react/native';
import TinyRobotRouter from './components/Router';
import analytics from './utils/analytics';
import store from './store';
// import TinyRobotRouter from './components/RouterTest';

const App = () => (
  <Provider store={store} {...store} analytics={analytics}>
    <TinyRobotRouter />
  </Provider>
);

export default App;
