import {PHONE_VERIFIED} from '../actions/registration';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case PHONE_VERIFIED:
            return {phone: action.response};
        default:
            return state;
    }


}