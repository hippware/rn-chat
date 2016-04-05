import {combineReducers } from 'redux'
import xmpp from './xmpp';
import data from './data';
import conversation from './conversation';
import roster from './roster';
import profile from './profile';
import activity from './activity';
import location from './location';

export default combineReducers({xmpp, data, conversation, roster, profile, activity, location});
