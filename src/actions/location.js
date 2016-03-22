import service from '../services/LocationService';

export const SET_LOCATION = 'SET_LOCATION';
export function setLocation(position){
    return { ...position, type: SET_LOCATION};
}

export const SET_IS_DAY = 'SET_IS_DAY';
export function setIsDay(isDay){
    return {type: SET_IS_DAY, isDay};
}

export function subscribe(){
    return dispatch => {
        service.stop();
        service.delegate = {
            onDayChange: (isDay)=> dispatch(setIsDay(isDay)),
            onLocationChange: (position) => dispatch(setLocation(position))
        };
        service.observe();
    }
}

