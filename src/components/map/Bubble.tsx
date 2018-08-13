import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
  Text,
} from 'react-native'
import Triangle from './Triangle'
import {RText} from '../common'
import {colors} from '../../constants'
import {observer} from 'mobx-react/native'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  text?: string
  image?: ImageSourcePropType
  fontIcon?: string
  showLoader?: boolean
  children?: any
  style?: ViewStyle
  outerStyle?: ViewStyle
  imageStyle?: ImageStyle
  size?: number
  triangleColor?: string
  gradient?: boolean
}

const defaultSize = 58

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
    fontIcon,
    gradient,
  }: Props) => {
    const theSize = size || defaultSize
    return (
      <View style={[{alignItems: 'center', padding: 3}, outerStyle]}>
        <Wrapper gradient={gradient} size={theSize} style={style}>
          {showLoader ? (
            <View
              style={{width: '100%', height: '100%', borderRadius: 5, backgroundColor: colors.GREY}}
            />
          ) : image ? (
            <Image
              style={[{width: theSize, height: theSize}, imageStyle]}
              resizeMode="contain"
              source={image}
            />
          ) : fontIcon ? (
            <Text style={{fontFamily: 'fontello', fontSize: 25, color: colors.PINK}}>
              {fontIcon}
            </Text>
          ) : null}

          {text && (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <RText
                color={colors.WHITE}
                size={13}
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
        <Triangle width={10} height={4} color={triangleColor || colors.PINK} direction="down" />
      </View>
    )
  }
)

const Wrapper = ({gradient, children, size, style}) =>
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
        styles.bubble,
        {
          width: size,
          height: size,
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
    borderRadius: 5,
  },
  bubble: {
    backgroundColor: colors.PINK,
    borderWidth: 1.5,
    borderColor: colors.PINK,
  },
})
