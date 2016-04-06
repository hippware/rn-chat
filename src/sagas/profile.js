import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from '../../node_modules/redux-saga/effects'
import xmpp from '../services/xmpp/xmpp';
import user from '../services/UserService';
import profile from '../services/xmpp/profile';
import file from '../services/xmpp/file';
import * as actions from '../actions/profile';

function *watchProfileRequest(){
    while (true) {
        let {user, fields } = yield take(actions.PROFILE_REQUEST);
        try {
            const data = yield profile.requestProfile(user, fields);
            yield put({type: actions.PROFILE_SUCCESS, data});
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

function* watchLogin(){
    while (true) {
        const login = yield take(actions.LOGIN_REQUEST);
        try {
            const response = yield user.login(login);
            // login to xmpp server
            yield xmpp.login(response.uuid, response.sessionID);

            yield put({type: actions.LOGIN_SUCCESS, response});

            // get fresh own user data
            //yield put({type:actions.PROFILE_REQUEST, fields:['avatar','handle','firstName','lastName','email']});

        } catch (error) {
            yield put({type: actions.LOGIN_ERROR, error});
        }
    }
}

function* watchLogout(){
    while (true) {
        const data = yield take(actions.LOGOUT_REQUEST);
        try {
            yield xmpp.disconnect();
            yield user.logout(data);
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

