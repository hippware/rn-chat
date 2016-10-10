import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import profile from '../src/store/profile';
import bot from '../src/store/bot';
import statem from '../gen/state';
import model from '../src/model/model';

describe("bot", function() {
  beforeEach(function(){
    console.log("CREATE STATEM");
    statem.start();
  });
  
  step("expect creation", async function(done){
    try {
      const data = testDataNew(11);
      // register
      when(()=>statem.promoScene.active, ()=> {
        console.log("REGISTER DATA2");
        setTimeout(()=>statem.promoScene.signIn(data));
      });
  
      // enter handle
      when(()=>statem.signUpScene.active, ()=> {
        console.log("UPDATE HANDLE2");
        setTimeout(()=>statem.signUpScene.register({handle:'test2'}));
      });
  
      when(()=>statem.drawerTabs.active && model.profile, ()=>{
        done();
      });
    } catch (e){
      done(e)
    }
  });
  

});