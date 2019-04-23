import React, {ReactElement} from 'react'
import Permissions from 'react-native-permissions'
import Swiper from 'react-native-swiper'
import {View, Alert, Platform} from 'react-native'
import {colors} from 'src/constants'
import {Actions} from 'react-native-router-flux'

import OnboardingLocation from './OnboardingLocation'
import OnboardingAccelerometer from './OnboardingAccelerometer'
import OnboardingNotifications from './OnboardingNotifications'
import OnboardingFindFriends from './OnboardingFindFriends'
import {RText} from '../common'
import {inject} from 'mobx-react/native'
import {minHeight} from '../Global'
import {IWocky} from 'wocky-client'
import PushNotification from 'react-native-push-notification'
import OnboardingFindFriendsList from './OnboardingFindFriendsList'
import ContactStore from 'src/store/ContactStore'
import {log} from '../../utils/logger'

type Props = {
  wocky?: IWocky
  contactStore?: ContactStore
}

@inject('wocky', 'contactStore')
export default class OnboardingSwiper extends React.Component<Props> {
  swiper: any

  render() {
    const pages: ReactElement[] = []
    pages.push(<OnboardingLocation key="0" onPress={this.checkLocationPermissions} />)
    if (Platform.OS === 'ios') {
      pages.push(<OnboardingAccelerometer key="1" onPress={this.checkAccelerometerPermissions} />)
      pages.push(<OnboardingNotifications key="2" onPress={this.checkNotificationPermissions} />)
    }
    pages.push(<OnboardingFindFriends key="3" onPress={this.findFriends} onSkip={this.done} />)
    pages.push(<OnboardingFindFriendsList key="4" onPress={this.done} />)
    return (
      <View style={{flex: 1}}>
        <RText style={{width: '100%', textAlign: 'center', marginTop: 40 * minHeight}} size={18}>
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
          {pages}
        </Swiper>
      </View>
    )
  }

  private checkLocationPermissions = async () => {
    const check = await this.getPermission('location', {type: 'always'})
    if (check === 'authorized') {
      this.swiper.scrollBy(1)
    } else {
      // TODO: show overlay with instructions for changing location settings. https://zpl.io/bPdleyl
      Alert.alert('', "We need your location to show you what's nearby!", [
        {
          text: 'OK',
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
    // NOTE: this will return 'restricted' on a simulator
    const check = await this.getPermission('motion')
    log(`Accelerometer check result is ${check}`)
    this.swiper.scrollBy(1)
  }

  // NOTE: no need to check this permission on Android
  private checkNotificationPermissions = async () => {
    if (!PushNotification.isPermissionsRequestPending) {
      const {alert, badge, sound} = await PushNotification.requestPermissions()
      // todo, what if they deny permissions?
      log(alert, badge, sound)
      this.swiper.scrollBy(1)
    }
  }

  private getPermission = async (perm: string, extra?: any): Promise<any> => {
    let check = await Permissions.check(perm, extra)
    if (check === 'undetermined') {
      // first-time user: show permissions request dialog
      await Permissions.request(perm, extra)
      check = await Permissions.check(perm, extra)
    }
    return check
  }

  private findFriends = async () => {
    try {
      await this.props.contactStore!.requestPermission()
      this.swiper.scrollBy(1)
      this.props.contactStore!.loadContacts()
    } catch (err) {
      this.done()
    }
  }

  private done = () => {
    this.props.wocky!.profile!.clientData.flip('onboarded')
    Actions.logged()
  }
}
