import React from 'react'
import Permissions from 'react-native-permissions'
import Swiper from 'react-native-swiper'
import {View, Alert} from 'react-native'
import {colors} from 'src/constants'

import OnboardingLocation from './OnboardingLocation'
import OnboardingAccelerometer from './OnboardingAccelerometer'
import {RText} from '../common'
import {inject} from 'mobx-react/native'

type Props = {
  log?: (text: string) => void
}

@inject('log')
export default class OnboardingSwiper extends React.Component<Props> {
  swiper: any

  render() {
    return (
      <View style={{flex: 1}}>
        <RText style={{width: '100%', textAlign: 'center', marginTop: 30}} size={18}>
          almost done!
        </RText>
        <Swiper
          paginationStyle={{top: 8, bottom: undefined}}
          dotColor={colors.GREY}
          activeDotColor={colors.PINK}
          bounces
          ref={r => (this.swiper = r)}
          scrollEnabled={false}
          loop
        >
          <OnboardingLocation onPress={this.checkLocationPermissions} />
          <OnboardingAccelerometer onPress={this.checkAccelerometerPermissions} />
        </Swiper>
      </View>
    )
  }

  checkLocationPermissions = async () => {
    const {log} = this.props
    const resp1 = await Permissions.check('location', {type: 'always'})
    if (resp1 === 'authorized') {
      log!('always on permission authorized!')
      this.swiper.scrollBy(1)
    } else {
      const resp2 = await Permissions.check('location', {type: 'whenInUse'})
      if (resp2 === 'authorized') {
        log!('location permission - when in use')
      } else {
        log!('permission denied')
        Alert.alert("We need your location to show you what's nearby!")
      }
    }
  }

  checkAccelerometerPermissions = async () => {
    this.props.log!('accelerometer press')
  }
}
