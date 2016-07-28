import {expect} from 'chai';
import {testDataNew} from './support/testuser';
import {when, spy} from 'mobx';
import statem from '../gen/state';
statem.start();
describe("profile", function() {
  step("register/login", function(done) {
    const register = testDataNew(1);
    when(()=>statem.promoScene.active, ()=> {
      statem.promoScene.success(register);
    });
  });
});