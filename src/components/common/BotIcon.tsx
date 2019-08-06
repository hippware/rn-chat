import React from 'react'
import {StyleSheet, Text, Image, ImageStyle, TextStyle, Platform} from 'react-native'
import {PINK} from '../../constants/colors'
import {oldIcons} from '../../store/IconStore'

type Props = {
  icon: string
  size?: number
  imageStyle?: ImageStyle
  textStyle?: TextStyle
}

const defaultIcon = require('../../../images/mapIcons/question.png')
const setSize = size => (size ? (Platform.OS === 'ios' ? size : size - 5) : 35)

const BotIcon = ({icon, size, imageStyle, textStyle}: Props) =>
  icon && !oldIcons.includes(icon) ? (
    <Text style={[styles.icon, textStyle, {fontSize: setSize(size)}]}>{icon}</Text>
  ) : (
    <Image
      style={[
        {
          width: setSize(size),
          height: setSize(size),
          borderRadius: 5,
        },
        imageStyle,
      ]}
      resizeMode="contain"
      source={defaultIcon}
    />
  )

export default BotIcon

const styles = StyleSheet.create({
  icon: {
    color: PINK,
    textAlign: 'center',
  },
})
