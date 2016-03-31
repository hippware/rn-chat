import {AUTH_ERROR_SHOWN, REQUEST_ARCHIVE, REQUEST_LOGIN, REQUEST_DISCONNECT, CONNECTED, DISCONNECTED, AUTHFAIL} from '../actions/xmpp/xmpp';

export default function reducer(state = {nodes:{}}, action) {
    switch (action.type) {
        case REQUEST_ARCHIVE:
            return {...state, archiveRequested: true};
        case AUTH_ERROR_SHOWN:
            return {...state, authfail: false, error: null};
        case REQUEST_LOGIN:
            return {connecting: true, authfail: false};
        case REQUEST_DISCONNECT:
            return {disconnecting: true};
        case CONNECTED:
            return {connected: true, authfail: false};
        case DISCONNECTED:
            return {connected: false};
        case AUTHFAIL:
            return {connected: false, authfail: true, error: action.error};
        default:
            return state;
    }
}