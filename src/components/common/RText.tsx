import React from 'react'
import {Text} from 'react-native'

type Props = {
  size?: number
  color?: string
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium' | 'Italic'
  style?: any
  children?: any
  numberOfLines?: number
  ellipsizeMode?: any
}

const RText = (props: Props) => {
  const {children, color, size, weight, style, ...rest} = props
  const fontFamily = weight ? `Roboto-${weight}` : 'Roboto-Regular'
  const fontSize = size || 12
  return (
    <Text style={[{color, fontSize, fontFamily}, style]} {...rest}>
      {children}
    </Text>
  )
}

export default RText
