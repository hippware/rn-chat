import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, Linking} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {observer} from 'mobx-react/native'
import {BlurView} from 'react-native-blur'
import globalStyles from '../styles'

// TODO: test - does requiring rnbgl here trigger all permissions requests?
import backgroundGeolocation from 'react-native-background-geolocation'

const botIcon = require('../../../images/iconBot.png')

type Props = {
  afterLocationAlwaysOn: () => void
}

@observer
class LocationWarning extends React.Component<Props> {
  listenerDisposer: any

  componentDidMount() {
    this.listenerDisposer = backgroundGeolocation.on(
      'providerchange',
      this.onLocationPermissionChanged
    )
  }

  componentWillUnmount() {
    if (this.listenerDisposer) {
      this.listenerDisposer()
    }
  }

  onLocationPermissionChanged = ({status}) => {
    // console.log('& perms changed', status)
    if (status === 3) {
      // 3 = always on
      this.props.afterLocationAlwaysOn()
    }
  }

  render() {
    return (
      <LocationWarningUI
        onPress={() => {
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
