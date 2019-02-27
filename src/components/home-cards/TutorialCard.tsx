import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {RText} from '../common'
import {colors} from '../../constants'
import {k, fontScale} from '../Global'
import Card from './Card'
import {Actions} from 'react-native-router-flux'

const TutorialCard = () => (
  <Card onPress={Actions.liveLocationShare}>
    <View style={styles.textContainer}>
      <RText size={16} weight="Bold" color={colors.PINK} numberOfLines={1}>
        New Feature
      </RText>
      <RText
        size={16 * fontScale}
        weight="Bold"
        color={colors.DARK_PURPLE}
        style={{marginTop: 2 * k}}
      >
        Share Your Live Location!
      </RText>
    </View>
    <View style={styles.imageContainer}>
      <Image style={styles.icon} source={require('../../../images/TapHere.png')} />
    </View>
  </Card>
)

export default TutorialCard

const styles = StyleSheet.create({
  icon: {
    // flex: 1,
    height: 86,
    width: 82,
    position: 'absolute',
    top: -15,
    right: 5 * k,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 16 * k,
    paddingLeft: 25 * k,
    justifyContent: 'center',
  },
  imageContainer: {
    padding: 13 * k,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
