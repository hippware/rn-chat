import React from 'react-native';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Main from './components/Main';
import {Router, Route, Animations, Schema, routerReducer} from 'react-native-redux-router';
import { Provider } from '../node_modules/react-redux/native';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import xmpp from './reducers/xmpp';

const reducer = combineReducers({xmpp, routerReducer});
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
                                <Route name="login" component={Login} title="Login"/>
                                <Route name="main" component={Main}/>
                            </Router>
                        </View>
                )}
                </Provider>
        );
    }
}

