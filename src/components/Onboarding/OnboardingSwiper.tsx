import React, {ReactElement, useRef, useState} from 'react'
import Swiper from 'react-native-swiper'
import {View, Alert, Platform} from 'react-native'
import {colors} from 'src/constants'
import {Actions} from 'react-native-router-flux'
import OnboardingLocation from './OnboardingLocation'
import OnboardingAccelerometer from './OnboardingAccelerometer'
import OnboardingNotifications from './OnboardingNotifications'
import OnboardingFindFriends from './OnboardingFindFriends'
import {RText} from '../common'
import {inject} from 'mobx-react'
import {minHeight} from '../Global'
import {IWocky} from 'wocky-client'
import PushNotification from 'react-native-push-notification'
import OnboardingFindFriendsList from './OnboardingFindFriendsList'
import ContactStore from 'src/store/ContactStore'
import {log, warn} from '../../utils/logger'
import {IPermissionStore} from 'src/store/PermissionStore'
import {observer} from 'mobx-react'
import {getPermission} from '../../utils/permissions'

type Props = {
  wocky?: IWocky
  contactStore?: ContactStore
  permissionStore?: IPermissionStore
}

const OnboardingSwiper = inject(
  'wocky',
  'contactStore',
  'permissionStore'
)(
  observer(({wocky, contactStore, permissionStore}: Props) => {
    const swiper = useRef<Swiper>(null)

    const [showAlmostDone, setShowAlmostDone] = useState(true)

    const checkLocationPermissions = async () => {
      const check = await getPermission('location')
      if (check) {
        swiper.current!.scrollBy(1)
      } else {
        // TODO: show overlay with instructions for changing location settings. https://zpl.io/bPdleyl
        Alert.alert('', "We need your location to show you what's nearby!", [
          {
            text: 'OK',
            onPress: () => {
              Actions.locationWarning({
                afterLocationAlwaysOn: () => {
                  Actions.pop()
                  swiper.current!.scrollBy(1)
                },
              })
            },
          },
        ])
      }
    }

    const checkAccelerometerPermissions = async () => {
      const check = await getPermission('motion')
      log(`Accelerometer check result is ${check}`)
      swiper.current!.scrollBy(1)
    }

    // NOTE: no need to check this permission on Android
    const checkNotificationPermissions = async () => {
      if (!PushNotification.isPermissionsRequestPending) {
        const {alert, badge, sound} = await PushNotification.requestPermissions()
        // todo, what if they deny permissions?
        log(alert, badge, sound)
        swiper.current!.scrollBy(1)
      }
    }

    const findFriends = async () => {
      try {
        await contactStore!.requestPermission()
        swiper.current!.scrollBy(1)
        setShowAlmostDone(false)
        contactStore!.loadContacts()
      } catch (err) {
        warn(err)
        done()
      }
    }

    const done = () => {
      wocky!.profile!.setOnboarded()
      Actions.logged()
    }

    const pages: ReactElement[] = []
    const {allowsLocation, allowsAccelerometer, allowsNotification, loaded} = permissionStore!

    if (!loaded) {
      return null
    }

    if (!allowsLocation) {
      pages.push(<OnboardingLocation key="0" onPress={checkLocationPermissions} />)
    }
    if (!allowsAccelerometer) {
      pages.push(<OnboardingAccelerometer key="1" onPress={checkAccelerometerPermissions} />)
    }
    if (Platform.OS === 'ios') {
      if (!allowsNotification) {
        pages.push(<OnboardingNotifications key="2" onPress={checkNotificationPermissions} />)
      }
    }

    pages.push(<OnboardingFindFriends key="3" onPress={findFriends} onSkip={done} />)
    pages.push(<OnboardingFindFriendsList key="4" onPress={done} />)

    return (
      <View style={{flex: 1}} testID="onboardingSwiper">
        {showAlmostDone && (
          <RText style={{width: '100%', textAlign: 'center', marginTop: 40 * minHeight}} size={18}>
            almost done!
          </RText>
        )}
        <Swiper
          renderPagination={!showAlmostDone ? () => null : undefined}
          paginationStyle={{top: 8, bottom: undefined}}
          dotColor={colors.GREY}
          activeDotColor={colors.PINK}
          bounces
          ref={swiper}
          scrollEnabled={false}
          loop={false}
        >
          {pages}
        </Swiper>
      </View>
    )
  })
)

export default OnboardingSwiper
