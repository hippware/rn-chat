import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import { k } from './Global';
import ResizedImage from './ResizedImage';
import { Actions } from 'react-native-router-native';
import Profile from '../model/Profile';
import Chats from '../model/Chats';
import EventBotShare from '../model/EventBotShare';
import Message from '../model/Message';
import { observer } from 'mobx-react/native';
import location from '../store/locationStore';
import statem from '../../gen/state';
import message from '../store/messageStore';
import friend from '../store/friendStore';
import autobind from 'autobind-decorator';
import EventBotHeadline from './EventBotHeadline';

@observer
@autobind
export default class EventBotShareCard extends React.Component {
    onPress() {
        statem.home.botDetails({ item: this.props.item.bot.id });
    }

    render() {
        try {
            const isDay = location.isDay;
            const eventBotShare: EventBotShare = this.props.item;
            console.log('EventBotShareCard.render ITEM:', JSON.stringify(eventBotShare), profile);
            const msg = eventBotShare.message || {};
            const profile = msg.from;
            if (!profile) {
                return null;
            }

            return (
                <View style={{ paddingTop: 15, paddingBottom: 10 }}>
                    {!!msg.from &&
                        <View
                            style={{
                                paddingLeft: 19 * k,
                                paddingRight: 23 * k
                            }}
                        >
                            <CardText isDay={isDay}>
                                {msg.from.isOwn ? 'you' : `@${msg.from.handle}`}
                                {' '}
                                shared a bot with you.
                            </CardText>
                        </View>}
                    {!!msg.body &&
                        <View
                            style={{
                                paddingLeft: 19 * k,
                                paddingRight: 23 * k,
                                paddingBottom: 13.3 * k
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    color: isDay ? 'rgb(81,67,96)' : 'white',
                                    fontSize: 15
                                }}
                            >
                                "{msg.body}"
                            </Text>
                        </View>}
                    <EventBotHeadline {...this.props} />

                </View>
            );
        } catch (e) {
            console.error(e);
        }
    }
}

const styles = StyleSheet.create({
    smallText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(155,155,155)'
    }
});
