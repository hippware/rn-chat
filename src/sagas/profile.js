import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from '../../node_modules/redux-saga/effects'
import user from '../services/UserService';
import profile from '../services/xmpp/profile';
import file from '../services/xmpp/file';
import * as actions from '../actions/profile';

function *watchProfileRequest(){
    while (true) {
        let {user, fields } = yield take(actions.PROFILE_REQUEST);
        try {
            const data = yield profile.requestProfile(user, fields);
            console.log("put PROFILE_SUCCESS", data);
            yield put({type: actions.PROFILE_SUCCESS, data});
            if (data.cached){
                // if data is cached, check latest one from network
                const newer = yield profile.requestProfile(user, fields, true);
                console.log("CACHED DATA, latest is", newer);
                yield put({type: actions.PROFILE_SUCCESS, data:newer});
            }
        } catch (error) {
            console.log("PROFILE ERROR", error, error.stack);
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

function* watchLogin(){
    while (true) {
        const login = yield take(actions.LOGIN_REQUEST);
        try {
            const response = yield user.login(login);
            yield put({type: actions.LOGIN_SUCCESS, response});
        } catch (error) {
            console.log("LOGIN ERROR:", error);
            yield put({type: actions.LOGIN_ERROR, error});
        }
    }
}

function* watchLogout(){
    while (true) {
        const data = yield take(actions.LOGOUT_REQUEST);
        const {type, ...otherProps} = data;
        try {
            yield user.logout(otherProps);
            yield put({type: actions.LOGOUT_SUCCESS});
        } catch (error){
            yield put({type: actions.LOGOUT_ERROR, error});
        }
    }
}

export default function* root() {
    yield [
        fork(watchLogin),
        fork(watchLogout),
        fork(watchProfileRequest),
        fork(function *(){yield* takeEvery(actions.PROFILE_UPDATE_REQUEST, updateProfile)}),
    ]
}

