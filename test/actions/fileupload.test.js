import * as actions from '../../src/actions';
import {testData} from '../support/testuser';
import Promise from 'promise';
import fs from 'fs';
import profile from '../../src/services/xmpp/profile';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import {SUCCESS, ERROR} from '../../src/actions';

let avatar, user, url;

describe("Test file upload", function() {
    after(async function (){
        await profile.delete();
    });

    step("connect user", function(done) {
        verifyAction(actions.login(testData(6)),
            [
                { type: actions.LOGIN, ...testData(6) },
                { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> user=data.data.uuid},
                { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
            ], done);
    });
    step("upload user avatar", function(done) {
        let fileName = "test/img/test.jpg";
        let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
        let data = {height:300, width:300, size:3801, file, avatar:true};
        verifyAction(actions.upload(data), [
            { type: actions.FILE_UPLOAD, ...data },
            { type: actions.FILE_UPLOAD+SUCCESS, ignoreothers:true, compare: data=>url=data.data.referenceURL },
            { type: actions.PROFILE_UPDATE+SUCCESS, ignoreothers:true, compare: data=>expect(data.data.avatar).to.be.equal(url)}

        ], done);
    });

    step("download user avatar", function(done) {
        verifyAction(actions.profileRequest(user), [
            { type: actions.PROFILE, user, fields:undefined },
            { type: actions.PROFILE+SUCCESS, compare: data=>expect(data.data.avatar).to.be.equal(url)},

        ], done);
    });

});


