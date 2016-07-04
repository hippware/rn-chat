global.fs = require('react-native-fs');
global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = require('react-native-file-download').download;
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;
import React from "react";
import Promo from './components/Promo';
import {View, AsyncStorage, Text, Image, TouchableOpacity, StyleSheet, AppStateIOS, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');
global.getImageSize = Image.getSize;
import SideMenu from './components/SideMenu';
import CreateMessage from './components/CreateMessage';
import RightSideMenu from './components/RightSideMenu';
import RightSideBotMenu from './components/RightSideBotMenu';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
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
import { Actions, Modal, Scene, Switch, TabBar, Router}  from 'react-native-mobx';
import CubeBar from './components/CubeBarIOS';
import statem from '../gen/state';
import SocketSCXMLListener from './SocketSCXMLListener';
export default class App extends React.Component {
  
  constructor(props){
    super(props);
    settings.isTesting = props.TESTING != undefined;
    statem.listener = new SocketSCXMLListener();
    statem.start();
    
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }
  componentDidMount(){
    AppStateIOS.addEventListener('change', this._handleAppStateChange);
  }
  
  componentWillUnmount(){
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  }
  
  _handleAppStateChange(currentAppState) {
    // const profile = store.getState().profile;
    // if (currentAppState === 'active'){
    //   if (profile && profile.sessionID && profile.uuid) {
    //     // emulate success login
    //     store.dispatch({type: LOGIN+SUCCESS, data: profile});
    //   } else if (profile && profile.authToken && profile.phoneNumber){
    //     // try to silently login
    //     console.log("LOGIN SILENTLY");
    //     store.dispatch({type: LOGIN, ...profile});
    //   }
    // }
  }
  
  render(){
    return <Router navBar={NavBar} statem={statem}>
      <Scene key="modal" component={Modal}>
        <Scene key="root" component={Switch} tabs={true}>
          <Scene key="launch" component={Launch} default hideNavBar/>
          <Scene key="promo" component={Promo} state={statem.promoScene} hideNavBar/>
          <Scene key="signUp" component={SignUp} state={statem.signUpScene} hideNavBar/>
          <Scene key="logged" component={Drawer} state={statem.loggedScene} open={false} SideMenu={SideMenu} openDrawerOffset={1-300*k/width} tweenHandler={(ratio) => ({main: { opacity:Math.max(0.54,1-ratio) }})}>
            <Scene key="rightBotMenu" component={Drawer} open={false} SideMenu={RightSideBotMenu} side="right"  openDrawerOffset={1-257*k/width}>
              <Scene key="rightMenu" component={Drawer} open={false} SideMenu={RightSideMenu} side="right"  openDrawerOffset={1-120*k/width}>
                <Scene key="main">
                  <Scene key="cube" tabs={true} component={CubeBar} >
                    <Scene key="core"  leftButton={NavBarMenuButton} rightButton={NavBarMessageButton}  passProps >
                      <Scene key="coreTabs" tabs={true}>
                        <Scene key="home" component={Home} navTransparent >
                          <Scene key="restoreHome" />
                          <Scene key="restoreActivities" initialScroll/>
                          <Scene key="fullMap" fullMap drawerDisableSwipe leftButton={NavBarCloseButton} onClose={()=>Actions.restoreHome()}/>
                          <Scene key="fullActivities" hideActivityBar navTransparent={false} renderTitle={props=><FilterTitle {...props}/>}/>
                        </Scene>
                        <Scene key="friends">
                          <Scene key="friendsMain" component={FriendsList} title="Friends"/>
                          <Scene key="followers" component={FollowersList} title="Followers"/>
                          <Scene key="blocked" component={BlockedList} title="Blocked"/>
                        </Scene>

                        <Scene key="myAccount" component={MyAccount} title="My Account">
                          <Scene key="viewAccount" />
                          <Scene key="editAccount" editMode rightTitle="Save"
                                 onRight={()=>Actions.saveAccount()}
                                 leftTitle="Cancel"
                                 onLeft={()=>Actions.viewAccount()}
                          />
                          <Scene key="saveAccount" save />
                        </Scene>
                      </Scene>
                      <Scene key="profileDetail" component={ProfileDetail}
                             rightButtonImage={require("../images/iconOptions.png")} clone/>
                      <Scene key="createMessage" component={CreateMessage} title="Select Friends" clone/>
                      <Scene key="profileOptions" component={ProfileOptions} />
                      <Scene key="addFriends" component={AddFriends} title="Add Friends"/>
                      <Scene key="addFriendByUsername" component={AddFriendByUsername}
                             title="Add by Username"/>
                    </Scene>
                    <Scene key="messaging" leftButton={NavBarMenuButton}  rightButton={NavBarCloseButton} onClose={()=>Actions.core()}>
                      <Scene key="chats" component={ChatsScreen} title="Messages" />
                      <Scene key="chat" component={ChatScreen}
                             rightButtonImage={require("../images/iconOptions.png")}
                             onRight={state=>alert("Message Options")}/>
                    </Scene>
                  </Scene>
                </Scene>
              </Scene>
            </Scene>
          </Scene>
        </Scene>
        <Scene key="privacyPolicy" component={PrivacyPolicy}/>
        <Scene key="termsOfService" component={TermsOfService}/>
      </Scene>
    </Router>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
