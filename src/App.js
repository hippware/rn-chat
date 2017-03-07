global.fs = require('react-native-fs');
global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = async (fromUrl, toFile, headers) => {
  const promise = fs.downloadFile({fromUrl, toFile, headers}).promise;
  await promise;
}
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;
import Promo from './components/Promo';
import NativeEnv from 'react-native-native-env';
import { Client } from 'bugsnag-react-native';
if (!NativeEnv.get('DEBUG')){
  const client = new Client('f108fb997359e5519815d5fc58c79ad3');
}
import {View, AsyncStorage, Text, InteractionManager, Image, TouchableOpacity, AppRegistry, StyleSheet, AppState, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');
global.getImageSize = Image.getSize;
import SideMenu from './components/SideMenu';
import CreateMessage from './components/CreateMessage';
import RightSideMenu from './components/RightSideMenu';
import RightSideCombinedMenu from './components/RightSideCombinedMenu';
import RightSideBotMenu from './components/RightSideBotMenu';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
import SignUpIntro from './components/SignUpIntro';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import NavBar from './components/NavBarNew';
import NavBarMessageButton from './components/NavBarMessageButton';
import NavBarCloseButton from './components/NavBarCloseButton';
import NavBarMenuButton from './components/NavBarMenuButton';
import FilterTitle from './components/FilterTitle';
import MyAccount from './components/MyAccount';
import FriendsList from './components/FriendsListView';
import FollowersList from './components/FollowersList';
import BlockedList from  './components/BlockedList';
import ProfileDetail from './components/ProfileDetail';
import ProfileOptions from './components/ProfileOptions';
import AddFriends from './components/AddFriends';
import AddFriendByUsername from './components/AddFriendByUsername';
import ChatsScreen from './components/ChatsScreen';
import ChatScreen from './components/ChatScreen';
import BotAddressScene from './components/BotAddressScene';
import BotNoteScene from './components/BotNoteScene';
import BotPhotoScene from './components/BotPhotoScene';
import BotInfo from './components/BotInfo';
import BotShare from './components/BotShare';
import BotCreate from './components/BotCreate';
import BotDetailsScene from './components/BotDetailsScene';
import BotDetails from './components/BotDetails';
import BotOptions from './components/BotOptions';
import BotMap from './components/BotMap';
import {settings, k} from './globals';
import statem from '../gen/state';
import friend from './store/friendStore';
import search from './store/searchStore';
import Map from './components/Map';
import BotsScreen from './components/BotsScreen';
import BotPhotoList from './components/BotPhotoList';
import BotVisibility from './components/BotVisibility';
import BotVisibilitySelectFriends from './components/BotVisibilitySelectFriends';
import BotShareSelectFriends from './components/BotShareSelectFriends';
import BotShareCompleted from './components/BotShareCompleted';

AppRegistry.registerComponent('sideMenu',()=>CreateMessage);

import {Actions, Router, Scene} from 'react-native-router-native';
import {observer} from 'mobx-react/native';
import {reaction, when, spy} from 'mobx';
import location from './store/locationStore';
import model from './model/model';

import Controllers from 'react-native-ios-controllers';
import React from 'react';
const {Modal} = Controllers;
import analytics from './components/Analytics';
analytics.init();

//import SocketSCXMLListener from './SocketSCXMLListener';
// statem.listeners.push(new SocketSCXMLListener());
statem.start();

//spy(event=>console.log("MOBX EVENT:", event));

reaction(()=>location.isDay, isDay=> {
  console.log("REFRESH isDAY", location.isDay, Actions.refresh);
  Actions.refresh && Actions.refresh({key:'nav', style: isDay? dayNavBar : nightNavBar})
});

const dayNavBar = {navBarTextColor:'rgb(63,50,77)', navBarRightButtonColor:'rgb(254,92,108)', navBarLeftButtonColor:'rgb(155,155,155)', navBarCancelColor:'rgb(155,155,155)',
  navBarButtonColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)',
  navBarBackgroundColor:'white', navBarButtonFontSize: 15, backgroundColor: 'white',navBarFontFamily:'Roboto-Regular', };
const nightNavBar = {navBarTextColor:'white', navBarRightButtonColor:'rgb(254,92,108)', navBarLeftButtonColor:'rgb(155,155,155)', navBarButtonColor:'white',navBarFontFamily:'Roboto-Regular',
  navBarButtonColor: settings.isStaging ? 'rgb(28,247,39)' : 'white',
  navBarBackgroundColor:'rgb(45,33,55)', backgroundColor: 'rgb(45,33,55)' };

const menuButton = {icon:require('../images/iconMenu.png'), badgeMinSize:2, badgeFontSize:2, badgeFontFamily:'Roboto-Medium',testID:'leftNavButton',
  badgeOriginX: 27, badgeOriginY: 1, badgeBGColor:'rgb(254,92,108)', onPress:()=>Actions.get('drawer').ref.toggle({side:'left', animated:true})};

const messageButton = {icon:require('../images/iconMessage.png'), badgeTextColor:'white', badgeFontFamily:'Roboto-Medium', badgeFontSize:11.0,
  testID:'rightNavButton', badgeBGColor:'rgb(254,92,108)', onPress:statem.cubeBar.chatsContainer};

const Router2 = function(){};
// when(()=>statem.logged.active, ()=>{
//   setTimeout(()=>statem.drawerTabs.botDetailsTab());
// });
Router2(
  <Scene key="nav" hideNavBar style={{...dayNavBar, backButtonImage: require('../images/iconBackGrayNew.png'),
  navBarNoBorder:true,  disableIconTint: true, navBarFontFamily:'Roboto-Regular', navBarFontSize:18}} state={statem.createBotContainer}>
    <Scene key="root" tabs hideTabBar>
      <Scene key="botDetails" state={statem.botDetails} hideNavBar component={BotDetails}/>
    </Scene>
    <Scene key="botMap" state={statem.botMap} hideNavBar component={BotMap} clone/>
  </Scene>
);
Router(
  <Scene key="nav" hideNavBar style={{...dayNavBar, backButtonImage: require('../images/iconBackGrayNew.png'),
  navBarNoBorder:true,  disableIconTint: true, navBarFontFamily:'Roboto-Regular', navBarFontSize:18}} state={statem.createBotContainer}>
    <Scene key="root" tabs hideTabBar>
      <Scene key="launch" component={Launch} default hideNavBar/>
      <Scene key="promo" component={Promo} state={statem.promoScene} hideNavBar/>
      <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
      <Scene key="signUpIntro" component={SignUpIntro} state={statem.signUpIntro} hideNavBar/>
      <Scene key="drawer" hideNavBar
             leftButton={menuButton} state={statem.logged}
             drawer componentLeft={SideMenu} componentRight={RightSideCombinedMenu}
             style={{contentOverlayColor:'#162D3D55'}}>
        <Scene key="cube" cube tabs>
          <Scene key="main" tabs hideTabBar
                 rightButton={messageButton} state={statem.drawerTabs}>
            <Scene key="home" component={Home}  state={statem.homeContainer} navTransparent>
              <Scene key="restoreHome" fullMap={false} hideNavBar={false} state={statem.home}/>
              <Scene key="fullMap" fullMap state={statem.fullMap} drawerDisableSwipe
                     leftButton={{icon:require('../images/iconClose.png'), onPress:()=>statem.homeContainer.home()}}/>
              <Scene key="fullActivities" hideNavBar/>
            </Scene>
        
            <Scene key="friends" state={statem.friendsContainer}>
              <Scene key="friendsMain" state={statem.friendsMain} navTransparent component={FriendsList} title="People"/>
              <Scene key="followers" state={statem.followers} component={FollowersList} title="Followers"/>
              <Scene key="blocked" state={statem.blocked} component={BlockedList} title="Blocked"/>
              <Scene key="addFriends" component={AddFriends} title="Add Friends" rightButtons={[]}/>
              <Scene key="addFriendByUsername" component={AddFriendByUsername}
                     rightButton={{disabled: true, disabledTextColor: 'rgba(254,92,108,0.5)',
                     fontSize: 15, textColor:'rgb(254,92,108)', title:'Done', onPress:()=>{friend.addAll(search.globalResult.selected);Actions.pop();Actions.pop()}}}
                     title="Add by Username"/>
            </Scene>
        
            <Scene key="myAccount" component={MyAccount} title="My Account" state={statem.myAccountScene}>
              <Scene key="viewAccount" editMode={false} save={false}/>
              <Scene key="editAccount" editMode save={false} rightTitle="Save"
                     onRight={()=>Actions.saveAccount()}
                     leftTitle="Cancel"
                     onLeft={()=>Actions.viewAccount()}
              />
              <Scene key="saveAccount" save />
            </Scene>
            <Scene key="botsScreen" state={statem.botsScene} navTransparent component={BotsScreen} title="Bots"/>
      
          </Scene>
          <Scene key="messaging" rightButton={{icon:require('../images/iconClose.png'),
           onPress:()=>{statem.cubeBar.drawerTabs()}}} state={statem.chatsContainer}>
            <Scene key="chats" component={ChatsScreen} navTransparent title="Messages" state={statem.chats}/>
            <Scene key="chat" component={ChatScreen} state={statem.chat} rightButtons={[]} navTransparent/>
          </Scene>
    
        </Scene>
      </Scene>
    </Scene>
    <Scene key="botContainer" modal navTransparent state={statem.createBotContainer} style={{backgroundColor:'transparent'}}>
      <Scene key="botCreate" component={BotCreate} state={statem.createBot}/>
      <Scene key="botInfo" component={BotInfo} state={statem.botInfo}
             leftButton={{fontFamily:'Roboto-Regular', title:'Cancel', textColor: 'rgb(155,155,155)', onPress:()=>Actions.pop()}}
             navTransparent/>
    </Scene>
  
    <Scene key="botVisibilityContainer" modal navTransparent state={statem.botVisibilityContainer}>
      <Scene key="botVisibility" state={statem.botVisibility} component={BotVisibility} title="Who can see this?" />
      <Scene key="botVisibilitySelectFriends" state={statem.botVisibilitySelectFriends} component={BotVisibilitySelectFriends}
             title="Select Friends" />
    </Scene>
  
    <Scene key="botEdit" component={BotInfo} edit state={statem.botEdit} clone navTransparent/>
    <Scene key="botAddress" clone navTransparent component={BotAddressScene}  state={statem.botAddress}/>
    <Scene key="botNote" clone navTransparent component={BotNoteScene}  state={statem.botNote}/>
    <Scene key="botShare" clone navTransparent state={statem.botShare} component={BotShare} title="Share Bot" />
    <Scene key="botShareSelectFriends" clone navTransparent  state={statem.botShareSelectFriends} component={BotShareSelectFriends}
           title="Select Friends" />
    <Scene key="botShareCompleted" lightbox component={BotShareCompleted} style={{backgroundBlur:'none'}}/>
    <Scene key="botPhoto" clone navTransparent component={BotPhotoScene}  state={statem.botPhoto}/>
    <Scene key="botPhotoList" clone navTransparent state={statem.botPhotoList} component={BotPhotoList}/>
  
    <Scene key="createMessage" modal component={CreateMessage} title="Select Friends" state={statem.selectFriends}/>
    <Scene key="privacyPolicy" lightbox component={PrivacyPolicy}/>
    <Scene key="termsOfService" lightbox component={TermsOfService}/>
    <Scene key="profileDetail" state={statem.profileDetailsContainer} component={ProfileDetail}
           rightButtonImage={require("../images/iconOptions.png")} clone navTransparent/>
    <Scene key="botDetails" state={statem.botDetails} hideNavBar clone component={BotDetails}/>
  
    <Scene key="botOptions" state={statem.botOptions} component={BotOptions} clone title="Bot Options"/>
    <Scene key="botMap" state={statem.botMap} hideNavBar component={BotMap} clone/>

  </Scene>
)
