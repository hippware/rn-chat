import service from '../services/UserService';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(response){
    return {type: LOGIN_REQUEST, response}
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export function logoutRequest(){
    return {type: LOGOUT_REQUEST}
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export function loginSuccess(response){
    return {type: LOGIN_SUCCESS, response}
}

export const LOGIN_ERROR = "USER_LOGIN_ERROR";
export function loginError(error){
    return {type: LOGIN_ERROR, error}
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export function registerRequest(profile){
    return {type: REGISTER_REQUEST, ...profile}
}

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export function registerSuccess(response){
    return {type: REGISTER_SUCCESS, response}
}

export const REGISTER_ERROR = "REGISTER_ERROR";
export function registerError(error){
    return {type: REGISTER_ERROR, error}
}

export function processLogin(response){
    return dispatch => {
        dispatch(loginRequest(response));
        service.login(response).then(data=>dispatch(loginSuccess(data)),error=>dispatch(loginError(error)));
    }
}

export function processLogout(response){
    return dispatch => {
        dispatch(logoutRequest(response));
        service.logout(response);
    }
}

export function processRegistration(profile){
    return dispatch => {
        dispatch(registerRequest(profile));
        service.register(profile).then(data=>dispatch(registerSuccess(data)), error=>dispatch(registerError(error)));
    }
}

