import API, {run} from '../API';
import {SUCCESS, ERROR, REQUEST_ROSTER, AUTHORIZE, UNAUTHORIZE, UNSUBSCRIBE, REMOVE_ROSTER_ITEM_REQUEST,
    SUBSCRIBE, PRESENCE_UPDATE_RECEIVED, LOGIN, LOGOUT, CONNECTED} from '../actions';
import rosterService from '../services/xmpp/roster';

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
        case LOGOUT+SUCCESS:
            return {roster:[]};

        case CONNECTED:
            yield run(API.requestRoster, {type: REQUEST_ROSTER});
            return {roster: state.roster.map(el=>Object.assign({}, el, {status: 'unavailable'}))};

        case AUTHORIZE:
            yield run(rosterService.authorize, action.user);
            return state;

        case UNAUTHORIZE:
            yield run(rosterService.unauthorize, action.user);
            return state;

        case UNSUBSCRIBE:
            yield run(rosterService.unsubscribe, action.user);
            return state;

        case SUBSCRIBE:
            yield run(rosterService.subscribe, action.user);
            return {roster: [...state.roster.filter(el => el.username != action.user), {username: action.user}].sort(sort)};

        case REMOVE_ROSTER_ITEM_REQUEST:
            yield run(rosterService.removeFromRoster, action.user);
            return {roster: state.roster.filter(el => el.username != action.user)};

        case PRESENCE_UPDATE_RECEIVED:
            let username = action.user;
            let status = action.status || 'online';
            console.log("PRESENCE:",action);
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
        case REQUEST_ROSTER+SUCCESS:
            // check current online users
            let online = {};
            state.roster.forEach(function(el) {
                if (el.status && el.status !== 'unavailable') {
                    online[el.username] = el.status;
                }
            });
            return { roster: action.data.map(el=>online[el.username] ? Object.assign({}, el, {status:online[el.username]}) : el).sort(sort) };
        default:
            return state;
    }
}