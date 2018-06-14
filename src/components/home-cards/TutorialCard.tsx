import React from 'react'
import {View, StyleSheet, Image, ImageRequireSource} from 'react-native'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import Card from './Card'

type Props = {
  title: string
  text: string
  icon: ImageRequireSource
}

const TutorialCard = ({title, text, icon}: Props) => (
  <Card>
    <View style={styles.textContainer}>
      <RText size={17} weight="Bold" color={colors.DARK_PURPLE} numberOfLines={1}>
        {title}
      </RText>
      <RText size={13} weight="Bold" color={colors.PINKISH_GREY} style={{marginTop: 3 * k}}>
        {text}
      </RText>
    </View>
    <View style={styles.imageContainer}>
      <Image style={styles.icon} source={icon} />
    </View>
  </Card>
)

export default TutorialCard

const styles = StyleSheet.create({
  icon: {
    // flex: 1,
    height: 44 * k,
    width: 44 * k,
  },
  textContainer: {
    flex: 2,
    padding: 18 * k,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
