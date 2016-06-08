import RootStore from '../src/store/RootStore';
import constitute from '../thirdparty/constitute';
const root = constitute(RootStore);
import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
const {profile, model, message, xmppStore} = root;

let user2;

//spy(c=>console.log(c));
describe("message", function() {
  step("register/login", function(done){
    const register = testDataNew(10);
    profile.register(register.resource, register.provider_data);
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
  // step("message", function(done) {
  //   expect(mock.model.chats.list.length).to.be.equal(2);
  //   expect(mock.model.chats.get("groupchat").participants).to.be.not.undefined;
  //   mock.model.tryToConnect = true;
  //   when (()=>mock.model.connected, done)
  //
  // });
})