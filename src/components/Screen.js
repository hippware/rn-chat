import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react/native';
import BackgroundGradient from './BackgroundGradient';
import location from '../store/locationStore';

const Screen = ({style, children}: {style: Object, children: any}) => (
  <View style={[{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}, style]}>
    <BackgroundGradient isDay={location.isDay} />
    <View style={[{flex: 1}]}>{children}</View>
  </View>
);

export default observer(Screen);
