import React from 'react'
import Permissions from 'react-native-permissions'
import Swiper from 'react-native-swiper'
import {View, Alert} from 'react-native'
import {colors} from 'src/constants'
import {Actions, Router, Scene, Stack, Modal, Lightbox, Tabs} from 'react-native-router-flux'

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
          loop={false}
        >
          <OnboardingLocation onPress={this.checkLocationPermissions} />
          <OnboardingAccelerometer onPress={this.checkAccelerometerPermissions} />
          <OnboardingNotifications onPress={this.checkAccelerometerPermissions} />
          <OnboardingFindFriends
            onPress={this.findFriends}
            onSkip={() => this.swiper.scrollBy(1)}
          />
        </Swiper>
      </View>
    )
  }

  private checkLocationPermissions = async () => {
    // const {log} = this.props
    const {log} = console
    const check = await this.getPermission('location', {type: 'always'})
    log('& check', check)
    if (check === 'authorized') {
      log!('& always on permission authorized!')
      this.swiper.scrollBy(1)
    } else {
      // TODO: show overlay with instructions for changing location settings. https://zpl.io/bPdleyl
      log!('& location permission not always allowed')
      Alert.alert('', "We need your location to show you what's nearby!", [
        {
          text: 'OK',
          // style: 'destructive',
          onPress: () => {
            Actions.locationWarning({
              afterLocationAlwaysOn: () => {
                Actions.pop()
                this.swiper.scrollBy(1)
              },
            })
          },
        },
      ])
    }
  }

  private checkAccelerometerPermissions = async () => {
    const {log} = console
    // NOTE: this will return 'restricted' on a simulator
    const check = await this.getPermission('motion')
    log!(`& check is ${check}`)
    this.swiper.scrollBy(1)
  }

  private getPermission = async (perm: string, extra?: any): Promise<any> => {
    const check = await Permissions.check(perm, extra)
    if (check === 'undetermined') {
      // first-time user: show permissions request dialog
      return Permissions.request(perm, extra)
    }
    return check
  }

  private findFriends = () => {
    // todo
    this.swiper.scrollBy(1)
  }
}
