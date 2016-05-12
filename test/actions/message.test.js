import {testData} from '../support/testuser';
import profile from '../../src/services/xmpp/profile';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';
import fileService from '../../src/services/xmpp/file';
import xmpp from '../../src/services/xmpp/xmpp';
import store from '../../src/store';
import * as actions from '../../src/actions';
import {SUCCESS, ERROR} from '../../src/actions';
import {expect} from 'chai';

let user0, user1;
let mediaURL;
describe("Test XMPP messages", function() {
    step("connect user4", function(done) {
        verifyAction(actions.login(testData(4)),
          [
              { type: actions.LOGIN, ...testData(4) },
              { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> user1=data.data},
              { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
          ], done);
    });
    step("disconnect", function(done) {
        verifyAction(actions.logout(), [{ type: actions.LOGOUT+SUCCESS, ignoreothers:true, dontcompare:true }],done);
    });
    step("connect user3", function(done) {
        verifyAction(actions.login(testData(3)),
            [
                { type: actions.LOGIN, ...testData(3) },
                { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> user0=data.data},
                { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
            ], done);
    });
    step("send message to user4", function(done) {
        let msg = {body: "hello world", to:user1.uuid, id:"123"};
        verifyAction(actions.sendMessage(msg), [{ type: actions.MESSAGE, msg:msg },{ type: actions.MESSAGE+SUCCESS, data:msg }], done);
    });
    step("upload image for message", async function(done){
        try {

            let fileName = "test/img/test.jpg";
            let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
            let data = {height:300, width:300, size:3801, file, purpose:`message_media:${user1.uuid}@${xmpp.host}`};
            const res = await fileService.requestUpload(data);
            expect(res.referenceURL).not.to.be.null;
            mediaURL = res.referenceURL;

            done();
        } catch(err) {
            done(err);
        }
    });
    step("send another message to user4 with file", function(done) {
        let msg = {body: "hello world2", to:user1.uuid, id:"1234", media: mediaURL};
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
            "from": user0.uuid,
            "to":user1.uuid,
            "id": "123",
            "type": "chat"
        };
        let msg2 = {
            "body": "hello world2",
            "from": user0.uuid,
            "to":user1.uuid,
            "id": "1234",
            "type": "chat"
        };
        verifyAction(actions.login(testData(4)),
            [
                { type: actions.LOGIN, ...testData(4) },
                { type: actions.REQUEST_ARCHIVE+SUCCESS,  compare:data=>expect(data.data.length).to.be.equal(2) &&
                expect(data.data[1].body).to.be.equal("hello world2") &&
                expect(data.data[1].media).to.be.equal(mediaURL), ignoreothers:true},

            ], done);
    });
    step("connect user3", function(done) {
        verifyAction(actions.login(testData(3)),
          [
              { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
          ], done);
    });
    step("delete user3", async function() {
        await profile.delete();
    });
    step("connect user4", function(done) {
        verifyAction(actions.login(testData(4)),
          [
              { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
          ], done);
    });
    step("delete user4", async function() {
        await profile.delete();
    });

});

