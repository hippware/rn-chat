import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import location from '../store/locationStore';
import {navBarTextColorDay, navBarTextColorNight} from '../constants/colors';
import {observer} from 'mobx-react/native';

type Props = {
  isDay: boolean,
  onPress: Function,
  children: any
};

export default observer(({isDay, onPress, children}: Props) => {
  const isD = isDay || location.isDay;
  return (
    <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          left: 0,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
    >
      <TouchableOpacity onPress={onPress}>
        <Text
            style={{
              paddingTop: 14,
              fontFamily: 'Roboto-Medium',
              fontSize: 18,
              backgroundColor: 'transparent',
              color: isD ? navBarTextColorDay : navBarTextColorNight,
            }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
});
