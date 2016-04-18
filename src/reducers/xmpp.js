import {CONNECTED, DISCONNECTED} from '../actions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case DISCONNECTED:
            return {connected: false};
        case CONNECTED:
            return {connected: true};
        default:
            return state;
    }
}