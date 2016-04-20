import {CONNECTED, DISCONNECTED, LOGIN, SUCCESS} from '../actions';
import xmpp from '../services/xmpp/xmpp';
import {run} from '../API';

export default function* reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN+SUCCESS:
            yield run(xmpp.login, {username: action.data.uuid, password:action.data.sessionID});
            return {connected: false};
        case DISCONNECTED:
            return {connected: false};
        case CONNECTED:
            return {connected: true};
        default:
            return state;
    }
}