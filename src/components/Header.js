import React from 'react';
import {View, Text} from 'react-native';
import {navBarTextColorDay} from '../globals';
import {k} from './Global';
import {observer} from 'mobx-react/native';

const Header = ({children}) => (
  <View style={{padding: 15 * k}}>
    <Text
      style={{
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: navBarTextColorDay,
      }}
    >
      {children}
    </Text>
  </View>
);

export default observer(Header);
