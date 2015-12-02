import {ROSTER_RECEIVED, REMOVE_ROSTER_ITEM_REQUEST, REQUEST_SUBSCRIBE} from '../actions/xmpp/xmpp';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case ROSTER_RECEIVED:
            return { roster: action.list };
        default:
            return state;
    }
}