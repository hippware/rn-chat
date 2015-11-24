import {REQUEST_LOGIN, CONNECTED, DISCONNECTED, AUTHFAIL} from '../actions/xmpp';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {connecting: true};
        case CONNECTED:
            return {connected: true, connecting: false};
        case DISCONNECTED:
            return {connected: false};
        case AUTHFAIL:
            return {connected: false, authfail: true, connecting: false};
        default:
            return state;
    }
}