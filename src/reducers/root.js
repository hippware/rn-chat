import {combineReducers } from 'redux'
import xmpp from './xmpp';
import conversation from './conversation';
import roster from './roster';
import login from './login';
import profile from './profile';
import activity from './activity';
import location from './location';

export default combineReducers({xmpp, conversation, roster, login, profile, activity, location});
