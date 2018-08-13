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
  }: Props) => {
    const theSize = size || defaultSize

    return (
      <View style={[{alignItems: 'center'}, outerStyle]}>
        <View
          style={[
            styles.bubble,
            {
              width: theSize,
              height: theSize,
            },
            style,
          ]}
        >
          {showLoader ? (
            <View style={{width: theSize, height: theSize, backgroundColor: colors.GREY}} />
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
        </View>
        <Triangle width={10} height={4} color={triangleColor || colors.PINK} direction="down" />
      </View>
    )
  }
)

export default Bubble

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.PINK,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.PINK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
})
