import React from 'react-native';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Main from './components/Main';
import ContactList from './components/ContactList';
import Conversations from './components/Conversations';
import AddConversation from './components/AddConversation';
import AddContact from './components/AddContact';

import {Router, Actions, Route, Animations, Schema} from 'react-native-redux-router';
import { Provider } from '../node_modules/react-redux/native';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers/root';
import * as storage from 'redux-storage'

const reducer = storage.reducer(rootReducer);
import createEngine from 'redux-storage/engines/reactNativeAsyncStorage';
const engine = createEngine('rn-chat');

const storageMiddleware = storage.createMiddleware(engine);
const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    storageMiddleware,
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const {View} = React;
const store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);
//load(store);

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    async _loadInitialState() {
        var value = await load(store);
        if (value !== null){
            this.setState({loaded: value});
            console.log("value:"+value);
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    render(){
        // show splash screen or something until state is not loaded
        if (!this.state.loaded){
            return <View/>
        }
        return <Provider store={store}>
                {()=> (
                    <View style={{flex:1}}>
                        <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                            <Router>
                                <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                                <Route name="conversations" component={Conversations} title="Conversations" hideNavBar={true}/>
                                <Route name="contactList" component={ContactList} hideNavBar={true}/>
                                <Route name="addConversation" component={AddConversation} schema="popup"/>
                                <Route name="addContact" component={AddContact} schema="popup"/>
                                <Route name="login" component={Login} title="Login"/>
                                <Route name="main" component={Main}/>
                            </Router>
                        </View>
                )}
                </Provider>;
    }
}

