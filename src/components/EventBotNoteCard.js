import React from 'react';
import {View, Text} from 'react-native';
import EventBotNote from '../model/EventBot';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import EventBotTitle from './EventBotTitle';
import Separator from './Separator';
import {k} from './Global';
import {colors} from '../constants';

type Props = {
  item: EventBotNote
};

@observer
export default class EventBotCard extends React.Component {
  props: Props;
  onPress() {
    statem.home.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const eventBot: EventBotNote = this.props.item;
    const bot = eventBot.bot || {};

    return (
      <View>
        <EventBotTitle bot={bot} action='added a note to' timestamp={eventBot.relativeDateAsString} />
        <Separator width={1 * k} />
        <View style={{padding: 15 * k}}>
          <Text style={{fontFamily: 'Roboto-Light', fontSize: 15 * k, color: colors.DARK_PURPLE}}>{eventBot.note.content}</Text>
        </View>
      </View>
    );
  }
}
