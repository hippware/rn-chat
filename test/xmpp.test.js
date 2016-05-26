import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import {profile, file as fileStore, model, message} from '../src/store/root';
import xmpp from '../src/store/xmpp/xmpp';
let user1, user2;

describe("xmpp", function() {
  step("register/login & disconnect user2", function(done){
    const register = testDataNew(9);
    profile.register(register.resource, register.provider_data);
    when(()=>model.profile && model.connected,
      ()=>{user2 = model.profile.user;model.clear();xmpp.disconnect().then(()=>done())})
  });
  step("register/login user1", function(done){
    const register = testDataNew(8);
    profile.register(register.resource, register.provider_data);
    when(()=>model.profile && model.profile.loaded && model.connected, done);
    //when(()=>model.profile && model.profile.loaded && !model.profile.handle && model.connected, done);
  });

  step("update profile", function(done){
    profile.update({handle: 'test8'});
    when(()=>!model.updating && model.profile.handle == 'test8', done);
  });

  step("upload avatar", function(done){
    let fileName = "test/img/test.jpg";
    let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'), type: 'image/jpeg'};
    let data = {height:300, width:300, size:3801, file};
    profile.uploadAvatar(data);
    when(()=>model.profile && model.profile.avatar && model.profile.avatar.source, done);
  });
  
  step("send message to user2", function(done){
    message.sendMessage({body: "hello world2", to:user2, id:"1234"});
    when(()=>model.chats.list.length === 1, ()=>{
      console.log(model.chats);
      done();
    })
  });

  step("disconnect", async function(done){
    await xmpp.disconnect();
    model.clear();
    done();
  });

  step("register/login user1 and get updated value", function(done){
    const register = testDataNew(8);
    profile.register(register.resource, register.provider_data);
//    when(()=>model.profile && model.profile.handle === 'test8', done);
    when(()=>model.profile && model.profile.avatar && model.profile.avatar.source && model.profile.handle === 'test8', done);
  });
  
  step("disconnect", async function(done){
    await xmpp.disconnect();
    model.clear();
    done();
  });
  
  step("register/login user2 and expect messages", function(done){
    const register = testDataNew(9);
    profile.register(register.resource, register.provider_data);
    when(()=> model.profile && model.profile.loaded && model.chats.list.length === 1, done);
  });

  step("disconnect and remove2", async function(done){
    await profile.remove();
    await xmpp.disconnect();
    model.clear();
    done();
  });
  
  step("register/login user1", function(done){
    const register = testDataNew(8);
    profile.register(register.resource, register.provider_data);
    when(()=>model.profile && model.profile.loaded, done);
  });

  step("disconnect and remove", async function(done){
    await profile.remove();
    await xmpp.disconnect();
    model.clear();
    done();
  });


  //
  //
  //
  // step("send message to user2", function(done){
  //  
  //   when(()=>profile.profile.avatar && profile.profile.avatar.source && profile.profile.handle === 'test555', done);
  // });
  //
  //
  // step("disconnect", async function(done){
  //   await xmpp.disconnect();
  //   done();
  // });
  //
});
