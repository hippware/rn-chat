import {expect} from 'chai';
import {testDataNew} from './support/testuser';
import {when, spy} from 'mobx';
import statem from '../gen/state';
import profileStore from '../src/store/profile';
import model from '../src/model/model';
import message from '../src/store/message';
import * as xmpp from '../src/store/xmpp/xmpp';

let profile2;
let user1, user2;

describe("message", function() {
  step("register/login user2", async function(done){
    const data = testDataNew(9);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user2 = logged.user;
    done();
  });
  step("logout!", async function (done){
    await xmpp.disconnect(null);
    done();
  });
  step("register/login user1", async function(done){
    const data = testDataNew(8);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await profileStore.connect(user, password, server);
    user1 = logged.user;
    done();
  });
  step("update profile", async function(done){
    model.user = user1;
    model.profile = profileStore.create(user1);
    try {
      await profileStore.update({handle: 'test8'});
    } catch (e){
      console.error(e);
    }
    when(()=>model.profile.handle == 'test8', done);
  });
  step("upload avatar", async function(done){
    let fileName = __dirname + "/img/test.jpg";
    let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream(fileName), type: 'image/jpeg'};
    let data = {height:300, width:300, size:3801, file};
    try {
      await profileStore.uploadAvatar(data);
    } catch (e){
      console.error(e);
    }
    when(()=>model.profile && model.profile.avatar && model.profile.avatar.source, done);
  });
  step("logout", async function (done){
    await profileStore.logout();
    done();
  });
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

describe("message", function() {
  beforeEach(function(){
    console.log("CREATE STATEM");
    statem.start();
  });
  // after(async function(done){
  //   for (let data of [testDataNew(7), testDataNew(8)]) {
  //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //     await profileStore.connect(user, password, server);
  //     await profileStore.remove();
  //   }
  //   done();
  // });
  step("register/login8", function(done) {
    const register = testDataNew(8);
    
    // register
    when(()=>statem.promoScene.active, ()=> {
      console.log("REGISTER DATA2");
      setTimeout(()=>statem.promoScene.signIn(register));
    });
    
    // enter handle
    when(()=>statem.signUpScene.active, ()=> {
      console.log("UPDATE HANDLE2");
      setTimeout(()=>statem.signUpScene.register({handle:'test2'}));
    });
    
    when(()=>statem.drawerTabs.active && model.profile, ()=>{
      profile2 = model.profile;
      setTimeout(statem.myAccountScene.logout);
      when(()=>statem.promoScene.active, done);
    });
  });
  step("register/login7", function(done) {
    const register = testDataNew(7);

    // register
    when(()=>statem.promoScene.active, ()=> {
      console.log("REGISTER DATA");
      setTimeout(()=>statem.promoScene.signIn(register));
    });

    // enter handle
    when(()=>statem.signUpScene.active, ()=> {
      console.log("UPDATE HANDLE");
      setTimeout(()=>statem.signUpScene.register({handle:'test'}));
    });

    // go to create message
    when(()=>statem.logged.active, ()=>{
      console.log("GO TO CREATE MESSAGE");
      setTimeout(()=>statem.logged.createMessageContainer())
    });

    // go to create message
    when(()=>statem.selectFriends.active, ()=>{
      console.log("CREATE MESSAGE");
      setTimeout(()=>statem.selectFriends.createMessage(profile2));
    });

    // go to create message
    when(()=>statem.chat.active && model.profile, async ()=>{
      let fileName = "test/img/test.jpg";
      let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'),
        type: 'image/jpeg'};
      let data = {height:300, width:300, size:3801, file};
      await message.sendMedia({...data, to: profile2.user});
      //await message.sendMessage({to: profile2.user, body:'hello world!'});
      setTimeout(statem.myAccountScene.logout);
      when(()=>statem.promoScene.active, done);
    });

  });

  step("register/login8 and expect messages", function(done) {
    const register = testDataNew(8);

    // register
    when(()=>statem.promoScene.active, ()=> {
      setTimeout(()=>statem.promoScene.signIn(register));
    });

    // enter handle
    when(()=>statem.logged.active && model.chats._list.length > 0, ()=> {
      setTimeout(statem.myAccountScene.logout);
      when(()=>statem.promoScene.active, done);
    });
  });
  
  
  step("register/login N1 test data", function(done) {
    const register = testDataNew(1);
    
    // register
    when(()=>statem.promoScene.active, ()=> {
      setTimeout(()=>statem.promoScene.signIn(register));
    });
    
    // enter handle
    when(()=>statem.signUpScene.active && model.profile.loaded, ()=> {
      setTimeout(()=>statem.signUpScene.register({handle:'test111'}));
    });
    
    
    // go to my account
    when(()=>statem.drawerTabs.active, ()=>{
      setTimeout(statem.drawerTabs.myAccountScene)
    });
    
    // remove
    when(()=>statem.myAccountScene.active, ()=>{
      setTimeout(()=>statem.myAccountScene.logout({remove: true}));
      when(()=>!model.connected, done);
    });
    
    
  });
  step("register/login N1 again", function(done) {
    const register = testDataNew(1);
    
    // register
    when("1", ()=>statem.promoScene.active, ()=> {
      setTimeout(()=>statem.promoScene.signIn(register));
    });
    
    // enter handle
    when("2", ()=>statem.signUpScene.active && model.profile.loaded, ()=> {
      setTimeout(()=>statem.signUpScene.register({handle:'test222'}));
    });
    
    
    // go to my account
    when("3", ()=>statem.drawerTabs.active, ()=>{
      setTimeout(statem.drawerTabs.myAccountScene)
    });
    
    // remove
    when("4", ()=>statem.myAccountScene.active, ()=>{
      setTimeout(()=>statem.myAccountScene.logout({remove:true}));
      when(()=>!model.connected, done);
    });
    
    
  });
  
  
  step("register/login N7 again", function(done) {
    const register = testDataNew(7);
    
    // register
    when(()=>statem.promoScene.active, ()=> {
      setTimeout(()=>statem.promoScene.signIn(register));
    });
    
    // go to my account
    when(()=>statem.drawerTabs.active, ()=>{
      setTimeout(statem.drawerTabs.myAccountScene)
    });
    
    // remove
    when(()=>statem.myAccountScene.active, ()=>{
      setTimeout(()=>statem.myAccountScene.logout({remove:true}));
      when(()=>!model.connected, done);
    });
    
    
  });
});