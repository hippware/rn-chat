import React, {useEffect} from 'react'
import {StyleSheet, Text, Image, Linking, View, Platform} from 'react-native'
import {colors} from '../../constants'
import {k, s, minHeight} from '../Global'
import {when} from 'mobx'
import {inject} from 'mobx-react'
import {BlurView} from 'react-native-blur'
import {GradientButton, RText, Separator} from '../common'
import {WHITE, TRANSLUCENT_WHITE} from 'src/constants/colors'
import AndroidOpenSettings from 'react-native-android-open-settings'
import {ILocationStore} from '../../store/LocationStore'

const footprint = require('../../../images/bigSmileBot.png')

type Props = {
  afterLocationAlwaysOn: () => void
  locationStore?: ILocationStore
}

const LocationWarning = inject('locationStore')(({afterLocationAlwaysOn, locationStore}: Props) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      locationStore!.getCurrentPosition().catch(e => {
        // ignore error
      })
    }

    const disposer = when(() => locationStore!.alwaysOn, afterLocationAlwaysOn)
    return disposer
  }, [])

  const onPress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:{1}')
    } else {
      AndroidOpenSettings.appDetailsSettings()
    }
  }

  return Platform.OS === 'ios' ? (
    <LocationWarningIOS onPress={onPress} />
  ) : (
    <LocationWarningAndroid onPress={onPress} />
  )
})

export const LocationWarningIOS = ({onPress}) => (
  <View
    style={[
      StyleSheet.absoluteFill,
      {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Platform.select({ios: 'transparent', android: TRANSLUCENT_WHITE}),
      },
    ]}
  >
    <BlurView blurType="xlight" blurAmount={10} style={StyleSheet.absoluteFill as any} />
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

export const LocationWarningAndroid = ({onPress}) => (
  <View
    style={[
      StyleSheet.absoluteFill,
      {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: TRANSLUCENT_WHITE,
      },
    ]}
  >
    <Image source={footprint} style={{width: 68, height: 68, marginTop: 20}} resizeMode="contain" />
    <RText style={styles.title} size={30} color="white">
      {'Allow Location\r\nAccess'}
    </RText>
    <Separator backgroundColor="white" style={{width: 200 * k}} />
    <Text style={styles.subtext2}>We need your location to show you what’s happening nearby!</Text>

    <GradientButton
      isPink
      style={{height: 50, width: '80%', borderRadius: 4, marginBottom: 26 * s, marginTop: 40 * s}}
      onPress={onPress}
    >
      <RText color={WHITE} size={18.5}>
        Change Settings
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
  subtext2: {
    marginTop: 15,
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    color: colors.DARK_GREY,
    textAlign: 'center',
    width: '70%',
  },
})
