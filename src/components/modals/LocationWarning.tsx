import React from 'react'
import {StyleSheet, Text, Image, Linking, View, Platform} from 'react-native'
import {colors} from '../../constants'
import {k, s, minHeight} from '../Global'
import {when} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {BlurView} from 'react-native-blur'
import globalStyles from '../styles'
import {GradientButton, RText, Separator} from '../common'
import {WHITE, TRANSLUCENT_WHITE} from 'src/constants/colors'
import AndroidOpenSettings from 'react-native-android-open-settings'
import {ILocationStore} from '../../store/LocationStore'

const footprint = require('../../../images/bigSmileBot.png')

type Props = {
  afterLocationAlwaysOn: () => void
  locationStore?: ILocationStore
}

@inject('locationStore')
@observer
class LocationWarning extends React.Component<Props> {
  handler
  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        await this.props.locationStore!.getCurrentPosition()
      } catch (e) {
        // ignore error
      }
    }

    this.handler = when(
      () => this.props.locationStore!.alwaysOn,
      () => {
        setTimeout(() => this.props.afterLocationAlwaysOn())
      }
    )
  }

  componentWillUnmount() {
    this.handler()
  }

  onPress = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:{1}')
    } else {
      AndroidOpenSettings.appDetailsSettings()
    }
  }

  render() {
    return Platform.OS === 'ios' ? (
      <LocationWarningIOS onPress={this.onPress} />
    ) : (
      <LocationWarningAndroid onPress={this.onPress} />
    )
  }
}

export const LocationWarningIOS = ({onPress}) => (
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
    <BlurView blurType="xlight" blurAmount={10} style={globalStyles.absolute} />
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
      globalStyles.absolute,
      {
        alignItems: 'center',
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
