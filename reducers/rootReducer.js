import { combineReducers } from 'redux'
var {routerReducer} = require('react-native-redux-router');
var xmpp = require('./xmppReducer');

const rootReducer = combineReducers({
    routerReducer,
    xmpp
});

export default rootReducer
