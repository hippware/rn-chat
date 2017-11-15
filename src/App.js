// @flow

require('./utils/errorReporting');
require('./utils/initGlobals.js');
require('./store/globalStore');

import React from 'react';
import {AppRegistry, Keyboard, Text, View} from 'react-native';
import {autorunAsync, autorun} from 'mobx';
import model from './model/model';
import {Actions} from 'react-native-router-flux';
import location from './store/locationStore';
import codepush from './store/codePushStore';
import analytics from './store/analyticsStore';
import TinyRobotRouter from './components/Router';
import NotificationBanner from './components/NotificationBanner';

codepush.start();
analytics.start();

Text.defaultProps.allowFontScaling = false;

autorunAsync(() => {
  if (model.connected && !location.enabled) {
    // TODO transparent modals
    Actions.locationWarning && Actions.locationWarning();
  }
}, 1000);

autorun(() => {
  if (Actions.currentScene !== '') Keyboard.dismiss();
});

const App = () => (
  <View style={{flex: 1}}>
    <TinyRobotRouter />
    <NotificationBanner />
  </View>
);

AppRegistry.registerComponent('App', () => App);
