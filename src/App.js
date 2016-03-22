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
import Conversations from './components/Conversations';
//import Conversation from './components/Conversation';
//import AddConversation from './components/AddConversation';
//import AddContact from './components/AddContact';
//import TabIcon from './components/TabIcon';
import {settings, k} from './globals';
import { Actions, Modal, Scene, Switch, TabBar, Router} from 'react-native-router-flux';
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
import CubeBar from './components/CubeBarIOS';

export default class App extends React.Component {
    constructor(props){
        super(props);
        settings.isTesting = props.TESTING != undefined;
        this.state = {};
    }
    componentWillMount(){
        if (PERSIST) {
            persistStore(store, {blacklist: ['xmpp', this.props.TESTING  && 'profile'], storage: AsyncStorage}, () => {
                this.setState({rehydrated: true})
            })
        }
    }

    render(){
        //return <CubeBar ref="cubeBar">
        //    <View style={{backgroundColor:'red', position:'absolute',left:0,right:0,top:0,bottom:0}}><Text>Hello world!</Text><TouchableOpacity onPress={()=>this.refs.cubeBar.go(1)}><Text>Switch</Text></TouchableOpacity></View>
        //    <View style={{backgroundColor:'blue', position:'absolute',left:0,right:0,top:0,bottom:0}}><Text>Hello world2!</Text><TouchableOpacity onPress={()=>this.refs.cubeBar.go(0)}><Text>Switch</Text></TouchableOpacity></View>
        //</CubeBar>;
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
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root" component={connect(state=>({profile:state.profile}))(Switch)} tabs={true}
                           selector={props=>props.profile.sessionID ? props.profile.handle ? "main" : "signUp" : "promo"}>
                        <Scene key="promo" component={Promo} hideNavBar={true}/>
                        <Scene key="signUp" component={SignUp} hideNavBar={true}/>
                        <Scene key="main" component={Drawer}>
                            <Scene key="cube" tabs={true} component={CubeBar}>
                                <Scene key="core" tabs={true}>
                                    <Scene key="homeRouter">
                                        <Scene key="home" component={Home}/>
                                        <Scene key="map"  name="shortMap" component={FullMap}/>
                                    </Scene>
                                    <Scene key="fullMap" name="fullMap" component={FullMap}/>
                                    <Scene key="myAccount" component={MyAccount} />
                                </Scene>
                                <Scene key="messaging">
                                    <Scene key="conversations" component={Conversations} title="Messages" navBar={NavBar}     />
                                </Scene>
                            </Scene>
                        </Scene>
                    </Scene>
                    <Scene key="conv" component={Conversations} title="Messages" navBar={NavBar}     />
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
