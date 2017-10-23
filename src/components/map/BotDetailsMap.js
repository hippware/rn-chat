// @flow

import React from 'react';
import Map from './Map';
import {TouchableWithoutFeedback, View} from 'react-native';
import Bot from '../../model/Bot';
import {Actions} from 'react-native-router-flux';
import {k, width, height, defaultCover} from '../Global';
import Bubble from './Bubble';
import MapView from 'react-native-maps';

type Props = {
  bot: Bot,
  scale?: number,
  onImagePress: Function,
  onMapPress: Function,
};

export default ({bot, scale, ...props}: Props) => {
  const fullMap = scale === 0;
  const y = scale === 1 ? 0 : fullMap ? -35 : -106;
  return (<Map
    location={bot.location}
    showOnlyBot
    fullMap={fullMap}
    scale={scale}
    scrollEnabled={fullMap}
    rotateEnabled={fullMap}
    pitchEnabled={fullMap}
    marker={<MapView.Marker centerOffset={{x: 0, y}} identifier='marker' coordinate={{latitude: bot.location.latitude, longitude: bot.location.longitude}}>
      <Bubble {...props} text={bot.address} scale={scale} image={bot.image && bot.image.source ? bot.image.source : defaultCover[bot.coverColor % 4]} />
    </MapView.Marker>}
    {...props}
  />);
};

