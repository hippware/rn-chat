import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {s, minHeight} from './Global'
import {RText} from './common'
import {colors} from 'src/constants'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'

const optionsMenu = [
  {value: 'auto', text: 'Auto', image: require('../../images/mapOptionsAuto.png')},
  {value: 'street', text: 'Street', image: require('../../images/mapOptionsStreet.png')},
  {value: 'satellite', text: 'Satellite', image: require('../../images/mapOptionsSatellite.png')},
]
const MapOptions = observer(() => {
  const {mapOptions, setMapOptions} = useHomeStore()
  return (
    <View
      style={{
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
        <RText weight="Medium" size={17} style={{textAlign: 'center'}}>
          Map Type
        </RText>
      </View>

      <View style={{marginTop: 10, display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
        {optionsMenu.map(({value, text, image}) => (
          <TouchableOpacity
            key={value}
            onPress={() => {
              setMapOptions(value)
              Actions.pop()
            }}
          >
            <View style={[styles.mapOptionView, mapOptions === value && styles.selected]}>
              <Image source={image} />
            </View>
            <RText style={[styles.subText, mapOptions === value && styles.selected]}>{text}</RText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
})

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
