import React from 'react'
import {ImageSourcePropType, TextStyle, ViewStyle, ImageBackground} from 'react-native'
import RText from '../common/RText'

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
    <RText style={[{color: 'white', paddingLeft: 2}, style]}>{text}</RText>
  </ImageBackground>
)

export default ProfileBadge
