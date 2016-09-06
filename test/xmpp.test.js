import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import profile from '../src/store/profile';
import model from '../src/model/model';
import Profile from '../src/model/Profile';
require('strophejs-plugins/pubsub/strophe.pubsub');
require('strophejs-plugins/roster/strophe.roster');
let user1, user2;
describe("xmpp", function() {
  // step("register/login user2", async function(done){
  //   const data = testDataNew(9);
  //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //   const logged = await xmpp.connect(user, password, server);
  //   user2 = logged.user;
  //   done();
  // });
  // step("logout", async function (done){
  //   await xmpp.disconnect();
  //   done();
  // });
  step("register/login user1", async function(done){
    const data = testDataNew(8);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user1 = logged.user;
    model.server = server;
    done();
  });
  // step("update profile", async function(done){
  //   model.user = user1;
  //   model.profile = profile.create(user1);
  //   try {
  //     await profile.update({handle: 'test8'});
  //   } catch (e){
  //     console.error(e);
  //   }
  //   when(()=>model.profile.handle == 'test8', done);
  // });
  // step("upload avatar", async function(done){
  //   let fileName = "test/img/test.jpg";
  //   let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
  //   let data = {height:300, width:300, size:3801, file};
  //   try {
  //     await profile.uploadAvatar(data);
  //   } catch (e){
  //     console.error(e);
  //   }
  //   when(()=>model.profile && model.profile.avatar && model.profile.avatar.source, done);
  // });
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