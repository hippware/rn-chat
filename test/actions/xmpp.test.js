import xmpp from '../../src/reducers/xmpp';
import * as Actions from '../../src/actions/xmpp';
import thunk from 'redux-thunk'
import nock from 'nock'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
const loggerMiddleware = createLogger();
const reducer = combineReducers({xmpp});
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);
import expect from 'expect';

//const store = createStoreWithMiddleware(reducer);
const middlewares = [ thunk ]

/**
 * Creates a mock of Redux store with middleware.
 */
function mockStore(getState, expectedActions, done) {
    if (!Array.isArray(expectedActions)) {
        throw new Error('expectedActions should be an array of expected actions.')
    }
    if (typeof done !== 'undefined' && typeof done !== 'function') {
        throw new Error('done should either be undefined or function.')
    }

    function mockStoreWithoutMiddleware() {
        return {
            getState() {
                return typeof getState === 'function' ?
                    getState() :
                    getState
            },

            dispatch(action) {
                console.log("ACTION:"+action);
                const expectedAction = expectedActions.shift()

                try {
                    expect(action).toEqual(expectedAction)
                    if (done && !expectedActions.length) {
                        done()
                    }
                    return action
                } catch (e) {
                    done(e)
                }
            }
        }
    }

    const mockStoreWithMiddleware = applyMiddleware(
        ...middlewares
    )(mockStoreWithoutMiddleware)

    return mockStoreWithMiddleware()
}


describe("Test XMPP actions", function() {
    afterEach(() => {
        nock.cleanAll()
    });

    it("connect", function(done) {
        const expectedActions = [
            { type: Actions.REQUEST_LOGIN },
            { type: Actions.CONNECTED }
        ];
        const store = mockStore({ todos: [] }, expectedActions, done);
        store.dispatch(Actions.processLogin("user3@"+Actions.HOST, "user3"));
        console.log(store.getState());


    });
});
