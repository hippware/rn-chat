// @flow

global.fs = require('react-native-fs');

global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = async (fromUrl, toFile, headers) => {
  const promise = fs.downloadFile({fromUrl, toFile, headers}).promise;
  const {statusCode} = await promise;
  if (statusCode != 200) {
    throw 'Cannot upload file';
  }
};
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;

import * as log from './utils/log';
import NativeEnv from 'react-native-native-env';
import {Client} from 'bugsnag-react-native';

if (!NativeEnv.get('DEBUG')) {
  const client = new Client('f108fb997359e5519815d5fc58c79ad3');
}
import {Image, Text, TouchableOpacity, AppRegistry} from 'react-native';

global.getImageSize = uri =>
  new Promise((resolve, reject) =>
    Image.getSize(`file://${uri}`, (width, height) => {
      if (!width || !height) {
        log.log('Invalid file:', uri);
        resolve();
      } else {
        resolve({width, height});
      }
    }),
  );

import {autorunAsync, when} from 'mobx';
import {observer} from 'mobx-react/native';
import {colors} from './constants';
import model from './model/model';
import botStore from './store/botStore';
import {settings} from './globals';
import {Actions, Router, Scene} from 'react-native-router-flux';
import location from './store/locationStore';
import storage from './store/storage';
import profileStore from './store/profileStore';
import React from 'react';
import {k} from './components/Global';
import {CubeNavigator} from 'react-native-cube-transition';
import Camera from './components/Camera';

require('./store/globalStore');

import analytics from './components/Analytics';

analytics.init();

import SideMenu from './components/SideMenu';
import CreateMessage from './components/CreateMessage';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import MyAccount from './components/MyAccount';
import BlockedList from './components/BlockedList';
import ProfileDetail from './components/ProfileDetail';
import AddFriends from './components/AddFriends';
import AddFriendByUsername from './components/AddFriendByUsername';
import ChatsScreen from './components/ChatsScreen';
import ChatScreen from './components/ChatScreen';
import BotNoteScene from './components/BotNote';
import BotPhotoScene from './components/BotPhoto';
import BotInfo from './components/BotInfo';
import BotCreate from './components/BotCreate';
import BotDetails from './components/BotDetails';
import BotMap from './components/BotMap';
import BotsScreen from './components/BotsScreen';
import BotPhotoSwiper from './components/BotPhotoSwiper';
import BotShareSelectFriends from './components/BotShareSelectFriends';
import BotShareCompleted from './components/BotShareCompleted';
import BotSubscriberList from './components/BotSubscriberList';
import BotPhotoGridScene from './components/BotPhotoGridScene';
import ExploreNearBy from './components/ExploreNearBy';
import TestRegister from './components/TestRegister';
import CodePushScene from './components/CodePushScene';
import OnboardingSlideshow from './components/OnboardingSlideshowScene';
import LocationWarning from './components/LocationWarning';
import BotAddressScene from './components/BotAddressScene';
import SearchUsers from './components/SearchUsers';
import {FriendListScene, FollowersList, FollowingList} from './components/PeopleList';

autorunAsync(() => {
  if (model.connected && !location.enabled) {
    // TODO transparent modals
    Actions.locationWarning && Actions.locationWarning();
  }
}, 1000);

const dayNavBar = {
  navBarTextColor: colors.DARK_PURPLE,
  navBarRightButtonColor: 'rgb(254,92,108)',
  navBarLeftButtonColor: colors.DARK_GREY,
  navBarCancelColor: colors.DARK_GREY,
  navBarButtonColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)',
  navBarBackgroundColor: 'white',
  navBarButtonFontSize: 15 * k,
  navBarFontFamily: 'Roboto-Regular',
  backButtonImage: require('../images/iconBackGrayNew.png'),
  navBarNoBorder: true,
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
  // headerMode: 'screen',
  navigationBarStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

const tinyRobotTitle = () =>
  (<TouchableOpacity onPress={() => Actions.refs.home.scrollToTop()}>
    <Text style={dayNavBar.titleStyle}>tinyrobot</Text>
  </TouchableOpacity>);
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
  () => model && model.profile && model.profile.handle,
  () => {
    setTimeout(() => {
      // botStore.bot = botFactory.create({id: 'd1b08da4-3429-11e7-93e4-0e78520e044a'});
      // Actions.botDetails({item: 'd1b08da4-3429-11e7-93e4-0e78520e044a'});
      // Actions.subscribers({item: 'd1b08da4-3429-11e7-93e4-0e78520e044a'});
      // Actions.botShareSelectFriends({item: 'aa567e14-5795-11e7-9926-0e78520e044a'});
      // setTimeout(() => Actions.botPhotoSwiper({item: 'aa567e14-5795-11e7-9926-0e78520e044a', index: 1}), 1000);
      // setTimeout(Actions.botNote, 1000);
      // Actions.botCreate();
    }, 3000);
  },
);

import {LOCATION} from './model/Bot';

const iconClose = require('../images/iconClose.png');

// prettier-ignore eslint-ignore
const App = () =>
  (<Router wrapBy={observer} {...dayNavBar}>
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
            <Scene key='register' on={profileStore.digitsRegister} success='connect' failure='signUp' />
            <Scene key='saveProfile' on={profileStore.save} success='retrieveProfile' failure='signUp' />
            <Scene key='logout' on={profileStore.logout} success='onboarding' />
          </Scene>
          <Scene key='onboarding' navTransparent>
            <Scene key='slideshow' component={OnboardingSlideshow} />
            <Scene key='testRegisterScene' component={TestRegister} success='connect' />
          </Scene>
          <Scene key='signUp' component={SignUp} hideNavBar success='saveProfile' />
          <Scene
            key='logged'
            drawer
            contentComponent={SideMenu}
            drawerImage={require('../images/iconMenu.png')}
            onRight={() => Actions.messaging()} // RNRF bug? pointing directly to Actions.createMessage (like in onLeft) produces warning
            rightButtonImage={require('../images/iconMessage.png')}
          >
            <Scene key='modal' hideNavBar modal>
              <Scene key='cube' navigator={CubeNavigator} tabs hideTabBar lazy>
                <Scene key='main' tabs hideTabBar lazy>
                  <Scene key='home' component={Home} renderTitle={tinyRobotTitle} />
                  <Scene key='fullMap' component={ExploreNearBy} navTransparent />
                  <Scene key='botsScene' component={BotsScreen} title='Bots' />
                  <Scene key='friendsMain'>
                    <Scene key='friends' component={FriendListScene} title='Friends' />
                    <Scene key='addFriends' component={AddFriends} title='Add Friends' back rightButtons={[]} />
                    <Scene key='blocked' component={BlockedList} title='Blocked' back />
                    <Scene key='addFriendByUsername' component={AddFriendByUsername} title='Add by Username' back />
                  </Scene>
                </Scene>
                <Scene key='messaging' rightButtonImage={iconClose} onRight={() => Actions.main()}>
                  <Scene key='chats' component={ChatsScreen} title='Messages' />
                  <Scene key='chat' component={ChatScreen} back rightButtonImage={null} />
                </Scene>
              </Scene>
              <Scene key='selectFriends' wrap leftButtonImage={iconClose} onLeft={Actions.pop} component={CreateMessage} title='Select Friend' rightButtonImage={null} />
              <Scene key='searchUsers' component={SearchUsers} wrap leftButtonImage={iconClose} title='Search Users' rightButtonImage={null} />
            </Scene>
          </Scene>
        </Scene>
        <Scene key='botContainer' headerMode='screen' navTransparent>
          <Scene key='createBot' component={BotCreate} hideNavBar />
          <Scene key='botInfo' component={BotInfo} back />
        </Scene>
        <Scene key='camera' component={Camera} clone hideNavBar />
        <Scene key='botEdit' component={BotInfo} clone back edit navTransparent right={() => null} />
        <Scene key='botPhotos' component={BotPhotoGridScene} title='Photos' clone back navTransparent={false} right={() => null} />
        <Scene key='codePush' component={CodePushScene} title='CodePush' clone back />
        <Scene key='botDetails' component={BotDetails} clone back />
        <Scene key='botShareSelectFriends' component={BotShareSelectFriends} title='Share' clone back right={() => null} />
        <Scene key='subscribers' component={BotSubscriberList} clone back right={() => null} navTransparent={false} />
        <Scene key='botPhotoSwiper' component={BotPhotoSwiper} clone back />
        <Scene key='botPhoto' component={BotPhotoScene} title='Add Photo' clone back right={() => null} navTransparent={false} />
        <Scene key='botNote' component={BotNoteScene} clone leftTitle={'Cancel'} onLeft={Actions.pop} navTransparent={false} />
        <Scene key='botAddress' component={BotAddressScene} clone hideNavBar back />
        <Scene key='profileDetails' component={ProfileDetail} clone back navTransparent={false} />
        <Scene key='myAccount' component={MyAccount} editMode clone back />
        <Scene key='botMap' component={BotMap} map clone back navigationBarStyle={{backgroundColor: 'white', height: 100}} />
        <Scene key='followers' component={FollowersList} clone title='Followers' back />
        <Scene key='following' component={FollowingList} clone title='Following' back />
      </Scene>
      <Scene key='privacyPolicy' component={PrivacyPolicy} />
      <Scene key='termsOfService' component={TermsOfService} />
      <Scene key='locationWarning' component={LocationWarning} />
      <Scene key='botShareCompleted' component={BotShareCompleted} />
    </Scene>
  </Router>);

AppRegistry.registerComponent('App', () => App);
