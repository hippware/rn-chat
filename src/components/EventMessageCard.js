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
import EventMessage from '../model/EventMessage';
import Message from '../model/Message';
import { observer } from 'mobx-react/native';
import location from '../store/locationStore';
import statem from '../../gen/state';
import message from '../store/messageStore';
import friend from '../store/friendStore';
import autobind from 'autobind-decorator';

@observer
@autobind
export default class EventMessageCard extends React.Component {
    onPress() {
        const eventMessage: EventMessage = this.props.item;
        const profile = eventMessage.message.from;
        const chat = message.createChat(eventMessage.message.from);
        if (profile.isFollowed) {
            statem.home.openPrivateChat({ item: chat.id });
        }
    }

    render() {
        const isDay = location.isDay;
        const eventMessage: EventMessage = this.props.item;
        //console.log("EventMessageCard.render ITEM:", JSON.stringify(eventMessage));
        const msg = eventMessage.message || {};
        const profile = msg.from;
        if (!profile) {
            return null;
        }

        return (
            <View style={{ paddingTop: 15 }}>
                {!!msg.from &&
                    <View style={{ paddingLeft: 19 * k, paddingRight: 23 * k }}>
                        <CardText isDay={isDay}>
                            {msg.from.isOwn ? 'you' : `@${msg.from.handle}`}
                            {' '}
                            sent you a message.
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
                {!!msg.media &&
                    msg.media.source &&
                    <View style={{ paddingTop: 13.3 * k }}>
                        <ResizedImage image={msg.media} />
                    </View>}
                {!!this.props.item.location &&
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 15 * k,
                            paddingRight: 15 * k,
                            paddingTop: 10
                        }}
                    >
                        <Image
                            source={require('../../images/iconLocation.png')}
                        />
                        <Text style={styles.smallText}>
                            {' '}{this.props.item.location}
                        </Text>
                    </View>}
                {!!this.props.item.channel &&
                    <Text
                        style={[
                            { paddingLeft: 15 * k, paddingRight: 15 * k },
                            styles.smallText
                        ]}
                    >
                        #{this.props.item.channel}
                    </Text>}
                {msg.unread &&
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            height: 15,
                            width: 15
                        }}
                    >
                        <Image
                            source={require('../../images/iconNewPriority.png')}
                        />
                    </View>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    smallText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(155,155,155)'
    }
});
