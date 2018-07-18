import React from 'react'
import {ViewStyle, TouchableOpacity, Image} from 'react-native'
import {Actions} from 'react-native-router-flux'

type Props = {
  onPress?: () => void
  style?: ViewStyle
}

const closeImg = require('../../../images/iconCloseSmall.png')

const CloseButton = ({onPress, style}: Props) => (
  <TouchableOpacity onPress={() => (onPress ? onPress() : Actions.pop())} style={style}>
    <Image source={closeImg} />
  </TouchableOpacity>
)

export default CloseButton
