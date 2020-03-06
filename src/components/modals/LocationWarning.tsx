import React, {useEffect} from 'react'
import {StyleSheet, Image, Linking, View, Platform} from 'react-native'
import {colors} from '../../constants'
import {k, s, minHeight} from '../Global'
import {when} from 'mobx'
import {BlurView} from '@react-native-community/blur'
import {GradientButton, RText, Separator} from '../common'
import {WHITE, TRANSLUCENT_WHITE} from 'src/constants/colors'
import {useLocationStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const footprint = require('../../../images/bigSmileBot.png')

type Props = {
  afterLocationAlwaysOn: () => void
}

const LocationWarning = observer(({afterLocationAlwaysOn}: Props) => {
  const locationStore = useLocationStore()
  useEffect(() => {
    if (Platform.OS === 'android') {
      locationStore.getCurrentPosition().catch(e => {
        // ignore error
      })
    }

    const disposer = when(() => locationStore.alwaysOn, afterLocationAlwaysOn)
    return disposer
  }, [])

  return Platform.OS === 'ios' ? <LocationWarningIOS /> : <LocationWarningAndroid />
})

export const LocationWarningIOS = () => (
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
    <RText style={styles.title}>
      Tap “<RText style={{fontFamily: 'Roboto-Medium'}}>Always</RText>” to let tinyrobot work
      perfectly.
    </RText>
    <Image
      source={require('../../../images/fixLocationPermission.png')}
      style={{width: 224 * minHeight, height: 173 * minHeight, marginVertical: 50 * s}}
    />
    <RText style={styles.subtext}>
      With ‘Always’ access you won’t miss out on relevant location notifications.
    </RText>

    <GradientButton
      isPink
      style={{height: 50, width: '80%', borderRadius: 4, marginBottom: 26 * s, marginTop: 40 * s}}
      onPress={() => Linking.openSettings()}
    >
      <RText color={WHITE} size={18.5}>
        Open Settings
      </RText>
    </GradientButton>
  </View>
)

export const LocationWarningAndroid = () => (
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
    <RText style={styles.subtext2}>
      We need your location to show you what’s happening nearby!
    </RText>

    <GradientButton
      isPink
      style={{height: 50, width: '80%', borderRadius: 4, marginBottom: 26 * s, marginTop: 40 * s}}
      onPress={() => Linking.openSettings()}
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
