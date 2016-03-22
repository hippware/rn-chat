import {SET_IS_DAY, SET_LOCATION} from '../actions/location';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_IS_DAY:
            return {...state, isDay: action.isDay};
        case SET_LOCATION:
            return {...state, longitude: action.longitude, latitude: action.latitude, heading:action.heading};
        default:
            return state;
    }


}