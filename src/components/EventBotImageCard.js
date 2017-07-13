// @flow

import React from 'react';
import {View} from 'react-native';
import EventBotImage from '../model/EventBotImage';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import EventBotTitle from './EventBotTitle';
import BotImage from './BotImage';

type Props = {
  item: EventBotImage
};

@observer
export default class EventBotCard extends React.Component {
  props: Props;
  onPress() {
    statem.home.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const eventBotImage = this.props.item;
    const bot = eventBotImage.bot || {};

    return (
      <View>
        <EventBotTitle bot={bot} action='added a photo to' timestamp={eventBotImage.relativeDateAsString} />
        <BotImage bot={bot} image={eventBotImage.image} />
      </View>
    );
  }
}
