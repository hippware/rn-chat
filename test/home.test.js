import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import event from '../src/store/event';
import model from '../src/model/model';
import message from '../src/store/message';
import roster from '../src/store/xmpp/roster';
import profile from '../src/store/profile';

let user1, user2, user3, password, server, item1, item2;
describe("home", function() {
  step("register/login user1", async function(done){
    model.clear();
    const data = testDataNew(13);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user1 = logged.user;
    expect(user1).to.be.not.undefined;
    await xmpp.disconnect(null);
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
      await xmpp.disconnect(null);
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
      await event.request();
      when(()=>model.events.list.length > 0 && model.events.list[0].message.message.body === "hello world22223457", async ()=>{
        console.log("model.events.list.length",model.events.list.length);
        await xmpp.disconnect(null);
        done();
      });
      
    } catch (e){
      done(e)
    }
  });
  
  step("register/login user2 again", async function(done){
    try {
      const data = testDataNew(14);
      const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
      const logged = await xmpp.connect(user, password, server);
      user2 = logged.user;
      message.sendMessageToXmpp({body: "hello world22223458", to: user1, id: "1236"});
      await xmpp.disconnect(null);
      done();
    } catch (e){
      done(e);
    }
  });
  
  step("expect new message", async function(done) {
    try {
      //expect(model.events.list.length).to.be.equal(1);
      const logged = await xmpp.connect(user, password, server);
      await event.request();
      console.log("EVENT LIST:", model.events.list.length);
      when(()=>model.events.list.length > 0 && model.events.list[0].message.message.body === "hello world22223458", async ()=>{
        expect(model.events.list.length).to.be.equal(1);
        await xmpp.disconnect(null);
        done();
      });

    } catch (e){
      done(e)
    }
  });

  step("register/login user3", async function(done){
    try {
      const data = testDataNew(15);
      const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
      user3 = user;
      const logged = await xmpp.connect(user, password, server);
      message.sendMessageToXmpp({body: "hello world222234569", to: user1, id: "1237"});
      await xmpp.disconnect(null);
      done();
    } catch (e){
      done(e);
    }
  });

  step("expect new message2", async function(done) {
    try {
      expect(model.events.list.length).to.be.equal(1);
      const logged = await profile.connect(user, password, server);
      await message.start();
      expect(model.chats._list.length).to.be.equal(2);
      await event.request();
      when(()=>model.events.list.length === 2, async ()=>{
        expect(model.events.list[0].event.message.body).to.be.equal("hello world222234569");
        item1 = model.events.list[0].event.id;
        item2 = model.events.list[1].event.id;
        console.log('model.events.list[0].event.message.unread',model.events.list[0].event.message.unread, model.chats._list[0].last.unread);
        // expect(model.events.list[0].event.message.unread).to.be.equal(true);
        // // mark unread
        // model.chats._list[0].last.unread = false;
        expect(model.events.list[0].event.message.unread).to.be.equal(false);
        expect(model.events.list[0].event.message.from.user).to.be.equal(user3);
        expect(model.events.list[1].event.message.from.user).to.be.equal(user2);
        done();
      });

    } catch (e){
      done(e)
    }
  });


  step("delete item", async function(done) {
    try {
      expect(model.events.list.length).to.be.equal(2);
      await event.hidePost(item1);
      console.log("EVENTS:", model.events.list.length);
      when(()=>model.events.list.length === 1, async ()=>{
        model.events.clear();
        expect(model.events.version).to.be.equal(undefined);
        expect(model.events.list.length).to.be.equal(0);
        await event.request();
        expect(model.events.list.length).to.be.equal(1);
        done();
      });
    } catch (e){
      done(e)
    }
  });

  
  step("logout!", async function (done){
    await profile.remove();
    model.clear();
    message.finish();
    event.finish();
    done();
  });
  
  step("register/login user1", async function(done){
    model.clear();
    const data = testDataNew(13);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user1 = logged.user;
    console.log("USER1", user1);
    expect(user1).to.be.not.undefined;
    done();
  });
  step("logout!", async function (done){
    await profile.remove();
    model.clear();
    message.finish();
    event.finish();
    done();
  });
  
  
});