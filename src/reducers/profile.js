import {LOGIN_SUCCESS, LOGOUT_REQUEST, LOGIN_ERROR, LOGIN_REQUEST, PROFILE_UPDATE_ERROR, FILE_UPLOAD_SUCCESS, PROFILE_SUCCESS,
    PROFILE_UPDATE_SUCCESS, FILE_DOWNLOAD_SUCCESS, FILE_UPLOAD_REQUEST} from '../actions';

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
export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, error: undefined, ...action.response, displayName:displayName(state, action.response)};

        case LOGIN_ERROR:
            return {error: action.error, sessionID: undefined, uuid: undefined};

        case PROFILE_SUCCESS:
            if (action.own){
                return {...state, ...action.data, displayName:displayName(state, action.data)};
            }
        case FILE_UPLOAD_REQUEST:
            if (action.avatar){
                return {...state, avatarPath: action.file};
            }

        case FILE_DOWNLOAD_SUCCESS:
            // check if file is own avatar
            if (action.own){
                return {...state, avatarPath: {uri: action.path}};
            }

        case PROFILE_UPDATE_SUCCESS:
            return {...state, ...action.data, error: undefined, displayName:displayName(state, action.data)};

        case PROFILE_UPDATE_ERROR:
            return {...state, error: action.error};

        case LOGOUT_REQUEST:
            return {error: undefined};
        default:
            return state;
    }


}