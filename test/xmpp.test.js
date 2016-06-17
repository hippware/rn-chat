import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import RootStore from '../src/store/RootStore';
import constitute, {Container} from '../thirdparty/constitute';
// import Storage from '../src/store/Storage';
// const container = new Container();
// container.bindClass(Storage, class {
//   load(){return testDataNew(11)}
// });
// const root: RootStore = container.constitute(RootStore);
const root: RootStore = constitute(RootStore);

import Model from '../src/model/Model';
const {profile, model, message, xmpp} = root;
let user1, user2;

describe("xmpp", function() {
  step("register/login", function(done){
    // expect PromoScene as start scene
    expect(root.state.state).to.be.equal("PromoScene");
    // emulate registration request
    root.state.transition("success", testDataNew(9));
    when(()=>root.state.state === "SignUpScene", ()=>{
      expect(root.model.user).to.be.defined;
      user2 = root.model.user;
      done();
    })
  });
  step("logout", function (done){
    // expect PromoScene as start scene
    expect(root.state.state).to.be.equal("SignUpScene");
    root.profile.logout();
    when(()=>root.state.state === "PromoScene", ()=>{
      expect(root.model.user).to.be.undefined;
      done();
    })
  });
//   step("register/login user1", function(done){
//     const register = testDataNew(8);
//     profile.register(register.resource, register.provider_data);
//     when(()=>model.profile && model.profile.loaded && model.connected, done);
//     //when(()=>model.profile && model.profile.loaded && !model.profile.handle && model.connected, done);
//   });
//
//   step("update profile", function(done){
//     profile.update({handle: 'test8'});
//     when(()=>!model.updating && model.profile.handle == 'test8', done);
//   });
//
//   step("upload avatar", function(done){
//     let fileName = "test/img/test.jpg";
//     let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
//     let data = {height:300, width:300, size:3801, file};
//     profile.uploadAvatar(data);
//     when(()=>model.profile && model.profile.avatar && model.profile.avatar.source, done);
//   });
//
//   step("send message to user2", function(done){
//     message.sendMessage({body: "hello world2", to:user2, id:"1234"});
//     when(()=>model.chats.list.length > 0, done);
//   });
//
//   step("logout", function (done){
//     xmppStore.logout();
//     when(()=>!model.connected && !model.profile, done)
//   });
//
//   step("register/login user1 and get updated value", function(done){
//     const register = testDataNew(8);
//     profile.register(register.resource, register.provider_data);
// //    when(()=>model.profile && model.profile.handle === 'test8', done);
//     when(()=>model.profile && model.profile.avatar && model.profile.handle === 'test8', done);
//   });
//
//   step("logout", function (done){
//     xmppStore.logout();
//     when(()=>!model.connected, done)
//   });
//
//   step("register/login user2 and expect messages", function(done){
//     expect(model.chats.list.length).to.be.equal(0);
//     const register = testDataNew(9);
//     profile.register(register.resource, register.provider_data);
//     when(()=> model.profile && model.profile.loaded && model.chats.list.length === 1, done);
//   });
//
//   step("remove", function (done){
//     profile.remove();
//     when(()=>!model.connected, done)
//   });
//
//
//   step("register/login user1", function(done){
//     const register = testDataNew(8);
//     profile.register(register.resource, register.provider_data);
//     when(()=>model.profile && model.profile.loaded, done);
//   });
//
//   step("remove", function (done){
//     profile.remove();
//     when(()=>!model.connected, done)
//   });


});
