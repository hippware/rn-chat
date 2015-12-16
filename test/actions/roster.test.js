'use strict';
import xmpp from '../../src/reducers/xmpp';
import * as Actions from '../../src/actions/xmpp/xmpp';
import * as Roster from '../../src/actions/xmpp/roster';
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
    //step("connect user1", function(done) {
    //    verifyAction(Roster.processLogin("user1", "user1"), [{ type: Actions.REQUEST_LOGIN, username:"user1", password:"user1" }, { type: Actions.CONNECTED }], done);
    //});
    //step("unsubscribe user3 (if any)", function(done) {
    //    verifyAction(Roster.unsubscribe("user3"), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:"user3" }], done);
    //});
    //step("disconnect", function(done) {
    //    verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //});
    step("connect user3", function(done) {
        verifyAction(Roster.processLogin("user3", "user3"), [{ type: Actions.REQUEST_LOGIN, username:"user3", password:"user3" }, { type: Actions.CONNECTED }], done);
    });
    step("unsubscribe user1 (if any)", function(done) {
        verifyAction(Roster.unsubscribe("user1"), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:"user1" }], done);
    });
    step("unsubscribe user4 (if any)", function(done) {
        verifyAction(Roster.unsubscribe("user4"), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:"user4" }], done);
    });
    step("unsubscribe user2 (if any)", function(done) {
        verifyAction(Roster.unsubscribe("user2"), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:"user2" }], done);
    });
    step("subscribe user4", function(done) {
        verifyAction(Roster.subscribe("user4"), [{ type: Roster.REQUEST_SUBSCRIBE, user:"user4" }], done);
    });
    step("subscribe user2", function(done) {
        verifyAction(Roster.subscribe("user2"), [{ type: Roster.REQUEST_SUBSCRIBE, user:"user2" }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
    step("connect user4 and expect user3 request", function(done) {
        verifyAction(Roster.processLogin("user4", "user4"), [{ type: Actions.REQUEST_LOGIN, username:"user4", password:"user4" }, { type: Actions.CONNECTED },
            { type: Roster.ROSTER_RECEIVED, list: [ {username: 'user2', subscription:'from'}, {username: 'pavel', subscription:'none'}] },
            { type: Roster.SUBSCRIBE_REQUEST_RECEIVED, user: 'user3' }
        ], done);
    });
    step("authorize user3", function(done) {
        verifyAction(Roster.authorize('user3'), [{ type: Roster.REQUEST_AUTHORIZE, user:'user3'}], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
    step("connect user3 and get roster list automatically (alphabet sort)", function(done) {
        verifyAction(Roster.processLogin("user3", "user3"), [
            { type: Actions.REQUEST_LOGIN, username:"user3", password:"user3" },
            { type: Actions.CONNECTED },
            { type: Roster.ROSTER_RECEIVED, list: [{username: 'user4', subscription:'to'}, {username: 'user2', subscription:'none'}] }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
});

describe("Create roster with 100 elements", function() {
    //step("connect user1", function(done) {
    //    verifyAction(Roster.processLogin("user1", "user1"), [{ type: Actions.REQUEST_LOGIN, username:"user1", password:"user1" }, { type: Actions.CONNECTED },{ type: Roster.ROSTER_RECEIVED, list: [ {username: 'user2', subscription:'from'}, {username: 'pavel', subscription:'none'}] }], done);
    //});
    //step("subscribe 99 users", function(done) {
    //    for (let i=2;i<100;i++){
    //        verifyAction(Roster.subscribe("user"+i), [{ type: Roster.REQUEST_SUBSCRIBE, user:"user"+i }], done);
    //    }
    //});
    //step("disconnect", function(done) {
    //    verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //});
    //for (let i=5;i<100;i++) {
    //    step("connect user" + i, function (done) {
    //        verifyAction(Roster.processLogin("user" + i, "user" + i), [{
    //            type: Actions.REQUEST_LOGIN,
    //            username: "user" + i,
    //            password: "user" + i
    //        }, {type: Actions.CONNECTED}], done);
    //    });
    //    step("authorize user1", function(done) {
    //        verifyAction(Roster.authorize('user1'), [{ type: Roster.REQUEST_AUTHORIZE, user:'user1'}], done);
    //    });
    //    step("disconnect", function(done) {
    //        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //    });
    //}

});

