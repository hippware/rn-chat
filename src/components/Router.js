// @flow

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {autorunAsync, autorun, when} from 'mobx';
import {observer} from 'mobx-react/native';
import {colors} from '../constants';
import model from '../model/model';
import firebaseStore from '../store/firebaseStore';
import {settings} from '../globals';
import {Actions, Router, Scene} from 'react-native-router-flux';
import storage from '../store/storage';
import profileStore from '../store/profileStore';

import {k} from './Global';
import {CubeNavigator} from 'react-native-cube-transition';

import Camera from './Camera';
import SideMenu from './SideMenu';
import CreateMessage from './CreateMessage';
import Launch from './Launch';
import SignUp from './SignUp';
import Home from './Home';
import MyAccount from './MyAccount';
import ProfileDetail from './ProfileDetail';
import AddFriends from './AddFriends';
import ChatsScreen from './ChatsScreen';
import ChatScreen from './ChatScreen';
import BotNoteScene from './BotNote';
import BotCompose from './BotCompose';
import BotCreate from './map/BotCreate';
import BotDetails from './BotDetails';
import BotsScreen from './BotsScreen';
import BotShareSelectFriends from './BotShareSelectFriends';
import ExploreNearBy from './map/ExploreNearBy';
import TestRegister from './TestRegister';
import CodePushScene from './CodePushScene';
import OnboardingSlideshow from './OnboardingSlideshowScene';
import LocationWarning from './LocationWarning';
import BotAddressScene from './map/BotAddressScene';
import * as peopleLists from './people-lists';
import ReportUser from './report-modals/ReportUser';
import ReportBot from './report-modals/ReportBot';
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
//
// const menuButton = {
//   icon: require('../images/iconMenu.png'),
//   badgeMinSize: 2,
//   badgeFontSize: 2,
//   badgeFontFamily: 'Roboto-Medium',
//   testID: 'leftNavButton',
//   badgeOriginX: 27,
//   badgeOriginY: 1,
//   badgeBGColor: 'rgb(254,92,108)',
//   onPress: () => Actions.get('drawer').ref.toggle({side: 'left', animated: true}),
// };
//
// const messageButton = {
//   icon: require('../images/iconMessage.png'),
//   badgeTextColor: 'white',
//   badgeFontFamily: 'Roboto-Medium',
//   badgeFontSize: 11.0,
//   testID: 'rightNavButton',
//   badgeBGColor: 'rgb(254,92,108)',
//   onPress: Actions.chatsContainer,
// };

// import botFactory from './factory/botFactory';

when(
  () => model.connected && model.profile && model.profile.handle,
  () => {
    setTimeout(() => {
      // Actions.botDetails({item: '8bfee86e-9d1a-11e7-bd78-0a580a020377'});
      // Actions.subscribers({item: 'd1b08da4-3429-11e7-93e4-0e78520e044a'});
      // Actions.botShareSelectFriends({item: '9b2a4590-8e7e-11e7-8720-0eea5386eb69'});
      // setTimeout(() => Actions.botPhotoSwiper({item: 'aa567e14-5795-11e7-9926-0e78520e044a', index: 1}), 1000);
      // setTimeout(Actions.botNote, 1000);
      // Actions.botCreate();
    }, 1000);
  },
);

when(
  () => model.loaded,
  () => {
    setTimeout(() => {
      // Actions.signIn();
      // Actions.signUp();
    }, 500);
  },
);

const iconClose = require('../../images/iconClose.png');
const baseMessagesIcon = require('../../images/iconMessage.png');
const newMessagesIcon = require('../../images/newMessages.png');

// prettier-ignore eslint-ignore
const TinyRobotRouter = () => (
  <Router wrapBy={observer} {...dayNavBar}>
    <Scene lightbox>
      <Scene key='rootStack' initial hideNavBar>
        <Scene key='root' hideTabBar hideNavBar tabs lazy>
          <Scene key='launch' hideNavBar lightbox>
            <Scene key='load' component={Launch} on={storage.load} success='connect' failure='onboarding' />
            <Scene key='connect' on={profileStore.connect} success='checkProfile' failure='onboarding' />
            <Scene key='checkProfile' on={() => model.profile && model.profile.loaded} success='checkHandle' failure='retrieveProfile' />
            <Scene key='retrieveProfile' on={profileStore.requestOwn} success='checkHandle' failure='onboarding' />
            <Scene key='checkHandle' on={() => model.profile.handle} success='logged' failure='signUp' />
            <Scene key='testRegister' on={profileStore.testRegister} success='connect' failure='onboarding' />
            <Scene key='confirmCode' on={firebaseStore.confirmCode} success='register' failure='onboarding' />
            <Scene key='register' on={profileStore.firebaseRegister} success='connect' failure='signUp' />
            <Scene key='saveProfile' on={profileStore.save} success='retrieveProfile' failure='signUp' />
            <Scene key='logout' on={profileStore.logout} success='onboarding' />
          </Scene>
          <Scene key='onboarding' navTransparent>
            <Scene key='slideshow' component={OnboardingSlideshow} onSignIn='signIn' onBypass='testRegisterScene' />
            <Scene key='signIn' component={SignIn} back />
            <Scene key='verifyCode' component={VerifyCode} />
            <Scene key='testRegisterScene' component={TestRegister} success='connect' />
          </Scene>
          <Scene key='signUp' component={SignUp} hideNavBar success='saveProfile' />
          <Scene
            key='logged'
            drawer
            contentComponent={SideMenu}
            drawerImage={require('../../images/iconMenu.png')}
            onRight={() => Actions.messaging()}
            rightButtonImage={() => (model.chats.unread > 0 ? newMessagesIcon : baseMessagesIcon)}
            rightButtonTintColor={settings.isStaging ? STAGING_COLOR : colors.PINK}
          >
            <Scene key='modal' hideNavBar modal>
              <Scene key='cube' navigator={CubeNavigator} tabs hideTabBar lazy>
                <Scene key='main' tabs hideTabBar lazy>
                  <Scene key='home' component={Home} renderTitle={tinyRobotTitle} />
                  <Scene key='fullMap' component={ExploreNearBy} navTransparent />
                  <Scene key='botsScene' component={BotsScreen} title='Bots' />
                  <Scene key='friendsMain'>
                    <Scene key='friends' component={peopleLists.FriendListScene} title='Friends' />
                    <Scene key='addFriends' component={AddFriends} title='Add Friends' back rightButtons={[]} />
                    <Scene key='blocked' component={peopleLists.BlockedList} title='Blocked' back />
                    <Scene key='addFriendByUsername' component={peopleLists.AddFriendByUsername} title='Add by Username' back />
                  </Scene>
                </Scene>
                <Scene key='messaging' rightButtonImage={iconClose} onRight={() => Actions.main()}>
                  <Scene key='chats' component={ChatsScreen} title='Messages' />
                  <Scene key='chat' component={ChatScreen} back rightButtonImage={null} />
                </Scene>
              </Scene>
              <Scene key='selectFriends' wrap leftButtonImage={iconClose} onLeft={Actions.pop} component={CreateMessage} title='Select Friend' rightButtonImage={null} />
              <Scene key='searchUsers' component={peopleLists.SearchUsers} wrap leftButtonImage={iconClose} title='Search Users' rightButtonImage={null} />
            </Scene>
            <Scene
              key='reportUser'
              component={ReportUser}
              title='Report User'
              modal
              rightButtonImage={require('../../images/sendActive.png')}
              leftButtonImage={require('../../images/iconClose.png')}
              onLeft={Actions.pop}
            />
            <Scene
              key='reportBot'
              component={ReportBot}
              title='Report Bot'
              modal
              rightButtonImage={require('../../images/sendActive.png')}
              leftButtonImage={require('../../images/iconClose.png')}
              onLeft={Actions.pop}
            />
          </Scene>
        </Scene>
        <Scene key='botContainer' headerMode='screen' navTransparent>
          <Scene key='createBot' component={BotCreate} hideNavBar />
          <Scene key='botCompose' component={BotCompose} back />
        </Scene>
        <Scene key='camera' component={Camera} clone hideNavBar />
        <Scene key='botEdit' component={BotCompose} clone back edit navTransparent right={() => null} />
        <Scene key='codePush' component={CodePushScene} title='CodePush' clone back />
        <Scene key='botDetails' component={BotDetails} scale={0.5} clone back right={() => null} />
        <Scene key='botShareSelectFriends' component={BotShareSelectFriends} title='Share' clone back right={() => null} />
        <Scene key='subscribers' component={peopleLists.BotSubscriberList} clone back right={() => null} navTransparent={false} title='Saves' />
        <Scene key='botNote' component={BotNoteScene} clone leftTitle={'Cancel'} onLeft={Actions.pop} navTransparent={false} />
        <Scene key='botAddress' component={BotAddressScene} clone hideNavBar back />
        <Scene key='profileDetails' component={ProfileDetail} clone back navTransparent={false} />
        <Scene key='myAccount' component={MyAccount} editMode clone back />
        <Scene key='followers' component={peopleLists.FollowersList} clone title='Followers' back />
        <Scene key='following' component={peopleLists.FollowingList} clone title='Following' back />
        <Scene key='blocked' component={peopleLists.BlockedList} clone title='Blocked Users' back right={() => null} />
      </Scene>
      <Scene key='locationWarning' component={LocationWarning} />
    </Scene>
  </Router>
);

export default TinyRobotRouter;
