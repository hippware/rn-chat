import React from 'react'
import {View, Text} from 'react-native'
import {k} from './Global'
import {observer} from 'mobx-react/native'
import {navBarTextColorDay} from '../constants/colors'

const Header = observer(({children}) => (
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
))

export default Header
