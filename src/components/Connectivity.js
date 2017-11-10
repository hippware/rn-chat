// @flow

import React from 'react';
import {AppState, NetInfo} from 'react-native';
import model from '../model/model';
import * as xmpp from '../store/xmpp/xmpp';
import {when} from 'mobx';
import profileStore from '../store/profileStore';
import globalStore from '../store/globalStore';
import * as log from '../utils/log';
import analyticsStore from '../store/analyticsStore';
import notificationStore from '../store/notificationStore';

export default class Connectivity extends React.Component {
  componentDidMount() {
    when(
      () => model.connected,
      () => {
        globalStore.start();
      },
    );
    AppState.addEventListener('change', this._handleAppStateChange);
    NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange);
    NetInfo.fetch().then((reach) => {
      log.log('NETINFO INITIAL:', reach, {level: log.levels.INFO});
      this._handleConnectionInfoChange(reach);
    });
  }

  componentWillUnmount() {
    globalStore.finish();
    AppState.removeEventListener('change', this._handleAppStateChange);
    NetInfo.removeEventListener('connectionChange', this._handleConnectionInfoChange);
  }

  tryReconnect = async () => {
    if (model.registered && model.connected === false && !model.connecting && model.user && model.password && model.server) {
      log.log('& TRYING RECONNECT', {level: log.levels.INFO});
      await profileStore.connect();
    }
  };

  _handleConnectionInfoChange = (connectionInfo) => {
    log.log('& CONNECTIVITY:', connectionInfo, {level: log.levels.INFO});
    if (connectionInfo === 'unknown') {
      // @TODO: mixpanel submit info?
      return;
    }
    if (connectionInfo !== 'none') {
      this.tryReconnect();
    }
  };

  _handleAppStateChange = async (currentAppState) => {
    log.log('CURRENT APPSTATE:', currentAppState, {level: log.levels.INFO});
    // reconnect automatically
    if (currentAppState === 'active') {
      await this.tryReconnect();
      analyticsStore.sessionStart();
      notificationStore.start();
    }
    if (currentAppState === 'background') {
      await xmpp.disconnectAfterSending();
      model.connecting = false;
      model.connected = false;
      analyticsStore.sessionEnd();
      notificationStore.finish();
    }
  };

  render() {
    return null;
  }
}
