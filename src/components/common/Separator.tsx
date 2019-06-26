import React from 'react'
import {View, StyleSheet} from 'react-native'

type Props = {
  width?: number
  backgroundColor?: any
  style?: any
}

const Separator = ({width, backgroundColor, style, ...rest}: Props) => (
  <View
    style={[
      {
        height: width ? width : StyleSheet.hairlineWidth,
        backgroundColor: backgroundColor || 'rgba(155,155,155,0.15)',
      },
      style,
    ]}
    {...rest}
  />
)

export default Separator
