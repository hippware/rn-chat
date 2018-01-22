// @flow

import React from 'react';
import {Provider} from 'mobx-react/native';
// import TinyRobotRouter from './components/Router';
import TinyRobotRouter from './components/RouterTest';

import store from './store';

const App = () => (
  <Provider store={store} {...store}>
    <TinyRobotRouter />
  </Provider>
);

export default App;
