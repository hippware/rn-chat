//import {combineReducers } from 'redux';
import { combineReducers } from 'redux-side-effects';
import conversation from './conversation';
import roster from './roster';
import profile from './profile';
import profiles from './profiles';
import location from './location';
import xmpp from './xmpp';
import activity from './activity';

export default combineReducers({conversation, roster, profile, location, xmpp, profiles, activity});
