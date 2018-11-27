import React from 'react'
import {StyleSheet, Text, Image, Linking} from 'react-native'
import {when} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'
import {k, s, minHeight} from '../Global'
import {observer, inject} from 'mobx-react/native'
import {ILocationStore} from '../../store/LocationStore'
import {BlurView} from 'react-native-blur'
import globalStyles from '../styles'
import {GradientButton, RText} from '../common'
import {WHITE} from 'src/constants/colors'

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

export const LocationWarningUI = ({onPress}) => (
  <BlurView
    blurType="xlight"
    blurAmount={10}
    style={[globalStyles.absolute, {alignItems: 'center', justifyContent: 'center'}] as any}
  >
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
  </BlurView>
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
