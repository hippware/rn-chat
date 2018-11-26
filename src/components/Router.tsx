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
import CreateMessage from './CreateMessage'
import Launch from './Launch'
import SignUp from './SignUp'
import Home from './Home/Home'
import MyAccount from './MyAccount'
import ProfileDetail from './ProfileDetail/ProfileDetail'
import ChatListScreen from './ChatListScreen'
import ChatScreen from './ChatScreen'
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
import LocationPrimer from './modals/LocationPrimer'
import LocationWarning from './modals/LocationWarning'
import SharePresencePrimer from './modals/SharePresencePrimer'
import FirstTimeGuestPrimer from './modals/FirstTimeGuestPrimer'
import InvisibleExpirationSelector from './modals/InvisibleExpirationSelector'
import GeoHeaderPrimer from './modals/GeoHeaderPrimer'
import CreationHeader from './Home/CreationHeader'
import BotCompose, {backAction} from './BotCompose/BotCompose'
import EditNote from './BotCompose/EditNote'
import Notifications from './Notifications'
import Attribution from './Attribution'
import { navBarStyle } from './styles'
import IconStore from '../store/IconStore'
import { IStore } from 'src/store'

const iconClose = require('../../images/iconClose.png')
const sendActive = require('../../images/sendActive.png')

const uriPrefix = settings.isStaging ? 'tinyrobotStaging://' : 'tinyrobot://'

type Props = {
  wocky?: IWocky
  locationStore?: ILocationStore
  navStore?: INavStore
  iconStore?: IconStore
  store?: IStore
  analytics?: any
  log?: any
}

@inject('store', 'wocky', 'locationStore', 'iconStore', 'analytics', 'navStore', 'log')
@observer
class TinyRobotRouter extends React.Component<Props> {
  componentDidMount() {
    const {wocky, locationStore, navStore, store} = this.props

    autorun(
      () => {
        if (wocky!.connected && !locationStore!.enabled) {
          if (Actions.locationWarning) Actions.locationWarning()
        }
      },
      {delay: 1000}
    )

    reaction(() => this.props.navStore!.scene, () => Keyboard.dismiss())

    // TODO: Move it outside, why we can't put it inside Home?
    autorun(
      () => {
        const {locationPrimed} = store!
        const {scene} = navStore!
        const {alwaysOn} = locationStore!
        if (scene === 'home' && !alwaysOn && !locationPrimed) {
          if (Actions.locationPrimer) Actions.locationPrimer()
        }
      },
      {delay: 1000}
    )
  }

  render() {
    const {store, iconStore, wocky, navStore} = this.props

    return (
      <Router onStateChange={() => navStore!.setScene(Actions.currentScene)} {...navBarStyle} uriPrefix={uriPrefix} onDeepLink={this.onDeepLink}>
        <Tabs hideNavBar hideTabBar>
          <Stack hideNavBar lightbox type="replace">
            <Scene key="load" component={Launch} on={store!.hydrate} success="checkCredentials" failure="onboarding" />
            <Scene key="checkCredentials" on={() => wocky!.username && wocky!.password && wocky!.host} success="checkProfile" failure="onboarding" />
            <Scene key="connect" on={this.login} success="checkHandle" failure="onboarding" />
            <Scene key="checkProfile" on={() => wocky!.profile} success="checkHandle" failure="connect" />
            <Scene key="checkHandle" on={() => wocky!.profile!.handle} success="logged" failure="signUp" />
            <Scene key="logout" on={store!.logout} success="onboarding" />
          </Stack>
          <Lightbox>
            <Stack initial hideNavBar key="main">
              <Stack hideNavBar>
                <Stack key="onboarding" navTransparent type="replace">
                  <Scene key="slideshow" component={OnboardingSlideshow} onSignIn="signIn" onBypass="testRegisterScene" />
                  <Scene key="signIn" component={SignIn} back />
                  <Scene key="verifyCode" component={VerifyCode} />
                  <Scene key="testRegisterScene" component={TestRegister} success="connect" />
                </Stack>
                <Scene key="signUp" component={SignUp} hideNavBar />
                <Scene key="camera" component={Camera} />
                <Modal key="logged" hideNavBar headerMode="screen" type="replace">
                  <Stack>
                    <Stack hideNavBar renderer={SplitRenderer}>
                      <Scene key="home" component={Home} hideNavBar />
                      <Scene key="bottomMenu" component={BottomMenu} />
                      <Scene key="createBot" component={CreationHeader} fromTop />
                      <Scene key="botDetails" path="bot/:server/:botId/:params*" component={BotDetails} />
                      <Scene key="botCompose" component={BotCompose} backAction={() => backAction(iconStore!)} />
                      <Scene key="botEdit" component={BotCompose} edit backAction={() => backAction(iconStore!)} />
                      <Scene key="editNote" component={EditNote} />
                      <Scene key="notifications" component={Notifications} />
                      <Scene key="friends" component={peopleLists.FriendList} />
                      <Scene key="friendSearch" component={FriendSearch} />
                      <Scene key="visitors" component={VisitorList} />
                    </Stack>
                    <Scene key="chats" component={ChatListScreen} title="Messages" />
                    <Scene key="chat" path="conversation/:server/:item" component={ChatScreen} />
                    <Scene key="botShareSelectFriends" component={peopleLists.BotShareSelectFriends} title="Share" back right={() => null} />
                    <Scene key="geofenceShare" component={peopleLists.GeofenceShare} title="See Who's Here" back />
                    <Scene key="subscribers" component={peopleLists.BotSubscriberList} back right={() => null} navTransparent={false} title="Favorites" />
                    <Scene key="profileDetails" component={ProfileDetail} back navTransparent={false} />
                    <Scene key="myAccount" component={MyAccount} editMode back />
                    <Scene key="followers" path="followers" component={peopleLists.FollowersList} title="Followers" back />
                    <Scene key="followed" component={peopleLists.FollowedList} title="Following" back />
                    <Scene key="blocked" component={peopleLists.BlockedList} title="Blocked" back />
                    <Scene key="attribution" component={Attribution} leftButtonImage={iconClose} onLeft={Actions.pop} />
                    {settings.isStaging && [
                      <Scene key="locationDebug" component={LocationDebug} title="Location Debug" back />,
                      <Scene key="debugScreen" component={DebugScreen} title="Debug" back />,
                      <Scene key="codePush" component={CodePushScene} title="CodePush" back />,
                    ]}
                    {/* <Scene key="reload" hideNavBar lightbox type="replace" component={Launch} clone /> */}
                  </Stack>
                  <Scene key="selectFriends" component={CreateMessage} title="Select Friend" wrap leftButtonImage={iconClose} onLeft={Actions.pop} rightButtonImage={null} />
                  <Scene
                    key="searchUsers"
                    component={peopleLists.SearchUsers}
                    leftButtonImage={iconClose}
                    onLeft={this.resetSearchStore}
                    title="Search Users"
                    rightButtonImage={null}
                    wrap
                  />
                  <Scene key="reportUser" component={ReportUser} title="Report User" wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={Actions.pop} />
                  <Scene key="reportBot" component={ReportBot} title="Report Bot" wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={Actions.pop} />
                </Modal>
              </Stack>
            </Stack>
            <Scene key="reload" hideNavBar type="replace" component={Launch} />
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

  // TODO: Move it outside
  resetSearchStore = () => {
    this.props.store!.searchStore.setGlobal('')
    Actions.pop()
  }

  // TODO: Move it outside
  login = async () => {
    try {
      await this.props.wocky!.login(undefined, undefined, undefined) // Remove that after new typings for MST3
      return true
    } catch (error) {
      this.props.analytics.track('error_connection', {error})
    }
    return false
  }
}

export default TinyRobotRouter
