import xmpp from '../../src/reducers/xmpp';
import * as Actions from '../../src/actions/xmpp/xmpp';
import * as Roster from '../../src/actions/xmpp/roster';
import createTestUser from '../support/testuser';
import Promise from 'promise';
import fs from 'fs';
import assert from 'assert';
let users, passwords, avatar;
let userData = [];
import UserService from '../../src/services/UserService';

describe("Test file upload", function() {
    before(function (done) {
        users=[];
        passwords=[];
        Promise.all([createTestUser(2)]).then(res=>{
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

    step("connect user", function(done) {
        verifyAction(Actions.processLogin(users[0], passwords[0]), [{ type: Actions.REQUEST_LOGIN, username:users[0], password:passwords[0] }, { type: Actions.CONNECTED }], done);
    });
    step("upload file", function(done) {
        let fileName = "test/img/test.jpg";
        let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
        let data = {height:300, width:300, size:3801, file};
        verifyAction(processRequestUpload(data), [{ type: FILE_UPLOAD_REQUEST, data },{type: FILE_UPLOAD_RESPONSE, dontcompare:true},{type: FILE_UPLOAD_SUCCESS, compare:data=>avatar = data.data.accessURL}], done);
    });
    // login user again to see avatar
    step("connect user", function(done) {
        createTestUser(2, {avatar}).then(res=>{
            assert.equal(avatar, res.avatar);
            done();
        });
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
});


