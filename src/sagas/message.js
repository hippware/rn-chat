import { takeEvery, takeLatest } from 'redux-saga'
import { fork, put, take, call } from 'redux-saga/effects'
import xmpp from '../services/xmpp/xmpp';
import * as actions from '../actions/xmpp/message';
import message from '../services/xmpp/message';
import * as profile from '../actions/profile';

function* watchIncomingMessages(){
    while (true){
        const msg = yield message.receiveMessage();
        if (msg.body){
            yield put({type: actions.MESSAGE_RECEIVED, msg});
        } else if (msg.composing){
            yield put({type: actions.MESSAGE_COMPOSING, user:msg.from});
        } else if (msg.paused){
            yield put({type: actions.MESSAGE_PAUSED, user:msg.from});
        }

    }
}
function* sendMessage({msg}){
    try {
        const identMsg = Object.assign({}, msg, {id: msg.id || 's'+Date.now()});
        yield xmpp.sendMessage(identMsg);
        yield put({type: actions.MESSAGE_SENT, msg:identMsg});
    } catch (error){
        console.log("MESSAGE ERROR", error);
        yield put({type: actions.MESSAGE_ERROR, error});
    }
}

function* requestArchive(data){
    yield message.requestArchive(data);
}

export default function* root() {
    yield [
        fork(watchIncomingMessages),
        fork(function *(){yield* takeEvery(actions.MESSAGE_COMPOSING_REQUEST, function*({username}){ yield message.composing(username)})}),
        fork(function *(){yield* takeEvery(actions.MESSAGE_REQUEST, sendMessage)}),
        fork(function *(){yield* takeEvery(actions.REQUEST_ARCHIVE, requestArchive)}),
    ]
}
