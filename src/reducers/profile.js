import {LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_ERROR, REGISTER_SUCCESS} from '../actions/profile';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            if (action.response.session){
                return {...state, session: action.response.session, digits:action.response};
            } else {
                return {phone: action.response.phoneNumber, digits:action.response};
            }
        case LOGIN_ERROR:
            return {error: action.error};

        case REGISTER_SUCCESS:
            return {...state, session: action.session};

        case REGISTER_ERROR:
            return {error: action.error};
        default:
            return state;
    }


}