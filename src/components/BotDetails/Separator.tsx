import React from 'react'
import {View, ViewStyle, StyleSheet} from 'react-native'
import {k} from '../Global'

export default ({style}: {style?: ViewStyle}) => (
  <View
    style={[
      {
        height: StyleSheet.hairlineWidth,
        marginHorizontal: 20 * k,
        marginVertical: 20 * k,
        backgroundColor: 'rgb(222,222,222)',
      },
      style,
    ]}
  />
)
