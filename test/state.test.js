import {expect} from 'chai';
import {testDataNew} from './support/testuser';
import {when, spy} from 'mobx';
import statem from '../gen/state';
import profileStore from '../src/store/profile';
import model from '../src/model/model';

describe("state", function() {
  beforeEach(function(){
    console.log("CREATE STATEM");
    statem.start();
  });
  
  step("register/login", function(done) {
    const register = testDataNew(1);
    
    // register
    when(()=>statem.promoScene.active, ()=> {
      setTimeout(()=>statem.promoScene.signIn(register));
    });
    
    // enter handle
    when(()=>statem.signUpScene.active && model.profile.loaded, ()=> {
      setTimeout(()=>statem.signUpScene.register({handle:'test'}));
    });
    
    
    // go to my account
    when(()=>statem.drawerTabs.active, ()=>{
      setTimeout(statem.drawerTabs.myAccountScene)
    });
    
    // remove
    when(()=>statem.myAccountScene.active, ()=>{
      profileStore.remove();
      when(()=>statem.promoScene.active, done);
    });
  
  
  });
  step("register/login2", function(done) {
    const register = testDataNew(1);
    
    // register
    when(()=>statem.promoScene.active, ()=> {
      setTimeout(()=>statem.promoScene.signIn(register));
    });
    
    // enter handle
    when(()=>statem.signUpScene.active && model.profile.loaded, ()=> {
      setTimeout(()=>statem.signUpScene.register({handle:'test'}));
    });
    
    
    // go to my account
    when(()=>statem.drawerTabs.active, ()=>{
      setTimeout(statem.drawerTabs.myAccountScene)
    });
    
    // remove
    when(()=>statem.myAccountScene.active, ()=>{
      profileStore.remove();
      when(()=>statem.promoScene.active, done);
    });
    
    
  });
});