import file from '../../services/xmpp/file';

export const FILE_UPLOAD_REQUEST = "FILE_UPLOAD_REQUEST";
export const FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS";
export const FILE_UPLOAD_ERROR = "FILE_UPLOAD_ERROR";
export const FILE_DOWNLOAD_SUCCESS = "FILE_DOWNLOAD_SUCCESS";
export const FILE_DOWNLOAD_ERROR = "FILE_DOWNLOAD_ERROR";


export function upload(data){
    return {type: FILE_UPLOAD_REQUEST, ...data};
}

export function downloadFileAPI(dispatch, data){
    return file.requestDownload(data.avatar).then(path=>dispatch({type: FILE_DOWNLOAD_SUCCESS, ...data, path})).catch(error=>dispatch({type:FILE_DOWNLOAD_ERROR, error}));
}

export function uploadFileAPI(dispatch, params){
    return file.requestUpload(params).then(data=>dispatch({type: FILE_UPLOAD_SUCCESS, data, avatar:params.avatar})).catch(error=>dispatch({...params, error, type: FILE_UPLOAD_ERROR}));
}

