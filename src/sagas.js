import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import xmpp from './services/xmpp/xmpp';
import user from './services/UserService';
import profile from './services/xmpp/profile';
import * as actions from './actions';

function *requestProfile({user, fields}){
    try {
        const data = yield profile.requestProfile(user, fields);
        yield put({type:actions.PROFILE_SUCCESS, data});
    } catch (error){
        yield put({type: actions.PROFILE_ERROR, error});
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
        fork(function *(){yield* takeEvery(actions.PROFILE_REQUEST, requestProfile)}),
        fork(function *(){yield* takeEvery(actions.PROFILE_UPDATE_REQUEST, updateProfile)}),
    ]
}
