import xmpp from '../../src/reducers/xmpp';
import * as Actions from '../../src/actions/xmpp/xmpp';
import * as Roster from '../../src/actions/xmpp/roster';
import createTestUser from '../support/testuser';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';

let users, passwords;

describe("Test XMPP messages", function() {
    before(function (done) {
        users=[null];
        passwords=[null];
        Promise.all([createTestUser(2), createTestUser(3), createTestUser(4), createTestUser(5)]).then(res=>{
            for (let i=0;i<res.length;i++){
                users.push(res[i].uuid);
                passwords.push(res[i].sessionID);
            }
            done();
        });


    });

    step("connect user3", function(done) {
        verifyAction(Roster.processLogin(users[3], passwords[3]), [{ type: Actions.REQUEST_LOGIN, username:users[3], password:passwords[3] }, { type: Actions.CONNECTED }], done);
    });
    step("send message to user4", function(done) {
        let msg = {body: "hello world", to:users[4], id:"123"};
        verifyAction(Actions.sendMessage(msg), [{ type: Actions.MESSAGE_SENT, msg:msg }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
    // expect message from user3
    step("connect user4", function(done) {
        let msg = {
            "body": "hello world",
            "from": users[3],
            "id": "123",
            "type": "chat"
        };
        verifyAction(Roster.processLogin(users[4], passwords[4]),
            [
                { type: Actions.REQUEST_LOGIN, username:users[4], password:passwords[4] },
                { type: Actions.CONNECTED },
                { type:Actions.MESSAGE_RECEIVED, msg}
            ], done);
    });
    step("disconnect", function(done) {
        setTimeout(function(){
            verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
        }, 500);
    });

});
describe("Test XMPP actions", function() {
    before(function (done) {
        users=[null];
        passwords=[null];
        Promise.all([createTestUser(2), createTestUser(3), createTestUser(4), createTestUser(5)]).then(res=>{
            for (let i=0;i<res.length;i++){
                users.push(res[i].uuid);
                passwords.push(res[i].sessionID);
            }
            done();
        });


    });

    step("connect user4", function(done) {
        verifyAction(Roster.processLogin(users[4], passwords[4]), [{ type: Actions.REQUEST_LOGIN, username:users[4], password:passwords[4] }, { type: Actions.CONNECTED }], done);
    });
    step("unsubscribe user3 (if any)", function(done) {
        verifyAction(Roster.unsubscribe(users[3]), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:users[3] }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
    step("connect user3", function(done) {
        verifyAction(Roster.processLogin(users[3], passwords[3]), [{ type: Actions.REQUEST_LOGIN, username:users[3], password:passwords[3] }, { type: Actions.CONNECTED }], done);
    });
    step("unsubscribe user1 (if any)", function(done) {
        verifyAction(Roster.unsubscribe(users[1]), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:users[1] }], done);
    });
    step("unsubscribe user4 (if any)", function(done) {
        verifyAction(Roster.unsubscribe(users[4]), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:users[4] }], done);
    });
    step("unsubscribe user2 (if any)", function(done) {
        verifyAction(Roster.unsubscribe(users[2]), [{ type: Roster.REQUEST_UNSUBSCRIBE, user:users[2] }], done);
    });
    step("subscribe user4", function(done) {
        verifyAction(Roster.subscribe(users[4]), [{ type: Roster.REQUEST_SUBSCRIBE, user:users[4] }], done);
    });
    step("subscribe user2", function(done) {
        verifyAction(Roster.subscribe(users[2]), [{ type: Roster.REQUEST_SUBSCRIBE, user:users[2] }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
    step("connect user4 and expect user3 request", function(done) {
        verifyAction(Roster.processLogin(users[4], passwords[4]), [{ type: Actions.REQUEST_LOGIN, username:users[4], password:passwords[4] }, { type: Actions.CONNECTED },
            { type: Roster.SUBSCRIBE_REQUEST_RECEIVED, user: users[3] },
            { type: Roster.ROSTER_RECEIVED, list: [ {username: users[2], subscription:'none', status:'unavailable'}] },
        ], done);
    });
    step("authorize user3", function(done) {
        verifyAction(Roster.authorize(users[3]), [{ type: Roster.REQUEST_AUTHORIZE, user:users[3]}], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
    step("connect user3 and get roster list automatically (alphabet sort)", function(done) {
        verifyAction(Roster.processLogin(users[3], passwords[3]), [
            { type: Actions.REQUEST_LOGIN, username:users[3], password:passwords[3] },
            { type: Actions.CONNECTED },
            { type: Roster.SUBSCRIBE_REQUEST_RECEIVED, user: users[2] },
            { type: Roster.ROSTER_RECEIVED, list: [{username: users[4], subscription:'to', status:'unavailable'}, {username: users[2], subscription:'none', status:'unavailable'}] }], done);
    });
    step("disconnect", function(done) {
        setTimeout(function(){
                verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
            }, 500);
    });
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

