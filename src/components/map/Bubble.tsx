import React from 'react'
import {View, Image, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType} from 'react-native'
import Triangle from './Triangle'
import {RText} from '../common'
import {colors} from '../../constants'
import {observer} from 'mobx-react/native'

type Props = {
  text?: string
  image?: ImageSourcePropType
  showLoader?: boolean
  children?: any
  style?: ViewStyle
  imageStyle?: ImageStyle
  size?: number
  triangleColor?: string
}

const defaultSize = 58

@observer
export default class Bubble extends React.Component<Props> {
  render() {
    const {image, text, showLoader, children, style, imageStyle, size, triangleColor} = this.props
    const theSize = size || defaultSize

    return (
      <View style={{alignItems: 'center'}}>
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
        <Triangle width={14} height={8} color={triangleColor || colors.PINK} direction="down" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.PINK,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: colors.PINK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9.6,
  },
})
