import React from 'react-native';
import Launch from './components/Launch';
import Login from './components/Login';
import ProcessLogin from './components/ProcessLogin';
import Settings from './components/Settings';
import ContactList from './components/ContactList';
import Conversations from './components/Conversations';
import Conversation from './components/Conversation';
import AddConversation from './components/AddConversation';
import AddContact from './components/AddContact';
import TabIcon from './components/TabIcon';

import {Router, Actions, Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import { connect, Provider } from 'react-redux/native';
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
                return <View/>
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
        return <Provider store={store}>
                {()=> (
                        <Router name="root" hideNavBar={true}>
                            <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} />
                            <Schema name="tab" type="switch" icon={TabIcon}/>
                            <Route name="launch" component={Launch}/>
                            <Route name="processLogin" component={ProcessLogin} type="modal"/>
                            <Route name="login" title="Login" component={Login} wrapRouter={true}/>
                            <Route name="main">
                                <Router name="main" hideNavBar={true} footer={TabBar}>
                                    <Route name="contactList" schema="tab" component={ContactList} title="Contacts" rightTitle="Add" onRight={()=>Actions.addContact()} />
                                    <Route name="conversations" schema="tab" component={Conversations} title="Conversations" rightTitle="Add" onRight={()=>Actions.addConversation()}/>
                                    <Route name="settings" schema="tab" component={Settings} title="Settings" />
                                </Router>
                            </Route>
                            <Route name="conversation" component={Conversation} title="Conversation" hideNavBar={false}/>
                            <Route name="addConversation" component={AddConversation} title="Add conversation" hideNavBar={false}/>
                            <Route name="addContact" component={AddContact} title="Add contact" hideNavBar={false}/>
                        </Router>
                )}
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
