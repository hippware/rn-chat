import service from '../services/LocationService';

export const SET_LOCATION = 'SET_LOCATION';
export function setLocationRequest(latitude, longitude){
    return {type: SET_LOCATION, latitude, longitude};
}

export const SET_DATE = 'SET_DATE';
export function setDateRequest(date){
    return {type: SET_DATE, date};
}

export const SET_IS_DAY = 'SET_IS_DAY';
export function setIsDay(isDay){
    return {type: SET_IS_DAY, isDay};
}

export function setDate(date){
    return dispatch => {
        service.delegate = {
            onDayChange: (isDay)=> dispatch(setIsDay(isDay))
        };
        dispatch(setDateRequest(date));
        service.setDate(date);
    }
}


export function setLocation(latitude, longitude){
    return dispatch => {
        service.delegate = {
            onDayChange: (isDay)=> dispatch(setIsDay(isDay))
        };
        dispatch(setLocationRequest(latitude, longitude));
        service.setLocation(latitude, longitude);
    }
}

