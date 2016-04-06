export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export function login(data){
    return {type: LOGIN_REQUEST, ...data}
}
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export function logout(data){
    return {type: LOGOUT_REQUEST, ...data};
}
export const PROFILE_REQUEST = "PROFILE_REQUEST";
export function profileRequest(user, fields){
    return {type: PROFILE_REQUEST, user, fields};
}
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const PROFILE_UPDATE_REQUEST = "PROFILE_UPDATE_REQUEST";
export function profileUpdate(user, fields){
    return {type: PROFILE_UPDATE_REQUEST, user, fields};
}
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_UPDATE_ERROR = "PROFILE_UPDATE_ERROR";
