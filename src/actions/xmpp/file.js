import service from './../../services/xmpp/xmpp';

export const FILE_UPLOAD_REQUEST = 'REQUEST_FILE_UPLOAD';
export function fileUploadRequest(data){
    return { type: FILE_UPLOAD_REQUEST, data };
}

export const FILE_UPLOAD_RESPONSE = 'RESPONSE_FILE_UPLOAD';
export function fileUploadResponse(data){
    return { type: FILE_UPLOAD_RESPONSE, data };
}

export function processRequestUpload(data){
    return dispatch => {
        dispatch(fileUploadRequest(data));
        service.delegate.onUploadResponseReceived = (data)=>dispatch(fileUploadResponse(data));
        service.requestUpload(data);
//        xmpp.processLoginDispatch(dispatch, username, password, service);
        //service.delegate.onRosterReceived = (result)=> dispatch(rosterReceived(result));
        //service.delegate.onSubscribeRequest = (user) => dispatch(subscribeRequestReceived(user));
        //service.delegate.onPresenceUpdate = (user, status) => dispatch(presenceUpdateReceived(user, status));
    }
}

