import API, {run} from '../API';
import { sideEffect } from 'redux-side-effects';
import assert from 'assert';
import {SUCCESS, ERROR, REQUEST_ROSTER, PROFILE_CHANGED, AUTHORIZE, UNAUTHORIZE, UNSUBSCRIBE, REMOVE_ROSTER_ITEM, ADD_ROSTER_ITEM,
    ADD_ROSTER_TO_FAVORITES, REMOVE_ROSTER_FROM_FAVORITES, SUBSCRIBE, PRESENCE_UPDATE_RECEIVED, LOGIN, LOGOUT, CONNECTED,
    SET_ROSTER_FILTER_ALL, ADD_ROSTER_ITEM_BY_HANDLE, SET_ROSTER_FILTER_FAVS, SET_ROSTER_FILTER_NEARBY} from '../actions';
import rosterService from '../services/xmpp/roster';
import {displayName} from './profile';

let filters = {};
filters[SET_ROSTER_FILTER_ALL] = el=>el;
filters[SET_ROSTER_FILTER_FAVS] = el=>el.isFavorite;
filters[SET_ROSTER_FILTER_NEARBY] = el=>el;

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
    var nameA = a.displayName.toLowerCase(), nameB = b.displayName.toLowerCase();
    if (nameA < nameB) //sort string ascending
        return -1;
    if (nameA > nameB)
        return 1;
    return 0; //default return value (no sorting)
}

const defaultState = {roster:[], filter:SET_ROSTER_FILTER_ALL, list:[]};

export default function* reducer(state = defaultState, action) {
    let data, roster;

    switch (action.type) {
        case CONNECTED:
            yield run(API.requestRoster, {type: REQUEST_ROSTER});
            return state;

        case LOGOUT+SUCCESS:
            return defaultState;

        case REQUEST_ROSTER:
            yield run(API.requestRoster, action);
            return state;

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
            return state;
//            return {roster: [...state.roster.filter(el => el.username != action.user), {username: action.user}].sort(sort)};

        case REMOVE_ROSTER_ITEM:
            yield run(rosterService.remove, action);
            yield sideEffect(dispatch=>dispatch({type: PROFILE_CHANGED, user:action.user, data:{isFriend: false}}));
            roster = state.roster.filter(el => el.username != action.user);
            return { ...state, roster, list:roster.filter(filters[state.filter]) };

        case ADD_ROSTER_ITEM_BY_HANDLE:
            yield run(API.addFriendByHandle, action);
            return state;

        case ADD_ROSTER_ITEM_BY_HANDLE+SUCCESS:
            roster = [...state.roster.filter(el => el.username != action.data.user), {...action.data, displayName:displayName(action.data)}].sort(sort);
            yield sideEffect(dispatch=>dispatch({type: PROFILE_CHANGED, user:action.data.user, data:{...action.data, isFriend: true}}));
            return { ...state, roster, list:roster.filter(filters[state.filter]) };

        case ADD_ROSTER_ITEM_BY_HANDLE+ERROR:
            yield run(API.showError, action.error);
            return state;

        case ADD_ROSTER_ITEM:
            yield run(rosterService.add, action);
            yield run(rosterService.subscribe, action.user);
            yield run(rosterService.authorize, action.user);
            yield sideEffect(dispatch=>dispatch({type: PROFILE_CHANGED, user:action.user, data:{isFriend: true}}));
            assert(action.data, "data should not be empty for add roster item action");
            roster = [...state.roster.filter(el => el.username != action.user), {username: action.user, ...action.data, displayName:displayName(action.data)}].sort(sort);
            return { ...state, roster, list:roster.filter(filters[state.filter]) };

        case ADD_ROSTER_TO_FAVORITES:
            yield run(rosterService.remove, action);
            yield run(rosterService.addFavorite, action);
            yield sideEffect(dispatch=>dispatch({type: PROFILE_CHANGED, user:action.user, data:{isFavorite: true}}));
            roster = state.roster.map(el => el.username == action.user ? {...el, isFavorite:true} : el);
            return { ...state, roster, list:roster.filter(filters[state.filter]) };

        case REMOVE_ROSTER_FROM_FAVORITES:
            yield run(rosterService.remove, action);
            yield run(rosterService.add, action);
            yield sideEffect(dispatch=>dispatch({type: PROFILE_CHANGED, user:action.user, data:{isFavorite: false}}));
            roster = state.roster.map(el => el.username == action.user ? {...el, isFavorite:false} : el);
            return { ...state, roster, list:roster.filter(filters[state.filter]) };


        case PRESENCE_UPDATE_RECEIVED:
            let username = action.user;
            let status = action.status || 'online';
            console.log("PRESENCE:",action);
            if (!username){
                throw new TypeError("Username should be defined");
            }
            roster = state.roster.map(el => el.username == username ? Object.assign({}, el, {status}) : el);
            return { ...state, roster, list:roster.filter(filters[state.filter]) };

        case REQUEST_ROSTER+SUCCESS:
            roster = action.data.map(el=>({...el, displayName:displayName(el)})).sort(sort);
            return { ...state, roster, list:roster.filter(filters[state.filter]) };

        case SET_ROSTER_FILTER_NEARBY:
        case SET_ROSTER_FILTER_FAVS:
        case SET_ROSTER_FILTER_ALL:
            return {...state, filter:action.type, list:state.roster.filter(filters[action.type])};
        default:
            return state;
    }
}