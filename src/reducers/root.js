import {combineReducers } from 'redux'
import xmpp from './xmpp';
import data from './data';
import conversation from './conversation';
import roster from './roster';
import login from './login';
import profile from './profile';
import activity from './activity';
import location from './location';

export default combineReducers({xmpp, data, conversation, roster, login, profile, activity, location});
