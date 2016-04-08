import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from '../../node_modules/redux-saga/effects'
import xmpp from '../services/xmpp/xmpp';
import user from '../services/UserService';
import profile from '../services/xmpp/profile';
import file from '../services/xmpp/file';
import * as actions from '../actions/xmpp/file';
import * as profileActions from '../actions/profile';

function* downloadFile({data}){
    // get avatar for profile
    if (data.avatar) {
        try {
            const path = yield file.requestDownload(data.avatar);
            yield put({type: actions.FILE_DOWNLOAD_SUCCESS, ...data, path});
        } catch (error) {
            console.log("DOWNLOAD FILE ERROR", error);
            yield put({type: actions.FILE_DOWNLOAD_ERROR, error});
        }
    }
}
function* uploadFile(params){
    // upload avatar for profile
    try {
        const data = yield file.requestUpload(params);
        yield put({type: actions.FILE_UPLOAD_SUCCESS, data});
        // if it is avatar, update profile
        if (params.avatar){
            yield put({type: profileActions.PROFILE_UPDATE_REQUEST, fields:{avatar:data.referenceURL}});
        }
    } catch (error){
        console.log("UPLOAD FILE ERROR", error);
        yield put({...params, error, type: actions.FILE_UPLOAD_ERROR});
    }
}

export default function* root() {
    yield [
        fork(function *(){yield* takeEvery(profileActions.PROFILE_SUCCESS, downloadFile)}),
        fork(function *(){yield* takeEvery(actions.FILE_UPLOAD_REQUEST, uploadFile)})
    ]
}
