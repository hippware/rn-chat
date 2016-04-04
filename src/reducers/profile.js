import {LOGIN_SUCCESS, LOGOUT_REQUEST, LOGIN_ERROR, LOGIN_REQUEST, REGISTER_ERROR, REGISTER_SUCCESS} from '../actions/profile';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...action};
        case LOGIN_SUCCESS:
            if (action.response.sessionID){
                return {...state, error: undefined, ...action.response};
            } else {
                return {error: action.error};
            }
        case LOGIN_ERROR:
            return {error: action.error, sessionID: undefined};

        case REGISTER_SUCCESS:
            return {...state, ...action.response, error: undefined};

        case REGISTER_ERROR:
            return {...state, error: action.error, sessionID: undefined};

        case LOGOUT_REQUEST:
            return {error: undefined};
        default:
            return state;
    }


}