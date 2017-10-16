import React from 'react';
import {View, Text} from 'react-native';
import {navBarTextColorDay, navBarTextColorNight} from '../globals';
import {k} from './Global';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';

const Header = ({children}) =>
  (<View style={{padding: 15 * k}}>
    <Text
      style={{
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: location.isDay ? navBarTextColorDay : navBarTextColorNight,
      }}
    >
      {children}
    </Text>
  </View>);

export default observer(Header);
