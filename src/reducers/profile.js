import {LOGIN_SUCCESS, LOGOUT_REQUEST, LOGIN_ERROR, LOGIN_REQUEST, PROFILE_UPDATE_ERROR, PROFILE_SUCCESS, PROFILE_UPDATE_SUCCESS} from '../actions';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            if (action.response.sessionID){
                return {...state, error: undefined, ...action.response};
            } else {
                return {error: action.error};
            }
        case LOGIN_ERROR:
            return {error: action.error, sessionID: undefined, uuid: undefined};

        case PROFILE_SUCCESS:
            if (action.own){
                return {...state, ...action.data};
            } else {
                return state;
            }
        case PROFILE_UPDATE_SUCCESS:
            return {...state, ...action.data};

        case PROFILE_UPDATE_ERROR:
            return {...state, error: action.error};

        case LOGOUT_REQUEST:
            return {error: undefined};
        default:
            return state;
    }


}