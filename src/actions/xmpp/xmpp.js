import service from './../../services/xmpp';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export function requestLogin(username, password){
    return { type: REQUEST_LOGIN, username, password };
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
        } else {
            console.log("XMPP is not connected!");
        }
    }
}

export function disconnect(){
    return dispatch => {
        dispatch(requestDisconnect());
        service.disconnect();
    }

}

export function processLoginDispatch(dispatch, username, password, service){
    dispatch(requestLogin(username, password));
    service.onConnected = () => dispatch(connected());
    service.onDisconnected = () => dispatch(disconnected());
    service.onAuthFail = (error) => dispatch(authfail(error));
    service.onMessage = (msg) => dispatch(messageReceived(msg));
    service.login(username, password);
}

export function processLogin(username, password) {
    return dispatch => processLoginDispatch(dispatch, username, password, service);
}

