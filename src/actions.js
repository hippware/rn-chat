export const SUCCESS = "__SUCCESS";
export const ERROR = "__ERROR";

export const LOGIN = "LOGIN";
export const PROFILE = "GET_PROFILE";
export const PROFILE_CHANGED = "PROFILE_CHANGED";
export const PROFILE_UPDATE = "PROFILE_UPDATE";
export const LOGOUT = "LOGOUT";

export function login(data){
    return {type: LOGIN, ...data}
}
export function logout(data){
    return {type: LOGOUT, ...data};
}
export function profileRequest(user, fields){
    return {type: PROFILE, user, fields};
}
export function profileUpdate(user, fields){
    return {type: PROFILE_UPDATE, user, fields};
}

export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export function unsubscribe(user){
    return { type: UNSUBSCRIBE, user };
}

export const SUBSCRIBE = 'SUBSCRIBE';
export function subscribe(user){
    return { type: SUBSCRIBE, user };
}

export const AUTHORIZE = 'AUTHORIZE';
export function authorize(user){
    return { type: AUTHORIZE, user };
}

export const UNAUTHORIZE = 'UNAUTHORIZE';
export function unauthorize(user){
    return { type: UNAUTHORIZE, user };
}

export const SUBSCRIBE_REQUEST_RECEIVED = 'SUBSCRIBE_REQUEST_RECEIVED';

export const REQUEST_ROSTER = 'REQUEST_ROSTER';
export function rosterReceived(data){
    return {type: REQUEST_ROSTER+SUCCESS, data};
}
export const PRESENCE_UPDATE_RECEIVED = 'PRESENCE_UPDATE_RECEIVED';
export function presenceUpdateReceived(user, status){
    return {type: PRESENCE_UPDATE_RECEIVED, user, status};
}

export const ADD_ROSTER_ITEM = 'ADD_ROSTER_ITEM';
export const REMOVE_ROSTER_ITEM = 'REMOVE_ROSTER_ITEM';
export function removeRosterItem(user){
    return {type:REMOVE_ROSTER_ITEM, user};
}
export const ADD_ROSTER_ITEM_BY_HANDLE = 'ADD_ROSTER_ITEM_BY_HANDLE';
export function addRosterByHandle(handle){
    return {type: ADD_ROSTER_ITEM_BY_HANDLE, handle};
}
export const ADD_ROSTER_TO_FAVORITES = 'ADD_ROSTER_TO_FAVORITES';
export const REMOVE_ROSTER_FROM_FAVORITES = 'REMOVE_ROSTER_FROM_FAVORITES';
export const SET_ROSTER_FILTER_ALL = 'SET_ROSTER_FILTER_ALL';
export const SET_ROSTER_FILTER_NEARBY = 'SET_ROSTER_FILTER_NEARBY';
export const SET_ROSTER_FILTER_FAVS = 'SET_ROSTER_FILTER_FAVS';

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export function messageReceived(msg){
    return { type: MESSAGE_RECEIVED, msg}
}

export const MESSAGE_COMPOSING_RECEIVED = 'MESSAGE_COMPOSING_RECEIVED';
export const MESSAGE_COMPOSING = 'SEND_MESSAGE_COMPOSING';
export function messageComposingReceived(user){
    return { type: MESSAGE_COMPOSING_RECEIVED, user}
}

export const MESSAGE_PAUSED = 'MESSAGE_PAUSED';
export function messagePaused(user){
    return { type: MESSAGE_PAUSED, user}
}

export const MESSAGE = 'SEND_MESSAGE';
export function sendMessage(msg){
    return {type: MESSAGE, msg};
}
export function sendComposing(user){
    return {type: MESSAGE_COMPOSING, user};
}



export const READ_ALL_MESSAGES = 'READ_ALL_MESSAGES';
export function readAllMessages(username){
    return { type: READ_ALL_MESSAGES, username }
}


export const REQUEST_ARCHIVE = 'REQUEST_ARCHIVE';
export function requestArchive(criterias){
    return { type: REQUEST_ARCHIVE, ...criterias }
}

export const FILE_UPLOAD = "FILE_UPLOAD";
export const FILE_DOWNLOAD = "FILE_DOWNLOAD";

export function upload(data){
    return {type: FILE_UPLOAD, ...data};
}

export const ADD_CONVERSATION = 'ADD_CONVERSATION';
export function addConversation(username, time){
    return { type: ADD_CONVERSATION, username, time };
}

export const REMOVE_CONVERSATION = 'REMOVE_CONVERSATION';
export function removeConversation(username){
    return { type: REMOVE_CONVERSATION, username };
}

export const ENTER_CONVERSATION = 'ENTER_CONVERSATION';
export function enterConversation(username){
    return { type: ENTER_CONVERSATION, username };
}

export const EXIT_CONVERSATION = 'EXIT_CONVERSATION';
export function exitConversation(username){
    return { type: EXIT_CONVERSATION, username };
}

export const SET_LOCATION = 'SET_LOCATION';
export const SET_IS_DAY = 'SET_IS_DAY';

export const CONNECTED = 'XMPP_CONNECTED';
export const DISCONNECTED = 'XMPP_DISCONNECTED';



export const FILTER_ACTIVITIES = 'FILTER_ACTIVITIES';
export const ALL = 'all';
export const NEARBY = 'nearby';
export const FRIENDS = 'friends';
export const TITLES = {'all':'All', 'nearby' : 'Nearby', 'friends': 'Friends'};

export function filterActivities(mode){
    return {type:FILTER_ACTIVITIES, mode};
}