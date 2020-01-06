import React from 'react'
import {StyleSheet, Image, ImageStyle, TextStyle, Platform} from 'react-native'
import RText from '../common/RText'
import {PINK} from '../../constants/colors'
import {oldIcons} from '../../store/IconStore'

type Props = {
  icon: string
  size?: number
  imageStyle?: ImageStyle
  textStyle?: TextStyle
}

const defaultIcon = require('../../../images/mapIcons/question.png')

const BotIcon = ({icon, size, imageStyle, textStyle}: Props) => {
  const theSize = size ? (Platform.OS === 'ios' ? size : size - 5) : 35
  return icon && !oldIcons.includes(icon) ? (
    <RText style={[styles.icon, textStyle, {fontSize: theSize}]}>{icon}</RText>
  ) : (
    <Image
      style={[
        {
          width: theSize,
          height: theSize,
          borderRadius: 5,
        },
        imageStyle,
      ]}
      resizeMode="contain"
      source={defaultIcon}
    />
  )
}

export default BotIcon

const styles = StyleSheet.create({
  icon: {
    color: PINK,
    textAlign: 'center',
  },
})
