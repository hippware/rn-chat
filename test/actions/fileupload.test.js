import * as actions from '../../src/actions';
import createTestUser from '../support/testuser';
import Promise from 'promise';
import fs from 'fs';
import UserService from '../../src/services/UserService';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import {SUCCESS, ERROR} from '../../src/actions';

let users, passwords, avatar;
let userData = [];
let url;

describe("Test file upload", function() {
    before(function (done) {
        users=[];
        passwords=[];
        Promise.all([createTestUser(6), createTestUser(7)]).then(res=>{
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
                { type: actions.LOGIN, ...userData[0] },
                { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data},
            ], done);
    });
    step("upload user avatar", function(done) {
        let fileName = "test/img/test.jpg";
        let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
        let data = {height:300, width:300, size:3801, file, avatar:true};
        verifyAction(actions.upload(data), [
            { type: actions.FILE_UPLOAD, ...data },
            { type: actions.FILE_UPLOAD+SUCCESS, ignoreothers:true, compare: data=>url=data.data.referenceURL },

        ], done);
    });

    step("download user avatar", function(done) {
        verifyAction(actions.profileRequest(userData[0].uuid), [
            { type: actions.PROFILE, user:userData[0].uuid, fields:undefined },
            { type: actions.PROFILE+SUCCESS, compare: data=>expect(data.data.avatar).to.be.equal(url)},

        ], done);
    });

});


