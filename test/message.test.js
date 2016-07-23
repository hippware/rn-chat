import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';

import profile from '../src/store/profile';
import model from '../src/model/model';
import message from '../src/store/message';
import xmpp from '../src/store/xmpp/xmpp';
import statem from '../gen/state';

let user2;
let group;
//spy(c=>console.log(c));
describe("message", function() {
  step("register/login", function(done){
    const register = testDataNew(10);
    when(statem.promoScene.active, ()=>{
      statem.promoScene.success(register);
    });
    
    when(()=>model.profile && model.connected && model.server, ()=>{
      user2 = model.profile;
      done();
    })
  });
  step("logout", function (done){
    xmppStore.logout();
    when(()=>!model.connected && !model.profile, done)
  });
  step("register/login", function(done){
    const register = testDataNew(11);
    profile.register(register.resource, register.provider_data);
    when(()=>model.profile && model.connected && model.server, done)
  });
  // step("group message", function(done){
  //   message.createGroupChat("test",[user2]);
  //   when(()=>model.chats.list.length, done);
  // });
  step("logout", function (done){
    xmppStore.logout();
    when(()=>!model.connected && !model.profile, done)
  });
  // step("register/login user2 and expect messages", function(done){
  //   const register = testDataNew(10);
  //   profile.register(register.resource, register.provider_data);
  //   when(()=>model.profile && model.connected && model.server && model.chats.list.length, done)
  // });
  // step("logout", function (done){
  //   xmppStore.logout();
  //   when(()=>!model.connected && !model.profile, done)
  // });
  // step("message", function(done) {
  //   expect(mock.model.chats.list.length).to.be.equal(2);
  //   expect(mock.model.chats.get("groupchat").participants).to.be.not.undefined;
  //   mock.model.tryToConnect = true;
  //   when (()=>mock.model.connected, done)
  //
  // });
})