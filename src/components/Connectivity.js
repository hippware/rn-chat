// @flow

import React from 'react';
import {AppState, NetInfo} from 'react-native';
import {when} from 'mobx';
import {inject} from 'mobx-react/native';
import * as log from '../utils/log';

@inject('wocky', 'notificationStore')
export default class Connectivity extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange);
    NetInfo.getConnectionInfo().then((reach) => {
      log.log('NETINFO INITIAL:', reach, {level: log.levels.INFO});
      this._handleConnectionInfoChange(reach);
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    NetInfo.removeEventListener('connectionChange', this._handleConnectionInfoChange);
  }

  tryReconnect = async () => {
    const model = this.props.wocky;
    if (model.profile && !model.connected && !model.connecting && model.username && model.password && model.host) {
      log.log('TRYING RECONNECT', {level: log.levels.INFO});
      await model.login();
    }
  };

  _handleConnectionInfoChange = (connectionInfo) => {
    log.log('CONNECTIVITY:', connectionInfo, {level: log.levels.INFO});
    if (connectionInfo.type === 'unknown') {
      // @TODO: mixpanel submit info?
      return;
    }
    if (connectionInfo.type !== 'none') {
      setTimeout(() => this.tryReconnect(), 500);
    } else if (this.props.wocky.connected && !this.props.wocky.connecting) {
      this.props.wocky.disconnect();
    }
  };

  _handleAppStateChange = async (currentAppState) => {
    log.log('CURRENT APPSTATE:', currentAppState, {level: log.levels.INFO});
    // reconnect automatically
    if (currentAppState === 'active') {
      await this.tryReconnect();
      this.props.notificationStore.start();
    }
    if (currentAppState === 'background') {
      this.props.wocky.disconnect();
      this.props.notificationStore.finish();
    }
  };

  render() {
    return null;
  }
}
