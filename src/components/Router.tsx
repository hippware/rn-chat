import React, { useEffect } from 'react'
import {when, autorun, reaction} from 'mobx'
import {inject, observer} from 'mobx-react'
import {settings} from '../globals'
import {Keyboard, Platform} from 'react-native'
import {Actions, Router, Scene, Stack, Modal, Lightbox, Tabs} from 'react-native-router-flux'
import {IWocky, IProfile} from 'wocky-client'
import {ILocationStore} from '../store/LocationStore'
import {INavStore} from '../store/NavStore'
import SelectChatUser from './Chats/SelectChatUser'
import Launch from './Launch'
import SignUp from './SignUp'
import Home from './Home/Home'
import MyAccount from './MyAccount'
import ProfileDetail from './ProfileDetail/ProfileDetail'
import ChatListScreen from './Chats/ChatListScreen'
import ChatScreen from './Chats/ChatScreen'
import BotDetails from './BotDetails/BotDetails'
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
import SplitRenderer from './custom-navigators/SplitRenderer'
import BottomMenu from './BottomMenu'
import DebugScreen from './DebugScreen'
import LocationGeofenceWarning from './modals/LocationGeofenceWarning'
import LocationWarning from './modals/LocationWarning'
import SharePresencePrimer from './modals/SharePresencePrimer'
import InvisibleExpirationSelector from './modals/InvisibleExpirationSelector'
import GeoHeaderPrimer from './modals/GeoHeaderPrimer'
import CreationHeader from './Home/CreationHeader'
import BotCompose, {backAction} from './BotCompose/BotCompose'
import EditNote from './BotCompose/EditNote'
import Notifications from './Notifications'
import Attribution from './Attribution'
import {navBarStyle} from './styles'
import IconStore from '../store/IconStore'
import OnboardingSwiper from './Onboarding/OnboardingSwiper'
import {IAuthStore} from 'src/store/AuthStore'
import LiveLocationCompose from './LiveLocation/LiveLocationCompose'
import LiveLocationSettings from './LiveLocation/LiveLocationSettings'
import LiveLocationShare from './LiveLocation/LiveLocationShare'
import  {IHomeStore} from 'src/store/HomeStore';
import MapOptions from './MapOptions'

export const iconClose = require('../../images/iconClose.png')

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  navStore?: INavStore
  homeStore?: IHomeStore
  iconStore?: IconStore
  authStore?: IAuthStore
  analytics?: any
}

const TinyRobotRouter = inject('wocky', 'locationStore', 'iconStore', 'analytics', 'homeStore', 'navStore', 'authStore')(
  observer(({wocky, locationStore, navStore, homeStore, iconStore, authStore, analytics}: Props) => {
    useEffect(() => {
      reaction(() => navStore!.scene, () => Keyboard.dismiss())

      autorun(
        () => {
          const onboarded = wocky!.profile && wocky!.profile.onboarded
          const {scene} = navStore!
          const {alwaysOn} = locationStore!
          if (onboarded && !alwaysOn) {
            if (scene !== 'locationWarning'){
              if (Actions.locationWarning) Actions.locationWarning({afterLocationAlwaysOn: () => Actions.popTo('home')})
            }
          }
        },
        {delay: 1000}
      )
    }, [])

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
                wocky!.notifications.setMode(2)
                Actions.notifications()
              } else {
                Actions[action](params)
              }
              analytics.track('deeplink_success', {action, params})
            } catch (err) {
              analytics.track('deeplink_fail', {error: err, action, params})
            }
          }
        )
      }
    }

    const uriPrefix = Platform.select({ios: settings.uriPrefix, android: settings.uriPrefix.toLowerCase()})

    return (
      <Router onStateChange={() => navStore!.setScene(Actions.currentScene)} {...navBarStyle} uriPrefix={uriPrefix} onDeepLink={onDeepLink}>
        <Tabs hideNavBar hideTabBar>
          <Lightbox hideNavBar type="replace">
            <Scene key="checkCredentials" component={Launch} on={() => authStore!.canLogin} success="checkProfile" failure="preConnection" />
            <Scene key="connect" on={authStore!.login} success="checkHandle" failure="preConnection" />
            <Scene key="checkProfile" on={() => wocky!.profile} success="checkHandle" failure="connect" />
            <Scene key="checkHandle" on={() => wocky!.profile!.handle} success="checkOnboarded" failure="signUp" />
            <Scene key="checkOnboarded" on={() => wocky!.profile!.onboarded} success="logged" failure="onboarding" />
            <Scene key="logout" on={authStore!.logout} success="preConnection" />
            <Scene key="liveLocationShare" on={() => wocky!.profile!.isLocationShared} success='liveLocationSettings' failure='liveLocationSelectFriends'/>
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
                  <Stack hideNavBar renderer={SplitRenderer}>
                    <Scene key="home" path="livelocation/:userId" component={Home} hideNavBar />
                    <Scene key="bottomMenu" component={BottomMenu} />
                    <Scene key="createBot" component={CreationHeader} fromTop />
                    <Scene key="botDetails" path="bot/:botId/:params*" component={BotDetails} />
                    <Scene key="botCompose" component={BotCompose} backAction={() => backAction(iconStore!)} />
                    <Scene key="botEdit" component={BotCompose} edit backAction={() => backAction(iconStore!)} />
                    <Scene key="editNote" component={EditNote} />
                    <Scene key="notifications" path="invitations/:params*" component={Notifications} />
                    <Scene key="friends" component={peopleLists.FriendList} />
                    <Scene key="friendSearch" component={FriendSearch} />
                    <Scene key="visitors" component={VisitorList} />
                    <Scene key="profileDetails" path="user/:item" component={ProfileDetail} />
                    <Scene key="liveLocationCompose" component={LiveLocationCompose} />
                    <Scene key="liveLocationSettings" component={LiveLocationSettings} />
                    <Scene key="chats" component={ChatListScreen} title="Messages" />
                    <Scene key="mapOptions" component={MapOptions} />
                  </Stack>
                  <Scene key="chat" path="conversation/:item" component={ChatScreen} />
                  <Scene key="allFriends" component={AllFriendList} title="Friends" />
                  <Scene key="geofenceShare" component={peopleLists.GeofenceShare} title="Invite Friends" back />
                  <Scene key="liveLocationSelectFriends" component={LiveLocationShare} title="Select Friends" />
                  <Scene key="myAccount" component={MyAccount} editMode back />
                  
                  <Scene key="blocked" component={peopleLists.BlockedList} title="Blocked Users" back />
                  <Scene key="attribution" component={Attribution} leftButtonImage={iconClose} onLeft={() => Actions.pop()} />
                  <Scene key="selectChatUser" component={SelectChatUser} title="Message" />
                  {settings.allowDebugScreen && [
                    <Scene key="locationDebug" component={LocationDebug} title="Location Debug" back />,
                    <Scene key="debugScreen" component={DebugScreen} title="Debug" back />,
                    <Scene key="codePush" component={CodePushScene} title="CodePush" back />,
                  ]}
                </Stack>
                <Scene key="reportUser" component={ReportUser} wrap title="Report User" leftButtonImage={iconClose} onLeft={Actions.pop} right={ReportUserRightButton} />
                <Scene key="reportBot" component={ReportBot} wrap title="Report Location" leftButtonImage={iconClose} onLeft={Actions.pop} right={ReportBotRightButton}  />

              </Modal>
            </Stack>
            <Scene key="reload" hideNavBar type="replace" component={Launch} />
            <Scene key="locationWarning" component={LocationWarning} />
            <Scene key="geofenceWarning" component={LocationGeofenceWarning} />
            <Scene key="sharePresencePrimer" component={SharePresencePrimer} />
            <Scene key="invisibleExpirationSelector" component={InvisibleExpirationSelector} />
            <Scene key="geoHeaderPrimer" component={GeoHeaderPrimer} />
          </Lightbox>
        </Tabs>
      </Router>
    )
  }
))

export default TinyRobotRouter
