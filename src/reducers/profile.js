import { sideEffect } from 'redux-side-effects';
import {LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_ERROR, PROFILE_ERROR, LOGIN_REQUEST, PROFILE_REQUEST, PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_ERROR, PROFILE_SUCCESS, PROFILE_UPDATE_SUCCESS, LOGOUT_REQUEST, loginAPI, logoutAPI, profileRequestAPI, updateProfileAPI} from '../actions/profile';

import {FILE_UPLOAD_SUCCESS, FILE_UPLOAD_ERROR, FILE_DOWNLOAD_SUCCESS, FILE_UPLOAD_REQUEST, downloadFileAPI, uploadFileAPI} from '../actions/xmpp/file';
import {CONNECTED} from '../actions/xmpp/xmpp';


function displayName(state, {firstName, lastName, handle}){
    if (firstName && lastName){
        return firstName+" "+lastName;
    } else if (firstName){
        return firstName;
    } else if (lastName){
        return lastName;
    } else if (handle){
        return handle;
    } else {
        return state.displayName
    }
}
export default function* reducer(state = {}, action) {
    switch (action.type) {
        case CONNECTED:
            yield sideEffect(profileRequestAPI);
            return state;

        case LOGIN_REQUEST:
            yield sideEffect(loginAPI, action);
            return state;

        case LOGIN_SUCCESS:
            return {...state, error: undefined, ...action.response, displayName:displayName(state, action.response)};

        case LOGIN_ERROR:
            return {...state, error: action.error, sessionID: undefined, uuid: undefined};

        case PROFILE_REQUEST:
            yield sideEffect(profileRequestAPI, action.user, action.fields);
            return state;

        case PROFILE_SUCCESS:
            if (action.data.avatar){
                yield sideEffect(downloadFileAPI, action.data);
            }
            if (action.data.own){
                return {...state, ...action.data, displayName:displayName(state, action.data)};
            }
            return state;
        case FILE_UPLOAD_REQUEST:
            if (action.avatar){
                yield sideEffect(uploadFileAPI, action);
                return {...state, avatarPath: action.file};
            }
            return state;
        case FILE_UPLOAD_SUCCESS:
            if (action.avatar){
                yield sideEffect(updateProfileAPI, undefined, {avatar:action.data.referenceURL});
            }
            return state;
        case FILE_UPLOAD_ERROR:
            if (action.avatar){
                return {...state, avatarPath: undefined, error:action.error};
            }
            return state;

        case PROFILE_UPDATE_REQUEST:
            yield sideEffect(updateProfileAPI, action.user, action.fields);
            return state;

        case PROFILE_UPDATE_SUCCESS:
            return {...state, ...action.data, error: undefined, displayName:displayName(state, action.data)};

        case PROFILE_UPDATE_ERROR:
            return {...state, error: action.error};

        case LOGOUT_REQUEST:
            yield sideEffect(logoutAPI, action);
            return {error: undefined};
        default:
            return state;
    }


}