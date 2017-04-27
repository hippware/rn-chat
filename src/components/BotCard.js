import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './Card';
import CardText from './CardText';
import BotAvatar from './BotAvatar';
import { k } from './Global';
import ResizedImage from './ResizedImage';
import { Actions } from 'react-native-router-native';
import Profile from '../model/Profile';
import Bot from '../model/Bot';
import { observer } from 'mobx-react/native';
import location from '../store/locationStore';
import BotCardInner from './BotCardInner';

@observer
export default class BotCard extends React.Component {
    render() {
        const isDay = location.isDay;
        const bot: Bot = this.props.item;
        return (
            <Card
                style={{
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 1,
                    paddingBottom: 5 * k
                }}
                isDay={isDay}
                onPress={() => this.props.onPress(bot)}
                innerStyle={{
                    paddingTop: 0 * k,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 0 * k,
                    height: 120 * k
                }}
            >
                <BotCardInner {...this.props} />
            </Card>
        );
    }
}
