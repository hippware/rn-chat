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
import Promo from './components/Promo';
import NativeEnv from 'react-native-native-env';
import {Client} from 'bugsnag-react-native';
if (!NativeEnv.get('DEBUG')) {
  const client = new Client('f108fb997359e5519815d5fc58c79ad3');
}
import {Image, AppRegistry} from 'react-native';
global.getImageSize = uri =>
  new Promise((resolve, reject) =>
    Image.getSize('file://' + uri, (width, height) => {
      if (!width || !height) {
        log.log('Invalid file:', uri);
        resolve();
      } else {
        resolve({width, height});
      }
    })
  );

import {colors} from './constants';

import SideMenu from './components/SideMenu';
import CreateMessage from './components/CreateMessage';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
import SignUpIntro from './components/SignUpIntro';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import MyAccount from './components/MyAccount';
import FriendsList from './components/FriendsListView';
import FollowersList from './components/FollowersList';
import BlockedList from './components/BlockedList';
import ProfileDetail from './components/ProfileDetail';
import AddFriends from './components/AddFriends';
import AddFriendByUsername from './components/AddFriendByUsername';
import ChatsScreen from './components/ChatsScreen';
import ChatScreen from './components/ChatScreen';
import BotAddressScene from './components/BotAddressScene';
import BotNoteScene from './components/BotNoteScene';
import BotPhotoScene from './components/BotPhotoScene';
import BotInfo from './components/BotInfo';
import BotCreate from './components/BotCreate';
import BotDetails from './components/BotDetails';
import BotMap from './components/BotMap';
import {settings} from './globals';
import statem from '../gen/state';
import friend from './store/friendStore';
import search from './store/searchStore';
import BotsScreen from './components/BotsScreen';
import BotPhotoList from './components/BotPhotoList';
import BotShareSelectFriends from './components/BotShareSelectFriends';
import BotShareCompleted from './components/BotShareCompleted';
import BotSubscriberList from './components/BotSubscriberList';
import BotPhotoGridScene from './components/BotPhotoGridScene';
import ExploreNearBy from './components/ExploreNearBy';
import TestRegister from './components/TestRegister';
import CodePushScene from './components/CodePushScene';
import OnboardingSlideshow from './components/OnboardingSlideshowScene';

require('./store/globalStore');

AppRegistry.registerComponent('sideMenu', () => CreateMessage);

import {Actions, Router, Scene} from 'react-native-router-native';
import {reaction, when, spy} from 'mobx';
import location from './store/locationStore';

import React from 'react';
import analytics from './components/Analytics';
analytics.init();

// added this to temporarily suppress multiple YellowBox errors.
console.ignoredYellowBox = ['View #'];

// import SocketSCXMLListener from './SocketSCXMLListener';
// statem.listeners.push(new SocketSCXMLListener());
statem.start();

// spy(event=>console.log("MOBX EVENT:", event));

reaction(
  () => location.isDay,
  isDay => {
    Actions.refresh &&
      Actions.refresh({
        key: 'nav',
        style: isDay ? dayNavBar : nightNavBar,
      });
  }
);

const dayNavBar = {
  navBarTextColor: colors.DARK_PURPLE,
  navBarRightButtonColor: 'rgb(254,92,108)',
  navBarLeftButtonColor: colors.DARK_GREY,
  navBarCancelColor: colors.DARK_GREY,
  navBarButtonColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)',
  navBarBackgroundColor: 'white',
  navBarButtonFontSize: 15,
  backgroundColor: 'white',
  navBarFontFamily: 'Roboto-Regular',
};
const nightNavBar = {
  navBarTextColor: 'white',
  navBarRightButtonColor: 'rgb(254,92,108)',
  navBarLeftButtonColor: colors.DARK_GREY,
  navBarButtonColor: 'white',
  navBarFontFamily: 'Roboto-Regular',
  navBarButtonColor: settings.isStaging ? 'rgb(28,247,39)' : 'white',
  navBarBackgroundColor: 'rgb(45,33,55)',
  backgroundColor: 'rgb(45,33,55)',
};

const menuButton = {
  icon: require('../images/iconMenu.png'),
  badgeMinSize: 2,
  badgeFontSize: 2,
  badgeFontFamily: 'Roboto-Medium',
  testID: 'leftNavButton',
  badgeOriginX: 27,
  badgeOriginY: 1,
  badgeBGColor: 'rgb(254,92,108)',
  onPress: () => Actions.get('drawer').ref.toggle({side: 'left', animated: true}),
};

const messageButton = {
  icon: require('../images/iconMessage.png'),
  badgeTextColor: 'white',
  badgeFontFamily: 'Roboto-Medium',
  badgeFontSize: 11.0,
  testID: 'rightNavButton',
  badgeBGColor: 'rgb(254,92,108)',
  onPress: statem.cubeBar.chatsContainer,
};

const Router2 = function () {};
// when(()=>statem.logged.active, ()=>{
//   setTimeout(()=>statem.drawerTabs.botDetailsTab());
// });

// prettier-ignore
Router2(
  <Scene
      key='nav'
      hideNavBar
      style={{
        ...dayNavBar,
        backButtonImage: require('../images/iconBackGrayNew.png'),
        navBarNoBorder: true,
        disableIconTint: true,
        navBarFontFamily: 'Roboto-Regular',
        navBarFontSize: 18,
      }}
      state={statem.createBot}
  >
    <Scene key='root' tabs hideTabBar>
      <Scene key='botsScreen' state={statem.botsScene} navTransparent component={BotsScreen} title='Bots' />
    </Scene>
    <Scene key='botDetails' state={statem.botDetails} hideNavBar component={BotDetails} clone />
    <Scene key='botShareCompleted' lightbox component={BotShareCompleted} style={{backgroundBlur: 'none'}} />
  </Scene>
);
// prettier-ignore
Router(
  <Scene
      key='nav'
      hideNavBar
      style={{
        ...dayNavBar,
        backButtonImage: require('../images/iconBackGrayNew.png'),
        navBarNoBorder: true,
        disableIconTint: true,
        navBarFontFamily: 'Roboto-Regular',
        navBarFontSize: 18,
      }}
  >
    <Scene key='root' tabs hideTabBar>
      <Scene key='launch' component={Launch} default hideNavBar />
      <Scene key='promoContainer' state={statem.promo} hideNavBar>
        <Scene key='slideshow' state={statem.promoScene} hideNavBar component={OnboardingSlideshow} />
        <Scene key='testRegister' component={TestRegister} state={statem.testRegisterScene} />
      </Scene>
      <Scene key='signUp' component={SignUp} state={statem.signUpScene} hideNavBar />
      <Scene key='signUpIntro' component={SignUpIntro} state={statem.signUpIntro} hideNavBar />
      <Scene
          key='drawer'
          hideNavBar
          leftButton={menuButton}
          state={statem.logged}
          drawer
          componentLeft={SideMenu}
          style={{contentOverlayColor: '#162D3D55'}}
      >
        <Scene key='cube' cube tabs>
          <Scene key='main' tabs hideTabBar rightButton={messageButton} state={statem.drawerTabs}>
            <Scene key='home' component={Home} state={statem.home} navTransparent />
            <Scene key='fullMap' component={ExploreNearBy} navTransparent state={statem.fullMap} />
            <Scene key='friends' state={statem.friendsContainer}>
              <Scene key='friendsMain' state={statem.friendsMain} navTransparent component={FriendsList} title='People' />
              <Scene key='followers' state={statem.followers} component={FollowersList} title='Followers' />
              <Scene key='blocked' state={statem.blocked} component={BlockedList} title='Blocked' />
              <Scene key='addFriends' component={AddFriends} title='Add Friends' rightButtons={[]} />
              <Scene
                  key='addFriendByUsername'
                  component={AddFriendByUsername}
                  rightButton={{
                    disabled: true,
                    disabledTextColor: 'rgba(254,92,108,0.5)',
                    fontSize: 15,
                    textColor: 'rgb(254,92,108)',
                    title: 'Done',
                    onPress: () => {
                      friend.addAll(search.globalResult.selected);
                      Actions.pop();
                      Actions.pop();
                    },
                  }}
                  title='Add by Username'
              />
            </Scene>

            <Scene key='botsScreen' state={statem.botsScene} navTransparent component={BotsScreen} title='Bots' />
          </Scene>
          <Scene
              key='messaging'
              rightButton={{
                icon: require('../images/iconClose.png'),
                onPress: () => {
                  statem.cubeBar.drawerTabs();
                },
              }}
              state={statem.chatsContainer}
          >
            <Scene key='chats' component={ChatsScreen} navTransparent title='Messages' state={statem.chats} />
            <Scene key='chat' component={ChatScreen} state={statem.chat} rightButtons={[]} navTransparent />
          </Scene>

        </Scene>
      </Scene>
    </Scene>
    <Scene
        key='botContainer'
        modal
        navTransparent
        state={statem.createBot}
        style={{backgroundColor: 'transparent'}}
        leftButton={{
          icon: require('../images/iconClose.png'),
          onPress: Actions.pop,
        }}
    >
      <Scene key='botCreate' component={BotCreate} />
      <Scene key='botInfo' component={BotInfo} state={statem.botInfo} navTransparent />
    </Scene>

    <Scene key='botEdit' component={BotInfo} edit state={statem.botEdit} clone navTransparent />
    <Scene key='botPhotos' clone state={statem.botPhotos} component={BotPhotoGridScene} title='Photos' />
    <Scene key='botSubscriberList' component={BotSubscriberList} edit state={statem.botSubscriberList} clone navTransparent title='Subscribers' />
    <Scene key='botAddress' clone navTransparent component={BotAddressScene} state={statem.botAddress} />
    <Scene key='botNote' clone navTransparent component={BotNoteScene} state={statem.botNote} modal />
    <Scene
        key='botShareSelectFriends'
        clone
        navTransparent
        state={statem.botShareSelectFriends}
        component={BotShareSelectFriends}
        title='Select Friends'
    />
    <Scene key='botShareCompleted' lightbox component={BotShareCompleted} style={{backgroundBlur: 'none'}} />
    <Scene key='botPhoto' clone navTransparent component={BotPhotoScene} state={statem.botPhoto} />
    <Scene key='botPhotoList' clone navTransparent state={statem.botPhotoList} component={BotPhotoList} />

    <Scene
        key='createMessage'
        modal
        component={CreateMessage}
        title='Select Friend'
        state={statem.selectFriends}
        leftButton={{
          icon: require('../images/iconClose.png'),
          onPress: Actions.pop,
        }}
    />
    <Scene key='privacyPolicy' lightbox component={PrivacyPolicy} />
    <Scene key='termsOfService' lightbox component={TermsOfService} />
    <Scene
        key='profileDetail'
        state={statem.profileDetails}
        component={ProfileDetail}
        rightButtonImage={require('../images/iconOptions.png')}
        clone
        navTransparent
    />
    <Scene key='botDetails' state={statem.botDetails} hideNavBar clone component={BotDetails} />
    <Scene key='codePush' component={CodePushScene} state={statem.codePushScene} clone />

    <Scene key='botMap' state={statem.botMap} hideNavBar component={BotMap} clone />

    <Scene key='myAccount' component={MyAccount} navTransparent editMode clone state={statem.myAccountScene} />
  </Scene>
);
