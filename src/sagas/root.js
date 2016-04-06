import { fork } from 'redux-saga/effects'
import message from './message';
import profile from './profile';
import file from './file';
import roster from './roster';

export default function* root() {
    yield [
        fork(message),
        fork(profile),
        fork(file),
        fork(roster),
    ]
}
