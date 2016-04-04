import xmpp from '../../src/reducers/xmpp';
import * as Actions from '../../src/actions/xmpp/xmpp';
import * as Roster from '../../src/actions/xmpp/roster';
import {processLogin, registerRequest, processLogout, processRegistration, REGISTER_REQUEST, LOGOUT_SUCCESS, REGISTER_SUCCESS, LOGOUT_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS} from '../../src/actions/profile';
import {processProfileRequest, processProfileUpdateRequest, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESPONSE, PROFILE_REQUEST, PROFILE_RESPONSE} from '../../src/actions/xmpp/profile';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';
import fs from 'fs';
import assert from 'assert';

const testUser = {
    userID:'000000',
    phoneNumber:'+1555000000',
    resource:'testing',
    authTokenSecret: '',
    authToken: '',
    emailAddressIsVerified: false,
    'X-Auth-Service-Provider': '',
    emailAddress: '',
    'X-Verify-Credentials-Authorization': ''
};

function testUserData(num){
    return {...testUser, userID: testUser.userID+num, phoneNumber: testUser.phoneNumber+num};
}

let user = testUserData(6);
let user2 = testUserData(4);
let userData = null;
let userData2 = null;

describe("Test profile operation", function() {
    after(function(done) {
        verifyAction(processLogout(userData), [{ type: LOGOUT_REQUEST }, { type: LOGOUT_SUCCESS, dontcompare:true }], done);
    });
    before(function() {
        console.log('before hook');
    });
    step("login under test user", function (done){
        verifyAction(processLogin(user), [{ type: LOGIN_REQUEST, response: user },{ type: LOGIN_SUCCESS, compare: data=>userData=data.response}], done);

    });
    step("verify data", function(){
        assert(userData.sessionID != null, "SessionID should not be null: "+JSON.stringify(userData));
        assert(userData.uuid != null, "uuid should not be null: "+JSON.stringify(userData));
        assert.equal(userData.handle, undefined, "Handle should be empty");
        assert(!userData.email, "Email should be empty "+JSON.stringify(userData));
        assert(!userData.firstName, "First Name should be empty "+JSON.stringify(userData));
        assert(!userData.lastName, "Last Name should be empty "+JSON.stringify(userData));
    });
    step("change data", function(done){
        let data = {email:'test@gmail.com', handle:'testHandle',firstName:'Joth',lastName:'Smith'};
        verifyAction(processRegistration({...userData, ...data}),
            [{ type: REGISTER_REQUEST,...userData, ...data }, { type: REGISTER_SUCCESS, dontcompare:true }], done);
    });
    step("clear data", function(){
        userData = null;
    });
    step("login under test user", function (done){
        verifyAction(processLogin(user), [{ type: LOGIN_REQUEST, response: user },{ type: LOGIN_SUCCESS, compare: data=>userData={...user, ...data.response}}], done);

    });
    step("verify data", function(){
        assert(userData.sessionID != null, "SessionID should not be null: "+JSON.stringify(userData));
        assert(userData.uuid != null, "uuid should not be null: "+JSON.stringify(userData));
        assert.equal(userData.handle, "testHandle");
        assert.equal(userData.email, "test@gmail.com");
        assert.equal(userData.firstName, "Joth");
        assert.equal(userData.lastName, "Smith");
    });
    step("login user2", function(done){
        verifyAction(processLogin(user2), [{ type: LOGIN_REQUEST, response: user2 },{ type: LOGIN_SUCCESS, compare: data=>userData2=data.response}], done);
    });
    step("connect user2", function(done) {
        verifyAction(Roster.processLogin(userData2.uuid, userData2.sessionID), [{ type: Actions.REQUEST_LOGIN, username:userData2.uuid, password:userData2.sessionID }, { type: Actions.CONNECTED }], done);
    });
    step("request user data", function(done){
        let user = 'user/'+userData.uuid;
        verifyAction(processProfileRequest(user), [{ type: PROFILE_REQUEST, user },{ type: PROFILE_RESPONSE, data:{avatar:undefined, node:user, handle:'testHandle'}}], done);
    });
    step("change user2 data", function(done){
        let user = 'user/'+userData2.uuid;
        let data = {email:'test2@gmail.com', handle:'testHandle441',firstName:'Joth2'};
        verifyAction(processProfileUpdateRequest(user, data),
            [{ type: PROFILE_UPDATE_REQUEST, user, data }, { type: PROFILE_UPDATE_RESPONSE, data:{node:user} }], done);
    });
    step("request user2 data", function(done){
        let user = 'user/'+userData2.uuid;
        verifyAction(processProfileRequest(user, ['handle','avatar','firstName','lastName']), [{ type: PROFILE_REQUEST, user },{ type: PROFILE_RESPONSE, data: {avatar:undefined, node:user, firstName:'Joth2', handle:'testHandle441',lastName:undefined}}], done);
    });
    step("change user2 data", function(done){
        let user = 'user/'+userData2.uuid;
        let data = { handle:'testHandle447'};
        verifyAction(processProfileUpdateRequest(user, data),
            [{ type: PROFILE_UPDATE_REQUEST, user, data }, { type: PROFILE_UPDATE_RESPONSE, data:{ node:user }}], done);
    });
    step("request user2 data", function(done){
        let user = 'user/'+userData2.uuid;
        verifyAction(processProfileRequest(user, ['handle','avatar','firstName','lastName']), [{ type: PROFILE_REQUEST, user },{ type: PROFILE_RESPONSE, data: {avatar:undefined, node:user, firstName:'Joth2', handle:'testHandle447',lastName:undefined}}], done);
    });
    step("delete user2", function(done){
        verifyAction(processLogout(userData2), [{ type: LOGOUT_REQUEST }, { type: LOGOUT_SUCCESS, dontcompare:true }], done);
    });
    step("clear data", function(){
        userData2 = null;
    });
    step("disconnect", function(done) {
        verifyAction(Actions.disconnect(), [{ type: Actions.REQUEST_DISCONNECT }], done);
    });
});


