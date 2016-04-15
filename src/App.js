global.fs = require('react-native-fs');
global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = require('react-native-file-download').download;
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;

import React from 'react-native';
import Launch from './components/Launch';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Popup from './components/Popup';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import Drawer from './components/Drawer';
import NavBar from './components/NavBar';
import MyAccount from './components/MyAccount';
import FullMap from './components/FullMap';
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
import { Actions, Modal, Scene, Switch, TabBar, Router} from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';

import { LOGIN_SUCCESS, LOGIN_REQUEST} from './actions/profile';

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
                store.dispatch({type: LOGIN_SUCCESS, response: profile});
            } else if (profile.authToken && profile.phoneNumber){
                // try to silently login
                store.dispatch({type: LOGIN_REQUEST, ...profile});
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
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root" component={connect(state=>({profile:state.profile}))(Switch)} tabs={true}
                           selector={props=>props.profile && props.profile.sessionID ? props.profile.handle ? "main" : "signUp" : "promo"}>
                        <Scene key="promo" component={Promo} hideNavBar={true}/>
                        <Scene key="signUp" component={SignUp} hideNavBar={true}/>
                        <Scene key="main" component={Drawer}>
                            <Scene key="cube" tabs={true} component={CubeBar}>
                                <Scene key="core" tabs={true}>
                                    <Scene key="homeRouter">
                                        <Scene key="home" component={Home}/>
                                    </Scene>
                                    <Scene key="myAccount" component={MyAccount} />
                                </Scene>
                                <Scene key="messaging">
                                    <Scene key="conversations" component={ConversationsScreen} title="Messages" navBar={NavBar}     />
                                </Scene>
                            </Scene>
                        </Scene>
                    </Scene>
                    <Scene key="privacyPolicy" component={PrivacyPolicy}/>
                    <Scene key="termsOfService" component={TermsOfService}/>
                </Scene>
            </Router>
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
