// @flow

import React from 'react';
import {View, AppState, NetInfo, InteractionManager, Animated, Dimensions} from 'react-native';

export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
import BotButton from './BotButton';
import model from '../model/model';
import * as xmpp from '../store/xmpp/xmpp';
import EventList from './EventListView';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import profileStore from '../store/profileStore';
import globalStore from '../store/globalStore';
import PushNotification from 'react-native-push-notification';
import * as log from '../utils/log';

type State = {
  top: any,
};

@autobind
@observer
export default class Home extends React.Component {
  state: State;

  contentOffsetY: number;

  constructor(props) {
    super(props);
    this.contentOffsetY = 0;
    this.state = {
      top: new Animated.Value(0),
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    NetInfo.addEventListener('connectionChange', this._handleConnectionInfoChange);
    NetInfo.getConnectionInfo().done((reach) => {
      log.log('NETINFO INITIAL:', reach, {level: log.levels.INFO});
      this._handleConnectionInfoChange(reach);
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    NetInfo.removeEventListener('connectionChange', this._handleConnectionInfoChange);
  }

  async tryReconnect() {
    if (model.registered && model.connected === false && !model.connecting && model.user && model.password && model.server) {
      log.log('TRYING RECONNECT', {level: log.levels.INFO});
      await profileStore.connect();
    }
  }

  _handleConnectionInfoChange(connectionInfo) {
    log.log('CONNECTIVITY:', connectionInfo, {level: log.levels.INFO});
    if (connectionInfo === 'unknown') {
      // @TODO: mixpanel submit info?
      return;
    }
    if (connectionInfo !== 'none') {
      this.tryReconnect();
    }
  }

  async _handleAppStateChange(currentAppState) {
    log.log('CURRENT APPSTATE:', currentAppState, {level: log.levels.INFO});
    // reconnect automatically
    if (currentAppState === 'active') {
      await this.tryReconnect();
      globalStore.start();
    }
    if (currentAppState === 'background') {
      globalStore.finish();
      xmpp.disconnect();
    }
  }

  componentWillMount() {
    PushNotification.setApplicationIconBadgeNumber(0);
  }

  scrollToTop() {
    this.eventList && this.eventList.scrollToTop();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <EventList ref={ref => (this.eventList = ref)} />
        <BotButton />
      </View>
    );
  }
}
