// @flow

import React from 'react';
import Map from './Map';
import Bot from '../../model/Bot';
import {k, defaultCover} from '../Global';
import Bubble from './Bubble';
import MapView from 'react-native-maps';
import {observer} from 'mobx-react/native';

type Props = {
  bot: Bot,
  scale?: number,
  onImagePress: Function,
  onMapPress: Function,
};

export default observer(({bot, scale, ...props}: Props) => {
  const fullMap = scale === 0;
  const y = scale === 1 ? 0 : fullMap ? -35 : -106;
  return (
    <Map
      location={bot.location}
      showOnlyBot
      showUser={fullMap}
      fullMap={fullMap}
      scale={scale}
      scrollEnabled={fullMap}
      rotateEnabled={fullMap}
      pitchEnabled={fullMap}
      marker={
        bot.location ? (
          <MapView.Marker.Animated centerOffset={{x: 0, y}} identifier='marker' coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}>
            <Bubble {...props} text={bot.addressData.locationShort} scale={scale} image={bot.image && bot.image.source ? bot.image.source : defaultCover[bot.coverColor % 4]} />
          </MapView.Marker.Animated>
        ) : null
      }
      {...props}
    />
  );
});
