import {routerReducer} from 'react-native-redux-router';
import {combineReducers } from 'redux'
import xmpp from './xmpp';
import conversation from './conversation';

export default combineReducers({xmpp, routerReducer, conversation});
