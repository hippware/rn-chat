import { testData } from '../test/support/testuser'
import UserService from '../src/services/UserService'
import XmppService from '../src/services/xmpp/xmpp'
import verifyAction from '../test/support/verifyAction'
import * as actions from '../src/actions'
import { SUCCESS, ERROR } from '../src/actions'
import { expect } from 'chai'

function getAvatars () {
    var fs = require('fs')
    var res = []
    var path = '/Users/aksonov/Documents/rn-chat/test/img/avatars'
    var avatars = fs.readdirSync(path)
    for (var i = 0; i < avatars.length; i++) {
        var fileName = avatars[i]
        var names = fileName.split('.')[0].split(' ')
        var lastName = names[names.length - 1]
        var firstName = names.splice(0, names.length - 1).join(' ')
        var username = firstName.replace(' ', '').toLowerCase() + lastName[0].toLowerCase() + (firstName.length * lastName.length + names.length)
        var fullName = path + '/' + fileName
        var file = {name: fileName, body: fs.createReadStream(fullName), type: 'image/png'}
        var data = {height: 317, width: 214, size: fs.statSync(fullName).size, file, avatar: true}
        res.push({firstName, lastName, handle: username, data})
    }
    return res
}
let userData = []
//let uuid = '52ed2a32-0df0-11e6-8dac-0ed7e4a33b15';
let uuid = '407ad12e-0e27-11e6-a26c-0ed7e4a33b15' // steve
let sessionID = '$T$D/v9VGcsfckGxtOVH0jf4BFqZ7Bzu4XNXwnG2Xk8il8='

describe('Generate avatars', function () {
    const avatars = getAvatars()
    for (let i = 0; i < avatars.length; i++) {
        step('Create and login user' + i, function (done) {
            let {data, ...avatar} = avatars[i]
            let test = {...testData(100 + i), ...avatar}
            verifyAction(actions.login(test),
                [
                    {type: actions.LOGIN, ...test},
                    {type: actions.LOGIN + SUCCESS, ignoreothers: true, compare: data => userData.push(data.data)},
                    {type: actions.CONNECTED, ignoreothers: true, dontcompare: true},
                ], done)

        })
        step('Set avatar' + i, function (done) {
            if (userData[i].avatar) {
                console.log('Avatar is already set for user' + i, userData[i].avatar)
                done()
            }
            let {data, ...avatar} = avatars[i]
            let url
            verifyAction(actions.upload(data), [
                {type: actions.FILE_UPLOAD, ...data},
                {
                    type: actions.FILE_UPLOAD + SUCCESS,
                    ignoreothers: true,
                    compare: data => url = data.data.referenceURL
                },
                {
                    type: actions.PROFILE_UPDATE + SUCCESS,
                    ignoreothers: true,
                    compare: data => expect(data.data.avatar).to.be.equal(url)
                }

            ], done)

        })
        step('subscribe me', function (done) {
            verifyAction(actions.subscribe(uuid), [{type: actions.SUBSCRIBE, user: uuid}], done)
        })
        step('send message to me', function (done) {
            let {data, ...avatar} = avatars[i]
            let msg = {body: 'Hello from ' + avatar.firstName + ' ' + avatar.lastName, to: uuid}
            verifyAction(actions.sendMessage(msg), [{type: actions.MESSAGE, msg: msg}, {
                type: actions.MESSAGE + SUCCESS,
                ignoreothers: true,
                dontcompare: true
            }], done)
        })
        step('Disconnect user' + i, function (done) {
            verifyAction(actions.logout(),
                [
                    {type: actions.DISCONNECTED, ignoreothers: true}
                ], done)
        })
    }

    //step("Login myself", function (done){
    //    verifyAction({type:actions.LOGIN+SUCCESS, data:{uuid, sessionID}},
    //        [
    //            { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
    //        ], done);
    //});
    //for (let i=0;i<avatars.length;i++){
    //    step("authorize user"+i, function(done) {
    //        verifyAction(actions.authorize(userData[i].uuid), [{ type: actions.AUTHORIZE, user: userData[i].uuid}], done);
    //    });
    //}
    //step("Disconnect myself", function (done){
    //    verifyAction(actions.logout(),
    //        [
    //            { type: actions.DISCONNECTED, ignoreothers:true }
    //        ], done);
    //});
})

