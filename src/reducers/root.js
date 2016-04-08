import {combineReducers } from 'redux'
import conversation from './conversation';
import roster from './roster';
import profile from './profile';
import activity from './activity';
import location from './location';
import xmpp from './xmpp';

export default combineReducers({conversation, roster, profile, activity, location, xmpp});
