import {REQUEST_LOGIN, REQUEST_DISCONNECT, CONNECTED, DISCONNECTED, AUTHFAIL} from '../actions/xmpp/xmpp';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {connecting: true};
        case REQUEST_DISCONNECT:
            return {disconnecting: true};
        case CONNECTED:
            return {connected: true};
        case DISCONNECTED:
            return {connected: false};
        case AUTHFAIL:
            return {connected: false, authfail: true};
        default:
            return state;
    }
}