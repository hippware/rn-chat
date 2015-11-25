'use strict';
import xmpp from '../../src/reducers/xmpp';
import * as Actions from '../../src/actions/xmpp/xmpp';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import expect from 'expect';

const middlewares = [ thunk];

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
                expect(action).toEqual(expectedAction);
                if (done && !expectedActions.length) {
                    done()
                }
                return action
            } catch (e) {
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

function verifyAction(action, expectedActions, done){
    const store = mockStore(expectedActions, done);
    store.dispatch(action);
}

describe("Test XMPP actions", function() {
    step("connect user3", function(done) {
        verifyAction(Actions.processLogin("user3", "user3"), [{ type: Actions.REQUEST_LOGIN }, { type: Actions.CONNECTED }], done);
    });
    step("unsubscribe user4 (if any)", function(done) {
        verifyAction(Actions.unsubscribe("user4"), [{ type: Actions.REQUEST_UNSUBSCRIBE, user:"user4" }], done);
    });
    step("subscribe user4", function(done) {
        verifyAction(Actions.subscribe("user4"), [{ type: Actions.REQUEST_SUBSCRIBE, user:"user4" }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.DISCONNECTED }], done);
    });
    step("connect user4 and expect user3 request", function(done) {
        verifyAction(Actions.processLogin("user4", "user4"), [{ type: Actions.REQUEST_LOGIN }, { type: Actions.CONNECTED },{ type: Actions.SUBSCRIBE_REQUEST_RECEIVED, user: 'user3' }], done);
    });
    step("authorize user3", function(done) {
        verifyAction(Actions.authorize('user3'), [{ type: Actions.REQUEST_AUTHORIZE, user:'user3'}], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.DISCONNECTED }], done);
    });
    step("connect user3", function(done) {
        verifyAction(Actions.processLogin("user3", "user3"), [{ type: Actions.REQUEST_LOGIN }, { type: Actions.CONNECTED }], done);
    });
    step("retrieve roster list", function(done) {
        verifyAction(Actions.requestRoster(), [{ type: Actions.ROSTER_RECEIVED, list: [{user: 'user4'}] }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.DISCONNECTED }], done);
    });
});
