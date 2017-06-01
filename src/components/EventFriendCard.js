import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from './Global';
import Profile from '../model/Profile';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import EventFriend from '../model/EventFriend';
import Button from 'react-native-button';
import statem from '../../gen/state';
import {colors} from '../constants';

@observer
export default class EventFriendCard extends React.Component {
    render() {
        const isDay = location.isDay;
        const eventFriend: EventFriend = this.props.item;
        const profile: Profile = eventFriend.profile;
        return (
            <Card
                style={[{top: 10}, this.props.style]}
                isDay={isDay}
                innerStyle={{paddingTop: 20 * k, paddingLeft: 0, paddingRight: 0}}
                footer={
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 30 * k,
                            right: 0,
                            height: 40 * k,
                        }}
                    >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Avatar key={profile.user + 'avatar_friend'} profile={profile} size={40 * k} isDay={isDay} />
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
                                <Text
                                    style={{
                                        fontFamily: 'Roboto-Light',
                                        fontSize: 12,
                                        color: colors.DARK_GREY,
                                    }}
                                >
                                    {eventFriend.dateAsString}{' '}
                                </Text>
                                <Image source={require('../../images/iconPostOptions.png')} />
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
                                    {eventFriend.dateAsString}
                                </Text>
                            </View>}
                    </View>
                }
            >
                {profile.isMutual &&
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
                        <Button
                            onPress={() => statem.home.createPrivateChat(profile)}
                            containerStyle={{justifyContent: 'center', height: 40}}
                            style={{
                                fontFamily: 'Roboto-Regular',
                                fontSize: 15,
                                color: 'rgb(254,92,108)',
                                letterSpacing: 0.7,
                            }}
                        >
                            Message {profile.displayName}
                        </Button>
                    </View>}

                {!profile.isMutual &&
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
                        <Button
                            onPress={() => statem.home.follow(profile)}
                            containerStyle={{
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
                        </Button>
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
