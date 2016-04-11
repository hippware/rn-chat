import { fork } from 'redux-saga/effects'
import message from './message';
import profile from './profile';
import file from './file';
import roster from './roster';
import xmpp from './xmpp';
import location from './location';

export default function* root() {
    yield [
        fork(message),
        fork(profile),
        fork(xmpp),
        fork(file),
        fork(roster),
        fork(location),
    ]
}
