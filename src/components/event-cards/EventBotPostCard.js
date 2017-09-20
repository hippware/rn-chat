// @flow

import React from 'react';
import {View, Image} from 'react-native';
import EventBotPost from '../../model/EventBotPost';
import {observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import EventBotTitle from './EventBotTitle';
import {RText} from '../common';
import {colors} from '../../constants';
import {width} from '../Global';
import EventBotMetabar from './EventBotMetabar';

type Props = {
  item: EventBotPost,
};

const imageWidth = 2 * width / 3;

@observer
export default class EventBotPostCard extends React.Component {
  props: Props;

  onPress() {
    Actions.botDetails({item: this.props.item.bot.id});
  }

  render() {
    const {item} = this.props;
    return (
      item.bot && (
        <View>
          <EventBotTitle bot={item.bot} action='added a post to' timestamp={item.relativeDateAsString} profile={item.author} />
          <View style={{marginHorizontal: 15}}>
            {item.text && (
              <RText size={15} weight='Light' style={{marginTop: 15}} numberOfLines={4}>
                {item.text}
              </RText>
            )}
            {item.image && <Image source={item.image.source} resizeMode='contain' style={{height: imageWidth, width: imageWidth, marginTop: 15}} />}
          </View>
          <EventBotMetabar bot={item.bot} />
        </View>
      )
    );
  }
}
