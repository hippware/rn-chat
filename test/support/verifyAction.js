import createSagaMiddleware from 'redux-saga';
import rootSaga from '../../src/sagas/root';
const sagaMiddleware = createSagaMiddleware(rootSaga);
import configureMockStore from 'redux-mock-store'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import {expect} from 'chai';
const middlewares = [ sagaMiddleware ];

function compare(actual, expected){
    expect(actual.type).to.equal(expected.type);
    if (expected.dontcompare){
        return;
    }
    if (expected.compare){
        return expected.compare(actual, expected);
    }
    if (actual.msg && actual.msg.time){
        delete actual.msg.time;
    }
    expect(actual).to.deep.equal(expected);
}
/**
 * Creates a mock of Redux store with middleware.
 */
function mockStore(expectedActions, done) {
    if (!Array.isArray(expectedActions)) {
        throw new Error('expectedActions should be an array of expected actions.')
    }
    if (typeof done !== 'undefined' && typeof done !== 'function') {
        throw new Error('done should either be undefined or function.')
    }

    class MockStore {
        dispatch(action) {
            if (!expectedActions.length){
                return;
            }
            const expectedAction = expectedActions.shift();

            try {
                if (expectedAction.length){
                    if (expectedAction[0].type == action.type){
                        compare(action, expectedAction[0]);
                    } else {
                        compare(action, expectedAction[1]);
                    }
                } else {
                    if (expectedAction.type != action.type && expectedAction.ignoreothers){
                        expectedActions.push(expectedAction);
                        return action;
                    }
                    compare(action,expectedAction);
                }
                if (done && !expectedActions.length) {
                    done()
                }
                return action
            } catch (e) {
                console.error(e.stack);
                done(e)
            }
        }
    }

    function mockStoreWithoutMiddleware() {
        return new MockStore();
    }

    const mockStoreWithMiddleware = applyMiddleware(
        ...middlewares
    )(mockStoreWithoutMiddleware)

    return mockStoreWithMiddleware()
}

export default function verifyAction(action, expectedActions, done){
    const store = mockStore(expectedActions, done);
    store.dispatch(action);
}
