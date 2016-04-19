import {ENABLE_FULL_MAP_MODE, DISABLE_FULL_MAP_MODE, SET_IS_DAY, SET_LOCATION, receiveDayChangeAPI, receivePositionAPI, observeAPI, stopAPI} from '../actions/location';
import { sideEffect } from 'redux-side-effects';
import {CONNECTED, DISCONNECTED} from '../actions/xmpp/xmpp';


export default function* reducer(state = {isDay: true, fullMap: false}, action) {
    switch (action.type) {
        case CONNECTED:
            yield sideEffect(receiveDayChangeAPI);
            yield sideEffect(receivePositionAPI);
            yield sideEffect(observeAPI);
            return state;

        case DISCONNECTED:
            yield sideEffect(stopAPI);
            return state;

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