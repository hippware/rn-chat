import service from './../../services/xmpp';

import * as xmpp from './xmpp';

export const REQUEST_UNSUBSCRIBE = 'REQUEST_UNSUBSCRIBE';
export function requestUnsubscribe(user){
    return { type: REQUEST_UNSUBSCRIBE, user };
}

export const REQUEST_SUBSCRIBE = 'REQUEST_SUBSCRIBE';
export function requestSubscribe(user){
    return { type: REQUEST_SUBSCRIBE, user };
}

export const REQUEST_AUTHORIZE = 'REQUEST_AUTHORIZE';
export function requestAuthorize(user){
    return { type: REQUEST_AUTHORIZE, user };
}

export const REQUEST_UNAUTHORIZE = 'REQUEST_UNAUTHORIZE';
export function requestUnauthorize(user){
    return { type: REQUEST_UNAUTHORIZE, user };
}

export const SUBSCRIBE_REQUEST_RECEIVED = 'SUBSCRIBE_REQUEST_RECEIVED';
export function subscribeRequestReceived(user){
    return { type: SUBSCRIBE_REQUEST_RECEIVED, user}
}

export const ROSTER_RECEIVED = 'ROSTER_RECEIVED';
export function rosterReceived(list){
    return {type: ROSTER_RECEIVED, list};
}

export const PRESENCE_UPDATE_RECEIVED = 'PRESENCE_UPDATE_RECEIVED';
export function presenceUpdateReceived(user, status){
    return {type: PRESENCE_UPDATE_RECEIVED, user, status};
}

export const REMOVE_ROSTER_ITEM_REQUEST = 'REMOVE_ROSTER_ITEM_REQUEST';
export function removeRosterItemRequest(user){
    return {type: REMOVE_ROSTER_ITEM_REQUEST, user};
}

export function removeRosterItem(user){
    return dispatch => {
        dispatch(removeRosterItemRequest(user));
        service.removeFromRoster(user);
    }
}

export function subscribe(user) {
    return dispatch => {
        dispatch(requestSubscribe(user));
        service.subscribe(user);
    }
}

export function unsubscribe(user) {
    return dispatch => {
        dispatch(requestUnsubscribe(user));
        service.unsubscribe(user);
    }
}

export function authorize(user) {
    return dispatch => {
        dispatch(requestAuthorize(user));
        service.authorize(user);
    }
}

export function unauthorize(user) {
    return dispatch => {
        dispatch(requestUnauthorize(user));
        service.unauthorize(user);
    }
}

export function processLogin(username, password){
    return dispatch => {
        xmpp.processLoginDispatch(dispatch, username, password, service);
        service.onRosterReceived = (result)=> dispatch(rosterReceived(result));
        service.onSubscribeRequest = (user) => dispatch(subscribeRequestReceived(user));
        service.onPresenceUpdate = (user, status) => dispatch(presenceUpdateReceived(user, status));
    }
}

