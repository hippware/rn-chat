import React from 'react'
import {View, Image, Text, ImageSourcePropType, TextStyle, ViewStyle} from 'react-native'

type Props = {
  style: TextStyle
  background: ImageSourcePropType
  text: string
  outerStyle?: ViewStyle
}

const ProfileBadge = ({style, background, text, outerStyle}: Props) => (
  <View
    style={[
      {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
      },
      outerStyle,
    ]}
  >
    <Image source={background} style={{position: 'absolute'}} resizeMode="contain" />
    <Text style={[{textAlign: 'center', bottom: 3, color: 'white'}, style]}>{text}</Text>
  </View>
)

export default ProfileBadge
