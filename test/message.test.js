import {expect} from 'chai';
import {testDataNew} from './support/testuser';
import {when, spy} from 'mobx';
import statem from '../gen/state';
import profileStore from '../src/store/profile';
import model from '../src/model/model';
import message from '../src/store/message';
import * as xmpp from '../src/store/xmpp/xmpp';

let profile2;
describe("message", function() {
  beforeEach(function(){
    console.log("CREATE STATEM");
    statem.start();
  });
  after(async function(done){
    for (let data of [testDataNew(7), testDataNew(8)]){
      const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
      await profileStore.connect(user, password, server);
      when(()=>model.profile, async () => {
        await profileStore.remove();
      });
    }
    done();
  });
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
      setTimeout(profileStore.logout);
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
      setTimeout(profileStore.logout);
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
      setTimeout(profileStore.logout);
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
      setTimeout(profileStore.remove);
      when(()=>statem.promoScene.active, done);
    });
    
    
  });
  step("register/login N1 again", function(done) {
    const register = testDataNew(1);
    
    // register
    when(()=>statem.promoScene.active, ()=> {
      setTimeout(()=>statem.promoScene.signIn(register));
    });
    
    // enter handle
    when(()=>statem.signUpScene.active && model.profile.loaded, ()=> {
      setTimeout(()=>statem.signUpScene.register({handle:'test222'}));
    });
    
    
    // go to my account
    when(()=>statem.drawerTabs.active, ()=>{
      setTimeout(statem.drawerTabs.myAccountScene)
    });
    
    // remove
    when(()=>statem.myAccountScene.active, ()=>{
      setTimeout(profileStore.remove);
      when(()=>statem.promoScene.active, done);
    });
    
    
  });
});