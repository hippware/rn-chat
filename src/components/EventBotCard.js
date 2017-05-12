import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import EventBot from '../model/EventBot';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import EventBotTitle from './EventBotTitle';
import EventBotMetabar from './EventBotMetabar';
import BotImage from './BotImage';

type Props = {
    item: EventBot
};

@observer
export default class EventBotCard extends React.Component {
    props: Props;
    onPress() {
        statem.home.botDetails({item: this.props.item.bot.id});
    }

    render() {
        const eventBot: EventBot = this.props.item;
        const bot = eventBot.bot || {};

        return (
            <View>
                <EventBotTitle bot={bot} action='created' timestamp={eventBot.dateAsString} />
                <BotImage bot={bot} />
                <EventBotMetabar bot={bot} />
            </View>
        );
    }
}
