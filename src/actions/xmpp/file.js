import service from './../../services/xmpp/xmpp';

export const REQUEST_FILE_UPLOAD = 'REQUEST_FILE_UPLOAD';
export function requestFileUpload(data){
    return { type: REQUEST_FILE_UPLOAD, data };
}

export function processRequestUpload(data){
    return dispatch => {
        dispatch(requestFileUpload(data));
        service.requestUpload(data);
//        xmpp.processLoginDispatch(dispatch, username, password, service);
        //service.delegate.onRosterReceived = (result)=> dispatch(rosterReceived(result));
        //service.delegate.onSubscribeRequest = (user) => dispatch(subscribeRequestReceived(user));
        //service.delegate.onPresenceUpdate = (user, status) => dispatch(presenceUpdateReceived(user, status));
    }
}

