import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, Linking} from 'react-native'
import {when} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'
import {k} from '../Global'
import {observer, inject} from 'mobx-react/native'
import {ILocationStore} from '../../store/LocationStore'
import {BlurView} from 'react-native-blur'
import globalStyles from '../styles'

const botIcon = require('../../../images/iconBot.png')

type Props = {
  locationStore?: ILocationStore
}

@inject('locationStore')
@observer
class LocationWarning extends React.Component<Props> {
  componentDidMount() {
    when(() => this.props.locationStore!.enabled, Actions.pop)
  }

  render() {
    return (
      <LocationWarningUI
        onPress={() => {
          Actions.popTo('home')
          Linking.openURL('app-settings:{1}')
        }}
      />
    )
  }
}

// TODO: @irfirl to tweak the design here
export const LocationWarningUI = ({onPress}) => (
  <BlurView
    blurType="xlight"
    blurAmount={10}
    style={[globalStyles.absolute, {alignItems: 'center', justifyContent: 'center'}] as any}
  >
    <Text style={[styles.title, {textAlign: 'center'}]}>{'Allow Location\r\nAccess'}</Text>
    <Image
      source={botIcon}
      style={{width: 60, height: 60, marginVertical: 15 * k}}
      resizeMode="contain"
    />
    <Text style={[styles.muted, {textAlign: 'center'}]}>
      {"We need your location to show you\r\nwhat's happening nearby!"}
    </Text>
    <View style={{flexDirection: 'row', marginVertical: 20 * k}}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.btnText}>Change Settings</Text>
      </TouchableOpacity>
    </View>
  </BlurView>
)

export default LocationWarning

const styles = StyleSheet.create({
  title: {
    marginTop: 10 * k,
    color: colors.PINK,
    fontSize: 30,
    lineHeight: 32 * k,
    fontFamily: 'Roboto-Light',
  },
  muted: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.DARK_GREY,
    marginTop: 5 * k,
  },
  button: {
    flex: 1,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    marginHorizontal: 5 * k,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.WHITE,
  },
})
