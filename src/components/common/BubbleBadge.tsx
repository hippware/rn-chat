import React from 'react'
import {Text, ImageSourcePropType, TextStyle, ViewStyle, ImageBackground} from 'react-native'

type Props = {
  style?: TextStyle
  background: ImageSourcePropType
  text: string
  outerStyle?: ViewStyle
  diameter?: number
}

const ProfileBadge = ({style, background, diameter = 30, text, outerStyle}: Props) => (
  <ImageBackground
    style={[
      {
        position: 'absolute',
        top: 0,
        right: 0,
        height: diameter,
        width: diameter,
        alignItems: 'center',
        justifyContent: 'center',
      },
      outerStyle,
    ]}
    source={background}
  >
    <Text style={[{color: 'white', paddingLeft: 2}, style]}>{text}</Text>
  </ImageBackground>
)

export default ProfileBadge
