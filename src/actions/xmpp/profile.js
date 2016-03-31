import service from './../../services/xmpp/xmpp';

export const PROFILE_REQUEST = 'REQUEST_PROFILE';
export function profileRequest(user){
    return { type: PROFILE_REQUEST, user};
}

export const PROFILE_UPDATE_REQUEST = 'REQUEST_PROFILE_UPDATE';
export function profileUpdateRequest(user, data){
    return { type: PROFILE_UPDATE_REQUEST, user, data};
}

export const PROFILE_RESPONSE = 'RESPONSE_PROFILE';
export function profileResponse(data){
    return { type: PROFILE_RESPONSE, data };
}

export const PROFILE_UPDATE_RESPONSE = 'RESPONSE_UPDATE_PROFILE';
export function profileUpdateResponse(data){
    return { type: PROFILE_UPDATE_RESPONSE, data };
}

export function processProfileRequest(user, fields = ['handle','avatar']){
    return dispatch => {
        dispatch(profileRequest(user));
        service.delegate.onUserProfileReceived = (data)=>dispatch(profileResponse(data));
        service.requestProfile(user, fields);
    }
}

export function processProfileUpdateRequest(user, data){
    return dispatch => {
        dispatch(profileUpdateRequest(user, data));
        service.delegate.onUserProfileUpdateReceived = (data)=>dispatch(profileUpdateResponse(data));
        service.updateProfile(user, data);
    }
}

