global.fs = require('react-native-fs');
global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = require('react-native-file-download').download;
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;

import React from 'react-native';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Popup from './components/Popup';
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
import ProfileDetail from './components/ProfileDetail';
import ProfileOptions from './components/ProfileOptions';
import AddFriends from './components/AddFriends';
import AddFriendByUsername from './components/AddFriendByUsername';
import GradientHeader from './components/GradientHeader';
import Promo from './components/Promo';
//import Login from './components/Login';
//import Settings from './components/Settings';
//import ContactList from './components/ContactList';
import ConversationsScreen from './components/ConversationsScreen';
//import Conversation from './components/Conversation';
//import AddConversation from './components/AddConversation';
//import AddContact from './components/AddContact';
//import TabIcon from './components/TabIcon';
import {settings, k} from './globals';
import { Actions, Modal, Scene, Switch, TabBar, Router}  from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

const RouterWithRedux = connect()(Router);
import { LOGIN, SUCCESS} from './actions';

const {View, AsyncStorage, Text, TouchableOpacity, StyleSheet, Navigator, AppStateIOS} = React;
import { persistStore, autoRehydrate } from 'redux-persist'
import {PERSIST, DEBUG} from './globals';
import store from './store';
import CubeBar from './components/CubeBarIOS';

export default class App extends React.Component {
    constructor(props){
        super(props);
        settings.isTesting = props.TESTING != undefined;
        this.state = {};
        this._handleAppStateChange = this._handleAppStateChange.bind(this);

    }
    componentWillMount(){
        if (PERSIST) {
            persistStore(store, {blacklist: ['xmpp', 'data', this.props.TESTING  && 'profile'], storage: AsyncStorage}, () => {
                this.setState({rehydrated: true})
                this._handleAppStateChange('active');
            })
        }
    }

    componentDidMount() {
        AppStateIOS.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount(){
        AppStateIOS.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange(currentAppState) {
        const profile = store.getState().profile;
        if (currentAppState === 'active'){
            if (profile.sessionID && profile.uuid) {
                // emulate success login
                store.dispatch({type: LOGIN+SUCCESS, data: profile});
            } else if (profile.authToken && profile.phoneNumber){
                // try to silently login
                console.log("LOGIN SILENTLY");
                store.dispatch({type: LOGIN, ...profile});
            }
        }
    }

    render(){
        if (PERSIST) {
            // show splash screen or something until state is not loaded
            if (!this.state.rehydrated) {
                return <Launch/>
            }
        }
        return <Provider store={store}>
            <RouterWithRedux navBar={NavBar}>
                <Scene key="modal" component={Modal} >
                    <Scene key="root" component={connect(state=>({profile:state.profile}))(Switch)} tabs={true}
                           selector={props=>props.profile && props.profile.sessionID ? props.profile.handle ? "logged" : "signUp" : "promo"}>
                        <Scene key="promo" component={Promo}/>
                        <Scene key="signUp" component={SignUp} />
                        <Scene key="logged" component={Drawer}>
                            <Scene key="main" hideNavBar>
                                <Scene key="cube" tabs={true} component={CubeBar}>
                                    <Scene key="core" leftButton={NavBarMenuButton} rightButton={NavBarMessageButton}  >
                                        <Scene key="coreTabs" tabs={true}>
                                            <Scene key="homeRouter">
                                                <Scene key="home" component={Home} navTransparent />
                                                <Scene key="restoreHome" type="refresh" base="home" />
                                                <Scene key="restoreActivities" type="refresh" base="home" initialScroll/>
                                                <Scene key="fullMap" type="refresh" base="home" fullMap drawerDisableSwipe leftButton={NavBarCloseButton} onClose={()=>Actions.restoreHome()}/>
                                                <Scene key="fullActivities" type="refresh" base="home" hideActivityBar navTransparent={false} renderTitle={props=><FilterTitle/>}/>
                                            </Scene>
                                            <Scene key="friends" component={FriendsList} title="Friends"/>
                                            <Scene key="myAccount">
                                                <Scene key="myAccountBase" component={MyAccount} title="My Account"/>
                                                <Scene key="viewAccount" type="refresh" base="myAccountBase" />
                                                <Scene key="editAccount" type="refresh" base="myAccountBase" editMode rightTitle="Save"
                                                       onRight={()=>Actions.saveAccount()}
                                                       leftTitle="Cancel"
                                                       onLeft={()=>Actions.viewAccount()}
                                                />
                                                <Scene key="saveAccount" type="refresh" base="myAccountBase" save />
                                            </Scene>
                                        </Scene>
                                        <Scene key="profileDetail" component={ProfileDetail} rightButtonImage={require("../images/iconOptions.png")} onRight={state=>Actions.profileOptions({title:state.title})}/>
                                        <Scene key="profileOptions" component={ProfileOptions} />
                                        <Scene key="addFriends" component={AddFriends} title="Add Friends"/>
                                        <Scene key="addFriendByUsername" component={AddFriendByUsername} title="Add by Username" backTitle="Cancel" backButtonImage={null} rightTitle="Done" onRight={state=>console.log("STATE:", state)}/>
                                    </Scene>
                                    <Scene key="messaging" component={ConversationsScreen} title="Messages" leftButton={NavBarMenuButton}  rightButton={NavBarCloseButton} onClose={()=>Actions.core()}/>
                                </Scene>
                            </Scene>
                        </Scene>
                    </Scene>
                    <Scene key="privacyPolicy" component={PrivacyPolicy}/>
                    <Scene key="termsOfService" component={TermsOfService}/>
                </Scene>
            </RouterWithRedux>
        </Provider>;
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
