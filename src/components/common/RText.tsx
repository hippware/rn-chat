import React from 'react'
import {Text, TextProperties} from 'react-native'

interface IProps extends TextProperties {
  size?: number
  color?: string
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium' | 'Italic'
  children?: any
}

const RText = (props: IProps) => {
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
