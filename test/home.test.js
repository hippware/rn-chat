import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import home from '../src/store/xmpp/home';
import event from '../src/store/event';
import model from '../src/model/model';
import message from '../src/store/message';
import roster from '../src/store/xmpp/roster';
import profile from '../src/store/profile';

let user1, user2, password, server;
describe("home", function() {
  step("register/login user1", async function(done){
    const data = testDataNew(13);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user1 = logged.user;
    await xmpp.disconnect();
    done();
  });
  step("register/login user2", async function(done){
    try {
      const data = testDataNew(14);
      const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
      const logged = await xmpp.connect(user, password, server);
      user2 = logged.user;
      message.sendMessageToXmpp({body: "hello world22223456", to: user1, id: "1234"});
      message.sendMessageToXmpp({body: "hello world22223457", to: user1, id: "1235"});
      await xmpp.disconnect();
      done();
    } catch (e){
      done(e);
    }
  });
  
  
  step("expect creation", async function(done) {
    try {
      event.start();
      expect(model.events.list.length).to.be.equal(0);
      const data = testDataNew(13);
      const response = await xmpp.register(data.resource, data.provider_data);
      user = response.user;
      password = response.password;
      server = response.server;
      const logged = await xmpp.connect(user, password, server);
      const {items, version} = await home.items();
      console.log("RES:", JSON.stringify(items));
      home.request(version);
      await home.publish("Hello world!");
      setTimeout(()=> {
        event.finish();
        done();
        }, 3000
      );
    } catch (e){
      done(e)
    }
  });
  
  
  step("logout!", async function (done){
    await profile.remove();
    done();
  });
  

});