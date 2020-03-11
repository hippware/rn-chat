import React from 'react'
import {Text, TextProps} from 'react-native'
import {colors, MAX_FONT_SIZE_MULTIPLIER} from '../../constants'

export interface IRTextProps extends TextProps {
  size?: number
  color?: string
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium' | 'Italic'
  children?: any
  pink?: boolean
}

const RText = (props: IRTextProps) => {
  const {children, color, size, weight, style, pink, ...rest} = props
  const fontFamily = weight ? `Roboto-${weight}` : 'Roboto-Regular'
  const fontSize = size || 12
  return (
    <Text
      maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
      style={[{color: pink ? colors.PINK : color, fontSize, fontFamily}, style]}
      {...rest}
    >
      {children}
    </Text>
  )
}

export default RText
