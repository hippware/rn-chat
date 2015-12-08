import {combineReducers } from 'redux'
import xmpp from './xmpp';
import conversation from './conversation';
import roster from './roster';

export default combineReducers({xmpp, conversation, roster});
