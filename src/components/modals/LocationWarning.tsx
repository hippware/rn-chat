import React from 'react'
import {StyleSheet, Text, Image, Linking, View, Platform} from 'react-native'
import {colors} from '../../constants'
import {k, s, minHeight} from '../Global'
import {observer} from 'mobx-react/native'
import {BlurView} from 'react-native-blur'
import globalStyles from '../styles'
import {GradientButton, RText} from '../common'
import {WHITE, TRANSLUCENT_WHITE} from 'src/constants/colors'
import AndroidOpenSettings from 'react-native-android-open-settings'

import backgroundGeolocation from 'react-native-background-geolocation'

type Props = {
  afterLocationAlwaysOn: () => void
}

@observer
class LocationWarning extends React.Component<Props> {
  componentDidMount() {
    backgroundGeolocation.on('providerchange', this.onLocationPermissionChanged)
  }

  componentWillUnmount() {
    backgroundGeolocation.un('providerchange', this.onLocationPermissionChanged)
  }

  onLocationPermissionChanged = ({status}) => {
    // console.log('& perms changed', status)
    if (status === backgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS) {
      this.props.afterLocationAlwaysOn()
    }
  }

  render() {
    // TODO make generic reusable method for app settings
    return (
      <LocationWarningUI
        onPress={() => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:{1}')
          } else {
            AndroidOpenSettings.appDetailsSettings()
          }
        }}
      />
    )
  }
}

export const LocationWarningUI = ({onPress}) => (
  <View
    style={[
      globalStyles.absolute,
      {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Platform.select({ios: 'transparent', android: TRANSLUCENT_WHITE}),
      },
    ]}
  >
    {Platform.OS === 'ios' && (
      <BlurView blurType="xlight" blurAmount={10} style={globalStyles.absolute} />
    )}
    <Text style={styles.title}>
      Tap “<Text style={{fontFamily: 'Roboto-Medium'}}>Always</Text>” to let tinyrobot work
      perfectly.
    </Text>
    <Image
      source={require('../../../images/fixLocationPermission.png')}
      style={{width: 224 * minHeight, height: 173 * minHeight, marginVertical: 50 * s}}
    />
    <Text style={styles.subtext}>
      With ‘Always’ access you won’t miss out on relevant location notifications.
    </Text>

    <GradientButton
      isPink
      style={{height: 50, width: '80%', borderRadius: 4, marginBottom: 26 * s, marginTop: 40 * s}}
      onPress={onPress}
    >
      <RText color={WHITE} size={18.5}>
        Open Settings
      </RText>
    </GradientButton>
  </View>
)

export default LocationWarning

const styles = StyleSheet.create({
  title: {
    marginTop: 10 * k,
    color: colors.PINK,
    fontSize: 28,
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    width: '80%',
  },
  subtext: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    color: colors.DARK_GREY,
    textAlign: 'center',
    width: '70%',
  },
})
