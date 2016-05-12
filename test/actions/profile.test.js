import * as actions from '../../src/actions';
import {login, logout, profileRequest, profileUpdate, ERROR, SUCCESS, LOGIN, PROFILE, PROFILE_UPDATE, LOGOUT} from '../../src/actions';
import Promise from 'promise';
import verifyAction from '../support/verifyAction';
import {expect} from 'chai';
import {testData} from '../support/testuser';
import profile from '../../src/services/xmpp/profile';

let authData = [testData(4)];
let userData = [null];
let profileData = [null];
const test2 = {email:'test2@gmail.com', handle:'testHandle441',firstName:'Joth2'};

describe("Test profile operation", function() {
  after(async function (done){
    await profile.delete();
    done();
  });
  step("connect user", function(done) {
    verifyAction(actions.login(authData[0]),
      [
        { type: actions.LOGIN, ...authData[0] },
        { type: actions.LOGIN+SUCCESS, ignoreothers:true, compare:data=> userData[0]=data.data},
        { type: actions.CONNECTED, ignoreothers:true, dontcompare:true},
        { type: actions.PROFILE+SUCCESS, ignoreothers:true, compare:data=> profileData[0]=data.data},
      ], done);
  });
  step("verify data", function(){
    expect(userData[0].sessionID).to.not.be.undefined;
    expect(userData[0].uuid).to.not.be.undefined;
    expect(profileData[0].node).to.not.be.undefined;
    expect(profileData[0].handle).to.be.undefined;
    expect(profileData[0].email).to.be.undefined;
    expect(profileData[0].firstName).to.undefined;
    expect(profileData[0].lastName).to.undefined;
  });
  step("change user data", function(done){
    let user = userData[0].uuid;
    verifyAction(profileUpdate(user, test2),
      [{ type: PROFILE_UPDATE, user, fields:test2 }, { type: PROFILE_UPDATE+SUCCESS, data:{...test2, own:true, } }], done);
  });
  step("logout user", function(done){
    verifyAction(actions.logout(),
      [
        { type: actions.DISCONNECTED, ignoreothers:true }
      ], done);
  });
  step("connect user", function(done) {
    verifyAction(actions.login(authData[0]),
      [
        { type: actions.CONNECTED, ignoreothers:true, dontcompare:true}
      ], done);
  });
  step("request user data", function(done){
    let user = userData[0].uuid;
    verifyAction(profileRequest(user, ['handle','avatar','first_name','last_name','email']),
      [
        { type: PROFILE, user, ignoreothers:true, fields:['handle','avatar','first_name','last_name','email'] },
        { type: PROFILE+SUCCESS, ignoreothers:true, data:{...test2, "displayName": "Joth2", avatar:undefined, node:'user/'+user, own:true}}
      ], done);
  });
});


