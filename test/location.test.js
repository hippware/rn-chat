import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import location from '../src/store/location';
import profile from '../src/store/profile';
import model from '../src/model/model';
import Profile from '../src/model/Profile';
let user1, user2;
describe("xmpp", function() {
  step("register/login user1", async function(done){
    const data = testDataNew(8);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user1 = logged.user;
    model.server = server;
    location.start();
    await location.share({latitude:10, longitude:10});
    done();
  });
  
});