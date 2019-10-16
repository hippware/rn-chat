import React from 'react'
import {View, Image, StyleSheet, ViewStyle, ImageStyle} from 'react-native'
import Triangle from './Triangle'
import {RText} from '../common'
import {colors} from '../../constants'
import {observer} from 'mobx-react'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  text?: string
  image?: any
  showLoader?: boolean | null
  children?: any
  style?: ViewStyle
  outerStyle?: ViewStyle
  imageStyle?: ImageStyle
  size?: number
  triangleColor?: string
  gradient?: boolean
  radius?: number
  borderWidth?: number
  textSize?: number
}

const defaultSize = 58
const defaultRadius = 5
const defaultBorderWidth = 1.5

const Bubble = observer(
  ({
    image,
    text,
    showLoader,
    children,
    style,
    imageStyle,
    size,
    triangleColor,
    outerStyle,
    gradient,
    radius,
    textSize,
    borderWidth,
  }: Props) => {
    const theSize = size || defaultSize
    const setRadius = radius || defaultRadius
    const setTextSize = textSize || 13
    const setBorderWidth = borderWidth || defaultBorderWidth
    const borderColor = triangleColor || colors.PINK
    return (
      <View style={[{alignItems: 'center', padding: 3}, outerStyle]}>
        <Wrapper
          gradient={gradient}
          size={theSize}
          style={style}
          setRadius={setRadius}
          borderColor={borderColor}
          setBorderWidth={setBorderWidth}
        >
          {showLoader ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: setRadius,
                backgroundColor: colors.GREY,
              }}
            />
          ) : image ? (
            <Image
              style={[{width: '100%', height: '100%', borderRadius: setRadius - 1}, imageStyle]}
              resizeMode="contain"
              source={image}
            />
          ) : null}

          {!!text && (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <RText
                color={colors.WHITE}
                size={setTextSize}
                style={{padding: 2}}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {text}
              </RText>
            </View>
          )}
          {children}
        </Wrapper>
        <Triangle width={10} height={4} color={borderColor} direction="down" />
      </View>
    )
  }
)

const Wrapper = ({gradient, borderColor, children, size, style, setRadius, setBorderWidth}) =>
  gradient ? (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={['rgb(242,68,191)', 'rgb(254,110,98)', 'rgb(254,92,108)']}
      style={[styles.common, {width: size, height: size}, style]}
    >
      {children}
    </LinearGradient>
  ) : (
    <View
      style={[
        styles.common,
        {
          width: size,
          height: size,
          borderRadius: setRadius,
          borderWidth: setBorderWidth,
          backgroundColor: colors.WHITE,
          borderColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  )

export default Bubble

const styles = StyleSheet.create({
  common: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
