import { takeEvery, takeLatest } from 'redux-saga'
import { fork, put, take, call } from 'redux-saga/effects'
import * as xmpp from '../actions/xmpp/xmpp';
import * as actions from '../actions/xmpp/roster';
import roster from '../services/xmpp/roster';
import * as profile from '../actions/profile';

function* watchIncomingPresences(){
    while (true){
        const presence = yield roster.receivePresence();
        if (presence.type === 'subscribe'){
            yield put({...presence, type: actions.SUBSCRIBE_REQUEST_RECEIVED});
        } else if (!presence.own){
            yield put({...presence, type: actions.PRESENCE_UPDATE_RECEIVED});
        }
    }
}

export default function* root() {
    yield [
        fork(watchIncomingPresences),
        fork(function *(){yield* takeEvery(xmpp.CONNECTED, function*(){ const list = yield roster.requestRoster();yield put(actions.rosterReceived(list))})}),
        fork(function *(){yield* takeEvery(actions.REQUEST_AUTHORIZE, function*({user}){ roster.authorize(user)})}),
        fork(function *(){yield* takeEvery(actions.REQUEST_UNAUTHORIZE, function*({user}){ roster.unauthorize(user)})}),
        fork(function *(){yield* takeEvery(actions.REQUEST_SUBSCRIBE, function*({user}){ roster.subscribe(user)})}),
        fork(function *(){yield* takeEvery(actions.REQUEST_UNSUBSCRIBE, function*({user}){ roster.unsubscribe(user)})}),
        fork(function *(){yield* takeEvery(actions.REMOVE_ROSTER_ITEM_REQUEST, function*({user}){ roster.removeFromRoster(user)})}),
    ]
}
