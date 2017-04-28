import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from './Global';
import ResizedImage from './ResizedImage';
import {Actions} from 'react-native-router-native';
import Profile from '../model/Profile';
import Chats from '../model/Chats';
import Chat from '../model/Chat';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import statem from '../../gen/state';
import Event from '../model/Event';
import {backgroundColorDay, backgroundColorNight} from '../globals';

@observer
export default class EventCard extends React.Component {
    render() {
        const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
        const isDay = location.isDay;
        const row = this.props.item;
        const event: Event = row.event;
        const CardClass = event.presenterClass();
        const profile = row.event.target;
        if (!profile || !profile.user) {
            return null;
        }
        return (
            <Card
                key={row.event.id}
                style={[{marginTop: 10}]}
                isDay={isDay}
                onPress={() => this.refs.card.onPress && this.refs.card.onPress()}
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
                            <Avatar
                                key={profile.user + 'avatar_event'}
                                size={40 * k}
                                source={profile.avatar && profile.avatar.source}
                                profile={profile}
                                title={profile.displayName}
                                isDay={isDay}
                            />
                        </View>

                        {!profile.isOwn &&
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
                                        padding: 10 * k,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            paddingRight: 5 * k,
                                            fontFamily: 'Roboto-Light',
                                            fontSize: 12,
                                            color: 'rgb(155,155,155)',
                                        }}
                                    >
                                        {event.dateAsString}{' '}
                                    </Text>
                                    <Image source={require('../../images/iconPostOptions.png')} />
                                </View>
                            </TouchableOpacity>}
                    </View>
                }
            >
                <CardClass ref='card' item={event} />
            </Card>
        );
    }
}
