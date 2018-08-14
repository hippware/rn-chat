import React from 'react'
import {Text, TextProperties} from 'react-native'
import {colors} from '../../constants'

interface IProps extends TextProperties {
  size?: number
  color?: string
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium' | 'Italic'
  children?: any
  pink?: boolean
}

const RText = (props: IProps) => {
  const {children, color, size, weight, style, pink, ...rest} = props
  const fontFamily = weight ? `Roboto-${weight}` : 'Roboto-Regular'
  const fontSize = size || 12
  return (
    <Text style={[{color: pink ? colors.PINK : color, fontSize, fontFamily}, style]} {...rest}>
      {children}
    </Text>
  )
}

export default RText
