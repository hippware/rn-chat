import React from 'react'
import {StyleSheet, Image, TouchableOpacity} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText} from '../common'
import PopupBlur from './PopupBlur'
import {Actions} from '../../../node_modules/react-native-router-flux'

const image = require('../../../images/geoHeaderPrimer.png')

const GeoHeaderPrimer = () => (
  <PopupBlur showCloseButton containerStyle={{paddingHorizontal: 20}}>
    <Image source={image} style={{marginBottom: 25 * k}} resizeMode="contain" />
    <RText style={styles.text} weight="Light" size={30} color={colors.PINK}>
      {`See who visits\r\nyour favorite\r\nlocations!`}
    </RText>
    <TouchableOpacity
      onPress={Actions.botContainer}
      style={[styles.button, {backgroundColor: colors.PINK}]}
    >
      <RText size={17.5} color="white">
        Set Up Location Alerts
      </RText>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={Actions.pop}
      style={[styles.button, {backgroundColor: 'transparent'}]}
    >
      <RText size={17.5} color={colors.PINK}>
        Maybe Later
      </RText>
    </TouchableOpacity>
  </PopupBlur>
)

export default GeoHeaderPrimer

const styles = StyleSheet.create({
  inner: {
    backgroundColor: 'white',
    padding: 25 * k,
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    marginBottom: 25,
  },
  bold: {
    fontFamily: 'Roboto-Medium',
  },
  button: {
    height: 50 * k,
    borderWidth: 1,
    borderRadius: 5 * k,
    backgroundColor: colors.WHITE,
    borderColor: colors.PINK,
    alignItems: 'center',
    marginTop: 20 * k,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
})
