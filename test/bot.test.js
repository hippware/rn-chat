import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import bot from '../src/store/xmpp/bot';
import statem from '../gen/state';
import model, {Model} from '../src/model/model';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';
import botFactory from '../src/factory/bot';
import roster from '../src/store/xmpp/roster';
import Bot from '../src/model/Bot';
import profile from '../src/store/profile';

let botData;
let user, password, server;
let friend;
describe("bot", function() {
  // step("expect title", async function(done){
  //   try {
  //     const data = testDataNew(11);
  //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //     const logged = await xmpp.connect(user, password, server);
  //     await bot.create({});
  //     await xmpp.disconnect(null);
  //     done("title should be required");
  //   } catch (e){
  //     done()
  //   }
  // });
  // step("expect radius", async function(done){
  //   try {
  //     const data = testDataNew(11);
  //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //     const logged = await xmpp.connect(user, password, server);
  //     await bot.create({title:'Bot title'});
  //     await xmpp.disconnect(null);
  //     done("radius should be required");
  //   } catch (e){
  //     done()
  //   }
  // });
  // step("expect server side error about short title", async function(done){
  //   try {
  //     const data = testDataNew(11);
  //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //     const logged = await xmpp.connect(user, password, server);
  //     await bot.create({title:'Bot title', radius:10, location: {latitude:11.1, longitude:12.5, accuracy:2}});
  //     await xmpp.disconnect(null);
  //     done('error should be thrown');
  //   } catch (e){
  //     expect(e).to.be.equal('Missing shortnamefield')
  //     done()
  //   }
  // });
  
  step("register/login friend", async function(done){
    const data = testDataNew(12);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    friend = logged.user;
    await xmpp.disconnect(null);
    done();
  });
  step("expect creation", async function(done) {
    try {
      const data = testDataNew(11);
      const shortname = undefined;
      const description = 'bot desc';
      const response = await xmpp.register(data.resource, data.provider_data);
      user = response.user;
      password = response.password;
      server = response.server;
      image = 'testimage';
      const logged = await xmpp.connect(user, password, server);
    
      // add friend
      roster.subscribe(friend);
      await roster.add({user: friend});
      await xmpp.disconnect(null);
      done()
    } catch (e) {
      done(e)
    }
  });
  
  step("register/login friend and confirm add friend", async function(done){
    const data = testDataNew(12);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    // add friend
    roster.authorize(user);
    roster.subscribe(user);
    await roster.add({user});
    await xmpp.disconnect(null);
    done();
  });
  step("expect creation", async function(done) {
    try {
      const data = testDataNew(11);
      const shortname = undefined;
      const description = 'bot desc';
      const response = await xmpp.register(data.resource, data.provider_data);
      user = response.user;
      password = response.password;
      server = response.server;
      image = 'testimage';
      const logged = await xmpp.connect(user, password, server);
      roster.authorize(friend);
      
      res = await bot.create({type:'location', title:'Bot title', isNew: true, radius:10, shortname, description, image,
        location: {latitude:11.1, longitude:12.5, accuracy:2}, newAffiliates:[{user:friend}]});
      expect(res.id).to.be.not.undefined;
      expect(res.server).to.be.not.undefined;
      expect(res.title).to.be.equal('Bot title');
      expect(res.shortname).to.be.equal(shortname);
      expect(res.description).to.be.equal(description);
      expect(res.image).to.be.equal(image);
      botData = res;
      await xmpp.disconnect(null);
      done();
    } catch (e){
      done(e)
    }
  });
  step("verify autoload of bot", async function(done){
    try {
      const bot = new Bot({id: botData.id, server: botData.server});
      expect(bot.id).to.be.equal(botData.id);
      expect(bot.type).to.be.undefined;
      expect(bot.title).to.be.equal('');
      expect(bot.owner).to.be.undefined;
      expect(bot.server).to.be.equal(botData.server);
      expect(bot.loaded).to.be.equal(false);
      
      const logged = await profile.connect(user, password, server);
  
      when(() => bot.loaded, () => {
        try {
          expect(bot.title).to.be.equal(botData.title);
          expect(bot.type).to.be.equal(botData.type);
          expect(bot.server).to.be.equal(botData.server);
          expect(bot.owner.user).to.be.equal(botData.owner);
          done();
        } catch (e){
          done(e);
        }
      });
    } catch (e){
      done(e);
    }
  });
  
  step("retrieve existing bot", async function(done){
    try {
      const data = await bot.load({id:botData.id, server:botData.server});
      data.affiliations = await bot.retrieveAffiliates({id:botData.id, server:botData.server});
      expect(data.affiliations.length).to.be.equal(1);
      expect(data.affiliations[0]).to.be.equal(friend);
      console.log("DATA:", data);
      expect(data.id).to.be.equal(botData.id);
      
      await bot.publishContent(botData, 123, 'hello world!');
      await bot.publishContent(botData, 1234, 'hello world2!');
      let items = await bot.items(botData);
      expect(items.length).to.be.equal(2);
      await bot.removeItem(botData, 1234);
      items = await bot.items(botData);
      expect(items.length).to.be.equal(1);
      await bot.removeItem(botData, 123);
      items = await bot.items(botData);
      expect(items.length).to.be.equal(0);
  
      await bot.publishImage(botData, 1235, 'hello world url!');
      await bot.publishImage(botData, 1236, 'hello world url2!');
      await bot.publishImage(botData, 1237, 'hello world url2!');
      items = await bot.imageItems(botData);
      console.log("IMAGES:", items);
      expect(items.length).to.be.equal(3);
      await bot.removeItem(botData, 1235);
      await bot.removeItem(botData, 1236);
      items = await bot.items(botData);
      expect(items.length).to.be.equal(1);
      await bot.removeItem(botData, 1237);
      items = await bot.items(botData);
      expect(items.length).to.be.equal(0);
  
      expect(data.title).to.be.equal(botData.title);
      expect(data.shortname).to.be.equal(botData.shortname);
      expect(data.server).to.be.equal(botData.server);
      expect(data.radius).to.be.equal(botData.radius);
      expect(data.description).to.be.equal(botData.description);
      
      done();
    } catch (e) {
      done(e);
    }
  });
  
  step("share bot headline", async function(done){
    try {
      bot.share(botData, [friend, 'friends']);
      done();
    } catch (e){
      done(e);
    }
  });
  
  step("retrieve list of following bots", async function(done){
    try {
      const data = await bot.following(user, server);
      console.log("DATA:", data.bots.length, data);
      expect(data.bots.length > 0).to.be.true;
      done();
    } catch (e){
      done(e);
    }
  });
  
  step("retrieve list of all bots", async function(done){
    try {
      const data = await bot.list(user, server);
      console.log("DATA:", data.bots.length, data);
      expect(data.bots.length > 0).to.be.true;
      // remove bots
      for (let item of data.bots){
        await bot.remove({id: item.id, server: item.server});
      }
      done();
    } catch (e){
      done(e);
    }
  });
  
  step("logout!", async function (done){
    await xmpp.disconnect(null);
    done();
  });
  
  step("register/login friend and expect shared bot", async function(done){
    const data = testDataNew(12);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    
    await xmpp.disconnect(null);
    done();
  });
  // step("test workflow", async function(done) {
  //   try {
  //     statem.start();
  //     const data = testDataNew(11);
  //     // register
  //     when(()=>statem.promoScene.active, ()=> {
  //       console.log("REGISTER DATA2");
  //       setTimeout(()=>statem.promoScene.signIn(data));
  //     });
  //
  //     // enter handle
  //     when(()=>statem.signUpScene.active, ()=> {
  //       console.log("UPDATE HANDLE2");
  //       setTimeout(()=>statem.signUpScene.register({handle: 'test2'}));
  //     });
  //
  //     when(()=>statem.drawerTabs.active && model.profile && model.bots.list.length === 1, ()=> {
  //       try {
  //         // test serializet
  //         botFactory.clear();
  //         const ser = serialize(model);
  //         const des = deserialize(Model, ser);
  //
  //         console.log("SERR:", JSON.stringify(ser), des.bots.list[0].title);
  //         assert(des.bots.list.length === model.bots.list.length, "Length should be equal");
  //         assert(des.bots.list[0].title === model.bots.list[0].title, "Titles should be the same");
  //
  //         setTimeout(()=>statem.myAccountScene.logout({remove: true}));
  //         when(()=>!model.connected, ()=>{
  //           statem.stop();
  //           done();
  //         });
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //   } catch (e) {
  //     done(e)
  //   }
  // });
});