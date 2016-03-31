import {PROFILE_REQUEST, PROFILE_RESPONSE} from '../actions/xmpp/profile';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case PROFILE_REQUEST:
            let profile = {};
            profile[action.user] = {pending: true};
            return {...state, ...profile};

        case PROFILE_RESPONSE:
            profile = {};
            profile[action.data.node] = action.data;
            return {...state, ...profile};
        default:
            return state;
    }


}