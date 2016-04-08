import * as actions from '../../src/actions/profile';
import * as Roster from '../../src/actions/xmpp/roster';
import createTestUser, {testData} from '../support/testuser';
import Promise from 'promise';
import UserService from '../../src/services/UserService';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import * as xmppActions from '../../src/actions/xmpp/xmpp';

let authData = [testData(8), testData(9), testData(10)];
let userData = [null, null, null];

describe("Test XMPP roster actions", function() {
    for (let i=0;i<3;i++){
        step("connect user"+i, function(done) {
            verifyAction(actions.login(authData[i]), [{ type: actions.LOGIN_REQUEST, ...authData[i] }, { type: actions.LOGIN_SUCCESS, compare:data=> userData[i]=data.response}, { type: xmppActions.CONNECTED, dontcompare:true}], done);
        });
        step("logout user"+i, function(done){
            verifyAction(actions.logout(), [{ type: actions.LOGOUT_REQUEST }, {type:xmppActions.DISCONNECTED}, { type: actions.LOGOUT_SUCCESS }], done);
        });
    }
    step("connect user0", function(done) {
        verifyAction(actions.login(authData[0]), [{ type: actions.LOGIN_REQUEST, ...authData[0] }, { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response},
            { type: xmppActions.CONNECTED, dontcompare:true},], done);
    });
    step("subscribe user1", function(done) {
        verifyAction(Roster.subscribe(userData[1].uuid), [{ type: Roster.REQUEST_SUBSCRIBE, user: userData[1].uuid}], done);
    });
    step("subscribe user2", function(done) {
        verifyAction(Roster.subscribe(userData[2].uuid), [{ type: Roster.REQUEST_SUBSCRIBE, user: userData[2].uuid}], done);
    });
    step("logout user0", function(done){
        verifyAction(actions.logout(), [{ type: actions.LOGOUT_REQUEST }, {type:xmppActions.DISCONNECTED}, { type: actions.LOGOUT_SUCCESS }], done);
    });
    for (let i=1;i<3;i++){
        step("connect user"+i, function(done) {
            verifyAction(actions.login(authData[i]),
                [
                    { type: actions.LOGIN_REQUEST, ...authData[i] },
                    { type: actions.LOGIN_SUCCESS, compare:data=> userData[i]=data.response},
                    { type: xmppActions.CONNECTED, dontcompare:true},{ type: actions.PROFILE_REQUEST, dontcompare:true},
                    [{ type: Roster.ROSTER_RECEIVED, list:[]},{ type: actions.PROFILE_SUCCESS, dontcompare:true}],
                ], done);
        });
        step("authorize user0", function(done) {
            verifyAction(Roster.authorize(userData[0].uuid), [{ type: Roster.REQUEST_AUTHORIZE, user: userData[0].uuid}], done);
        });
        step("logout", function(done){
            verifyAction(actions.logout(), [{ type: actions.LOGOUT_REQUEST }, {type:xmppActions.DISCONNECTED},  { type: actions.LOGOUT_SUCCESS }], done);
        });
    }
    step("connect user0", function(done) {
        verifyAction(actions.login(authData[0]), [
            { type: actions.LOGIN_REQUEST, ...authData[0] },
            { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response},
            { type: xmppActions.CONNECTED, dontcompare:true},{ type: actions.PROFILE_REQUEST, dontcompare:true},{ type: actions.PROFILE_SUCCESS, dontcompare:true},
            { type: Roster.ROSTER_RECEIVED, compare:data=>expect(data.list.length).to.be.equal(2)},
        ], done);
    });
    step("remove user0", function(done){
        verifyAction(actions.logout(authData[0]), [{ type: actions.LOGOUT_REQUEST, ...authData[0] }, { type: xmppActions.DISCONNECTED }, { type: actions.LOGOUT_SUCCESS }], done);
    });
    for (let i=1;i<3;i++){
        step("connect user"+i, function(done) {
            verifyAction(actions.login(authData[i]), [{ type: actions.LOGIN_REQUEST, ...authData[i] },{ type: actions.LOGIN_SUCCESS, compare:data=> userData[i]=data.response},{ type: xmppActions.CONNECTED, dontcompare:true},], done);
        });
        step("remove user"+i, function(done){
            verifyAction(actions.logout(authData[i]), [{ type: actions.LOGOUT_REQUEST, ...authData[i] }, { type: xmppActions.DISCONNECTED },{ type: actions.LOGOUT_SUCCESS }], done);
        });
    }

});

