import React from 'react';
import {View, Text} from 'react-native';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import EventBotTitle from './EventBotTitle';
import EventBotMetabar from './EventBotMetabar';
import Separator from '../Separator';
import {k} from '../Global';
import {colors} from '../../constants';

type Props = {
  item: any,
};

@observer
class EventBotNote extends React.Component {
  props: Props;
  onPress() {
    Actions.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const eventBot = this.props.item;
    const bot = eventBot.bot || {};

    return (
      <View>
        <EventBotTitle bot={bot} action='added a note to' timestamp={eventBot.relativeDateAsString} />
        <Separator width={1 * k} />
        <View style={{padding: 15 * k}}>
          <Text numberOfLines={15} style={{fontFamily: 'Roboto-Light', fontSize: 15 * k, color: colors.DARK_PURPLE}}>
            {eventBot.note}
          </Text>
        </View>
        <EventBotMetabar bot={bot} />
      </View>
    );
  }
}

export default EventBotNote;
