import user from '../services/UserService';
import profile from '../services/xmpp/profile';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_REQUEST = "LOGIN_REQUEST";

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_ERROR = "PROFILE_ERROR";

export const PROFILE_UPDATE_REQUEST = "PROFILE_UPDATE_REQUEST";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_UPDATE_ERROR = "PROFILE_UPDATE_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export function loginAPI(dispatch, data){
    return user.login(data).then(response=>dispatch({type:LOGIN_SUCCESS, response})).catch(error=>dispatch({type:LOGIN_ERROR, error}));
}

export function profileRequestAPI(dispatch, user, fields){
    return profile.requestProfile(user, fields).then(data=>dispatch({type:PROFILE_SUCCESS, data})).catch(error=>dispatch({type:PROFILE_ERROR, error}));
}

export function updateProfileAPI(dispatch, user, fields){
    return profile.updateProfile(user, fields).then(data=>dispatch({type:PROFILE_UPDATE_SUCCESS, data})).catch(error=>dispatch({type:PROFILE_UPDATE_ERROR, error}));
}

export function logoutAPI(dispatch, data){
    return user.logout(data).then(response=>dispatch({type:LOGOUT_SUCCESS})).catch(error=>dispatch({type:LOGOUT_ERROR, error}));
}

export function login(data){
    return {type: LOGIN_REQUEST, ...data}
}
export function logout(data){
    return {type: LOGOUT_REQUEST, ...data};
}
export function profileRequest(user, fields){
    return {type: PROFILE_REQUEST, user, fields};
}
export function profileUpdate(user, fields){
    return {type: PROFILE_UPDATE_REQUEST, user, fields};
}