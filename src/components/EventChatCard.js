import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from './Global';
import ResizedImage from './ResizedImage';
import EventChat from '../model/EventChat';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import statem from '../../gen/state';
import {colors} from '../constants';

@observer
export default class EventChatCard extends React.Component {
    render() {
        const isDay = location.isDay;
        const eventChat: EventChat = this.props.item;
        const chat = eventChat.chat;
        const msg = chat.lastOther; // show only messages from sender, not ours
        const profile = eventChat.target;
        if (!profile) {
            console.error('null profile');
        }

        return (
            <Card
                style={[{marginTop: 10}, this.props.style]}
                isDay={isDay}
                onPress={eventChat.isFollowed ? () => statem.home.openPrivateChat({item: chat.id}) : null}
                innerStyle={{
                    paddingTop: 20 * k,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 0 * k,
                }}
                footer={
                    <View
                        style={{
                            position: 'absolute',
                            top: -5,
                            left: 30 * k,
                            right: 0,
                            height: 40 * k,
                        }}
                    >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {chat.participants.map(profile => (
                                <Avatar key={profile.user + 'avatar_event'} size={40 * k} profile={profile} isDay={isDay} />
                            ))}
                        </View>

                        {this.props.onPostOptions &&
                            <TouchableOpacity
                                ref='button'
                                onPress={e => this.props.onPostOptions(e, this.refs.button)}
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    backgroundColor: 'transparent',
                                    alignItems: 'center',
                                    top: 20 * k,
                                    right: 20 * k,
                                }}
                            >
                                <View
                                    style={{
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Roboto-Light',
                                            fontSize: 12,
                                            color: colors.DARK_GREY,
                                        }}
                                    >
                                        {eventChat.date}{' '}
                                    </Text>
                                    <Image source={require('../../images/iconPostOptions.png')} />
                                </View>
                            </TouchableOpacity>}
                        {!this.props.onPostOptions &&
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    top: 20 * k,
                                    right: 20 * k,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Roboto-Light',
                                        fontSize: 12 * k,
                                        color: colors.DARK_GREY,
                                    }}
                                >
                                    {eventChat.date}
                                </Text>
                            </View>}
                    </View>
                }
            >
                {eventChat.isFollowed &&
                    (!!msg.body || (msg.media && msg.media.source)) &&
                    <View style={{paddingTop: 15, paddingBottom: 15}}>
                        {!!msg.from &&
                            <View style={{paddingLeft: 15, paddingRight: 15}}>
                                <CardText isDay={isDay}>
                                    {msg.from.isOwn ? 'you' : `@${msg.from.handle}`}
                                    {' '}
                                    sent you a message.
                                </CardText>
                            </View>}
                        {!!msg.body &&
                            <View style={{paddingLeft: 15, paddingRight: 15}}>
                                <Text
                                    style={{
                                        fontFamily: 'Roboto-Light',
                                        color: isDay ? 'rgb(81,67,96)' : 'white',
                                        fontSize: 15,
                                    }}
                                >
                                    "{msg.body}"
                                </Text>
                            </View>}
                        {!!msg.media && msg.media.source && <ResizedImage image={msg.media} />}
                        {!!this.props.item.location &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 15 * k,
                                    paddingRight: 15 * k,
                                    paddingTop: 10,
                                }}
                            >
                                <Image source={require('../../images/iconLocation.png')} />
                                <Text style={styles.smallText}> {this.props.item.location}</Text>
                            </View>}
                        {!!this.props.item.channel &&
                            <Text
                                style={[
                                    {
                                        paddingLeft: 15 * k,
                                        paddingRight: 15 * k,
                                    },
                                    styles.smallText,
                                ]}
                            >
                                #{this.props.item.channel}
                            </Text>}
                        {chat.unread > 0 &&
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    height: 15,
                                    width: 15,
                                }}
                            >
                                <Image source={require('../../images/iconNewPriority.png')} />
                            </View>}
                    </View>}

                {!msg.from &&
                    profile.isMutual &&
                    <View>
                        <View
                            style={{
                                padding: 15,
                                borderBottomWidth: 1,
                                borderColor: 'rgba(155,155,155,0.26)',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    color: isDay ? 'rgb(81,67,96)' : 'white',
                                    fontSize: 15,
                                }}
                            >
                                you and
                                {' '}
                                <CardText isDay={isDay}>@{profile.handle}</CardText>
                                {' '}
                                are now friends.
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Italic',
                                    color: colors.DARK_GREY,
                                    fontSize: 12,
                                }}
                            >
                                Now you can message with {profile.displayName}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => statem.home.openPrivateChat({item: chat.id})}
                            style={{
                                justifyContent: 'center',
                                height: 40,
                                flex: 1,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 15,
                                    color: 'rgb(254,92,108)',
                                    letterSpacing: 0.7,
                                }}
                            >
                                Message {profile.displayName}
                            </Text>
                        </TouchableOpacity>
                    </View>}

                {!eventChat.isFollowed &&
                    <View>
                        <View
                            style={{
                                padding: 15,
                                borderBottomWidth: 1,
                                borderColor: 'rgba(155,155,155,0.26)',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    color: isDay ? 'rgb(81,67,96)' : 'white',
                                    fontSize: 15,
                                }}
                            >
                                <CardText isDay={isDay}>@{profile.handle}</CardText> followed you.
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Italic',
                                    color: colors.DARK_GREY,
                                    fontSize: 12,
                                }}
                            >
                                Follow back so you can message with {profile.displayName}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => statem.home.follow(profile)}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                            }}
                        >
                            <Image source={require('../../images/approve.png')} />
                            <Text
                                style={{
                                    padding: 5,
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 15,
                                    color: isDay ? 'rgb(63,55,77)' : 'white',
                                    letterSpacing: 0.7,
                                }}
                            >
                                Follow {profile.displayName}
                            </Text>
                        </TouchableOpacity>
                    </View>}

            </Card>
        );
    }
}

const styles = StyleSheet.create({
    smallText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: colors.DARK_GREY,
    },
});
