import React, { useEffect } from 'react'
import {when, autorun, reaction} from 'mobx'
import {inject, observer} from 'mobx-react'
import {settings} from '../globals'
import {Keyboard, Platform, BackHandler} from 'react-native'
import {Actions, Router, Scene, Stack, Modal, Lightbox, Tabs} from 'react-native-router-flux'
import {IWocky, IProfile} from 'src/wocky'
import {ILocationStore} from '../store/LocationStore'
import {INavStore} from '../store/NavStore'
import SelectChatUser from './Chats/SelectChatUser'
import Launch from './Launch'
import SignUp from './SignUp'
import Home from './Home/Home'
import MyAccount from './MyAccount'
import ProfileDetailNew from './ProfileDetail/ProfileDetail'
import ChatListScreen from './Chats/ChatListScreen'
import ChatScreen from './Chats/ChatScreen'
import BotDetailsNew from './BotDetails/BotDetails'
import TestRegister from './TestRegister'
import CodePushScene from './CodePushScene'
import OnboardingSlideshow from './OnboardingSlideshowScene'
import * as peopleLists from './people-lists'
import FriendSearch from './people-lists/FriendSearch'
import VisitorList from './people-lists/VisitorList'
import AllFriendList from './people-lists/AllFriendList'
import ReportUser, {ReportUserRightButton} from './report-modals/ReportUser'
import ReportBot, {ReportBotRightButton} from './report-modals/ReportBot'
import SignIn from './SignIn'
import VerifyCode from './VerifyCode'
import LocationDebug from './LocationDebug'
import BatteryOptimizationDebug from './BatteryOptimizationDebug'
import BottomMenu from './BottomMenu'
import DebugScreen from './DebugScreen'
import DebugOptionsScreen from './DebugOptionsScreen'
import LocationWarning from './modals/LocationWarning'
import MotionWarning from './modals/MotionWarning'
import SharePresencePrimer from './modals/SharePresencePrimer'
import InvisibleExpirationSelector from './modals/InvisibleExpirationSelector'
import CreationHeader from './Home/CreationHeader'
import BotCompose, {backAction} from './BotCompose/BotCompose'
import EditNote from './BotCompose/EditNote'
import NotificationsNew from './Notifications'
import Attribution from './Attribution'
import {navBarStyle} from './styles'
import IconStore from '../store/IconStore'
import OnboardingSwiper from './Onboarding/OnboardingSwiper'
import {IAuthStore} from 'src/store/AuthStore'
import  {IHomeStore} from 'src/store/HomeStore';
import MapOptions from './MapOptions'
import LocationSettingsModal, {Props as LocationSettingsProps} from './LiveLocation/LocationSettingsModal'
import { IFirebaseStore } from '../store/FirebaseStore'
import {ContactInviteListWithLoad} from './people-lists/ContactInviteList'
import { usePermissionStore } from '../utils/injectors'

const iconClose = require('../../images/iconClose.png')

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  navStore?: INavStore
  homeStore?: IHomeStore
  iconStore?: IconStore
  authStore?: IAuthStore
  analytics?: any
  firebaseStore?: IFirebaseStore
}

const TinyRobotRouter = inject('wocky', 'locationStore', 'iconStore', 'analytics', 'homeStore', 'navStore', 'authStore', 'firebaseStore')(
  observer(({wocky, locationStore, navStore, homeStore, iconStore, authStore, analytics, firebaseStore}: Props) => {
    const permissionStore = usePermissionStore()
    useEffect(() => {
      reaction(() => navStore!.scene, () => Keyboard.dismiss())

      autorun(
        () => {
          if (permissionStore.onboarded && !locationStore!.alwaysOn && navStore!.scene !== 'locationWarning' && Actions.locationWarning) {
            Actions.locationWarning({afterLocationAlwaysOn: () => Actions.popTo('home')})
          }
        },
        {delay: 1000}
      )

      autorun(
        () => {
          if (permissionStore.onboarded && !permissionStore.allowsAccelerometer && navStore!.scene !== 'motionWarning' && Actions.motionWarning) {
            Actions.motionWarning()
          }
        },
        {delay: 1000}
      )

      // ensure we always nav to the default card if we pop back to home (add small delay in case of a popTo -> nav)
      autorun(() => {
        if (navStore!.scene === 'home') {
          Actions.profileDetails({item: wocky!.profile!.id, preview: true})
        }
      }, {delay: 200})
    }, [])

    const showFriendRequestModal = async (params: any) => {
      const profile: IProfile = await wocky!.loadProfile(params.params)
      Actions.locationSettingsModal({
        settingsType: 'ACCEPT_REJECT_REQUEST',
        profile,
        displayName: profile.handle,
        onOkPress: shareType => {
          profile.invite(shareType).then(() => {
            analytics.track('user_follow', (profile as any).toJSON())
          })
          Actions.pop()
        },
        onCancelPress: Actions.pop
      } as LocationSettingsProps)
    }

    const onDeepLink = async ({action, params}) => {
      analytics.track('deeplink', {action, params})
      if (Actions[action]) {
        // wait until connected
        when(
          () => wocky!.connected,
          async () => {
            try {
              analytics.track('deeplink_try', {action, params})
              if (action === 'home') {
                homeStore!.select(params.userId)
                Actions.reset('home')
                const user = await wocky!.getProfile(params.userId) as IProfile
                when(() => !!(user && user.location), () => homeStore!.followUserOnMap(user))
              } else if (action === 'notifications') {
                // friend request
                // todo: would it be worth switching to a more semantic URL than notifications/?params=123
                showFriendRequestModal(params)
              } else {
                Actions[action]({...params, fromDeeplink: true})
                if (action === 'botDetails' && params.params === 'visitors'){
                  Actions.visitors({botId: params.botId})
                } 
              }
              analytics.track('deeplink_success', {action, params})
            } catch (err) {
              analytics.track('deeplink_fail', {error: err, action, params})
            }
          }
        )
      }
    }

    const onBackPress = () => {
      // todo: fix this logic based on new nav
      if (navStore!.params.hasPreview && !navStore!.params.preview) {
        Actions.refresh({preview: true})
      } else {
        if (navStore!.scene === 'profileDetails') {
          BackHandler.exitApp()
        } else {
          Actions.pop()
        }
      }
      return true
    }

    const showSharingModal = async () => {
      const profile = await wocky!.userInviteGetSender(firebaseStore!.inviteCode)
      Actions.locationSettingsModal({
        settingsType: 'ACCEPT_REJECT_REQUEST',
        profile,
        displayName: profile!.handle,
        onOkPress: shareType => {
          firebaseStore!.redeemCode(shareType)
          Actions.pop()
        },
        onCancelPress: Actions.pop
      } as LocationSettingsProps)
    }
  

    const uriPrefix = Platform.select({ios: settings.uriPrefix, android: settings.uriPrefix.toLowerCase()})
    // testing for deep links
    // setTimeout(()=>      {
    //   onDeepLink({action: 'botDetails', params: {preview: false, botId: '7474a836-0c11-42f8-8cc0-5fd6108abcc0'//, params: 'visitors'
    // }})
    //   }, 1500)
    
    return (
      <Router backAndroidHandler={onBackPress} onStateChange={() => navStore!.setScene(Actions.currentScene, Actions.currentParams)} {...navBarStyle} uriPrefix={uriPrefix} onDeepLink={onDeepLink}>
        <Tabs hideNavBar hideTabBar>
          <Lightbox hideNavBar type="replace">
            <Scene key="checkCredentials" component={Launch} on={() => authStore!.canLogin} success="checkProfile" failure="preConnection" />
            <Scene key="connect" on={authStore!.login} success="checkHandle" failure="preConnection" />
            <Scene key="checkProfile" on={() => wocky!.profile} success="checkHandle" failure="connect" />
            <Scene key="checkHandle" on={() => wocky!.profile!.handle} success="checkOnboarded" failure="signUp" />
            <Scene key="checkOnboarded" on={() => permissionStore.onboarded} success={() => {
              Actions.logged()
              if (firebaseStore!.inviteCode) {
                showSharingModal()
              }
            }} failure="onboarding" />
            <Scene key="logout" on={authStore!.logout} success="preConnection" />
          </Lightbox>
          <Lightbox>
            <Stack initial hideNavBar key="main">
              <Stack key="preConnection" navTransparent type="replace">
                <Scene key="slideshow" component={OnboardingSlideshow} onSignIn="signIn" onBypass="testRegisterScene" />
                <Scene key="signIn" component={SignIn} back />
                <Scene key="verifyCode" component={VerifyCode} />
                <Scene key="testRegisterScene" component={TestRegister} success="connect" />
              </Stack>
              <Scene key="signUp" component={SignUp} hideNavBar type="replace" />
              <Scene key="onboarding" component={OnboardingSwiper} hideNavBar type="replace" />
              <Modal key="logged" hideNavBar headerMode="screen" type="replace">
                <Stack>
                  <Lightbox hideNavBar>
                    <Scene key="home" path="livelocation/:userId" component={Home} hideNavBar />
                    <Scene key="createBot" component={CreationHeader} fromTop />
                    <Scene key="botCompose" component={BotCompose} backAction={() => backAction(iconStore!)} shiftMap />
                    <Scene key="botEdit" component={BotCompose} edit backAction={() => backAction(iconStore!)} shiftMap />
                    <Scene key="editNote" component={EditNote} backButton shiftMap />
                    <Scene key="friends" component={peopleLists.FriendList} shiftMap backButton />
                    <Scene key="friendSearch" component={FriendSearch} shiftMap backButton/>
                    <Scene key="visitors" component={VisitorList} shiftMap backButton />
                    <Scene key="chats" component={ChatListScreen} title="Messages" shiftMap backButton />
                    <Scene key="mapOptions" component={MapOptions} shiftMap backButton />
                    <Scene key="bottomMenu" component={BottomMenu} backButton hasPreview shiftMap />
                    <Scene key="profileDetails" path="user/:item" component={ProfileDetailNew} hasPreview />
                    <Scene key="botDetails" path="bot/:botId/:params*" component={BotDetailsNew} hasPreview />
                    <Scene key="notifications" path="invitations/:params*" component={NotificationsNew} backButton shiftMap />
                    <Scene key="allFriends" component={AllFriendList} title="Friends" backButton />
                    <Scene key="shareWithContacts" component={ContactInviteListWithLoad} backButton shiftMap />
                  </Lightbox>
                  <Scene key="chat" path="conversation/:item" component={ChatScreen} />
                  <Scene key="geofenceShare" component={peopleLists.GeofenceShare} title="Invite Friends" back />
                  <Scene key="myAccount" component={MyAccount} editMode back />
                  <Scene key="blocked" component={peopleLists.BlockedList} title="Blocked Users" back />
                  <Scene key="attribution" component={Attribution} leftButtonImage={iconClose} onLeft={() => Actions.pop()} />
                  <Scene key="selectChatUser" component={SelectChatUser} title="Message" />
                  {settings.allowDebugScreen && [
                    <Scene key="locationDebug" component={LocationDebug} title="Location Debug" back />,
                    <Scene key="debugScreen" component={DebugScreen} title="Debug" back />,
                    <Scene key="codePush" component={CodePushScene} title="CodePush" back />,
                    <Scene key="batteryOptimizationDebug" component={BatteryOptimizationDebug} title="Battery Optimization Debug" back />,
                  ]}
                  <Scene key="debugOptionsScreen" component={DebugOptionsScreen} title="Debug Options" navigationBarStyle={{paddingBottom: 20, borderBottomWidth:1}} back />
                </Stack>
                <Scene key="reportUser" component={ReportUser} wrap title="Report User" leftButtonImage={iconClose} onLeft={Actions.pop} right={ReportUserRightButton} />
                <Scene key="reportBot" component={ReportBot} wrap title="Report Location" leftButtonImage={iconClose} onLeft={Actions.pop} right={ReportBotRightButton}  />
              </Modal>
            </Stack>
            <Scene key="reload" hideNavBar type="replace" component={Launch} />
            <Scene key="locationWarning" component={LocationWarning} />
            <Scene key="motionWarning" component={MotionWarning} />
            <Scene key="sharePresencePrimer" component={SharePresencePrimer} />
            <Scene key="invisibleExpirationSelector" component={InvisibleExpirationSelector} />
            <Scene key="locationSettingsModal" component={LocationSettingsModal} />
          </Lightbox>
        </Tabs>
      </Router>
    )
  }
))

export default TinyRobotRouter
