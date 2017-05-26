import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Avatar from './Avatar';
import {k} from './Global';
import * as colors from '../constants/colors';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import statem from '../../gen/state';
import autobind from 'autobind-decorator';
import Profile from '../model/Profile';

type Props = {
    bot: Bot,
    action: string,
    timestamp: string,
    profile: Profile
};

const styles = StyleSheet.create({
    hyperlink: {
        color: colors.BLUE,
        fontFamily: 'Roboto-Italic',
        fontSize: 13 * k,
        letterSpacing: -0.1,
    },
    action: {
        color: colors.PURPLISH_GREY,
        fontFamily: 'Roboto-Italic',
        fontSize: 13 * k,
        letterSpacing: -0.1,
    },
    title: {
        flex: 1,
        fontFamily: 'Roboto-Regular',
        fontSize: 15 * k,
    },
    timestamp: {
        fontSize: 12 * k,
        fontFamily: 'Roboto-Light',
        textAlign: 'right',
        color: colors.DARK_GREY,
    },
});

@autobind
@observer
export default class extends React.Component {
    props: Props;

    onProfile() {
        const bot = this.props.bot;
        statem.logged.profileDetailsContainer({
            parent: '_home',
            item: bot.owner.user,
        });
    }

    render() {
        const {bot, action, timestamp} = this.props;
        const profile = this.props.profile || bot.owner;
        return (
            <View style={{flexDirection: 'row', paddingBottom: 10 * k}}>
                <View style={{padding: 15 * k}}>
                    <Avatar size={36 * k} profile={profile} />
                </View>
                <View style={{flex: 1, paddingTop: 10 * k, paddingRight: 15 * k}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={this.onProfile}>
                                <Text style={styles.hyperlink}>@{profile.handle}</Text>
                            </TouchableOpacity>
                            <Text style={styles.action}> {action}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.timestamp}>{timestamp}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.title, {color: location.isDay ? colors.DARK_PURPLE : colors.WHITE}]}>{bot.title}</Text>
                        {bot.isSubscribed &&
                            <View style={{width: 21 * k, height: 21 * k}}>
                                <Image source={require('../../images/iconFollowingbot.png')} />
                            </View>}
                    </View>
                </View>
            </View>
        );
    }
}
