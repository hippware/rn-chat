import React from 'react'
import {when, autorun, reaction} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {settings} from '../globals'
import {Keyboard} from 'react-native'
import {Actions, Router, Scene, Stack, Modal, Lightbox, Tabs} from 'react-native-router-flux'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../store/LocationStore'
import {INavStore} from '../store/NavStore'
import Camera from './Camera'
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
import ReportUser from './report-modals/ReportUser'
import ReportBot from './report-modals/ReportBot'
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
import {IStore} from 'src/store/store'
import OnboardingSwiper from './Onboarding/OnboardingSwiper'
import {IAuthStore} from 'src/store/AuthStore'
import LiveLocationCompose from './LiveLocation/LiveLocationCompose'
import LiveLocationSettings from './LiveLocation/LiveLocationSettings'
import LiveLocationShare from './LiveLocation/LiveLocationShare'
import SplashScreen from 'react-native-splash-screen'
import  {IHomeStore} from 'src/store/HomeStore';

const iconClose = require('../../images/iconClose.png')
const sendActive = require('../../images/sendActive.png')

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  navStore?: INavStore
  homeStore?: IHomeStore
  iconStore?: IconStore
  store?: IStore
  authStore?: IAuthStore
  analytics?: any
}

@inject('wocky', 'locationStore', 'iconStore', 'analytics', 'homeStore', 'navStore', 'authStore')
@observer
class TinyRobotRouter extends React.Component<Props> {
  componentDidMount() {
    const {locationStore, navStore, wocky} = this.props

    reaction(() => this.props.navStore!.scene, () => Keyboard.dismiss())

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

    SplashScreen.hide()
  }

  render() {
    const {iconStore, wocky, navStore, authStore} = this.props

    return (
      <Router onStateChange={() => navStore!.setScene(Actions.currentScene)} {...navBarStyle} uriPrefix={settings.uriPrefix} onDeepLink={this.onDeepLink}>
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
              <Scene key="camera" component={Camera} />
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
                  </Stack>
                  <Scene key="chat" path="conversation/:item" component={ChatScreen} />
                  <Scene key="geofenceShare" component={peopleLists.GeofenceShare} title="Invite Friends" back />
                  <Scene key="liveLocationSelectFriends" component={LiveLocationShare} title="Select Friends" />
                  <Scene key="myAccount" component={MyAccount} editMode back />
                  <Scene key="followers" path="followers" component={peopleLists.FollowersList} title="Followers" back />
                  <Scene key="followed" component={peopleLists.FollowedList} title="Following" back />
                  <Scene key="blocked" component={peopleLists.BlockedList} title="Blocked Users" back />
                  <Scene key="attribution" component={Attribution} leftButtonImage={iconClose} onLeft={() => Actions.pop()} />
                  <Scene key="selectChatUser" component={SelectChatUser} title="Message" />
                  {settings.allowDebugScreen && [
                    <Scene key="locationDebug" component={LocationDebug} title="Location Debug" back />,
                    <Scene key="debugScreen" component={DebugScreen} title="Debug" back />,
                    <Scene key="codePush" component={CodePushScene} title="CodePush" back />,
                  ]}
                </Stack>
                <Scene
                  key="searchUsers"
                  component={peopleLists.SearchUsers}
                  leftButtonImage={iconClose}
                  onLeft={this.resetSearchStore}
                  title="Search Users"
                  rightButtonImage={null}
                  wrap
                />
                <Scene key="reportUser" component={ReportUser} title="Report User" wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={() => Actions.pop()} />
                <Scene key="reportBot" component={ReportBot} title="Report Bot" wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={() => Actions.pop()} />

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

  onDeepLink = async ({action, params}) => {
    const {analytics, homeStore, wocky} = this.props
    analytics.track('deeplink', {action, params})
    if (Actions[action]) {
      // wait until connected
      when(
        () => this.props.wocky!.connected,
        async () => {
          try {
            analytics.track('deeplink_try', {action, params})
            if (action === 'home') {
              homeStore!.select(params.userId)
              const user = await wocky!.getProfile(params.userId)
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

  // TODO: Move it outside
  resetSearchStore = () => {
    this.props.store!.searchStore.setGlobal('')
    Actions.pop()
  }
}

export default TinyRobotRouter
