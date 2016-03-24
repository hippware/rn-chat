import xmpp from '../../src/reducers/xmpp';
import * as Actions from '../../src/actions/xmpp/xmpp';
import * as Roster from '../../src/actions/xmpp/roster';
import {processRequestUpload, REQUEST_FILE_UPLOAD} from '../../src/actions/xmpp/file';
import createTestUser from '../support/testuser';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';

let users, passwords;

describe("Test file upload", function() {
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
    step("upload file", function(done) {
        let file = {filename: "test.jpg", height:300, width:300, size:3801, mimeType: 'image/jpeg'};
        verifyAction(processRequestUpload(file), [{ type: REQUEST_FILE_UPLOAD, data:file },{ type: REQUEST_FILE_UPLOAD, data:file }], done);
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
});


