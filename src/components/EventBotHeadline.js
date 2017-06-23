import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from '../globals';
import ResizedImage from './ResizedImage';
import {Actions} from 'react-native-router-native';
import Profile from '../model/Profile';
import Chats from '../model/Chats';
import EventBotImage from '../model/EventBotImage';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import statem from '../../gen/state';
import event from '../store/eventStore';
import BotCardInner from './BotCardInner';
import BotAvatar from './BotAvatar';
import BotImage from './BotImage';

@observer
export default class EventBotHeadline extends React.Component {
  onPress() {
    statem.home.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const isDay = location.isDay;
    const eventBot: EventBotImage = this.props.item;
    const bot = eventBot.bot || {};

    return (
      <View>
        <BotImage bot={bot} />
      </View>
    );
  }
}
