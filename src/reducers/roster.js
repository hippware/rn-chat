import { sideEffect } from 'redux-side-effects';
import {ROSTER_RECEIVED, REQUEST_AUTHORIZE, REQUEST_UNAUTHORIZE, REQUEST_UNSUBSCRIBE, REMOVE_ROSTER_ITEM_REQUEST,
    REQUEST_SUBSCRIBE, PRESENCE_UPDATE_RECEIVED,
    requestRosterAPI, receivePresenceAPI, removeFromRosterAPI, requestSubscribeAPI, requestAuthorizeAPI, requestUnauthorizeAPI, requestUnsubscribeAPI} from '../actions/xmpp/roster';
import {LOGOUT_SUCCESS, LOGIN_SUCCESS} from '../actions/profile';
import {CONNECTED} from '../actions/xmpp/xmpp';

/**
 * Sort contacts by status (so online goes first), then by username
 * @param a
 * @param b
 * @returns {number}
 */
function sort(a,b){
    //let statusA = a.status || 'unavailable';
    //let statusB = b.status || 'unavailable';
    //if (statusA === 'online' && statusB ==='unavailable'){
    //    return -1;
    //}
    //if (statusA === 'unavailable' && statusB ==='online'){
    //    return 1;
    //}
    var nameA = a.username.toLowerCase(), nameB = b.username.toLowerCase();
    if (nameA < nameB) //sort string ascending
        return -1;
    if (nameA > nameB)
        return 1;
    return 0; //default return value (no sorting)
}

export default function* reducer(state = {roster:[]}, action) {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return {roster:[]};

        case LOGIN_SUCCESS:
            yield sideEffect(receivePresenceAPI);
            return {roster: state.roster.map(el=>Object.assign({}, el, {status: 'unavailable'}))};

        case CONNECTED:
            yield sideEffect(requestRosterAPI);
            return state;

        case REQUEST_AUTHORIZE:
            yield sideEffect(requestAuthorizeAPI, action.user);
            return state;

        case REQUEST_UNAUTHORIZE:
            yield sideEffect(requestUnauthorizeAPI, action.user);
            return state;

        case REQUEST_UNSUBSCRIBE:
            yield sideEffect(requestUnsubscribeAPI, action.user);
            return state;

        case REQUEST_SUBSCRIBE:
            yield sideEffect(requestSubscribeAPI, action.user);
            return {roster: [...state.roster.filter(el => el.username != action.user), {username: action.user}].sort(sort)};

        case REMOVE_ROSTER_ITEM_REQUEST:
            yield sideEffect(removeFromRosterAPI, action.user);
            return {roster: state.roster.filter(el => el.username != action.user)};

        case PRESENCE_UPDATE_RECEIVED:
            let username = action.user;
            let status = action.status || 'online';
            if (!username){
                throw new TypeError("Username should be defined");
            }
            let roster = state.roster.map(el => el.username == username ? Object.assign({}, el, {status}) : el);
            // check if contact is in roster
            if (status === 'online' && !state.roster.filter(el => el.username == username).length){
                return {roster: [...roster, {username, status}].sort(sort)}
            } else {
                return {roster: roster.sort(sort)};
            }
        case ROSTER_RECEIVED:
            // check current online users
            let online = {};
            state.roster.forEach(function(el) {
                if (el.status && el.status !== 'unavailable') {
                    online[el.username] = el.status;
                }
            });
            return { roster: action.list.map(el=>online[el.username] ? Object.assign({}, el, {status:online[el.username]}) : el).sort(sort) };
        default:
            return state;
    }
}