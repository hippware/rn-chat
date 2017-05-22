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
import CodePush from './CodePush';

type State = {
    top: any
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
        NetInfo.addEventListener('change', this._handleConnectionInfoChange);
        NetInfo.fetch().done(reach => {
            console.log('NETINFO INITIAL:', reach);
            this._handleConnectionInfoChange(reach);
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        NetInfo.removeEventListener('change', this._handleConnectionInfoChange);
    }

    tryReconnect() {
        if (model.registered && model.connected === false && !model.connecting && model.user && model.password && model.server) {
            console.log('TRYING RECONNECT');
            profileStore.connect();
        }
    }

    _handleConnectionInfoChange(connectionInfo) {
        console.log('CONNECTIVITY:', connectionInfo);
        if (connectionInfo === 'unknown') {
            // @TODO: mixpanel submit info?
            return;
        }
        if (connectionInfo !== 'none') {
            this.tryReconnect();
        }
    }

    _handleAppStateChange(currentAppState) {
        console.log('CURRENT APPSTATE:', currentAppState);
        // reconnect automatically
        if (currentAppState === 'active') {
            this.tryReconnect();
        }
        if (currentAppState === 'background') {
            globalStore.finish();
            xmpp.disconnect();
        }
    }

    componentWillMount() {
        PushNotification.setApplicationIconBadgeNumber(0);
    }

    scrollTo(num: number) {
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(
                // Uses easing functions
                this.state.top, // The value to drive
                {toValue: num} // Configuration
            ).start();
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <EventList ref='list' />
                <BotButton />
            </View>
        );
    }
}
