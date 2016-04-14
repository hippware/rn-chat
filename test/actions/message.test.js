import createTestUser from '../support/testuser';
import UserService from '../../src/services/UserService';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';

import store from '../../src/store';
import * as actions from '../../src/actions/profile';
import * as message from '../../src/actions/xmpp/message';
import * as xmppActions from '../../src/actions/xmpp/xmpp';

let users, passwords;
let userData = [];

describe("Test XMPP messages", function() {
    before(function (done) {
        users=[];
        passwords=[];
        Promise.all([createTestUser(2), createTestUser(3)]).then(res=>{
            res.sort((a,b)=>{return a.uuid.localeCompare(b.uuid)});
            userData = res;
            for (let i=0;i<res.length;i++){
                users.push(res[i].uuid);
                passwords.push(res[i].sessionID);
            }

            done();
        });


    });

    after(function (done){
        Promise.all(userData.map(a=>UserService.logout(a))).then(res=>{
            done();
        });
    });


    step("connect user3", function(done) {
        verifyAction(actions.login(userData[0]),
            [
                { type: actions.LOGIN_REQUEST, ...userData[0] },
                { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response},
                { type: xmppActions.CONNECTED, dontcompare:true},
            ], done);
    });
    step("send message to user4", function(done) {
        let msg = {body: "hello world", to:users[1], id:"123"};
        verifyAction(message.sendMessage(msg), [{ type: message.MESSAGE_REQUEST, msg:msg },{ type: message.MESSAGE_SENT, msg:msg }], done);
    });
    step("send another message to user4", function(done) {
        let msg = {body: "hello world2", to:users[1], id:"1234"};
        verifyAction(message.sendMessage(msg),  [{ type: message.MESSAGE_REQUEST, msg:msg },{ type: message.MESSAGE_SENT, msg:msg }], done);
    });
    ////38ddb534-f73f-11e5-94ee-0e7fe01e5a5f
    //step("send another message to 38ddb534-f73f-11e5-94ee-0e7fe01e5a5f", function(done) {
    //    let msg = {body: "hello world24351231231231", to:"38ddb534-f73f-11e5-94ee-0e7fe01e5a5f", id:"1234"};
    //    verifyAction(Actions.sendMessage(msg), [{ type: Actions.MESSAGE_SENT, msg:msg }], done);
    //});
    step("disconnect", function(done) {
        verifyAction(actions.logout(), [{ type: actions.LOGOUT_REQUEST },  { type: actions.LOGOUT_SUCCESS },{ type: xmppActions.DISCONNECTED },], done);
    });
    step("connect user4 and expect messages", function(done) {
        let msg = {
            "body": "hello world",
            "from": users[0],
            "id": "123",
            "type": "chat"
        };
        let msg2 = {
            "body": "hello world2",
            "from": users[0],
            "id": "1234",
            "type": "chat"
        };
        verifyAction(actions.login(userData[1]),
            [
                { type: actions.LOGIN_REQUEST, ...userData[1] },
                { type: actions.LOGIN_SUCCESS, compare:data=> userData[1]=data.response},
                { type: xmppActions.CONNECTED, dontcompare:true},
                { type: actions.PROFILE_REQUEST, dontcompare:true},
                { type: message.MESSAGE_RECEIVED, msg},
                { type: message.MESSAGE_RECEIVED, msg:msg2},

            ], done);
    });

    // request archive
    step("request archive", function(done) {
        let msg = {
            "body": "hello world",
            "from": users[0],
            "id": "123",
            "type": "chat"
        };
        let msg2 = {
            "body": "hello world2",
            "from": users[0],
            "id": "1234",
            "type": "chat"
        };
        verifyAction(message.requestArchive(),
            [
                { type: message.REQUEST_ARCHIVE, ignoreothers:true },
                { type: message.MESSAGE_RECEIVED, msg},
                { type: message.MESSAGE_RECEIVED, msg:msg2}
            ], done);
    });


});

