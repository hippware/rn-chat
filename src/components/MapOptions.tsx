import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {s} from './Global'
import {minHeight} from './Global'
import {RText} from './common'
import {colors} from 'src/constants'

const MapOptions = () => (
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: 'white',
      shadowColor: '#0000001d',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 5,
      shadowOpacity: 1,
      height: 230 * minHeight,
    }}
  >
    <View style={{marginVertical: 22 * s}}>
      <RText style={{fontSize: 17, fontFamily: 'roboto-medium', textAlign: 'center'}}>
        Map Type
      </RText>
    </View>

    <View style={{marginTop: 10, display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
      <TouchableOpacity>
        <View style={[styles.mapOptionView, styles.selected]}>
          <Image source={require('../../images/mapOptionsAuto.png')} />
        </View>
        <RText style={[styles.subText, styles.selected]}>Auto</RText>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.mapOptionView}>
          <Image source={require('../../images/mapOptionsStreet.png')} style={{}} />
        </View>
        <RText style={styles.subText}>Street</RText>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.mapOptionView}>
          <Image source={require('../../images/mapOptionsSatellite.png')} />
        </View>
        <RText style={styles.subText}>Satellite</RText>
      </TouchableOpacity>
    </View>
  </View>
)

export default MapOptions

const styles = StyleSheet.create({
  subText: {
    textAlign: 'center',
    marginTop: 9,
    fontSize: 15,
  },
  mapOptionView: {
    marginHorizontal: 10,
    borderColor: '#c4c4c4',
    borderWidth: 2,
  },
  selected: {
    borderColor: colors.PINK,
    color: colors.PINK,
  },
})
