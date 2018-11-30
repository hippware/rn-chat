import React from 'react'
import {StyleSheet, Text, Image, ImageStyle, TextStyle} from 'react-native'
import {PINK} from '../../constants/colors'
import {oldIcons} from '../../store/IconStore'

type Props = {
  icon: string
  size?: number
  imageStyle?: ImageStyle
  textStyle?: TextStyle
}

const defaultIcon = require('../../../images/mapIcons/question.png')

const BotIcon = ({icon, size, imageStyle, textStyle}: Props) =>
  icon && !oldIcons.includes(icon) ? (
    <Text style={[styles.icon, textStyle]}>{icon}</Text>
  ) : (
    <Image
      style={[{width: size, height: size, borderRadius: 5}, imageStyle]}
      resizeMode="contain"
      source={defaultIcon}
    />
  )

export default BotIcon

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: PINK,
    textAlign: 'center',
  },
})
