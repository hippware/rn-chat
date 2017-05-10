import React, {Component, PropTypes} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import NavBar from './NavBar';
import NavBarBackButton from './NavBarBackButton';
import NavBarRightButton from './NavBarRightButton';
import {k, width, height} from './Global';
import location from '../store/locationStore';
import statem from '../../gen/state';
import {observer} from 'mobx-react/native';
import Popover from 'react-native-popover';
import * as colors from '../constants/colors';

@observer
export default class extends React.Component {
    static propTypes = {
        bot: PropTypes.any.isRequired,
    };

    measure(...params) {
        this.refs.button.measure(...params);
    }

    render() {
        const bot = this.props.bot;
        const isDay = location.isDay;
        const isOwn = !bot.owner || bot.owner.isOwn;
        return (
            <NavBar
                style={{
                    justifyContent: 'flex-start',
                    height: this.props.fullMap ? 90 * k : 70 * k,
                    backgroundColor: location.isDay ? 'rgba(255,255,255,0.87)' : 'rgba(45,33,55,0.87)',
                }}
            >
                <TouchableOpacity
                    ref='button'
                    onLongPress={this.props.onLongPress}
                    style={{
                        paddingTop: 20 * k,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        paddingLeft: 45 * k,
                        paddingRight: 55 * k,
                    }}
                >
                    <Text
                        numberOfLines={2}
                        adjustsFontSizeToFit
                        minimumFontScale={0.9}
                        style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: 18 * k,
                            textAlign: 'center',
                            color: isDay ? colors.DARK_PURPLE : 'white',
                        }}
                    >
                        {bot.title}
                    </Text>
                    {this.props.fullMap &&
                        <Text
                            numberOfLines={2}
                            style={{
                                fontFamily: 'Roboto-Light',
                                fontSize: 14,
                                color: isDay ? colors.DARK_PURPLE : 'white',
                            }}
                        >
                            {bot.address}
                        </Text>}
                </TouchableOpacity>
                <NavBarBackButton />
                {(isOwn || bot.isPublic) &&
                    <NavBarRightButton onPress={() => statem.logged.botShareSelectFriends({item: bot.id})}>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Regular',
                                fontSize: 15,
                                color: 'rgb(254,92,108)',
                            }}
                        >
                            Share
                        </Text>
                    </NavBarRightButton>}

            </NavBar>
        );
    }
}
