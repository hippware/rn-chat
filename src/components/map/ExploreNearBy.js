import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import location from '../../store/locationStore';
import {observer} from 'mobx-react/native';
import BotButton from '../BotButton';

const FullMap = () => {
  return (
    <View style={{flex: 1}}>
      <Map fullMap followUser location={location.location} isDay={location.isDay}>
        <BotButton />
      </Map>
    </View>
  );
};

export default observer(FullMap);
