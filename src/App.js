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

//import Login from './components/Login';
//import Settings from './components/Settings';
//import ContactList from './components/ContactList';
//import Conversations from './components/Conversations';
//import Conversation from './components/Conversation';
//import AddConversation from './components/AddConversation';
//import AddContact from './components/AddContact';
//import TabIcon from './components/TabIcon';
import {k} from './globals';
var RNRF = require('react-native-router-flux');
const { Actions, Route, Schema, Animations, TabBar} = RNRF;
import { connect, Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/root';
import { persistStore, autoRehydrate } from 'redux-persist'
import SqlStorage from './services/SqlStorage';


const loggerMiddleware = createLogger();
import {PERSIST, DEBUG} from './globals';
const createStoreWithMiddleware = DEBUG ? applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore) : applyMiddleware(thunkMiddleware)(createStore);

const {View, AsyncStorage, Text, TouchableOpacity, StyleSheet, Navigator} = React;
const store = PERSIST ? compose(autoRehydrate())(createStoreWithMiddleware)(reducer) : createStoreWithMiddleware(reducer);
const Router = connect()(RNRF.Router);
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillMount(){
        if (PERSIST) {
            persistStore(store, {blacklist: ['xmpp'], storage: AsyncStorage}, () => {
                this.setState({rehydrated: true})
            })
        }
    }

    render(){
        if (PERSIST) {
            // show splash screen or something until state is not loaded
            if (!this.state.rehydrated) {
                return <Launch/>
            }
        }
        //return (
        //    <View style={styles.container}>
        //        <Text style={styles.welcome}>
        //            Welcome to React Native!
        //        </Text>
        //        <Text style={styles.instructions}>
        //            To get started, edit index.ios.js
        //        </Text>
        //        <TouchableOpacity onPress={()=>alert('click!')}>
        //            <View style={styles.button}>
        //                <Text style={styles.buttonText}>Press me!</Text>
        //            </View>
        //        </TouchableOpacity>
        //
        //        <Text style={styles.instructions}>
        //            Press Cmd+R to reload,{'\n'}
        //            Cmd+D or shake for dev menu
        //        </Text>
        //    </View>
        //);
        //<Route name="login" title="Login" component={Login} wrapRouter={true}/>
        //<Route name="main">
        //    <Router name="main" hideNavBar={true} footer={TabBar}>
        //        <Route name="contactList" schema="tab" component={ContactList} title="Contacts" rightTitle="Add" onRight={()=>Actions.addContact()} />
        //        <Route name="conversations" schema="tab" component={Conversations} title="Conversations" rightTitle="Add" onRight={()=>Actions.addConversation()}/>
        //        <Route name="settings" schema="tab" component={Settings} title="Settings" />
        //    </Router>
        //    </Route>
        //    <Route name="conversation" component={Conversation} title="Conversation" hideNavBar={false}/>
        //    <Route name="addConversation" component={AddConversation} title="Add conversation" hideNavBar={false}/>
        //    <Route name="addContact" component={AddContact} title="Add contact" hideNavBar={false}/>
        //<Route name="processLogin" component={ProcessLogin} type="modal"/>
        return <Provider store={store}>
                        <Router name="root" hideNavBar={true} routerViewStyle={{backgroundColor:'white'}}>
                            <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} />
                            <Route name="launch" component={connect(state=>({profile:state.profile}))(Launch)}/>
                            <Route name="privacyPolicy" component={PrivacyPolicy} type="modal"/>
                            <Route name="termsOfService" component={TermsOfService} type="modal"/>
                            <Route name="actionSheet" component={TermsOfService} type="actionSheet"/>
                            <Route name="main" type="replace">
                                <Drawer>
                                    <Router hideNavBar={true} renderNavigationBar={props=><NavBar {...props}/>}>
                                        <Route name="homeRouter" type="switch">
                                            <Router>
                                                <Route name="home" component={Home}/>
                                                <Route name="map" component={FullMap}/>
                                            </Router>
                                        </Route>
                                        <Route name="fullMap" component={FullMap} type="switch"/>
                                        <Route name="myAccount" component={MyAccount} type="switch" title="My Account"/>
                                    </Router>
                                </Drawer>
                            </Route>
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
