import service from './../../services/xmpp/xmpp';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export function requestLogin(username, password){
    console.log("REQUEST_LOGIN");
    return { type: REQUEST_LOGIN, username, password };
}

export const AUTH_ERROR_SHOWN = 'AUTH_ERROR_SHOWN';
export function authErrorShown(){
    return { type: AUTH_ERROR_SHOWN };
}

export const REQUEST_DISCONNECT = 'REQUEST_DISCONNECT';
export function requestDisconnect(){
    return { type: REQUEST_DISCONNECT };
}


export const REQUEST_LOGOUT = "LOGOUT";
export function requestLogout(){
    return {type: REQUEST_LOGOUT};
}

export function logout(){
    return dispatch => {
        dispatch(requestLogout());
        dispatch(disconnect());
    };
}

export const CONNECTED = 'CONNECTED';
export function connected(){
    console.log("CONNECTED");
    return { type: CONNECTED }
}

export const DISCONNECTED = 'DISCONNECTED';
export function disconnected(){
    return { type: DISCONNECTED }
}

export const AUTHFAIL = 'AUTHFAIL';
export function authfail(error){
    return { type: AUTHFAIL, error }
}

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export function messageReceived(msg){
    return { type: MESSAGE_RECEIVED, msg}
}

export const MESSAGE_COMPOSING = 'MESSAGE_COMPOSING';
export function messageComposing(username){
    return { type: MESSAGE_COMPOSING, username}
}

export const MESSAGE_PAUSED = 'MESSAGE_PAUSED';
export function messagePaused(username){
    return { type: MESSAGE_PAUSED, username}
}

export const MESSAGE_SENT = 'SEND_MESSAGE_REQUEST';
export function messageSent(msg){
    return {type: MESSAGE_SENT, msg};
}

export const READ_ALL_MESSAGES = 'READ_ALL_MESSAGES';
export function readAllMessages(username){
    return { type: READ_ALL_MESSAGES, username }
}


export const REQUEST_ARCHIVE = 'REQUEST_ARCHIVE';
export function requestArchive(criterias){
    return { type: REQUEST_ARCHIVE, ...criterias }
}


export const ARCHIVE_MESSAGE_RECEIVED = 'ARCHIVE_MESSAGE_RECEIVED';
export function archiveMessageReceived(msg){
    return { type: ARCHIVE_MESSAGE_RECEIVED, msg }
}

export function sendMessage(msg){
    return dispatch => {
        if (service.isConnected){
            const identMsg = Object.assign({}, msg, {id: msg.id || 's'+Date.now()});
            dispatch(messageSent(identMsg));
            service.sendMessage(identMsg);
        } else {
            console.log("XMPP is not connected!");
        }
    }
}

export function sendComposing(username){
    service.composing(username);
}

export function disconnect(){
    return dispatch => {
        dispatch(requestDisconnect());
        service.disconnect();
    }

}

export function processRequestArchive(criterias = {}){
    return dispatch => {
        dispatch(requestArchive(criterias));
        service.delegate.onMessageReceived = (msg) => dispatch(messageReceived(msg));
        service.requestArchive(criterias);
    }

}

//export function processLogin(username, password){
//    return dispatch => {
//        dispatch(requestLogin(username, password));
//        service.login(username, password).then(data=>dispatch(connected(data)),error=>dispatch(authfail(error)));
//    };
//}
