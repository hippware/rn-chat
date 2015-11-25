import {REQUEST_LOGIN, ROSTER_RECEIVED, CONNECTED, DISCONNECTED, AUTHFAIL} from '../actions/xmpp/xmpp';

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
        case ROSTER_RECEIVED:
            return { roster: action.list };
        default:
            return state;
    }
}