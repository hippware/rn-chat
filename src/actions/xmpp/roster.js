import roster from '../../services/xmpp/roster';
export const REQUEST_UNSUBSCRIBE = 'REQUEST_UNSUBSCRIBE';
export function unsubscribe(user){
    return { type: REQUEST_UNSUBSCRIBE, user };
}

export const REQUEST_SUBSCRIBE = 'REQUEST_SUBSCRIBE';
export function subscribe(user){
    return { type: REQUEST_SUBSCRIBE, user };
}

export const REQUEST_AUTHORIZE = 'REQUEST_AUTHORIZE';
export function authorize(user){
    return { type: REQUEST_AUTHORIZE, user };
}

export const REQUEST_UNAUTHORIZE = 'REQUEST_UNAUTHORIZE';
export function unauthorize(user){
    return { type: REQUEST_UNAUTHORIZE, user };
}

export const SUBSCRIBE_REQUEST_RECEIVED = 'SUBSCRIBE_REQUEST_RECEIVED';

export const ROSTER_RECEIVED = 'ROSTER_RECEIVED';
export function rosterReceived(list){
    return {type: ROSTER_RECEIVED, list};
}

export const PRESENCE_UPDATE_RECEIVED = 'PRESENCE_UPDATE_RECEIVED';
export function presenceUpdateReceived(user, status){
    return {type: PRESENCE_UPDATE_RECEIVED, user, status};
}

export const REMOVE_ROSTER_ITEM_REQUEST = 'REMOVE_ROSTER_ITEM_REQUEST';
export function removeRosterItem(user){
    return {type: REMOVE_ROSTER_ITEM_REQUEST, user};
}

export function receivePresenceAPI(dispatch){
    roster.onPresenceUpdate = presence=>dispatch({...presence, type:PRESENCE_UPDATE_RECEIVED});
    roster.onSubscribeRequest = presence=>dispatch({...presence, type:SUBSCRIBE_REQUEST_RECEIVED});
}

export function requestRosterAPI(dispatch){
    return roster.requestRoster().then(roster=>dispatch(rosterReceived(roster)));
}

export function requestAuthorizeAPI(dispatch, username){
    return roster.authorize(username);
}

export function requestUnauthorizeAPI(dispatch, username){
    return roster.unauthorize(username);
}

export function requestSubscribeAPI(dispatch, username){
    return roster.subscribe(username);
}

export function requestUnsubscribeAPI(dispatch, username){
    return roster.unsubscribe(username);
}

export function requestAuthorizeAPI(dispatch, username){
    return roster.authorize(username);
}

export function removeFromRosterAPI(dispatch, username){
    return roster.removeFromRoster(username);
}

