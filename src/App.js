// @flow

import React from 'react';
import {Provider} from 'mobx-react/native';
import TinyRobotRouter from './components/Router';

import store from './storeV2';

const App = () => (
  <Provider store={store} {...store}>
    <TinyRobotRouter />
  </Provider>
);

export default App;
