import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import archive from '../src/store/archive';
import profile from '../src/store/profile';
import message from '../src/store/message';
import model from '../src/model/model';
import Profile from '../src/model/Profile';
let user1, user2, user3;
describe("xmpp", function() {
  // step("register/login user3", async function(done){
  //   const data = testDataNew(7);
  //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //   const logged = await xmpp.connect(user, password, server);
  //   user3 = logged.user;
  //   model.server = server;
  //   await xmpp.disconnect();
  //   done();
  // });
  // step("register/login user1", async function(done){
  //   const data = testDataNew(8);
  //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //   const logged = await xmpp.connect(user, password, server);
  //   user1 = logged.user;
  //   model.server = server;
  //   await xmpp.disconnect();
  //   done();
  // });
  // step("register/login user2", async function(done){
  //   const data = testDataNew(9);
  //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //   const logged = await xmpp.connect(user, password, server);
  //   user2 = logged.user;
  //   model.server = server;
  //   message.sendMessageToXmpp({body:'hello world!', to: user1});
  //   message.sendMessageToXmpp({body:'hello world2!', to: user3});
  //   await xmpp.disconnect();
  //   done();
  // });
  
  step("register/login user1", async function(done){
    const data = testDataNew(9);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await profile.connect(user, password, server);
    user1 = logged.user;
    model.server = server;
    const res = await archive.conversations();
    expect(res.length).to.be.equal(2);
    await archive.load(res[0]);
    await xmpp.disconnect();
    done();
  });
});