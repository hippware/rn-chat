import * as actions from '../../src/actions/profile';
import * as fileActions from '../../src/actions/xmpp/file';
import * as xmppActions from '../../src/actions/xmpp/xmpp';
import createTestUser from '../support/testuser';
import Promise from 'promise';
import fs from 'fs';
import UserService from '../../src/services/UserService';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';

let users, passwords, avatar;
let userData = [];
let url;

describe("Test file upload", function() {
    before(function (done) {
        users=[];
        passwords=[];
        Promise.all([createTestUser(4), createTestUser(3)]).then(res=>{
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

    step("connect user", function(done) {
        verifyAction(actions.login(userData[0]),
            [
                { type: actions.LOGIN_REQUEST, ...userData[0] },
                { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response}, {type:xmppActions.CONNECTED, dontcompare:true}
            ], done);
    });
    step("upload user avatar", function(done) {
        let fileName = "test/img/test.jpg";
        let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
        let data = {height:300, width:300, size:3801, file, avatar:true};
        verifyAction(fileActions.upload(data), [
            { type: fileActions.FILE_UPLOAD_REQUEST, ...data },
            { type: fileActions.FILE_UPLOAD_SUCCESS, compare: data=>url=data.data.referenceURL },
            { type: actions.PROFILE_UPDATE_REQUEST, compare: data=>expect(data.fields.avatar).to.be.equal(url)},
            { type: actions.PROFILE_UPDATE_SUCCESS, compare: data=>expect(data.data.avatar).to.be.equal(url)}

        ], done);
    });

    step("download user avatar", function(done) {
        verifyAction(actions.profileRequest(), [
            { type: actions.PROFILE_REQUEST, user:undefined, fields:undefined },
            { type: actions.PROFILE_SUCCESS, compare: data=>expect(data.data.avatar).to.be.equal(url)},
            { type: fileActions.FILE_DOWNLOAD_SUCCESS, dontcompare:true}

        ], done);
    });

    step("disconnect", function(done) {
        verifyAction(actions.logout(userData[0]),
            [
                { type: actions.LOGOUT_REQUEST,  ...userData[0]},{type:xmppActions.DISCONNECTED},
                { type: actions.LOGOUT_SUCCESS },
            ], done);
    });
});


