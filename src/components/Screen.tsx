import React from 'react'
import {View, ViewProperties} from 'react-native'
import BackgroundGradient from './BackgroundGradient'

interface IProps extends ViewProperties {
  children?: any
}

const Screen = ({style, children}: IProps) => (
  <View style={[{flex: 1}, style]}>
    <BackgroundGradient isDay />
    <View style={[{flex: 1}]}>{children}</View>
  </View>
)

export default Screen
