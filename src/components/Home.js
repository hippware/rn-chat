// @flow

import React from 'react';
import {View, AppState, NetInfo, Animated} from 'react-native';
import BotButton from './BotButton';
import model from '../model/model';
import * as xmpp from '../store/xmpp/xmpp';
import EventList from './EventListView';
import {observer} from 'mobx-react/native';
import {when} from 'mobx';
import autobind from 'autobind-decorator';
import profileStore from '../store/profileStore';
import PushNotification from 'react-native-push-notification';
import globalStore from '../store/globalStore';
import eventStore from '../store/eventStore';
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

  componentWillMount() {
    PushNotification.setApplicationIconBadgeNumber(0);
  }

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
      eventStore.start();
    }
    if (currentAppState === 'background') {
      await xmpp.disconnectAfterSending();
    }
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
