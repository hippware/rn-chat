import * as actions from '../../src/actions/profile';
import {login, logout, profileRequest, profileUpdate, LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_REQUEST, PROFILE_SUCCESS} from '../../src/actions/profile';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import createTestUser, {testData} from '../support/testuser';
import UserService from '../../src/services/UserService';
import * as xmppActions from '../../src/actions/xmpp/xmpp';

let authData = [testData(2), testData(3)];
let userData = [null, null];
const test = {email:'test@gmail.com', handle:'testHandle235', firstName:'Joth',lastName:'Smith'};
const test2 = {email:'test2@gmail.com', handle:'testHandle441',firstName:'Joth2'};

describe("Test profile operation", function() {
    step("connect user", function(done) {
        verifyAction(actions.login(authData[0]),
            [
                { type: actions.LOGIN_REQUEST, ...authData[0] },
                { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response},
                { type: xmppActions.CONNECTED, dontcompare:true },
            ], done);
    });
    step("delete user", function(done){
        verifyAction(logout(userData[0]), [{ type: LOGOUT_REQUEST, ...userData[0] }, {type:xmppActions.DISCONNECTED},{ type: LOGOUT_SUCCESS }], done);
    });
    step("connect user", function(done) {
        verifyAction(actions.login(authData[0]),
            [
                { type: actions.LOGIN_REQUEST, ...authData[0] },
                { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response},
                { type: xmppActions.CONNECTED, dontcompare:true },
            ], done);
    });
    step("verify data", function(){
        expect(userData[0].sessionID).to.not.be.undefined;
        expect(userData[0].uuid).to.not.be.undefined;
        expect(userData[0].handle).to.not.be.undefined;
        expect(userData[0].email).to.be.undefined;
        expect(userData[0].firstName).to.undefined;
        expect(userData[0].lastName).to.undefined;
    });
    step("change data", function(done){
        delete userData[0].sessionID;
        delete userData[0].uuid;
        verifyAction(login({...authData[0], ...test}),
            [
                { type: LOGIN_REQUEST,...authData[0], ...test },
                { type: LOGIN_SUCCESS, compare:data=> {console.log("DATA:", data.response);userData[0]=data.response} },
            ], done);
    });

    step("verify data", function(){
        expect(userData[0].sessionID).to.not.be.undefined;
        expect(userData[0].uuid).to.not.be.undefined;
        expect(userData[0].handle).to.equal(test.handle);
        expect(userData[0].email).to.equal(test.email)
        expect(userData[0].firstName).to.equal(test.firstName);
        expect(userData[0].lastName).to.equal(test.lastName);
    });
    step("logout user", function(done){
        verifyAction(actions.logout(),
            [
                { type: actions.LOGOUT_REQUEST },
                {type:xmppActions.DISCONNECTED},
                { type: actions.LOGOUT_SUCCESS },
            ], done);
    });
    step("login user2", function(done){
        verifyAction(actions.login(authData[1]),
            [
                { type: actions.LOGIN_REQUEST, ...authData[1] },
                { type: actions.LOGIN_SUCCESS, compare:data=> userData[1]=data.response},
                { type: xmppActions.CONNECTED, dontcompare:true },
            ], done);
    });
    step("request user data", function(done){
        let user = userData[0].uuid;
        verifyAction(profileRequest(user),
            [
                { type: PROFILE_REQUEST, user, fields:undefined },
                { type: PROFILE_SUCCESS, data:{avatar:undefined, node:'user/'+user, handle:test.handle}}
            ], done);
    });
    step("request user data again to get cache", function(done){
        let user = userData[0].uuid;
        verifyAction(profileRequest(user),
            [
                { type: PROFILE_REQUEST, user, fields:undefined },
                { type: PROFILE_SUCCESS, data:{cached:true, node:'user/'+user, handle:test.handle}},
                { type: PROFILE_SUCCESS, data:{avatar:undefined, node:'user/'+user, handle:test.handle}}
            ], done);
    });
    step("change user2 data", function(done){
        let user = userData[1].uuid;
        verifyAction(profileUpdate(user, test2),
            [{ type: PROFILE_UPDATE_REQUEST, user, fields:test2 }, { type: PROFILE_UPDATE_SUCCESS, data:{...test2, own:true} }], done);
    });
    step("request user2 data", function(done){
        let user = userData[1].uuid;
        verifyAction(profileRequest(user, ['handle','avatar','firstName','lastName','email']),
            [
                { type: PROFILE_REQUEST, user, fields:['handle','avatar','firstName','lastName','email'] },
                { type: PROFILE_SUCCESS, data:{...test2, avatar:undefined, lastName:undefined, node:'user/'+user, own:true}}
            ], done);
    });
    step("delete user2", function(done){
        verifyAction(logout(userData[1]), [{ type: LOGOUT_REQUEST, ...userData[1] },{type:xmppActions.DISCONNECTED}, { type: LOGOUT_SUCCESS }], done);
    });
    step("connect user", function(done) {
        verifyAction(actions.login(authData[0]),
            [
                { type: actions.LOGIN_REQUEST, ...authData[0] },
                { type: actions.LOGIN_SUCCESS, compare:data=> userData[0]=data.response},
            ], done);
    });
    step("delete user", function(done){
        verifyAction(logout(userData[0]), [{ type: LOGOUT_REQUEST, ...userData[0] } ,{ type: LOGOUT_SUCCESS }], done);
    });
});


