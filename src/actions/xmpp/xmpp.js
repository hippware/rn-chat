import service from './../../services/xmpp';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export function requestLogin(){
    return { type: REQUEST_LOGIN };
}

export const CONNECTED = 'CONNECTED';
export function connected(){
    return { type: CONNECTED }
}

export const DISCONNECTED = 'DISCONNECTED';
export function disconnected(){
    return { type: DISCONNECTED }
}

export const AUTHFAIL = 'AUTHFAIL';
export function authfail(){
    return { type: AUTHFAIL }
}

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export function messageReceived(msg){
    return { type: MESSAGE_RECEIVED, msg}
}

export const MESSAGE_SENT = 'SEND_MESSAGE_REQUEST';
export function messageSent(msg){
    return {type: MESSAGE_SENT, msg};
}

export const READ_ALL_MESSAGES = 'READ_ALL_MESSAGES';
export function readAllMessages(username){
    return { type: READ_ALL_MESSAGES, username }
}



export function sendMessage(msg){
    return dispatch => {
        if (service.isConnected){
            const identMsg = Object.assign({}, msg, {id: 's'+Date.now()});
            dispatch(messageSent(identMsg));
            service.sendMessage(identMsg);
        }
    }
}

export function disconnect(){
    return dispatch => {
        service.onDisconnected = () => dispatch(disconnected());
        service.disconnect();
    }

}
export function processLogin(username, password) {
    return dispatch => {
        dispatch(requestLogin());
        service.onConnected = () => dispatch(connected());
        service.onDisconnected = () => dispatch(disconnected());
        service.onAuthFail = () => dispatch(authfail());
        service.onMessage = (msg) => dispatch(messageReceived(msg));
        service.login(username, password);
    }
}

