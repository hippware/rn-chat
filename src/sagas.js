import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import xmpp from './services/xmpp/xmpp';
import user from './services/UserService';
import profile from './services/xmpp/profile';
import file from './services/xmpp/file';
import * as actions from './actions';

function *watchProfileRequest(){
    while (true) {
        let {user, fields } = yield take(actions.PROFILE_REQUEST);
        try {
            const data = yield profile.requestProfile(user, fields);
            yield put({type: actions.PROFILE_SUCCESS, data});
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
        } catch (error) {
            yield put({type: actions.PROFILE_ERROR, error});
        }
    }
}

function *updateProfile({user, fields}){
    try {
        const data = yield profile.updateProfile(user, fields);
        yield put({type: actions.PROFILE_UPDATE_SUCCESS, data});
    } catch (error){
        yield put({type: actions.PROFILE_UPDATE_ERROR, error});
    }
}

function* uploadFile(params){
    try {
        const data = yield file.requestUpload(params);
        yield put({type: actions.FILE_UPLOAD_SUCCESS, data});
        // if it is avatar, update profile
        if (params.avatar){
            yield put({type: actions.PROFILE_UPDATE_REQUEST, fields:{avatar:data.referenceURL}});
        }
    } catch (error){
        console.log("UPLOAD FILE ERROR", error);
        yield put({type: actions.FILE_UPLOAD_ERROR, error});
    }
}

function* watchLogin(){
    while (true) {
        const login = yield take(actions.LOGIN_REQUEST);
        try {
            const response = yield user.login(login);
            yield put({type: actions.LOGIN_SUCCESS, response});
            console.log("LOGIN TO XMPP SERVER");

            // login to xmpp server
            yield xmpp.login(response.uuid, response.sessionID);

            // get fresh own user data
            yield put({type:actions.PROFILE_REQUEST, fields:['avatar','handle','firstName','lastName','email']});

        } catch (error) {
            yield put({type: actions.LOGIN_ERROR, error});
        }

        yield take(actions.LOGOUT_REQUEST);
        // ... perform the logout logic
    }
}

export default function* root() {
    yield [
        fork(watchLogin),
        fork(function *(){yield* takeEvery(actions.LOGOUT_REQUEST, function*(data){yield xmpp.disconnect();yield user.logout(data)})}),
        fork(watchProfileRequest),
        fork(function *(){yield* takeEvery(actions.PROFILE_UPDATE_REQUEST, updateProfile)}),
        fork(function *(){yield* takeEvery(actions.FILE_UPLOAD_REQUEST, uploadFile)}),
    ]
}
