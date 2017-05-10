import React from 'react';
import {View, Image, AppState, StyleSheet, NetInfo, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-native';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {k, backgroundColorDay, backgroundColorNight} from '../globals';
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
import NavBarCloseButton from './NavBarCloseButton';
import assert from 'assert';
import BotButton from './BotButton';
import Chats from './ChatListView';
import Map from './Map';
import location from '../store/locationStore';
import model from '../model/model';
import * as xmpp from '../store/xmpp/xmpp';
import EventList from './EventListView';
import {observer} from 'mobx-react/native';
import {autorun} from 'mobx';
import Notification from './Notification';
import autobind from 'autobind-decorator';
import profileStore from '../store/profileStore';

import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import PushNotification from 'react-native-push-notification';
import TransparentGradient from './TransparentGradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

class OwnMessageBar extends MessageBar {
    componentWillReceiveProps(nextProps) {}
}

@autobind
@observer
export default class Home extends React.Component {
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
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        NetInfo.removeEventListener('change', this._handleConnectionInfoChange);
        MessageBarManager.unregisterMessageBar();
    }

    tryReconnect() {
        if (model.registered && model.connected === false && !model.connecting && model.user && model.password && model.server) {
            console.log('TRYING RECONNECT');
            profileStore.connect();
        }
    }

    _handleConnectionInfoChange(connectionInfo) {
        console.log('CONNECTIVITY:', connectionInfo);
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
        if (currentAppState === 'inactive') {
            globalStore.finish();
            xmpp.disconnect();
        }
    }

    onScroll(event) {
        // switch nav bar is scroll position is below threshold
        // this.contentOffsetY = event.nativeEvent.contentOffset.y;
        // if (event.nativeEvent.contentOffset.y > 90 * k) {
        //   if (!this.state.hideActivityBar) {
        //     this.setState({hideActivityBar: true});
        //   }
        // } else {
        //   if (this.state.hideActivityBar) {
        //     this.setState({hideActivityBar: false});
        //   }
        // }
    }

    componentWillMount() {
        PushNotification.setApplicationIconBadgeNumber(0);
        // this.handler = autorun(()=> {
        //   console.log("REFRESH BADGE", model.chats.unread, model.friends.newFollowers.length);
        //   for (let key of ['home_', 'friendsMain', 'myAccount_']){
        //     Actions.refresh({key,
        //       rightButtons: [{badgeValue: `${model.chats.unread}`}],
        //       leftButtons: [{badgeValue: `${model.friends.newFollowers.length}`}]
        //     });
        //   }
        // });
    }

    componentWillUnmount() {
        if (this.handler) {
            this.handler();
            this.handler = null;
        }
    }

    scrollTo(num) {
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(
                // Uses easing functions
                this.state.top, // The value to drive
                {toValue: num} // Configuration
            ).start();
        });
    }

    render() {
        if (this.props.fullMap && !this.state.fullMap) {
            // animate
            InteractionManager.runAfterInteractions(() => {
                this.setState({fullMap: true});

                Animated.timing(
                    // Uses easing functions
                    this.state.top, // The value to drive
                    {toValue: HEIGHT} // Configuration
                ).start();
            });
        }
        if (!this.props.fullMap && this.state.fullMap) {
            // animate
            InteractionManager.runAfterInteractions(() => {
                this.setState({fullMap: false});
                if (location.location) {
                    this._map.setCenterCoordinate(location.location.latitude, location.location.longitude);
                    this._map.setZoomLevel(17);
                }
                Animated.timing(
                    // Uses easing functions
                    this.state.top, // The value to drive
                    {toValue: 0} // Configuration
                ).start();
            });
        }
        const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
        // console.log("RENDER HOME, isDay:", location.isDay, location.location);
        return (
            <View style={{flex: 1}}>
                <Map
                    ref={map => {
                        this._map = map;
                    }}
                    followUser
                    fullMap={this.props.fullMap}
                    location={location.location}
                    isDay={location.isDay}
                />
                <Animated.View style={{flex: 1, transform: [{translateY: this.state.top}]}}>
                    <EventList ref='list' />
                </Animated.View>
                {!this.state.fullMap && <BotButton />}
                <OwnMessageBar ref='alert' />
            </View>
        );
        //   <FilterBar style={{paddingLeft:15*k, paddingRight:15*k}}
        // hidden={this.state.hideActivityBar}
        // isDay={location.isDay}>
        // <Text key="all">All</Text>
        // <Text key="friends">Friends</Text>
        //
        //   </FilterBar>
    }
}
