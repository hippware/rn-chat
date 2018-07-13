import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'
import Card from './Card'

const TutorialCard = () => (
  <Card>
    <View style={styles.textContainer}>
      <RText size={17} weight="Bold" color={colors.DARK_PURPLE} numberOfLines={1}>
        Map Your Favorite Spots
      </RText>
      <RText size={13} weight="Bold" color={colors.PINKISH_GREY} style={{marginTop: 3 * k}}>
        Show friends the places you love!
      </RText>
    </View>
    <View style={styles.imageContainer}>
      <Image style={styles.icon} source={require('../../../images/createTutorial.png')} />
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
    flex: 1,
    paddingVertical: 18 * k,
    paddingLeft: 25 * k,
    justifyContent: 'center',
  },
  imageContainer: {
    padding: 22 * k,
    paddingLeft: 10 * k,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
