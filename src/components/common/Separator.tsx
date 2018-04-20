import React from 'react'
import {View, StyleSheet} from 'react-native'
import {k} from '../Global'

type Props = {
  width?: number
  backgroundColor?: any
  style?: any
}

const Separator = ({width, backgroundColor, style, ...rest}: Props) => (
  <View
    style={[
      {
        height: width ? width * k : StyleSheet.hairlineWidth,
        backgroundColor: backgroundColor || 'rgba(155,155,155,0.15)',
      },
      style,
    ]}
    {...rest}
  />
)

export default Separator
