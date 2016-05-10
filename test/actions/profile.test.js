import * as actions from '../../src/actions';
import {login, logout, profileRequest, profileUpdate, ERROR, SUCCESS, LOGIN, PROFILE, PROFILE_UPDATE, LOGOUT} from '../../src/actions';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import createTestUser, {testData} from '../support/testuser';
import UserService from '../../src/services/UserService';

let authData = [testData(4), testData(5)];
let userData = [null, null];
const test = {email:'test@gmail.com', handle:'testHandle235', firstName:'Joth',lastName:'Smith'};
const test2 = {email:'test2@gmail.com', handle:'testHandle441',firstName:'Joth2'};

describe("Test profile operation", function() {
    after(function (done){
        Promise.all(userData.map(a=>UserService.logout(a))).then(res=>{
            done();
        });
    });
    step("connect user", function(done) {
        verifyAction(actions.login(authData[0]),
            [
                { type: actions.LOGIN, ...authData[0] },
                { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data},
                { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
            ], done);
    });
    //step("verify data", function(){
    //    console.log(userData[0]);
    //    expect(userData[0].sessionID).to.not.be.undefined;
    //    expect(userData[0].uuid).to.not.be.undefined;
    //    expect(userData[0].handle).to.not.be.undefined;
    //    expect(userData[0].email).to.be.undefined;
    //    expect(userData[0].firstName).to.undefined;
    //    expect(userData[0].lastName).to.undefined;
    //});
    //step("logout user", function(done){
    //    verifyAction(actions.logout(),
    //        [
    //            { type: actions.DISCONNECTED, ignoreothers:true }
    //        ], done);
    //});
    //step("change data", function(done){
    //    delete userData[0].sessionID;
    //    delete userData[0].uuid;
    //    verifyAction(login({...authData[0], ...test}),
    //        [
    //            { type: LOGIN,...authData[0], ...test },
    //            { type: LOGIN+SUCCESS, ignoreothers:true, compare:data=> {console.log("DATA:", data.data);userData[0]=data.data} },
    //            { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
    //        ], done);
    //});
    //
    //step("verify data", function(){
    //    expect(userData[0].sessionID).to.not.be.undefined;
    //    expect(userData[0].uuid).to.not.be.undefined;
    //    expect(userData[0].handle).to.equal(test.handle);
    //    expect(userData[0].email).to.equal(test.email)
    //    expect(userData[0].firstName).to.equal(test.firstName);
    //    expect(userData[0].lastName).to.equal(test.lastName);
    //});
    //step("logout user", function(done){
    //    verifyAction(actions.logout(),
    //        [
    //            { type: actions.DISCONNECTED, ignoreothers:true }
    //        ], done);
    //});
    //step("login user2", function(done){
    //    verifyAction(actions.login(authData[1]),
    //        [
    //            { type: actions.LOGIN, ...authData[1] },
    //            { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[1]=data.data},
    //            { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
    //            {type: actions.PROFILE+SUCCESS, ignoreothers:true, compare:data=>expect(data.data.handle).to.be.equal(userData[1].handle)}
    //        ], done);
    //});
    //step("request user data", function(done){
    //    let user = userData[0].uuid;
    //    verifyAction(profileRequest(user),
    //        [
    //            { type: PROFILE,  ignoreothers:true, user, fields:undefined },
    //            {
    //                type: PROFILE+SUCCESS, ignoreothers: true,
    //                data: {
    //                    avatar: undefined,
    //                    node: 'user/' + user, handle: test.handle, "firstName": "Joth",
    //                    "displayName": "Joth Smith",
    //                    "lastName": "Smith"
    //                }
    //            }
    //
    //        ], done);
    //});
    //step("request user data again to get cache", function(done){
    //    let user = userData[0].uuid;
    //    verifyAction(profileRequest(user),
    //        [
    //            { type: PROFILE, user, fields:undefined },
    //            { type: PROFILE+SUCCESS, data:{cached:true, node:'user/'+user, handle:test.handle,"firstName": "Joth",
    //              "displayName": "Joth Smith", "lastName": "Smith",avatar:undefined}},
    //            //{ type: PROFILE+SUCCESS, data:{avatar:undefined, node:'user/'+user, handle:test.handle}}
    //        ], done);
    //});
    //step("change user2 data", function(done){
    //    let user = userData[1].uuid;
    //    verifyAction(profileUpdate(user, test2),
    //        [{ type: PROFILE_UPDATE, user, fields:test2 }, { type: PROFILE_UPDATE+SUCCESS, data:{...test2, own:true, } }], done);
    //});
    //step("request user2 data", function(done){
    //    let user = userData[1].uuid;
    //    verifyAction(profileRequest(user, ['handle','avatar','first_name','last_name','email']),
    //        [
    //            { type: PROFILE, user, fields:['handle','avatar','first_name','last_name','email'] },
    //            { type: PROFILE+SUCCESS, data:{...test2, "displayName": "Joth2", avatar:undefined, node:'user/'+user, own:true}}
    //        ], done);
    //});
});


