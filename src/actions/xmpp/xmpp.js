import xmpp from '../../services/xmpp/xmpp';
export const CONNECTED = 'XMPP_CONNECTED';
export const DISCONNECTED = 'XMPP_DISCONNECTED';
export const ERROR = 'XMPP_ERROR';

export function _connect(dispatch, username, password){
    return xmpp.login(username, password).then(response=>dispatch({type:CONNECTED, username, password})).catch(error=>dispatch({type:DISCONNECTED, error}));
}

export function _disconnect(dispatch){
    return xmpp.disconnect().then(()=>dispatch({type:DISCONNECTED}));
}

