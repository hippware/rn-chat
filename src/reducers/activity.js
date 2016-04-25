import {FILTER_ACTIVITIES, ALL, FRIENDS, NEARBY, TITLES} from '../actions';

export default function reducer(state = {mode: ALL, title: TITLES[ALL]}, action) {
  switch (action.type) {
    case FILTER_ACTIVITIES:
      return {...state, mode: action.mode, title: TITLES[action.mode]};
    default:
      return state;
  }


}