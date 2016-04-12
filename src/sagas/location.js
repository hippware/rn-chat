import { takeEvery, takeLatest } from 'redux-saga'
import { fork, put, take, call } from 'redux-saga/effects'
import * as actions from '../actions/location';
import service from '../services/LocationService';
import * as xmpp from '../actions/xmpp/xmpp';
import * as profile from '../actions/profile';

function* watchDayChange(){
    while (true){
        const isDay = yield service.receiveDayChange();
        yield put({isDay, type: actions.SET_IS_DAY});
    }
}

function* watchPositionChange(){
    while (true){
        try {
            const position = yield service.receivePosition();
            yield put({...position, type: actions.SET_LOCATION});
        } catch (error){
            console.log("POSITION ERROR", error);
        }
    }
}

export default function* root() {
    yield [
        fork(watchDayChange),
        fork(watchPositionChange),
        fork(function *(){yield* takeEvery(xmpp.CONNECTED, function*(){ service.observe()})}),
        fork(function *(){yield* takeEvery(xmpp.DISCONNECTED, function*(){ service.stop()})}),
    ]
}
