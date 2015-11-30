import React from 'react-native';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Main from './components/Main';
import ContactList from './components/ContactList';
import Conversations from './components/Conversations';
import AddConversation from './components/AddConversation';

import {Router, Actions, Route, Animations, Schema} from 'react-native-redux-router';
import { Provider } from '../node_modules/react-redux/native';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers/root';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const {View} = React;
const store = createStoreWithMiddleware(reducer);


export default class App extends React.Component {
    render(){
        return (
            <Provider store={store}>
                {()=> (
                    <View style={{flex:1}}>
                        <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                            <Router>
                                <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                                <Route name="contactList" component={ContactList}/>
                                <Route name="conversations" component={Conversations} title="Conversations" hideNavBar={true}/>
                                <Route name="addConversation" component={AddConversation} schema="popup"/>
                                <Route name="login" component={Login} title="Login"/>
                                <Route name="main" component={Main}/>
                            </Router>
                        </View>
                )}
                </Provider>
        );
    }
}

