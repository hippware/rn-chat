import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import BotImage from './BotImage';
import EventBotTitle from './EventBotTitle';
import EventBotMetabar from './EventBotMetabar';
import {colors} from '../../constants';
import {k} from '../Global';

type Props = {
  item: EventBotShare,
};

@observer
export default class EventBotCard extends React.Component {
  props: Props;
  onPress() {
    Actions.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const eventBot = this.props.item;
    const bot = eventBot.bot || {};
    const msg = eventBot.message || {};

    return (
      <View>
        <EventBotTitle profile={eventBot.target} bot={bot} action='shared' timestamp={eventBot.relativeDateAsString} />
        {!!msg.body && (
          <View>
            <View style={{height: 1, backgroundColor: colors.addAlpha(colors.DARK_GREY, 0.18), flex: 1}} />
            <View style={{padding: 15 * k}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Light',
                  color: location.isDay ? colors.DARK_PURPLE : colors.WHITE,
                  fontSize: 15 * k,
                }}
              >
                {msg.body}
              </Text>
            </View>
          </View>
        )}
        <BotImage bot={bot} filter />
        <EventBotMetabar bot={bot} />
      </View>
    );
  }
}
