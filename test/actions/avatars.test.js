import {testData} from '../support/testuser';
import UserService from '../../src/services/UserService';
import XmppService from '../../src/services/xmpp/xmpp';
import verifyAction from '../support/verifyAction';
import * as actions from '../../src/actions';
import {expect} from 'chai';

function getAvatars() {
    var fs = require('fs');
    var res = [];
    var path = "/Users/aksonov/Documents/rn-chat/test/img/avatars";
    var avatars = fs.readdirSync(path);
    for (var i = 0; i < avatars.length; i++) {
        var fileName = avatars[i];
        var names = fileName.split('.')[0].split(' ');
        var lastName = names[names.length - 1];
        var firstName = names.splice(0, names.length - 1).join(' ');
        var username = firstName.replace(' ', '').toLowerCase() + lastName[0].toLowerCase() + (firstName.length * lastName.length + names.length);
        var fullName = path + '/' + fileName;
        var file = {name: fileName, body: fs.createReadStream(fullName), type: 'image/png'};
        var data = {height: 317, width: 214, size: fs.statSync(fullName).size, file, avatar: true};
        res.push({firstName, lastName, handle:username, data});
    }
    return res;
}
let userData = [];
let uuid = '1d3b191c-fcc0-11e5-96bd-0e7fe01e5a5f';
let sessionID = '$T$22iWnU4py79He7beJHXATOgDhYeDTFkEhZpc8IXXgyE=';
describe("Generate avatars", function() {
    //const avatars = getAvatars();
    //for (let i=0;i<avatars.length;i++) {
    //    step("Create user" + i, function (done) {
    //        let {data, ...avatar} = avatars[i];
    //        UserService.login({...testData(100 + i), ...avatar}).then(data=> {
    //            userData.push(data);
    //            done();
    //        });
    //    });
    //    step("Login user"+i, function (done){
    //        XmppService.login(userData[i].uuid, userData[i].sessionID).then(data=>{
    //            done();
    //        });
    //    });
    //    step("Set avatar"+i, function(done){
    //        if (userData[i].avatar){
    //            console.log("Avatar is already set for user"+i, userData[i].avatar);
    //            done();
    //        }
    //        let {data, ...avatar} = avatars[i];
    //        let url;
    //        verifyAction(fileActions.upload(data), [
    //            { type: fileActions.FILE_UPLOAD_REQUEST, ...data },
    //            { type: fileActions.FILE_UPLOAD_SUCCESS, compare: data=>url=data.data.referenceURL },
    //            { type: actions.PROFILE_UPDATE_REQUEST, compare: data=>expect(data.fields.avatar).to.be.equal(url)},
    //            { type: actions.PROFILE_UPDATE_SUCCESS, compare: data=>expect(data.data.avatar).to.be.equal(url)}
    //
    //        ], done);
    //
    //    });
    //    step("subscribe me", function(done) {
    //        verifyAction(Roster.subscribe(uuid), [{ type: Roster.REQUEST_SUBSCRIBE, user: uuid}], done);
    //    });
    //    step("send message to me", function(done) {
    //        let {data, ...avatar} = avatars[i];
    //        let msg = {body: "Hello from "+avatar.firstName+" "+avatar.lastName, to:uuid};
    //        verifyAction(message.sendMessage(msg), [{ type: message.MESSAGE_REQUEST, msg:msg },{ type: message.MESSAGE_SENT, dontcompare:true }], done);
    //    });
    //    step("Disconnect user"+i, function (done){
    //        XmppService.disconnect().then(data=>{
    //            done();
    //        });
    //    });
    //}

    //step("Login myself", function (done){
    //    XmppService.login(uuid, sessionID).then(data=>{
    //        done();
    //    });
    //});
    //for (let i=0;i<avatars.length;i++){
    //    step("authorize user"+i, function(done) {
    //        verifyAction(Roster.authorize(userData[i].uuid), [{ type: Roster.REQUEST_AUTHORIZE, user: userData[i].uuid}], done);
    //    });
    //}
    //step("Disconnect myself", function (done){
    //    XmppService.disconnect().then(data=>{
    //        done();
    //    });
    //});
});

