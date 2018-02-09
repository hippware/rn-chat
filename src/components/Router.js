// @flow

import React from 'react';
import {TouchableOpacity, Text, Keyboard} from 'react-native';
import {when, autorun} from 'mobx';
import {observer, inject} from 'mobx-react/native';

import {colors} from '../constants';
import {timeoutWhen} from '../../utils/timeouts';

import {settings} from '../globals';
import {Actions, Router, Scene, Stack, Tabs, Drawer, Modal, Lightbox} from 'react-native-router-flux';

import {k} from './Global';
import {CubeNavigator} from 'react-native-cube-transition';
import analytics from '../utils/analytics';

import Camera from './Camera';
import SideMenu from './SideMenu';
// import CreateMessage from './CreateMessage';
import Launch from './Launch';
import SignUp from './SignUp';
import Home from './Home';
import MyAccount from './MyAccount';
import ProfileDetail from './ProfileDetail';
import AddFriends from './AddFriends';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
// import BotNoteScene from './BotNote';
import BotCompose from './BotCompose';
import BotCreate from './map/BotCreate';
import BotDetails from './BotDetails';
import BotsScreen from './BotsScreen';
import BotShareSelectFriends from './BotShareSelectFriends';
import ExploreNearBy from './map/ExploreNearBy';
import TestRegister from './TestRegister';
import CodePushScene from './CodePushScene';
import OnboardingSlideshow from './OnboardingSlideshowScene';
// import LocationWarning from './LocationWarning';
import BotAddressScene from './map/BotAddressScene';
import * as peopleLists from './people-lists';
// import ReportUser from './report-modals/ReportUser';
// import ReportBot from './report-modals/ReportBot';
import SignIn from './SignIn';
import VerifyCode from './VerifyCode';

const STAGING_COLOR = 'rgb(28,247,39)';

const dayNavBar = {
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
};

const tinyRobotTitle = () => (
  <TouchableOpacity onPress={() => Actions.refs.home.scrollToTop()}>
    <Text style={dayNavBar.titleStyle}>tinyrobot</Text>
  </TouchableOpacity>
);

const iconClose = require('../../images/iconClose.png');
const baseMessagesIcon = require('../../images/iconMessage.png');
const newMessagesIcon = require('../../images/newMessages.png');
const sendActive = require('../../images/sendActive.png');

const uriPrefix = settings.isStaging ? 'tinyrobotStaging://' : 'tinyrobot://';

const onDeepLink = ({action, params}) => {
  analytics.track('deeplink', {action, params});
  // when(
  //   () => globalStore.loaded,
  //   () =>
  //     Actions[action] &&
  //     setTimeout(() => {
  //       try {
  //         analyticsStore.track('deeplink_try', {action, params});
  //         Actions[action](params);
  //         analyticsStore.track('deeplink_success', {action, params});
  //       } catch (err) {
  //         analyticsStore.track('deeplink_fail', {error: err, action, params});
  //       }
  //     }),
  // );
};

type Props = {
  // TODO: figure out how to type these (with typescript?)
  // https://github.com/mobxjs/mobx-react#with-flow
  // store: any,
  // wocky: any,
};

// prevent keyboard from persisting across scene transitions
autorun(() => {
  if (Actions.currentScene !== '') Keyboard.dismiss();
});

@inject('store', 'wocky', 'firebaseStore')
@observer
class TinyRobotRouter extends React.Component<Props> {
  render() {
    const {store, wocky, firebaseStore} = this.props;

    return (
      <Router wrapBy={observer} {...dayNavBar} uriPrefix={uriPrefix} onDeepLink={onDeepLink}>
        <Lightbox>
          <Stack key='rootStack' initial hideNavBar>
            <Stack key='root' tabs hideTabBar hideNavBar lazy>
              <Stack key='launch' hideNavBar lightbox type='replace'>
                <Scene key='load' component={Launch} on={store.hydrate} success='connect' failure='onboarding' />
                <Scene key='connect' on={() => wocky.login()} success='checkProfile' failure='onboarding' />
                <Scene key='checkProfile' on={() => wocky.loadProfile(wocky.username)} success='checkHandle' failure='onboarding' />
                <Scene key='checkHandle' on={() => wocky.profile.handle} success='logged' failure='signUp' />
                <Scene key='logout' on={firebaseStore.logout} success='onboarding' />
              </Stack>
              <Stack key='onboarding' navTransparent>
                <Scene key='slideshow' component={OnboardingSlideshow} onSignIn='signIn' onBypass='testRegisterScene' />
                <Scene key='signIn' component={SignIn} back />
                <Scene key='verifyCode' component={VerifyCode} />
                <Scene key='testRegisterScene' component={TestRegister} success='connect' />
              </Stack>
              <Scene key='signUp' component={SignUp} hideNavBar />
              <Drawer
                key='logged'
                type='replace'
                hideNavBar
                contentComponent={SideMenu}
                drawerImage={require('../../images/iconMenu.png')}
                onRight={() => Actions.messaging()}
                rightButtonImage={() => (wocky.chats.unread > 0 ? newMessagesIcon : baseMessagesIcon)}
                rightButtonTintColor={settings.isStaging ? STAGING_COLOR : colors.PINK}
              >
                <Modal key='modal' hideNavBar>
                  <Tabs key='cube' navigator={CubeNavigator} hideTabBar lazy>
                    <Tabs key='main' hideTabBar lazy>
                      <Scene key='home' component={Home} renderTitle={tinyRobotTitle} />
                      <Scene key='fullMap' component={ExploreNearBy} navTransparent />
                      <Scene key='botsScene' component={BotsScreen} title='Bots' />
                      <Scene key='friendsMain'>
                        <Scene key='friends' component={peopleLists.FriendListScene} title='Friends' />
                        <Scene key='addFriends' component={AddFriends} title='Add Friends' back rightButtons={[]} />
                        <Scene key='blocked' component={peopleLists.BlockedList} title='Blocked' back />
                        <Scene key='addFriendByUsername' component={peopleLists.AddFriendByUsername} title='Add by Username' back />
                      </Scene>
                    </Tabs>

                    <Stack key='messaging' rightButtonImage={iconClose} onRight={() => Actions.main()}>
                      <Scene key='chats' component={ChatListScreen} title='Messages' />
                      <Scene key='chat' path='conversation/:server/:item' component={ChatScreen} back rightButtonImage={null} />
                    </Stack>
                  </Tabs>

                  {/* <Scene key='selectFriends' component={CreateMessage} title='Select Friend' wrap leftButtonImage={iconClose} onLeft={Actions.pop} rightButtonImage={null} /> */}
                  <Scene
                    key='searchUsers'
                    component={peopleLists.SearchUsers}
                    leftButtonImage={iconClose}
                    onLeft={this.resetSearchStore}
                    title='Search Users'
                    rightButtonImage={null}
                    wrap
                  />
                  {/* <Scene key='reportUser' component={ReportUser} title='Report User' wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={Actions.pop} />
                    <Scene key='reportBot' component={ReportBot} title='Report Bot' wrap rightButtonImage={sendActive} leftButtonImage={iconClose} onLeft={Actions.pop} /> */}
                </Modal>
              </Drawer>
            </Stack>
            <Scene key='botContainer' headerMode='screen'>
              <Scene key='createBot' component={BotCreate} title='Post a New Bot' leftButtonImage={iconClose} onLeft={Actions.pop} />
              <Scene key='botCompose' component={BotCompose} navTransparent />
            </Scene>
            <Scene key='camera' component={Camera} clone hideNavBar />
            <Scene key='botEdit' component={BotCompose} clone edit navTransparent right={() => null} />
            <Scene key='codePush' component={CodePushScene} title='CodePush' clone back />
            <Scene key='botDetails' path='bot/:server/:item' component={BotDetails} scale={0.5} clone back right={() => null} />
            <Scene key='botShareSelectFriends' component={BotShareSelectFriends} title='Share' clone back right={() => null} />
            <Scene key='subscribers' component={peopleLists.BotSubscriberList} clone back right={() => null} navTransparent={false} title='Saves' />
            {/* <Scene key='botNote' component={BotNoteScene} clone leftTitle='Cancel' onLeft={Actions.pop} navTransparent={false} /> */}
            <Scene key='botAddress' component={BotAddressScene} clone back title='Edit Location' />
            <Scene key='profileDetails' component={ProfileDetail} clone back navTransparent={false} />
            <Scene key='myAccount' component={MyAccount} editMode clone back />
            <Scene key='followers' path='followers' component={peopleLists.FollowersList} clone title='Followers' back />
            <Scene key='followed' component={peopleLists.FollowedList} clone title='Following' back />
            <Scene key='blocked' component={peopleLists.BlockedList} clone title='Blocked Users' back right={() => null} />
          </Stack>
          {/* <Scene key='locationWarning' component={LocationWarning} /> */}
        </Lightbox>
      </Router>
    );
  }

  resetSearchStore = () => {
    this.props.store.searchStore.setGlobal('');
    Actions.pop();
  };
}

export default TinyRobotRouter;
