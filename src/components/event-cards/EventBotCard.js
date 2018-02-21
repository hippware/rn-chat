// @flow

import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react/native';
import EventBotTitle from './EventBotTitle';
import EventBotMetabar from './EventBotMetabar';
import BotImage from './BotImage';
import {Actions} from 'react-native-router-flux';
import {isAlive} from 'mobx-state-tree';

type Props = {
  item: EventBot,
};

@observer
export default class EventBotCard extends React.Component {
  props: Props;

  onPress() {
    Actions.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const eventBot = this.props.item;
    const bot = eventBot.bot;
    if (!bot) {
      return null;
    }

    return (
      <View>
        <EventBotTitle bot={bot} action='created' timestamp={eventBot.relativeDateAsString} />
        <BotImage bot={bot} />
        <EventBotMetabar bot={bot} />
      </View>
    );
  }
}
