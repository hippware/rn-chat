import React from 'react'
import {Keyboard} from 'react-native'
import {when, autorun} from 'mobx'
import {observer, inject} from 'mobx-react/native'

import {colors} from '../constants'

import {settings} from '../globals'

import {Actions, Router, Scene, Stack, Modal, Lightbox} from 'react-native-router-flux'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../store/LocationStore'

import {k} from './Global'

import Camera from './Camera'
// import SideMenu from './SideMenu'
import CreateMessage from './CreateMessage'
import Launch from './Launch'
import SignUp from './SignUp'
import Home from './Home/Home'
import MyAccount from './MyAccount'
import ProfileDetail from './ProfileDetail'
import ChatListScreen from './ChatListScreen'
import ChatScreen from './ChatScreen'
import BotCompose from './BotCompose'
import BotCreate from './map/BotCreate'
import {LocationDetailsBottomPopup} from './LocationDetails'
import LocationDetailsNavBar from './LocationDetails/LocationDetailsNavBar'
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
import * as modals from './modals'
import LocationDebug from './LocationDebug'
import SplitNavigator from './SplitNavigator'
import BottomMenu from './BottomMenu'

const STAGING_COLOR = 'rgb(28,247,39)'

export const navBarStyle = {
  navBarTextColor: colors.DARK_PURPLE,
  navBarRightButtonColor: 'rgb(254,92,108)',
  navBarLeftButtonColor: colors.DARK_GREY,
  navBarCancelColor: colors.DARK_GREY,
  navBarButtonColor: settings.isStaging ? STAGING_COLOR : 'rgb(117,117,117)',
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
  // headerMode: 'screen',
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

// const tinyRobotTitle = () => (
//   <TouchableOpacity onPress={() => Actions.refs.home.scrollToTop()}>
//     <Text style={dayNavBar.titleStyle}>tinyrobot</Text>
//   </TouchableOpacity>
// )

const iconClose = require('../../images/iconClose.png')
// const baseMessagesIcon = require('../../images/iconMessage.png')
// const newMessagesIcon = require('../../images/newMessages.png')
const sendActive = require('../../images/sendActive.png')

const uriPrefix = settings.isStaging ? 'tinyrobotStaging://' : 'tinyrobot://'

// prevent keyboard from persisting across scene transitions
autorun(() => {
  if (Actions.currentScene !== '') Keyboard.dismiss()
})

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  store?: any
  firebaseStore?: any
  analytics?: any
}

@inject('store', 'wocky', 'firebaseStore', 'locationStore', 'analytics')
@observer
class TinyRobotRouter extends React.Component<Props> {
  componentDidMount() {
    const {wocky, locationStore, store} = this.props

    autorun(() => {
      if (wocky!.connected && !locationStore!.enabled) {
        if (Actions.locationWarning) Actions.locationWarning()
      }
    }, {delay: 1000})

    autorun(() => {
      if (Actions.currentScene === '_fullMap' && !locationStore!.alwaysOn && !store.locationPrimed) {
        if (Actions.locationPrimer) Actions.locationPrimer()
      }
    }, {delay: 1000} )
  }

  render() {
    const {store, wocky, firebaseStore} = this.props

    return (
      <Router wrapBy={observer} {...navBarStyle} uriPrefix={uriPrefix} onDeepLink={this.onDeepLink}>
        <Stack navigator={SplitNavigator} splitHeight={394}>
          <Lightbox>
            <Stack key="rootStack" initial hideNavBar>
              <Stack key="root" tabs hideTabBar hideNavBar>
                <Stack key="launch" hideNavBar lightbox type="replace">
                  <Scene key="load" component={Launch} on={store.hydrate} success="checkCredentials" failure="onboarding" />
                  <Scene key="checkCredentials" on={() => wocky!.username && wocky!.password && wocky!.host} success="checkProfile" failure="onboarding" />
                  <Scene key="connect" on={this.login} success="checkHandle" failure="onboarding" />
                  <Scene key="checkProfile" on={() => wocky!.profile} success="checkHandle" failure="connect" />
                  <Scene key="checkHandle" on={() => wocky!.profile!.handle} success="logged" failure="signUp" />
                  <Scene key="logout" on={firebaseStore.logout} success="onboarding" />
                </Stack>
                <Stack key="onboarding" navTransparent>
                  <Scene key="slideshow" component={OnboardingSlideshow} onSignIn="signIn" onBypass="testRegisterScene" />
                  <Scene key="signIn" component={SignIn} back />
                  <Scene key="verifyCode" component={VerifyCode} />
                  <Scene key="testRegisterScene" component={TestRegister} success="connect" />
                </Stack>
                <Scene key="signUp" component={SignUp} hideNavBar/>
                <Modal key="logged" hideNavBar headerMode="screen">
                  <Stack>
                    <Scene key="home" component={Home} />
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
              <Scene key="botContainer" headerMode="screen">
                <Scene key="createBot" component={BotCreate} title="Post a New Bot" leftButtonImage={iconClose} onLeft={Actions.pop} />
                <Scene key="botCompose" component={BotCompose} navTransparent />
              </Scene>
              <Scene key="camera" component={Camera} clone hideNavBar />
              <Scene key="botEdit" component={BotCompose} clone edit navTransparent right={() => null} />
              <Scene key="codePush" component={CodePushScene} title="CodePush" clone back />
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
              <Scene key="locationDebug" component={LocationDebug} clone title="Location Debug" back />
            </Stack>
            <Scene key="locationWarning" component={modals.LocationWarning} />
            <Scene key="geofenceWarning" component={modals.LocationGeofenceWarning} />
            <Scene key="locationPrimer" component={modals.LocationPrimer} />
            <Scene key="sharePresencePrimer" component={modals.SharePresencePrimer} />
            <Scene key="firstTimeGuest" component={modals.FirstTimeGuestPrimer} />
          </Lightbox>
          <Scene key="bottomMenu" component={BottomMenu} />
          <Scene key="locationDetails" path="bot/:server/:botId/:params*" component={LocationDetailsBottomPopup} draggable header={LocationDetailsNavBar} />
        </Stack>
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
