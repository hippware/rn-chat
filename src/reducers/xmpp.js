import { sideEffect } from 'redux-side-effects';
import {CONNECTED, DISCONNECTED, _disconnect, _connect} from '../actions/xmpp/xmpp';
import {LOGIN_SUCCESS, LOGOUT_REQUEST} from '../actions/profile';

export default function* reducer(state = {}, action) {
    switch (action.type) {
        case DISCONNECTED:
            return {connected: false};
        case CONNECTED:
            return {connected: true};
        case LOGOUT_REQUEST:
            yield sideEffect(_disconnect);
            return state;
        case LOGIN_SUCCESS:
            yield sideEffect(_connect, action.response.uuid, action.response.sessionID);
            return state;
        default:
            return state;
    }
}