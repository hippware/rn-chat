import React from 'react-native';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Main from './components/Main';
import ContactList from './components/ContactList';
import Conversations from './components/Conversations';
import Conversation from './components/Conversation';
import AddConversation from './components/AddConversation';
import AddContact from './components/AddContact';

import {Router, Actions, Route, Animations, Schema} from 'react-native-redux-router';
import { Provider } from '../node_modules/react-redux/native';
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/root';
import { persistStore, autoRehydrate } from 'redux-persist'

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const {View, AsyncStorage, Text} = React;
const store = compose(autoRehydrate())(createStoreWithMiddleware)(reducer)

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillMount(){
        persistStore(store, {storage: AsyncStorage}, () => {
            this.setState({ rehydrated: true })
        })
    }

    render(){
        // show splash screen or something until state is not loaded
        if (!this.state.rehydrated){
            return <View style={{flex:1}}><Text>Loading...</Text></View>
        }
        return <Provider store={store}>
                {()=> (
                    <View style={{flex:1}}>
                        <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                            <Router>
                                <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                                <Route name="conversations" component={Conversations} title="Conversations" hideNavBar={true}/>
                                <Route name="conversation" component={Conversation} title="Conversation"/>
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

