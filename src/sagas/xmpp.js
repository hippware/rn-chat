import { takeEvery, takeLatest } from 'redux-saga'
import { fork, put, take, call } from 'redux-saga/effects'
import xmpp from '../services/xmpp/xmpp';
import * as actions from '../actions/xmpp/roster';
import roster from '../services/xmpp/roster';
import * as profile from '../actions/profile';
import {CONNECTED, DISCONNECTED} from '../actions/xmpp/xmpp';

function* watchLogin({response}) {
    // login to xmpp server
    try {
        yield xmpp.login(response.uuid, response.sessionID);
        console.log("XMPP CONNECTED!", xmpp.username);
        yield put({response, type: CONNECTED});

        // request own fresh profile
        yield put(profile.profileRequest());
    } catch (error){
        console.log(error);
    }

}

export default function* root() {
    yield [
        fork(function *(){yield* takeEvery(profile.LOGIN_SUCCESS, watchLogin)}),
        fork(function *(){yield* takeEvery(profile.LOGOUT_REQUEST, function*(){ yield xmpp.disconnect();yield put({type: DISCONNECTED})})}),
    ]
}
