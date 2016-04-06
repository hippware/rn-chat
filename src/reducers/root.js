import {combineReducers } from 'redux'
import conversation from './conversation';
import roster from './roster';
import profile from './profile';
import activity from './activity';
import location from './location';

export default combineReducers({conversation, roster, profile, activity, location});
