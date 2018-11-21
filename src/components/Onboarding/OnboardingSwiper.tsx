import React from 'react'
import Permissions from 'react-native-permissions'
import Swiper from 'react-native-swiper'
import {View} from 'react-native'
import {colors} from 'src/constants'

import OnboardingLocation from './OnboardingLocation'
import OnboardingAccelerometer from './OnboardingAccelerometer'
import OnboardingNotifications from './OnboardingNotifications'
import OnboardingFindFriends from './OnboardingFindFriends'
import {RText} from '../common'
import {inject} from 'mobx-react/native'
import {s} from '../Global'

type Props = {
  log?: (text: string) => void
}

@inject('log')
export default class OnboardingSwiper extends React.Component<Props> {
  swiper: any

  render() {
    return (
      <View style={{flex: 1}}>
        <RText style={{width: '100%', textAlign: 'center', marginTop: 30 * s}} size={18}>
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
          <OnboardingNotifications onPress={this.checkAccelerometerPermissions} />
          <OnboardingFindFriends
            onPress={this.checkAccelerometerPermissions}
            onSkip={this.checkAccelerometerPermissions}
          />
        </Swiper>
      </View>
    )
  }

  checkLocationPermissions = async () => {
    const {log} = this.props
    const check = await this.getPermission('location')
    if (check === 'authorized') {
      log!('always on permission authorized!')
      this.swiper.scrollBy(1)
    } else {
      // TODO: show overlay with instructions for changing location settings. https://zpl.io/bPdleyl
      log!('location permission - when in use')
    }
  }

  checkAccelerometerPermissions = async () => {
    const {log} = this.props
    // NOTE: this will return 'restricted' on a simulator
    const check = await this.getPermission('motion')
    log!(`check is now ${check}`)
    this.swiper.scrollBy(1)
  }

  getPermission = async (perm: string): Promise<any> => {
    const check = await Permissions.check(perm)
    if (check === 'undetermined') {
      // first-time user: show permissions request dialog
      return Permissions.request(perm)
    }
  }
}
