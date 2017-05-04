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
                isDay={isDay}
                onPress={() => this.refs.card.onPress && this.refs.card.onPress()}
                style={{
                    paddingTop: 10 * k,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                }}
            >
                <CardClass ref='card' item={event} />
            </Card>
        );
    }
}
