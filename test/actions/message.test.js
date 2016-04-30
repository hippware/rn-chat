import createTestUser from '../support/testuser';
import UserService from '../../src/services/UserService';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';
import fileService from '../../src/services/xmpp/file';
import xmpp from '../../src/services/xmpp/xmpp';
import store from '../../src/store';
import * as actions from '../../src/actions';
import {SUCCESS, ERROR} from '../../src/actions';
import {expect} from 'chai';

let users, passwords;
let userData = [];
let mediaURL;
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
                { type: actions.LOGIN, ...userData[0] },
                { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data},
                { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
            ], done);
    });
    step("send message to user4", function(done) {
        let msg = {body: "hello world", to:users[1], id:"123"};
        verifyAction(actions.sendMessage(msg), [{ type: actions.MESSAGE, msg:msg },{ type: actions.MESSAGE+SUCCESS, data:msg }], done);
    });
    step("upload image for message", async function(done){
        try {

            let fileName = "test/img/test.jpg";
            let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
            let data = {height:300, width:300, size:3801, file, purpose:`message_media:${users[1]}@${xmpp.host}`};
            const res = await fileService.requestUpload(data);
            expect(res.referenceURL).not.to.be.null;
            mediaURL = res.referenceURL;

            done();
        } catch(err) {
            done(err);
        }
    });
    step("send another message to user4 with file", function(done) {
        let msg = {body: "hello world2", to:users[1], id:"1234", media: mediaURL};
        verifyAction(actions.sendMessage(msg),  [{ type: actions.MESSAGE, msg:msg },{ type: actions.MESSAGE+SUCCESS, data:msg }], done);
    });
    ////38ddb534-f73f-11e5-94ee-0e7fe01e5a5f
    //step("send another message to 38ddb534-f73f-11e5-94ee-0e7fe01e5a5f", function(done) {
    //    let msg = {body: "hello world24351231231231", to:"38ddb534-f73f-11e5-94ee-0e7fe01e5a5f", id:"1234"};
    //    verifyAction(Actions.sendMessage(msg), [{ type: Actions.MESSAGE+SUCCESS, msg:msg }], done);
    //});
    step("disconnect", function(done) {
        verifyAction(actions.logout(), [{ type: actions.LOGOUT+SUCCESS, ignoreothers:true, dontcompare:true }],done);
    });
    step("connect user4 and expect messages", function(done) {
        let msg = {
            "body": "hello world",
            "from": users[0],
            "to":users[1],
            "id": "123",
            "type": "chat"
        };
        let msg2 = {
            "body": "hello world2",
            "from": users[0],
            "to":users[1],
            "id": "1234",
            "type": "chat"
        };
        verifyAction(actions.login(userData[1]),
            [
                { type: actions.LOGIN, ...userData[1] },
                { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[1]=data.data},
                { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
                //{ type: actions.MESSAGE_RECEIVED, dontcompare:true, ignoreothers:true},
                //{ type: actions.MESSAGE_RECEIVED, dontcompare:true, ignoreothers:true},
                { type: actions.REQUEST_ARCHIVE+SUCCESS,  compare:data=>expect(data.data.length).to.be.equal(2) &&
                expect(data.data[1].body).to.be.equal("hello world2") &&
                expect(data.data[1].media).to.be.equal(mediaURL), ignoreothers:true},

            ], done);
    });

});

