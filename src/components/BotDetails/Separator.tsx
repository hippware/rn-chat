import React from 'react'
import {View, ViewStyle} from 'react-native'
import {k} from '../Global'

export default ({style}: {style?: ViewStyle}) => (
  <View
    style={[
      {
        height: 2,
        marginHorizontal: 25 * k,
        marginVertical: 20 * k,
        backgroundColor: 'rgb(222,222,222)',
      },
      style,
    ]}
  />
)
