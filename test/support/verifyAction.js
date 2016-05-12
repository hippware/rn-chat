import {expect} from 'chai';
import createStore from '../../src/store';
import reducer from '../../src/reducers/root';
import { combineReducers } from 'redux-side-effects';
const store = createStore(false);

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


export default function verifyAction(action, expectedActions, done){
    function *testingReducer(state, action) {
        try {
            if (action.type != '@@redux/INIT') {
                if (!expectedActions.length) {
                    return yield* reducer(state, action);
                }
                const expectedAction = expectedActions.shift();
                console.log("ACTUAL ACTION:", action);
                console.log("EXPECTED ACTION:", expectedAction);

                if (expectedAction.ignoreothers) {
                    if (expectedAction.type != action.type) {
                        expectedActions.unshift(expectedAction);
                    } else {
                        delete expectedAction.ignoreothers;
                        compare(action, expectedAction);
                    }
                } else {
                    compare(action, expectedAction);
                }
                if (done && !expectedActions.length) {
                    done();
                }
            }
            return yield* reducer(state, action);
        } catch (error){
            done(error);
        }
    }

    store.replaceReducer(testingReducer);
    //const store = mockStore(expectedActions, done);
    const {func, params} = action;
    if (func) {
        func.apply(null, [store.dispatch, ...params]);
    } else {
        console.log("ACTION:",action);
        store.dispatch(action);
    }
}
