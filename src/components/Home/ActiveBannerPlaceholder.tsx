import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

import {k, minHeight} from '../Global'
import {RText} from '../common'
import {colors} from '../../constants'
import {Actions} from 'react-native-router-flux'

const placeholderImg = require('../../../images/NewPin.png')
const emptyPin = require('../../../images/PlaceholderPin.png')

const ActiveBannerPlaceholder = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => Actions.geoHeaderPrimer()}>
        <View style={[styles.pinContainer, {marginLeft: 6}]}>
          <Image
            source={placeholderImg}
            style={{width: 56, height: 62, marginLeft: -3 * minHeight}}
            resizeMode="contain"
          />
          <RText
            size={13}
            style={{textAlign: 'center', left: -5 * k}}
            numberOfLines={2}
            color={colors.PINK}
          >
            {'New!'}
          </RText>
        </View>
      </TouchableOpacity>
      <View style={styles.pinContainer}>
        <Image source={emptyPin} style={{width: 51, height: 57, marginTop: 5}} />
      </View>
      <View style={styles.pinContainer}>
        <Image source={emptyPin} style={{width: 51, height: 57, marginTop: 5}} />
      </View>
      <View style={styles.pinContainer}>
        <Image source={emptyPin} style={{width: 51, height: 57, marginTop: 5}} />
      </View>
    </View>
  )
}

export default ActiveBannerPlaceholder

const styles = StyleSheet.create({
  pinContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    flex: 0,
  },
})
