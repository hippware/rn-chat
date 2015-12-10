import {combineReducers } from 'redux'
import xmpp from './xmpp';
import conversation from './conversation';
import roster from './roster';
import login from './login';

export default combineReducers({xmpp, conversation, roster, login});
