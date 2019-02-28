import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../../constants'
import {RText} from '.'

const pink = ['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']
const grey = [colors.DARK_GREY, colors.DARK_GREY]

interface IProps extends TouchableOpacityProps {
  isPink?: boolean
  offColor?: string
  children?: any
  innerStyle?: ViewStyle
  onPress?: any
  text?: string
  textStyle?: any
}

const GradientButton = ({
  isPink = true,
  offColor,
  children,
  style,
  innerStyle,
  onPress,
  textStyle = {color: colors.WHITE},
  text,
  ...rest
}: IProps) => (
  <TouchableOpacity style={[{overflow: 'hidden'}, style]} onPress={onPress} {...rest}>
    <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={isPink ? pink : offColor ? [offColor, offColor] : grey}
      style={[styles.gradient, innerStyle]}
    >
      {children ? (
        children
      ) : (
        <RText weight={'Medium'} style={textStyle}>
          {text}
        </RText>
      )}
    </LinearGradient>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default GradientButton
