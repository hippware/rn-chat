import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import EventBotShare from '../model/EventBotShare';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import EventBotHeadline from './EventBotHeadline';
import EventBotTitle from './EventBotTitle';
import EventBotMetabar from './EventBotMetabar';
import * as colors from '../constants/colors';
import {k} from './Global';

type Props = {
    item: EventBotShare
};

@observer
export default class EventBotCard extends React.Component {
    props: Props;
    onPress() {
        statem.home.botDetails({item: this.props.item.bot.id});
    }

    render() {
        const eventBot = this.props.item;
        const bot = eventBot.bot || {};
        const msg = eventBot.message || {};

        return (
            <View>
                <EventBotTitle profile={eventBot.target} bot={bot} action='shared' timestamp={eventBot.dateAsString} />
                {!!msg.body &&
                    <View>
                        <View style={{height: 1, backgroundColor: colors.addAlpha(colors.DARK_GREY, 0.18), flex: 1}} />
                        <View style={{padding: 15 * k}}>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    color: colors.DARK_PURPLE,
                                    fontSize: 15 * k,
                                }}
                            >
                                {msg.body}
                            </Text>
                        </View>
                    </View>}
                <EventBotHeadline {...this.props} />
                <EventBotMetabar bot={bot} />
            </View>
        );
    }
}
