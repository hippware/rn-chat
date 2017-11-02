// @flow

require('./utils/initGlobals.js');
require('./store/globalStore');

import React from 'react';
import {AppRegistry, Keyboard} from 'react-native';
import NativeEnv from 'react-native-native-env';
import {Client} from 'bugsnag-react-native';
import {autorunAsync, autorun} from 'mobx';
import model from './model/model';
import {Actions} from 'react-native-router-flux';
import location from './store/locationStore';
import codepush from './store/codePushStore';
import analytics from './store/analyticsStore';
import TinyRobotRouter from './components/Router';

codepush.start();
analytics.start();

if (!NativeEnv.get('DEBUG')) {
  const bsClient = new Client('f108fb997359e5519815d5fc58c79ad3'); // eslint-disable-line
}

autorunAsync(() => {
  if (model.connected && !location.enabled) {
    // TODO transparent modals
    Actions.locationWarning && Actions.locationWarning();
  }
}, 1000);

autorun(() => {
  if (Actions.currentScene !== '');
  Keyboard.dismiss();
});

const App = () => <TinyRobotRouter />;

AppRegistry.registerComponent('App', () => App);
