import {ENABLE_FULL_MAP_MODE, DISABLE_FULL_MAP_MODE, SET_IS_DAY, SET_LOCATION} from '../actions';

export default function reducer(state = {isDay: true, fullMap: false}, action) {
    switch (action.type) {
        case ENABLE_FULL_MAP_MODE:
            return {...state, fullMap: true};
        case DISABLE_FULL_MAP_MODE:
            return {...state, fullMap: false};
        case SET_IS_DAY:
            console.log("SET IS DAY:", action);
            return {...state, isDay: action.isDay};
        case SET_LOCATION:
            return {...state, longitude: action.longitude, latitude: action.latitude, heading:action.heading};
        default:
            return state;
    }


}