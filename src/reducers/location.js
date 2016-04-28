import {CONNECTED, DISCONNECTED, SET_IS_DAY, SET_LOCATION} from '../actions';
import API, {run} from '../API';
import location from '../services/LocationService';
const FOCUS_ACTION = 'focus';
const HOME_PAGE = 'home';
export default function* reducer(state = {isDay: true, fullMap: false}, action) {
  switch (action.type) {
    //case FOCUS_ACTION:
    //  if (action.key === HOME_PAGE){
    //    yield run(location.observe);
    //  } else {
    //    yield run(location.stop);
    //  }
    //  return state;
    //
    case CONNECTED:
      yield run(location.observe);
      return state;

    case DISCONNECTED:
      yield run(location.stop);
      return state;

    case SET_IS_DAY:
      console.log("SET IS DAY:", action);
      return {...state, isDay: action.isDay};
    case SET_LOCATION:
      return {...state, longitude: action.longitude, latitude: action.latitude, heading:action.heading};
    default:
      return state;
  }


}