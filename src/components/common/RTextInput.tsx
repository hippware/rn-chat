import React, {forwardRef, Ref} from 'react'
import {TextInput, TextInputProps} from 'react-native'
import {colors, MAX_FONT_SIZE_MULTIPLIER} from '../../constants'

interface IProps extends TextInputProps {
  size?: number
  color?: string
  weight?: 'Regular' | 'Bold' | 'Light' | 'Medium' | 'Italic'
}

const RTextInput = forwardRef((props: IProps, ref: Ref<TextInput>) => {
  const {color, size, weight, style, ...rest} = props
  const fontFamily = weight ? `Roboto-${weight}` : 'Roboto-Regular'
  const fontSize = size || 18
  return (
    <TextInput
      maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
      ref={ref}
      style={[{color: color || colors.DARK_PURPLE, fontSize, fontFamily}, style]}
      {...rest}
    />
  )
})

export default RTextInput
