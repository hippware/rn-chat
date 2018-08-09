import React from 'react'
// import {Keyboard} from 'react-native'
import {when, autorun} from 'mobx'
import {observer, inject} from 'mobx-react/native'

import {colors} from '../constants'

import {settings} from '../globals'

import {Actions, Router, Scene, Stack, Modal, Lightbox, Tabs} from 'react-native-router-flux'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../store/LocationStore'
import {INavStore} from '../store/NavStore'

import {k} from './Global'

import Camera from './Camera'
// import SideMenu from './SideMenu'
import CreateMessage from './CreateMessage'
import Launch from './Launch'
import SignUp from './SignUp'
import Home from './Home/Home'
import MyAccount from './MyAccount'
import ProfileDetail from './ProfileDetail/ProfileDetail'
import ChatListScreen from './ChatListScreen'
import ChatScreen from './ChatScreen'
import BotDetails from './BotDetails/BotDetails'
import BotDetailsNavBar from './BotDetails/BotDetailsNavBar'
import BotsScreen from './BotsScreen'
// import ExploreNearBy from './map/ExploreNearBy'
import TestRegister from './TestRegister'
import CodePushScene from './CodePushScene'
import OnboardingSlideshow from './OnboardingSlideshowScene'
import BotAddressScene from './map/BotAddressScene'
import * as peopleLists from './people-lists'
import ReportUser from './report-modals/ReportUser'
import ReportBot from './report-modals/ReportBot'
import SignIn from './SignIn'
import VerifyCode from './VerifyCode'
import LocationDebug from './LocationDebug'
import SplitRenderer from './custom-navigators/SplitRenderer'
// import ErrorNavigator from './ErrorNavigator'
// import TopDownRenderer from './custom-navigators/TopDownRenderer'
import BottomMenu from './BottomMenu'
import DebugScreen from './DebugScreen'
import LocationGeofenceWarning from './modals/LocationGeofenceWarning'
import LocationPrimer from './modals/LocationPrimer'
import LocationWarning from './modals/LocationWarning'
import SharePresencePrimer from './modals/SharePresencePrimer'
import FirstTimeGuestPrimer from './modals/FirstTimeGuestPrimer'
import InvisibleExpirationSelector from './modals/InvisibleExpirationSelector'
import GeoHeaderPrimer from './modals/GeoHeaderPrimer'
import CreationHeader from './Home/CreationHeader'
import BotCompose from './BotCompose/BotCompose'

export const navBarStyle = {
  navBarTextColor: colors.DARK_PURPLE,
  navBarRightButtonColor: 'rgb(254,92,108)',
  navBarLeftButtonColor: colors.DARK_GREY,
  navBarCancelColor: colors.DARK_GREY,
  navBarButtonColor: settings.isStaging ? colors.STAGING_COLOR : 'rgb(117,117,117)',
  navBarBackgroundColor: 'white',
  navBarButtonFontSize: 15 * k,
  navBarFontFamily: 'Roboto-Regular',
  backButtonImage: require('../../images/iconBackGrayNew.png'),
  titleStyle: {
    fontSize: 16 * k,
    fontWeight: undefined,
    letterSpacing: 0.5,
    color: colors.DARK_PURPLE,
    fontFamily: 'Roboto-Regular',
  },
  leftButtonIconStyle: {
    marginLeft: 10 * k,
  },
  rightButtonTextStyle: {
    marginRight: 10 * k,
    color: colors.PINK,
    fontFamily: 'Roboto-Regular',
  },
  leftButtonTextStyle: {
    marginLeft: 10 * k,
    color: colors.PINK,
    fontFamily: 'Roboto-Regular',
  },
  sceneStyle: {
    backgroundColor: 'white',
  },
  navigationBarStyle: {
    borderBottomWidth: 0,
    elevation: 1,
    backgroundColor: 'white',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
}

const iconClose = require('../../images/iconClose.png')
// const baseMessagesIcon = require('../../images/iconMessage.png')
// const newMessagesIcon = require('../../images/newMessages.png')
const sendActive = require('../../images/sendActive.png')

const uriPrefix = settings.isStaging ? 'tinyrobotStaging://' : 'tinyrobot://'

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  navStore?: INavStore
  store?: any
  firebaseStore?: any
  analytics?: any
}

@inject('store', 'wocky', 'firebaseStore', 'locationStore', 'analytics', 'navStore')
@observer
class TinyRobotRouter extends React.Component<Props> {
  componentDidMount() {
    const {wocky, locationStore} = this.props

    autorun(
      () => {
        if (wocky!.connected && !locationStore!.enabled) {
          if (Actions.locationWarning) Actions.locationWarning()
        }
      },
      {delay: 1000}
    )

    autorun(() => {
      const {navStore: {scene}, store: {locationPrimed}, locationStore: {alwaysOn}} = this.props
      if (scene === 'home' && !alwaysOn && !locationPrimed) {
        if (Actions.locationPrimer) Actions.locationPrimer()
      }
    }, {delay: 1000} )
  }

  render() {
    const {store, wocky, navStore} = this.props

    return (
      <Router onStateChange={() => navStore.setScene(Actions.currentScene)} {...navBarStyle} uriPrefix={uriPrefix} onDeepLink={this.onDeepLink}>
        <Tabs hideNavBar hideTabBar>
          <Stack hideNavBar lightbox type="replace">
            <Scene key="load" component={Launch} on={store.hydrate} success="checkCredentials" failure="onboarding" />
            <Scene key="checkCredentials" on={() => wocky!.username && wocky!.password && wocky!.host} success="checkProfile" failure="onboarding" />
            <Scene key="connect" on={this.login} success="checkHandle" failure="onboarding" />
            <Scene key="checkProfile" on={() => wocky!.profile} success="checkHandle" failure="connect" />
            <Scene key="checkHandle" on={() => wocky!.profile!.handle} success="logged" failure="signUp" />
            <Scene key="logout" on={store.logout} success="onboarding" />
          </Stack>
          <Lightbox>
            <Stack renderer={SplitRenderer}>
              <Stack initial hideNavBar>
                <Stack hideNavBar>
                  <Stack key="onboarding" navTransparent type="replace">
                    <Scene key="slideshow" component={OnboardingSlideshow} onSignIn="signIn" onBypass="testRegisterScene" />
                    <Scene key="signIn" component={SignIn} back />
                    <Scene key="verifyCode" component={VerifyCode} />
                    <Scene key="testRegisterScene" component={TestRegister} success="connect" />
                  </Stack>
                  <Scene key="signUp" component={SignUp} hideNavBar />
                  <Modal key="logged" hideNavBar headerMode="screen" type="replace">
                    <Stack key="loggedHome">
                      <Scene key="home" component={Home} navTransparent />
                      <Scene key="botsScene" component={BotsScreen} title="Favorites" />
                      <Scene key="friendsMain" component={peopleLists.FriendListScene} title="Friends" />
                      <Scene key="blocked" component={peopleLists.BlockedList} title="Blocked" />
                      <Scene key="chats" component={ChatListScreen} title="Messages" />
                      <Scene key="chat" path="conversation/:server/:item" component={ChatScreen} />
                    </Stack>
                    <Scene key="selectFriends" component={CreateMessage} title="Select Friend" wrap leftButtonImage={iconClose} onLeft={Actions.pop} rightButtonImage={null} />
                    <Scene key="searchUsers" component={peopleLists.SearchUsers} leftButtonImage={iconClose} onLeft={this.resetSearchStore} title="Search Users" rightButtonImage={null} wrap />
                    <Scene key="reportUser" component={ReportUser} title="Report User" wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={Actions.pop} />
                    <Scene key="reportBot" component={ReportBot} title="Report Bot" wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={Actions.pop} />
                  </Modal>
                </Stack>
                {/* <Scene key="botContainer" headerMode="screen">
                <Scene key="createBot" component={BotCreate} title="Post a New Bot" leftButtonImage={iconClose} onLeft={Actions.pop} />
                <Scene key="botCompose" component={BotCompose} navTransparent />
              </Scene> */}
                {/* <Scene key="botEdit" component={BotCompose} clone edit navTransparent right={() => null} /> */}
                <Scene key="botShareSelectFriends" component={peopleLists.BotShareSelectFriends} title="Share" clone back right={() => null} />
                <Scene key="geofenceShare" component={peopleLists.GeofenceShare} title="See Who's Here" clone left={() => null} />
                <Scene key="subscribers" component={peopleLists.BotSubscriberList} clone back right={() => null} navTransparent={false} title="Favorites" />
                <Scene key="visitors" component={peopleLists.BotVisitorList} clone back right={() => null} navTransparent={false} title="Who's Here" />
                {/* <Scene key='botNote' component={BotNoteScene} clone leftTitle='Cancel' onLeft={Actions.pop} navTransparent={false} /> */}
                <Scene key="botAddress" component={BotAddressScene} clone back title="Edit Location" />
                <Scene key="profileDetails" component={ProfileDetail} clone back navTransparent={false} />
                <Scene key="myAccount" component={MyAccount} editMode clone back />
                <Scene key="followers" path="followers" component={peopleLists.FollowersList} clone title="Followers" back />
                <Scene key="followed" component={peopleLists.FollowedList} clone title="Following" back />
                <Scene key="blocked" component={peopleLists.BlockedList} clone title="Blocked Users" back right={() => null} />
                {settings.isStaging && [
                  <Scene key="locationDebug" component={LocationDebug} clone title="Location Debug" back />,
                  <Scene key="debugScreen" component={DebugScreen} clone title="Debug" back />,
                  <Scene key="codePush" component={CodePushScene} title="CodePush" clone back />,
                ]}
                <Scene key="reload" hideNavBar lightbox type="replace" component={Launch} clone />
              </Stack>
              <Scene key="bottomMenu" component={BottomMenu} />
              <Scene key="createBot" path="bot/:server/:botId/:params*" component={CreationHeader} fromTop />
              <Scene key="botDetails" path="bot/:server/:botId/:params*" component={BotDetails} draggable opacityHeader={BotDetailsNavBar} />
              <Scene key="botCompose" component={BotCompose} back />
              <Scene key="botEdit" component={BotCompose} edit back />
              <Scene key="camera" component={Camera} />
            </Stack>
            <Scene key="locationWarning" component={LocationWarning} />
            <Scene key="geofenceWarning" component={LocationGeofenceWarning} />
            <Scene key="locationPrimer" component={LocationPrimer} />
            <Scene key="sharePresencePrimer" component={SharePresencePrimer} />
            <Scene key="firstTimeGuest" component={FirstTimeGuestPrimer} />
            <Scene key="invisibleExpirationSelector" component={InvisibleExpirationSelector} />
            <Scene key="geoHeaderPrimer" component={GeoHeaderPrimer} />
          </Lightbox>
        </Tabs>
      </Router>
    )
  }

  onDeepLink = async ({action, params}) => {
    const {analytics} = this.props
    analytics.track('deeplink', {action, params})
    if (Actions[action]) {
      // wait until connected
      when(
        () => this.props.wocky!.connected,
        () => {
          try {
            analytics.track('deeplink_try', {action, params})
            Actions[action](params)
            analytics.track('deeplink_success', {action, params})
          } catch (err) {
            analytics.track('deeplink_fail', {error: err, action, params})
          }
        }
      )
    }
  }

  resetSearchStore = () => {
    this.props.store.searchStore.setGlobal('')
    Actions.pop()
  }

  login = async () => {
    try {
      await this.props.wocky!.login()
      return true
    } catch (error) {
      this.props.analytics.track('error_connection', {error})
    }
    return false
  }
}

export default TinyRobotRouter
