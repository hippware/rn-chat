import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import BackgroundGradient from './BackgroundGradient'

const Screen = ({style, children}: {style?: any; children?: any}) => (
  <View style={[{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}, style]}>
    <BackgroundGradient isDay />
    <View style={[{flex: 1}]}>{children}</View>
  </View>
)

export default Screen
