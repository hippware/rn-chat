import * as actions from '../../src/actions/profile';
import * as Roster from '../../src/actions/xmpp/roster';
import createTestUser, {testData} from '../support/testuser';
import Promise from 'promise';
import UserService from '../../src/services/UserService';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
let authData = [testData(8), testData(9), testData(10)];
let userData = [null, null, null];

describe("Test XMPP roster actions", function() {
P    for (let i=0;i<3;i++){
        step("connect user"+i, function(done) {
            verifyAction(actions.login(authData[i]), [{ type: actions.LOGIN_REQUEST, ...authData[i] }, { type: actions.LOGIN_SUCCESS, compare:data=> userData[i]=data.response}], done);
        });
        step("logout user"+i, function(done){
            verifyAction(actions.logout(), [{ type: actions.LOGOUT_REQUEST }, { type: actions.LOGOUT_SUCCESS }], done);
        });
    }
    step("connect user0", function(done) {
        verifyAction(actions.login(authData[0]), [{ type: actions.LOGIN_REQUEST, ...authData[0] }, { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response}], done);
    });
    step("subscribe user1", function(done) {
        verifyAction(Roster.subscribe(userData[1].uuid), [{ type: Roster.REQUEST_SUBSCRIBE, user: userData[1].uuid}], done);
    });
    step("subscribe user2", function(done) {
        verifyAction(Roster.subscribe(userData[2].uuid), [{ type: Roster.REQUEST_SUBSCRIBE, user: userData[2].uuid}], done);
    });
    step("logout user0", function(done){
        verifyAction(actions.logout(), [{ type: actions.LOGOUT_REQUEST }, { type: actions.LOGOUT_SUCCESS }], done);
    });
    for (let i=1;i<3;i++){
        step("connect user"+i, function(done) {
            verifyAction(actions.login(authData[i]),
                [
                    { type: actions.LOGIN_REQUEST, ...authData[i] },
                    { type: actions.LOGIN_SUCCESS, compare:data=> userData[i]=data.response},
                    [{ type: Roster.ROSTER_RECEIVED, list:[]},{ type: Roster.SUBSCRIBE_REQUEST_RECEIVED, own:false, status:'online', from:userData[0].uuid}],
                ], done);
        });
        step("authorize user0", function(done) {
            verifyAction(Roster.authorize(userData[0].uuid), [{ type: Roster.REQUEST_AUTHORIZE, user: userData[0].uuid}], done);
        });
        step("logout", function(done){
            verifyAction(actions.logout(), [{ type: actions.LOGOUT_REQUEST }, { type: actions.LOGOUT_SUCCESS }], done);
        });
    }
    step("connect user0", function(done) {
        verifyAction(actions.login(authData[0]), [
            { type: actions.LOGIN_REQUEST, ...authData[0] },
            { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response},
            { type: Roster.ROSTER_RECEIVED, compare:data=>expect(data.list.length).to.be.equal(2)},
        ], done);
    });
    step("remove user0", function(done){
        verifyAction(actions.logout(authData[0]), [{ type: actions.LOGOUT_REQUEST, ...authData[0] }, { type: actions.LOGOUT_SUCCESS }], done);
    });
    for (let i=1;i<3;i++){
        step("connect user"+i, function(done) {
            verifyAction(actions.login(authData[i]), [{ type: actions.LOGIN_REQUEST, ...authData[i] }, { type: actions.LOGIN_SUCCESS, compare:data=> userData[i]=data.response}], done);
        });
        step("remove user"+i, function(done){
            verifyAction(actions.logout(authData[i]), [{ type: actions.LOGOUT_REQUEST, ...authData[i] }, { type: actions.LOGOUT_SUCCESS }], done);
        });
    }

    //step("disconnect", function(done) {
    //    verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //});
    //step("connect user3", function(done) {
    //    verifyAction(Actions.processLogin(users[3], passwords[3]), [{ type: Actions.REQUEST_LOGIN, username:users[3], password:passwords[3] }, { type: Actions.CONNECTED }], done);
    //});
    //step("unsubscribe user1 (if any)", function(done) {
    //    verifyAction(Roster.unsubscribe(users[1]), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:users[1] }], done);
    //});
    //step("unsubscribe user4 (if any)", function(done) {
    //    verifyAction(Roster.unsubscribe(users[4]), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:users[4] }], done);
    //});
    //step("unsubscribe user2 (if any)", function(done) {
    //    verifyAction(Roster.unsubscribe(users[2]), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:users[2] }], done);
    //});
    //step("subscribe user4", function(done) {
    //    verifyAction(Roster.subscribe(users[4]), [{ type: Roster.REQUEST_SUBSCRIBE, user:users[4] }], done);
    //});
    //step("subscribe user2", function(done) {
    //    verifyAction(Roster.subscribe(users[2]), [{ type: Roster.REQUEST_SUBSCRIBE, user:users[2] }], done);
    //});
    //step("disconnect", function(done) {
    //    verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //});
    //step("connect user4 and expect user3 request", function(done) {
    //    verifyAction(Actions.processLogin(users[4], passwords[4]), [{ type: Actions.REQUEST_LOGIN, username:users[4], password:passwords[4] }, { type: Actions.CONNECTED },
    //        { type: Roster.SUBSCRIBE_REQUEST_RECEIVED, user: users[3] },
    //        { type: Roster.ROSTER_RECEIVED, list: [] },
    //    ], done);
    //});
    //step("authorize user3", function(done) {
    //    verifyAction(Roster.authorize(users[3]), [{ type: Roster.REQUEST_AUTHORIZE, user:users[3]}], done);
    //});
    //step("disconnect", function(done) {
    //    verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //});
    //step("connect user3 and get roster list automatically (alphabet sort)", function(done) {
    //    verifyAction(Actions.processLogin(users[3], passwords[3]), [
    //        { type: Actions.REQUEST_LOGIN, username:users[3], password:passwords[3] },
    //        { type: Actions.CONNECTED },
    //        { type: Roster.ROSTER_RECEIVED, list: [ {username: users[2], subscription:'none', status:'unavailable'},{username: users[4], subscription:'to', status:'unavailable'}] }], done);
    //});
    //step("disconnect", function(done) {
    //    setTimeout(function(){
    //            verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //        }, 500);
    //});
});

//describe("Create roster with 100 elements", function() {
//    //step("connect user1", function(done) {
//    //    verifyAction(Roster.processLogin("user1", "user1"), [{ type: Actions.REQUEST_LOGIN, username:"user1", password:"user1" }, { type: Actions.CONNECTED },{ type: Roster.ROSTER_RECEIVED, list: [ {username: users[2], subscription:'from'}, {username: 'pavel', subscription:'none'}] }], done);
//    //});
//    //step("subscribe 99 users", function(done) {
//    //    for (let i=2;i<100;i++){
//    //        verifyAction(Roster.subscribe("user"+i), [{ type: Roster.REQUEST_SUBSCRIBE, user:"user"+i }], done);
//    //    }
//    //});
//    //step("disconnect", function(done) {
//    //    verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
//    //});
//    for (let i=5;i<100;i++) {
//        step("connect user" + i, function (done) {
//            verifyAction(Roster.processLogin("user" + i, "user" + i), [{
//                type: Actions.REQUEST_LOGIN,
//                username: "user" + i,
//                password: "user" + i
//            }, {type: Actions.CONNECTED}], done);
//        });
//
//        step("authorize user1", function(done) {
//            verifyAction(Roster.authorize('user1'), [{ type: Roster.REQUEST_AUTHORIZE, user:'user1'}], done);
//        });
//        step("disconnect", function(done) {
//            setTimeout(function(){
//                verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
//            }, 1000);
//        });
//    }
//
//});

