import React from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import EventBotImage from '../model/EventBotImage';
import {observer} from 'mobx-react/native';
import BotImage from './BotImage';

@observer
export default class EventBotHeadline extends React.Component {
  onPress() {
    Actions.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const eventBot: EventBotImage = this.props.item;
    const bot = eventBot.bot || {};

    return (
      <View>
        <BotImage bot={bot} />
      </View>
    );
  }
}
