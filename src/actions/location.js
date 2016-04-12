export const SET_LOCATION = 'SET_LOCATION';
export function setLocation(position){
    return { ...position, type: SET_LOCATION};
}

export const SET_IS_DAY = 'SET_IS_DAY';
export function setIsDay(isDay){
    return {type: SET_IS_DAY, isDay};
}

export const ENABLE_FULL_MAP_MODE = 'ENABLE_FULL_MAP_MODE';
export function enableFullMap(){
    return {type: ENABLE_FULL_MAP_MODE};
}

export const DISABLE_FULL_MAP_MODE = 'DISABLE_FULL_MAP_MODE';
export function disableFullMap(){
    return {type: DISABLE_FULL_MAP_MODE};
}

