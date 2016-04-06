export const FILE_UPLOAD_REQUEST = "FILE_UPLOAD_REQUEST";
export const FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS";
export const FILE_UPLOAD_ERROR = "FILE_UPLOAD_ERROR";
export const FILE_DOWNLOAD_SUCCESS = "FILE_DOWNLOAD_SUCCESS";
export const FILE_DOWNLOAD_ERROR = "FILE_DOWNLOAD_ERROR";

export function upload(data){
    return {type: FILE_UPLOAD_REQUEST, ...data};
}