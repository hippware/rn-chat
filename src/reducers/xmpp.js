import {CONNECTED, DISCONNECTED, LOGIN, SUCCESS} from '../actions';
import xmpp from '../services/xmpp/xmpp';
import {run} from '../API';
import assert from 'assert';

export default function* reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN+SUCCESS:
            assert(action.data.uuid, "No user is defined for login success action");
            assert(action.data.sessionID, "No token is defined for login success action");
            assert(action.data.server, "No server is defined for login success action");
            yield run(xmpp.login, {username: action.data.uuid, password:action.data.sessionID, server:action.data.server});
            return {connected: false};
        case DISCONNECTED:
            return {connected: false};
        case CONNECTED:
            return {connected: true};
        default:
            return state;
    }
}