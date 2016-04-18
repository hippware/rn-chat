import * as actions from '../actions';
import {SUCCESS, ERROR, PROFILE, PROFILE_UPDATE, FILE_UPLOAD, LOGIN, LOGOUT} from '../actions';
import API, {run} from '../API';

export default function* reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            yield run(API.login, action);
            return state;

        case LOGIN+SUCCESS:
            yield run(API.requestProfile, {type: PROFILE, user: action.data.uuid});
            return {...state, error: undefined, ...action.data};

        case LOGIN+ERROR:
            return {...state, error: action.error, sessionID: undefined, uuid: undefined};

        case PROFILE:
            yield run(API.requestProfile, action);
            return state;

        case PROFILE+SUCCESS:
            return action.data.own ? {...state, ...action.data} : state;

        case FILE_UPLOAD:
            yield run(API.uploadFile, action);
            return {...state, avatarPath: action.file};

        case FILE_UPLOAD+ERROR:
            return {...state, avatarPath: undefined, error:action.error};

        case PROFILE_UPDATE:
            yield run(API.updateProfile, action);
            return state;

        case PROFILE_UPDATE+SUCCESS:
            return {...state, ...action.data, error: undefined};

        case PROFILE_UPDATE+ERROR:
            return {...state, error: action.error};

        case LOGOUT:
            yield run(API.logout, action);
            return {error: undefined};
        default:
            return state;
    }


}

