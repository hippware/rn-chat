import * as actions from '../../src/actions';
import createTestUser, {testData} from '../support/testuser';
import Promise from 'promise';
import UserService from '../../src/services/UserService';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import {SUCCESS, ERROR} from '../../src/actions';

let authData = [testData(8), testData(9), testData(10)];
let userData = [null, null, null];

describe("Test XMPP actions actions", function() {
    for (let i=0;i<3;i++){
        step("create user"+i, function(done) {
            verifyAction(actions.login(authData[i]), [{ type: actions.LOGIN, ...authData[i] }, { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[i]=data.data}], done);
        });
        step("disconnect user"+i, function(done){
            verifyAction(actions.logout(), [{ type: actions.DISCONNECTED, ignoreothers:true }],done);
        });
    }
    step("connect user0, #1", function(done) {
        verifyAction(actions.login(authData[0]), [{ type: actions.LOGIN, ...authData[0] }, { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data}], done);
    });
    step("subscribe user1", function(done) {
        verifyAction(actions.subscribe(userData[1].uuid), [{ type: actions.SUBSCRIBE, user: userData[1].uuid}], done);
    });
    step("subscribe user2", function(done) {
        verifyAction(actions.subscribe(userData[2].uuid), [{ type: actions.SUBSCRIBE, user: userData[2].uuid}], done);
    });
    step("logout user0", function(done){
        verifyAction(actions.logout(), [{ type: actions.DISCONNECTED, ignoreothers:true }], done);
    });
    for (let i=1;i<3;i++){
        step("connect user"+i, function(done) {
            verifyAction(actions.login(authData[i]),
                [
                    { type: actions.LOGIN, ...authData[i] },
                    { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[i]=data.data}
                ], done);
        });
        step("authorize user0", function(done) {
            verifyAction(actions.authorize(userData[0].uuid), [{ type: actions.AUTHORIZE, user: userData[0].uuid}], done);
        });
        step("logout", function(done){
            verifyAction(actions.logout(), [{ type: actions.DISCONNECTED, ignoreothers:true }], done);
        });
    }
    step("connect user0, #2", function(done) {
        verifyAction(actions.login(authData[0]), [
            { type: actions.LOGIN, ...authData[0] },
            { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data},
            { type: actions.ROSTER_RECEIVED, ignoreothers:true, compare:data=>expect(data.list.length).to.be.equal(2)},
        ], done);
    });

});

