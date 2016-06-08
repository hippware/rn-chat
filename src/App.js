global.fs = require('react-native-fs');
global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = require('react-native-file-download').download;
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;
import assert from 'assert';
import RootStore from './store/RootStore';
const constitute = require('constitute');
import React from "react";
import Promo from './components/Promo';
import {observer} from "mobx-react/native";
import {View, AsyncStorage, Text, Image, TouchableOpacity, StyleSheet, AppStateIOS, Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');
global.getImageSize = Image.getSize;
import SideMenu from './components/SideMenu';
import CreateMessage from './components/CreateMessage';
import RightSideMenu from './components/RightSideMenu';
import RightSideBotMenu from './components/RightSideBotMenu';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Popup from './components/Popup';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import Drawer from './components/Drawer';
import NavBar from './components/NavBarNew';
import ChatBubble from './components/ChatBubble';
import Map from './components/Map';
import NavBarMessageButton from './components/NavBarMessageButton';
import NavBarCloseButton from './components/NavBarCloseButton';
import NavBarMenuButton from './components/NavBarMenuButton';
import FilterTitle from './components/FilterTitle';
import Avatar from './components/Avatar'
import MyAccount from './components/MyAccount';
import FriendsList from './components/FriendsList';
import FriendCard from './components/FriendCard';
import ProfileDetail from './components/ProfileDetail';
import ProfileOptions from './components/ProfileOptions';
import AddFriends from './components/AddFriends';
import AddFriendByUsername from './components/AddFriendByUsername';
import ChatsScreen from './components/ChatsScreen';
import ChatScreen from './components/ChatScreen';
import Chats from './components/Chats';
import ChatCard from './components/ChatCard';
import {settings, k} from './globals';
import { Actions, Modal, Scene, Switch, TabBar, Router}  from 'react-native-mobx';
import CubeBar from './components/CubeBarIOS';


export default class App extends React.Component {
  constructor(props){
    super(props);
    settings.isTesting = props.TESTING != undefined;
    this.root = constitute(RootStore);
    
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
    assert(this.root, "Root is not defined");
    return <Router navBar={NavBar} {...this.root} >
      <Scene key="modal" component={Modal}>
        <Scene key="root" component={Switch} tabs={true} selector={({model})=>model.scene}>
          <Scene key="launch" component={Launch} hideNavBar/>
          <Scene key="promo" component={Promo} hideNavBar/>
          <Scene key="signUp" component={SignUp} hideNavBar/>
          <Scene key="logged" component={Drawer} open={false} SideMenu={SideMenu} openDrawerOffset={1-300*k/width} tweenHandler={(ratio) => ({main: { opacity:Math.max(0.54,1-ratio) }})}>
            <Scene key="rightBotMenu" component={Drawer} open={false} SideMenu={RightSideBotMenu} side="right"  openDrawerOffset={1-257*k/width}>
            <Scene key="rightMenu" component={Drawer} open={false} SideMenu={RightSideMenu} side="right"  openDrawerOffset={1-120*k/width}>
                <Scene key="main">
                  <Scene key="cube" tabs={true} component={CubeBar} >
                    <Scene key="core"  leftButton={NavBarMenuButton} rightButton={NavBarMessageButton}  passProps >
                      <Scene key="coreTabs" tabs={true}>
                        <Scene key="home" component={Home} navTransparent {...{Chats, ChatCard, Map}}>
                          <Scene key="restoreHome" />
                          <Scene key="restoreActivities" initialScroll/>
                          <Scene key="fullMap" fullMap drawerDisableSwipe leftButton={NavBarCloseButton} onClose={()=>Actions.restoreHome()}/>
                          <Scene key="fullActivities" hideActivityBar navTransparent={false} renderTitle={props=><FilterTitle {...props}/>}/>
                        </Scene>
                        <Scene key="friends" component={FriendsList} {...{FriendCard}} title="Friends"/>
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
                      <Scene key="chats" component={ChatsScreen} {...{Chats, ChatCard}} title="Messages" />
                      <Scene key="chat" component={ChatScreen} {...{ChatBubble}}
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
