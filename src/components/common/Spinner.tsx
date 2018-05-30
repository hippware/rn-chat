import React from 'react'
import {Image, ImageStyle} from 'react-native'
import {k} from '../Global'

type Props = {
  color?: 'pink' | 'white'
  size?: number
  style?: ImageStyle
}

const Spinner = ({color, size, style}: Props) => {
  const img =
    color && color === 'white'
      ? require('../../../images/loader_white.gif')
      : require('../../../images/loader_pink.gif')
  size = size ? size * k : 36 * k
  return <Image source={img} style={[style, {width: size, height: size}]} resizeMode="contain" />
}

export default Spinner
