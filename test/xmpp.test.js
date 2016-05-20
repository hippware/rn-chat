import * as xmpp from '../src/services/xmpp';
import * as profile from '../src/services/profile';
import {testDataNew} from './support/testuser';
import Rx from 'rx';
import {expect} from 'chai';

describe("xmpp", function() {
  // step("connect wrong user", async function(done) {
  //   const stream = xmpp.connect({user:"user1", password:"password1"});
  //   const callback = ({connected, error})=> {
  //     expect(connected).to.be.false;
  //     expect(error).to.be.equal("<failure xmlns='urn:ietf:params:xml:ns:xmpp-sasl'><not-authorized/></failure>");
  //     stream.offValue(callback);
  //     done();
  //   };
  //   stream.onValue(callback);
  // });
  //
  // step("register user and connect and remove", async function(done) {
  //   function callback({user, connected}) {
  //     expect(connected).to.be.true;
  //     expect(user).to.not.be.undefined;
  //     profile.profile.offValue(callback);
  //     done();
  //   };
  //   profile.profile.onValue(callback);
  //   profile.registerData.set(testDataNew(4));
  // });
  //
  step("edit user profile", async function(done) {
    function callback({user, connected}) {
      console.log("CALLBACK");
      // expect(connected).to.be.true;
      // expect(user).to.not.be.undefined;
      // //profile.editProfile.set({handle:"Hello world!"});
      // profile.profile.offValue(callback);
      done();
    };
    profile.updateProfile.onValue(callback);
    profile.registerData.set(testDataNew(5));
    profile.editProfile.modify(x=>({...x, handle:'test'}));
  });

  step("remove profile", async function(done){
    await profile.remove();
    done();

  });
  
});
