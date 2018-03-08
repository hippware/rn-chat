// @flow

import React from 'react';
import {defaultCover} from '../Global';
import Bubble from './Bubble';
import MapView from 'react-native-maps';
import {observer} from 'mobx-react/native';
import {isAlive} from 'mobx-state-tree';

type Props = {
  bot: Bot,
  scale?: number,
  onImagePress: Function,
  onMapPress: Function,
};

const BotMarker = observer(({id, bot, scale, ...props}: Props) => {
  const fullMap = scale === 0;
  const y = scale === 1 ? 0 : fullMap ? -35 : -106;
  if (!bot || !isAlive(bot) || !bot.location) {
    return null;
  }
  const image = bot.image ? bot.image.thumbnail : defaultCover[bot.coverColor % 4];
  const showLoader = bot.image && !bot.image.loaded;
  const text = bot.addressData ? bot.addressData.locationShort : bot.address;
  return (
    <MapView.Marker.Animated
      centerOffset={{x: 0, y}}
      key={id || bot.id + scale}
      identifier={bot.id}
      coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}
      onSelect={props.onImagePress}
    >
      <Bubble text={text} scale={scale} image={image} showLoader={showLoader} {...props} />
    </MapView.Marker.Animated>
  );
});

export default BotMarker;
