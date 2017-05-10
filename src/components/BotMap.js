import React from 'react';
import {View, Text, ScrollView, Clipboard, TouchableOpacity, Image} from 'react-native';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import GradientHeader from './GradientHeader';
import {k, width, height} from './Global';
import BotAvatar from './BotAvatar';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import botStore from '../store/botStore';
import location from '../store/locationStore';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import autobind from 'autobind-decorator';
import statem from '../../gen/state';
import BotNavBar from './BotNavBar';
import Popover from 'react-native-popover';
import * as colors from '../constants/colors';

@autobind
@observer
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (!this.props.item && !botStore.bot) {
            botStore.bot = botFactory.create({
                id: '789daa44-e9a6-11e6-b22b-0e2ac49618c7',
                server: 'staging.dev.tinyrobot.com',
            });
        }
        if (this.props.item) {
            botStore.bot = botFactory.create({id: this.props.item});
        }
    }

    onBoundsDidChange(bounds, zoomLevel) {
        const bot = botStore.bot;
        if (
            !(location.location.latitude >= bounds[0] &&
                location.location.latitude <= bounds[2] &&
                location.location.longitude >= bounds[1] &&
                location.location.longitude <= bounds[3])
        ) {
            const deltaLat = bot.location.latitude - location.location.latitude;
            const deltaLong = bot.location.longitude - location.location.longitude;

            const latMin = Math.min(location.location.latitude - deltaLat, location.location.latitude + deltaLat);
            const latMax = Math.max(location.location.latitude - deltaLat, location.location.latitude + deltaLat);
            const longMin = Math.min(location.location.longitude - deltaLong, location.location.longitude + deltaLong);
            const longMax = Math.max(location.location.longitude - deltaLong, location.location.longitude + deltaLong);
            console.log(
                'OUT OF BOUNDS!',
                bounds,
                JSON.stringify(location.location),
                location.location.latitude >= bounds[0],
                location.location.latitude <= bounds[2],
                location.location.longitude >= bounds[1],
                location.location.longitude <= bounds[3],
                deltaLat,
                deltaLong,
                latMin,
                longMin,
                latMax,
                longMax
            );
            // prettier-ignore
            this._map.setVisibleCoordinateBounds(latMin, longMin, latMax, longMax, 0, 0, 0, 0, true);
        }
    }

    showPopover() {
        Clipboard.setString(botStore.bot.address);
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width, height},
            });
        });
        setTimeout(this.closePopover, 2000);
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    render() {
        const bot = botStore.bot;
        if (!location.location || !bot.location) {
            console.log('NULL LOCATION!');
            return <Screen />;
        }
        return (
            <Screen>
                <Map
                    ref={map => {
                        this._map = map;
                    }}
                    bot={bot}
                    showOnlyBot
                    followUser={false}
                    location={bot.location}
                    fullMap
                    showUser
                />
                <Popover
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    contentStyle={{backgroundColor: colors.DARK_PURPLE}}
                    placement='bottom'
                    onClose={this.closePopover}
                >
                    <Text style={{fontFamily: 'Roboto-Regular', color: 'white', fontSize: 14 * k}}>
                        Address copied to clipboard
                    </Text>
                </Popover>
                <BotNavBar bot={bot} ref='button' fullMap onLongPress={this.showPopover} />
            </Screen>
        );
    }
}
