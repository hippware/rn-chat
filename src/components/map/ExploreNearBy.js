// @flow

import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import {observer, inject} from 'mobx-react/native';
import BotButton from '../BotButton';

const FullMap = inject('locationStore')(observer(({locationStore}) => {
  return (
    <View style={{flex: 1}}>
      <Map fullMap followUser location={locationStore.location} isDay>
        <BotButton />
      </Map>
    </View>
  );
}));

export default FullMap;
