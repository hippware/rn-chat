import xmpp from '../../src/reducers/xmpp';
import createTestUser from '../support/testuser';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';

import store from '../../src/store';
import * as actions from '../../src/actions';

let users, passwords;
let userData = [];
describe("Test XMPP messages", function() {
    before(function (done) {
        users=[null];
        userData = [];
        passwords=[null];
        Promise.all([createTestUser(2), createTestUser(3), createTestUser(4), createTestUser(5)]).then(res=>{
            for (let i=0;i<res.length;i++){
                userData.push(res[i]);
                users.push(res[i].uuid);
                passwords.push(res[i].sessionID);
            }
            done();
        });


    });

    after(function (done) {
        verifyAction(Profile.processLogout(userData[3]), [{ type: Profile.LOGOUT_REQUEST }, { type: Profile.LOGOUT_SUCCESS, dontcompare:true }], done);
    });

    step("connect user3", function(done) {
        verifyAction({type: actions.LOGIN_REQUEST, ...userData[0]},
            [{ type: actions.LOGIN_REQUEST, ...userData[0] },
                { type: actions.LOGIN_SUCCESS, response:userData[0] }], done);
    });
    //step("send message to user4", function(done) {
    //    let msg = {body: "hello world", to:users[4], id:"123"};
    //    verifyAction(Actions.sendMessage(msg), [{ type: Actions.MESSAGE_SENT, msg:msg }], done);
    //});
    //step("send another message to user4", function(done) {
    //    let msg = {body: "hello world2", to:users[4], id:"1234"};
    //    verifyAction(Actions.sendMessage(msg), [{ type: Actions.MESSAGE_SENT, msg:msg }], done);
    //});
    ////38ddb534-f73f-11e5-94ee-0e7fe01e5a5f
    //step("send another message to 38ddb534-f73f-11e5-94ee-0e7fe01e5a5f", function(done) {
    //    let msg = {body: "hello world24351231231231", to:"38ddb534-f73f-11e5-94ee-0e7fe01e5a5f", id:"1234"};
    //    verifyAction(Actions.sendMessage(msg), [{ type: Actions.MESSAGE_SENT, msg:msg }], done);
    //});
    //step("disconnect", function(done) {
    //    verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //});
    //// expect message from user3
    //step("connect user4", function(done) {
    //    let msg = {
    //        "body": "hello world",
    //        "from": users[3],
    //        "id": "123",
    //        "type": "chat"
    //    };
    //    let msg2 = {
    //        "body": "hello world2",
    //        "from": users[3],
    //        "id": "1234",
    //        "type": "chat"
    //    };
    //    verifyAction(Actions.processLogin(users[4], passwords[4]),
    //        [
    //            { type: Actions.REQUEST_LOGIN, username:users[4], password:passwords[4] },
    //            { type: Actions.CONNECTED },
    //            { type:Actions.MESSAGE_RECEIVED, msg},
    //            { type:Actions.MESSAGE_RECEIVED, msg:msg2}
    //        ], done);
    //});
    //
    //// request archive
    //step("request archive", function(done) {
    //    let msg = {
    //        "body": "hello world",
    //        "from": users[3],
    //        "id": "123",
    //        "type": "chat"
    //    };
    //    let msg2 = {
    //        "body": "hello world2",
    //        "from": users[3],
    //        "id": "1234",
    //        "type": "chat"
    //    };
    //    verifyAction(Actions.processRequestArchive(),
    //        [
    //            { type: Actions.REQUEST_ARCHIVE },
    //            { type:Actions.MESSAGE_RECEIVED, msg},
    //            { type:Actions.MESSAGE_RECEIVED, msg:msg2}
    //        ], done);
    //});
    //
    //step("disconnect", function(done) {
    //    setTimeout(function(){
    //        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    //    }, 500);
    //});

});

