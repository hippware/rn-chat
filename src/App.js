global.fs = require('react-native-fs');
global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = require('react-native-file-download').download;
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;
import Promo from './components/Promo';
import {View, AsyncStorage, Text, InteractionManager, Image, TouchableOpacity, AppRegistry, StyleSheet, AppState, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');
global.getImageSize = Image.getSize;
import SideMenu from './components/SideMenu';
import CreateMessage from './components/CreateMessage';
import RightSideMenu from './components/RightSideMenu';
import RightSideBotMenu from './components/RightSideBotMenu';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
import SignUpIntro from './components/SignUpIntro';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import Drawer from './components/Drawer';
import NavBar from './components/NavBarNew';
import NavBarMessageButton from './components/NavBarMessageButton';
import NavBarCloseButton from './components/NavBarCloseButton';
import NavBarMenuButton from './components/NavBarMenuButton';
import FilterTitle from './components/FilterTitle';
import MyAccount from './components/MyAccount';
import FriendsList from './components/FriendsList';
import FollowersList from './components/FollowersList';
import BlockedList from  './components/BlockedList';
import ProfileDetail from './components/ProfileDetail';
import ProfileOptions from './components/ProfileOptions';
import AddFriends from './components/AddFriends';
import AddFriendByUsername from './components/AddFriendByUsername';
import ChatsScreen from './components/ChatsScreen';
import ChatScreen from './components/ChatScreen';
import {settings, k} from './globals';
import statem from '../gen/state';
import friend from './store/friend';
import search from './store/search';
import SocketSCXMLListener from './SocketSCXMLListener';
import Map from './components/Map';

AppRegistry.registerComponent('sideMenu',()=>CreateMessage);

import {Actions, Router, Scene} from 'react-native-router-native';
import {observer} from 'mobx-react/native';
import {reaction, when} from 'mobx';
import NativeEnv from 'react-native-native-env';
import location from './store/location';


import Controllers from 'react-native-ios-controllers';
import React from 'react';
const {Modal} = Controllers;
settings.isTesting = NativeEnv.get("TESTING");
statem.listeners.push(new SocketSCXMLListener());
statem.start();

reaction(()=>location.isDay, isDay=> Actions.refresh && Actions.refresh({key:'nav', style: isDay? dayNavBar : nightNavBar}));

const dayNavBar = {navBarTextColor:'rgb(63,50,77)', navBarCancelColor:'rgb(155,155,155)', navBarButtonColor: 'rgb(117,117,117)',
  navBarBackgroundColor:'white', navBarButtonFontSize: 15, backgroundColor: 'white'};
const nightNavBar = {navBarTextColor:'white', navBarButtonColor:'white',
  navBarBackgroundColor:'rgb(45,33,55)', backgroundColor: 'rgb(45,33,55)' };

const menuButton = {icon:require('../images/iconMenu.png'), badgeMinSize:2, badgeFontSize:2, badgeFontFamily:'Roboto-Medium',
  badgeOriginX: 27, badgeOriginY: 1, badgeBGColor:'rgb(254,92,108)', onPress:()=>Actions.get('drawer').ref.toggle({side:'left', animated:true})};

const messageButton = {icon:require('../images/iconMessage.png'), badgeTextColor:'white', badgeFontFamily:'Roboto-Medium', badgeFontSize:11.0,
  badgeBGColor:'rgb(254,92,108)', onPress:statem.cubeBar.chatsContainer};


Router(
  <Scene key="nav" hideNavBar  style={{...dayNavBar, backButtonImage: require('../images/iconBackGray.png'),
  navBarNoBorder:true,  disableIconTint: true, navBarFontFamily:'Roboto-Regular', navBarFontSize:18}}>
    <Scene key="root" tabs hideTabBar>
      <Scene key="launch" component={Launch} default hideNavBar/>
      <Scene key="promo" component={Promo} state={statem.promoScene} hideNavBar/>
      <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
      <Scene key="signUpIntro" component={SignUpIntro} state={statem.signUpIntro} hideNavBar/>
      <Scene key="botMenu" state={statem.loggedScene} hideNavBar
             leftButton={menuButton}
             drawer componentRight={RightSideBotMenu} style={{drawerShadow: false, rightDrawerWidth:68}}>
        <Scene key="drawer" hideNavBar
               leftButton={menuButton}
               drawer componentLeft={SideMenu} componentRight={RightSideMenu}
               style={{leftDrawerWidth:85, rightDrawerWidth:32, contentOverlayColor:'#162D3D55'}}>
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
                <Scene key="friendsMain" state={statem.friendsMain} component={FriendsList} title="People"/>
                <Scene key="followers" state={statem.followers} component={FollowersList} title="Followers"/>
                <Scene key="blocked" state={statem.blocked} component={BlockedList} title="Blocked"/>
                <Scene key="addFriends" component={AddFriends} title="Add Friends" rightButtons={[]}/>
                <Scene key="addFriendByUsername" component={AddFriendByUsername}
                       rightButton={{disabled: true, disabledTextColor: 'rgba(254,92,108,0.5)', fontFamily:'Roboto-Regular',
                     fontSize: 15, textColor:'rgb(254,92,108)', title:'Done', onPress:()=>{friend.addAll(search.globalResult.selected);Actions.pop();Actions.pop()}}}
                       title="Add by Username"/>
              </Scene>
              
              <Scene key="myAccount" component={MyAccount} title="My Account" state={statem.myAccountScene}>
                <Scene key="viewAccount" />
                <Scene key="editAccount" editMode rightTitle="Save"
                       onRight={()=>Actions.saveAccount()}
                       leftTitle="Cancel"
                       onLeft={()=>Actions.viewAccount()}
                />
                <Scene key="saveAccount" save />
              </Scene>
            </Scene>
            <Scene key="messaging" rightButton={{icon:require('../images/iconClose.png'),
           onPress:statem.cubeBar.drawerTabs}} state={statem.chatsContainer}>
              <Scene key="chats" component={ChatsScreen} title="Messages" state={statem.chats}/>
              <Scene key="chat" component={ChatScreen} state={statem.chat}
                     rightButtonImage={require("../images/iconOptions.png")}
                     onRight={state=>alert("Message Options")} navTransparent/>
            </Scene>
          
          </Scene>
        </Scene>
      </Scene>
    </Scene>
    <Scene key="createMessage" modal component={CreateMessage} title="Select Friends" state={statem.selectFriends}/>
    <Scene key="privacyPolicy" lightbox component={PrivacyPolicy}/>
    <Scene key="termsOfService" lightbox component={TermsOfService}/>
    <Scene key="profileDetail" state={statem.profileDetailsContainer} component={ProfileDetail}
           rightButtonImage={require("../images/iconOptions.png")} clone/>
  </Scene>
  , {wrapBy:observer, onPop:()=>{}}
);
// Router(
//   <Scene key="root" tabs hideTabBar>
//     <Scene key="launch" component={Launch} default hideNavBar/>
//     <Scene key="promo" component={Promo} hideNavBar state={statem.promoScene}/>
//     <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
//     <Scene key="signUpIntro" component={SignUpIntro} state={statem.signUpIntro} hideNavBar/>
// </Scene>
//   ,{wrapBy:observer}
// )
// Router(
//   <Scene key="root"
//          style={()=>({navBarNoBorder:true, navBarFontFamily:'Roboto-Regular', navBarFontSize:18,
//             navBarTextColor:location.isDay? 'rgb(63,50,77)': 'white',
//             navBarButtonColor:location.isDay? 'black': 'white',
//             navBarBackgroundColor:location.isDay ? 'white': 'rgb(45,33,55)'}
//                       )}>
//   <Scene key="myAccount" component={MyAccount} title="My Account"
//          >
//     <Scene key="viewAccount" state={statem.myAccountScene} />
//     <Scene key="editAccount" editMode
//            rightButton={{title:'Save', onPress:()=>Actions.saveAccount(), fontFamily:'Roboto-Regular', textColor:'rgb(254,92,108)'}}
//            leftButton={{title:'Cancel', onPress:()=>Actions.viewAccount(), fontFamily:'Roboto-Regular', textColor:'rgb(155,155,155)'}}
//     />
//     <Scene key="saveAccount" save />
//   </Scene>
//   </Scene>,
//    {wrapBy:observer}
// );
// Router
// (
//   <Scene key="root" tabs hideTabBar>
//     <Scene key="launch" component={Launch} default hideNavBar/>
//     <Scene key="promo" component={Promo} hideNavBar state={statem.promoScene}/>
//     <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
//     <Scene key="signUpIntro" component={SignUpIntro} state={statem.signUpIntro} hideNavBar/>
//     <Scene key="drawer" state={statem.loggedScene}
//       drawer componentLeft={SideMenu} componentRight={RightSideMenu}
//       leftButton={{icon:require('../images/iconMenu.png'),
//       onPress:()=>Actions.get('drawer').ref.toggle({side:'left', animated:true})}}
//       style={{leftDrawerWidth:85, rightDrawerWidth:30, contentOverlayColor:'#162D3D55'}}>
//       <Scene key="cube" cube tabs>
//         <Scene key="main" tabs hideTabBar
//                rightButton={{icon:require('../images/iconMessage.png'),
//            onPress:statem.cubeBar.chatsContainer}} state={statem.drawerTabs}>
//           <Scene key="home" component={Home} navTransparent state={statem.homeContainer}>
//             <Scene key="restoreHome" state={statem.home}/>
//             <Scene key="restoreActivities" initialScroll/>
//             <Scene key="fullMap" fullMap state={statem.fullMap} drawerDisableSwipe leftButton={NavBarCloseButton}
//                    onClose={()=>statem.homeContainer.home()}/>
//             <Scene key="fullActivities" hideActivityBar navTransparent={false} renderTitle={props=><FilterTitle {...props}/>}/>
//           </Scene>
//           <Scene key="friends" state={statem.friendsContainer}>
//             <Scene key="friendsMain" state={statem.friendsMain} component={FriendsList} title="Friends"/>
//             <Scene key="followers" state={statem.followers} component={FollowersList} title="Followers"/>
//             <Scene key="blocked" state={statem.blocked} component={BlockedList} title="Blocked"/>
//           </Scene>
//
//           <Scene key="myAccount" component={MyAccount} title="My Account">
//             <Scene key="viewAccount" state={statem.myAccountScene} />
//             <Scene key="editAccount" editMode rightTitle="Save"
//                    onRight={()=>Actions.saveAccount()}
//                    leftTitle="Cancel"
//                    onLeft={()=>Actions.viewAccount()}
//             />
//             <Scene key="saveAccount" save />
//           </Scene>
//         </Scene>
//         <Scene key="messaging" rightButton={{icon:require('../images/iconClose.png'),
//            onPress:statem.cubeBar.drawerTabs}} state={statem.chatsContainer}>
//           <Scene key="chats" component={ChatsScreen} title="Messages" state={statem.chats}/>
//         </Scene>
//
//       </Scene>
//     </Scene>
//   </Scene>,
//   {wrapBy:observer});
(
  <Scene key="root" tabs hideTabBar>
    <Scene key="launch" component={Launch} default hideNavBar/>
    <Scene key="promo" component={Promo} hideNavBar state={statem.promoScene}/>
    <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
    <Scene key="signUpIntro" component={SignUpIntro} state={statem.signUpIntro} hideNavBar/>
    <Scene key="logged" tabs cube state={statem.loggedScene}>
      <Scene key="main" tabs hideTabBar>
        <Scene key="home" component={Home} navTransparent state={statem.homeContainer}>
          <Scene key="restoreHome" state={statem.home}/>
          <Scene key="restoreActivities" initialScroll/>
          <Scene key="fullMap" fullMap state={statem.fullMap} drawerDisableSwipe leftButton={NavBarCloseButton}
                 onClose={()=>statem.homeContainer.home()}/>
          <Scene key="fullActivities" hideActivityBar navTransparent={false} renderTitle={props=><FilterTitle {...props}/>}/>
        </Scene>
        <Scene key="friends" state={statem.friendsContainer}>
          <Scene key="friendsMain" state={statem.friendsMain} component={FriendsList} title="Friends"/>
          <Scene key="followers" state={statem.followers} component={FollowersList} title="Followers"/>
          <Scene key="blocked" state={statem.blocked} component={BlockedList} title="Blocked"/>
          <Scene key="addFriends" component={AddFriends} title="Add Friends"/>
          <Scene key="addFriendByUsername" component={AddFriendByUsername}
                 title="Add by Username"/>
        </Scene>
        
        <Scene key="myAccount" component={MyAccount} title="My Account">
          <Scene key="viewAccount" state={statem.myAccountScene} />
          <Scene key="editAccount" editMode rightTitle="Save"
                 onRight={()=>Actions.saveAccount()}
                 leftTitle="Cancel"
                 onLeft={()=>Actions.viewAccount()}
          />
          <Scene key="saveAccount" save />
        </Scene>
      </Scene>
      <Scene key="messaging" leftButton={NavBarMenuButton}  state={statem.chatsContainer} rightButton={NavBarCloseButton}
             onClose={()=>statem.cubeBar.drawerTabs()}>
        <Scene key="chats" component={ChatsScreen} title="Messages" state={statem.chats}/>
        <Scene key="chat" component={ChatScreen} state={statem.chat}
               rightButtonImage={require("../images/iconOptions.png")}
               onRight={state=>alert("Message Options")}/>
      </Scene>
    </Scene>
  </Scene>,
  {wrapBy:observer}
);
// Router(<Scene key="modal" lightbox>
//     <Scene key="root" tabs switch statem={statem}>
//       <Scene key="launch" component={Launch} default hideNavBar/>
//       <Scene key="promo" component={Promo} state={statem.promoScene} hideNavBar/>
//       <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
//       <Scene key="signUpIntro" component={SignUpIntro} state={statem.signUpIntro} hideNavBar/>
//       <Scene key="home" component={Home}/>
//     </Scene>
//     <Scene key="privacyPolicy" component={PrivacyPolicy}/>
//     <Scene key="termsOfService" component={TermsOfService}/>
//   </Scene>);
// export default class App extends React.Component {
//
//   constructor(props){
//     super(props);
//     settings.isTesting = props.TESTING != undefined;
//     // if (settings.isTesting){
//     //   State.runner = InteractionManager.runAfterInteractions;
//     // }
//
//     statem.listeners.push(new SocketSCXMLListener());
//     statem.listeners.push(this);
//     statem.start();
//
//     this._handleAppStateChange = this._handleAppStateChange.bind(this);
//   }
//
//   onEntry(stateId){
//
//   }
//
//   componentDidMount(){
//     AppState.addEventListener('change', this._handleAppStateChange);
//   }
//
//   componentWillUnmount(){
//     AppState.removeEventListener('change', this._handleAppStateChange);
//   }
//
//   _handleAppStateChange(currentAppState) {
//     // const profile = store.getState().profile;
//     // if (currentAppState === 'active'){
//     //   if (profile && profile.sessionID && profile.uuid) {
//     //     // emulate success login
//     //     store.dispatch({type: LOGIN+SUCCESS, data: profile});
//     //   } else if (profile && profile.authToken && profile.phoneNumber){
//     //     // try to silently login
//     //     console.log("LOGIN SILENTLY");
//     //     store.dispatch({type: LOGIN, ...profile});
//     //   }
//     // }
//   }
//
//   render(){
//     return <Router navBar={NavBar}>
//       <Scene key="modal" component={Modal}>
//         <Scene key="root" tabs={true} unmountScenes component={Switch} statem={statem}>
//           <Scene key="launch" component={Launch} default hideNavBar/>
//           <Scene key="promo" component={Promo} state={statem.promoScene} hideNavBar/>
//           <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
//           <Scene key="signUpIntro" component={SignUpIntro} state={statem.signUpIntro} hideNavBar/>
//           <Scene key="logged" component={Drawer} state={statem.loggedScene} open={false} SideMenu={SideMenu} openDrawerOffset={1-300*k/width} tweenHandler={(ratio) => ({main: { opacity:Math.max(0.54,1-ratio) }})}>
//             <Scene key="rightBotMenu" component={Drawer} open={false} SideMenu={RightSideBotMenu} side="right"  openDrawerOffset={1-257*k/width}>
//               <Scene key="rightMenu" component={Drawer} open={false} SideMenu={RightSideMenu} side="right"  openDrawerOffset={1-120*k/width}>
//                 <Scene key="main">
//                   <Scene key="cube" tabs={true} >
//                     <Scene key="core" leftButton={NavBarMenuButton} rightButton={NavBarMessageButton}  passProps >
//                       <Scene key="coreTabs" tabs={true} state={statem.drawerTabs}>
//                         <Scene key="home" component={Home} navTransparent state={statem.homeContainer}>
//                           <Scene key="restoreHome" state={statem.home}/>
//                           <Scene key="restoreActivities" initialScroll/>
//                           <Scene key="fullMap" fullMap state={statem.fullMap} drawerDisableSwipe leftButton={NavBarCloseButton}
//                                  onClose={()=>statem.homeContainer.home()}/>
//                           <Scene key="fullActivities" hideActivityBar navTransparent={false} renderTitle={props=><FilterTitle {...props}/>}/>
//                         </Scene>
//                         <Scene key="friends" state={statem.friendsContainer}>
//                           <Scene key="friendsMain" state={statem.friendsMain} component={FriendsList} title="Friends"/>
//                           <Scene key="followers" state={statem.followers} component={FollowersList} title="Followers"/>
//                           <Scene key="blocked" state={statem.blocked} component={BlockedList} title="Blocked"/>
//                         </Scene>
//
//                         <Scene key="myAccount" component={MyAccount} title="My Account">
//                           <Scene key="viewAccount" state={statem.myAccountScene} />
//                           <Scene key="editAccount" editMode rightTitle="Save"
//                                  onRight={()=>Actions.saveAccount()}
//                                  leftTitle="Cancel"
//                                  onLeft={()=>Actions.viewAccount()}
//                           />
//                           <Scene key="saveAccount" save />
//                         </Scene>
//                       </Scene>
//                       <Scene key="profileDetail" state={statem.profileDetailsContainer} component={ProfileDetail}
//                              rightButtonImage={require("../images/iconOptions.png")} clone/>
//                       <Scene key="createMessage" component={CreateMessage} title="Select Friends" rightButton={null} backTitle="Cancel" state={statem.selectFriends} clone/>
//                       <Scene key="profileOptions" component={ProfileOptions} />
//                       <Scene key="addFriends" component={AddFriends} title="Add Friends"/>
//                       <Scene key="addFriendByUsername" component={AddFriendByUsername}
//                              title="Add by Username"/>
//                     </Scene>
//                     <Scene key="messaging" leftButton={NavBarMenuButton}  state={statem.chatsContainer} rightButton={NavBarCloseButton}
//                            onClose={()=>statem.cubeBar.drawerTabs()}>
//                       <Scene key="chats" component={ChatsScreen} title="Messages" state={statem.chats}/>
//                       <Scene key="chat" component={ChatScreen} state={statem.chat}
//                              rightButtonImage={require("../images/iconOptions.png")}
//                              onRight={state=>alert("Message Options")}/>
//                     </Scene>
//                   </Scene>
//                 </Scene>
//               </Scene>
//             </Scene>
//           </Scene>
//         </Scene>
//         <Scene key="privacyPolicy" component={PrivacyPolicy}/>
//         <Scene key="termsOfService" component={TermsOfService}/>
//       </Scene>
//     </Router>
//   }
// }
