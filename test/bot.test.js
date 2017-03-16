import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import bot from '../src/store/xmpp/botService';
import botStore from '../src/store/botStore';
import statem from '../gen/state';
import model, {Model} from '../src/model/model';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';
import botFactory from '../src/factory/botFactory';
import roster from '../src/store/xmpp/rosterService';
import Bot, {LOCATION, VISIBILITY_FRIENDS} from '../src/model/Bot';
import profile from '../src/store/profileStore';

let botData;
let user, password, server, botId;
let friend;
describe("bot", function() {
  step("geoseach test", async function(done){
    try {
      await profile.connect('d6976ac8-5a3a-11e6-8008-0e2ac49618c7', '$T$ajO219JxmSkwOy/7qlqD1/24uab1EU7QIra3CBi11XU=', 'staging.dev.tinyrobot.com');
      const list = await botStore.geosearch({latitude:11.0, longitude:12.5});
      console.log("GEOSEARCH", list);
      await profile.logout();
      done();
    } catch (e){
      done(e);
    }
  })
  // step("generate id", async function(done){
  //   try {
  //     const data = testDataNew(11);
  //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //     const logged = await xmpp.connect(user, password, server);
  //     botStore.create();
  //     when(()=>botStore.bot.id, () => {
  //       expect(botStore.bot.id).to.be.not.undefined;
  //       done();
  //     });
  //   } catch (e){
  //     done(e);
  //   }
  // });
  // step("expect title", async function(done){
  //   try {
  //     const data = testDataNew(11);
  //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //     const logged = await xmpp.connect(user, password, server);
  //     await bot.create({id: botId});
  //     await xmpp.disconnect(null);
  //     done("title should be required");
  //   } catch (e){
  //     done()
  //   }
  // });
  //
  // step("register/login friend", async function(done){
  //   const data = testDataNew(12);
  //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //   const logged = await xmpp.connect(user, password, server);
  //   friend = logged.user;
  //   await xmpp.disconnect(null);
  //   done();
  // });
  // step("add friend", async function(done) {
  //   try {
  //     const data = testDataNew(11);
  //     const shortname = undefined;
  //     const description = 'bot desc';
  //     const response = await xmpp.register(data.resource, data.provider_data);
  //     user = response.user;
  //     password = response.password;
  //     server = response.server;
  //     image = 'testimage';
  //     const logged = await xmpp.connect(user, password, server);
  //
  //     // add friend
  //     roster.subscribe(friend);
  //     await roster.add({user: friend});
  //     await xmpp.disconnect();
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // });
  // step("register/login friend and confirm add friend", async function(done){
  //   const data = testDataNew(12);
  //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //   const logged = await xmpp.connect(user, password, server);
  //   // add friend
  //   roster.authorize(user);
  //   roster.subscribe(user);
  //   await roster.add({user});
  //   await xmpp.disconnect(null);
  //   done();
  // });
  // step("expect creation", async function(done) {
  //   try {
  //     const data = testDataNew(11);
  //     const shortname = undefined;
  //     const description = 'bot desc';
  //     const response = await xmpp.register(data.resource, data.provider_data);
  //     user = response.user;
  //     password = response.password;
  //     server = response.server;
  //     image = 'testimage';
  //     const logged = await xmpp.connect(user, password, server);
  //     roster.authorize(friend);
  //
  //     botStore.create({type:'location', title:'Bot title', radius:10, shortname, description,
  //       location: {latitude:11.1, longitude:12.5, accuracy:2}, image, visibility: VISIBILITY_FRIENDS, newAffiliates:[{user:friend}]});
  //
  //     when (()=>botStore.bot.id, async ()=>{
  //       try {
  //         expect(botStore.bot.id).to.be.not.undefined;
  //         botId = botStore.bot.id;
  //         await botStore.save();
  //         const res = botStore.bot;
  //         expect(res.id).to.be.equal(botId);
  //         expect(res.server).to.be.not.undefined;
  //         expect(res.title).to.be.equal('Bot title');
  //         expect(res.shortname).to.be.equal(shortname);
  //         expect(res.description).to.be.equal(description);
  //         expect(res.image.id).to.be.equal(image);
  //         botData = res;
  //         await xmpp.disconnect(null);
  //         done();
  //
  //       } catch (e){
  //         done(e)
  //       }
  //     });
  //   } catch (e){
  //     done(e)
  //   }
  // });
  // step("verify autoload of bot", async function(done){
  //   try {
  //     const bot = new Bot({id: botData.id, server: botData.server});
  //     expect(bot.id).to.be.equal(botId);
  //     expect(bot.type).to.be.undefined;
  //     expect(bot.title).to.be.equal('');
  //     expect(bot.owner).to.be.undefined;
  //     expect(bot.server).to.be.equal(botData.server);
  //     expect(bot.loaded).to.be.equal(false);
  //
  //     const logged = await profile.connect(user, password, server);
  //
  //     when(() => bot.loaded, () => {
  //       try {
  //         expect(bot.title).to.be.equal(botData.title);
  //         expect(bot.type).to.be.equal(botData.type);
  //         expect(bot.server).to.be.equal(botData.server);
  //         expect(bot.owner.user).to.be.equal(botData.owner.user);
  //         expect(bot.visibility).to.be.equal(VISIBILITY_FRIENDS);
  //         done();
  //       } catch (e){
  //         done(e);
  //       }
  //     });
  //   } catch (e){
  //     done(e);
  //   }
  // });
  //
  // step("retrieve existing bot", async function(done){
  //   try {
  //     const data = await bot.load({id:botData.id, server:botData.server});
  //     data.affiliations = await bot.retrieveAffiliates({id:botData.id, server:botData.server});
  //     expect(data.affiliations.length).to.be.equal(1);
  //     expect(data.affiliations[0]).to.be.equal(friend);
  //     console.log("DATA:", data);
  //     expect(data.id).to.be.equal(botData.id);
  //
  //     await bot.publishContent(botData, 123, 'hello world!');
  //     await bot.publishContent(botData, 1234, 'hello world2!');
  //     let items = await bot.items(botData);
  //     expect(items.length).to.be.equal(2);
  //     await bot.removeItem(botData, 1234);
  //     items = await bot.items(botData);
  //     expect(items.length).to.be.equal(1);
  //     await bot.removeItem(botData, 123);
  //     items = await bot.items(botData);
  //     expect(items.length).to.be.equal(0);
  //
  //     await bot.publishImage(botData, 1235, 'hello world url!');
  //     await bot.publishImage(botData, 1236, 'hello world url2!');
  //     await bot.publishImage(botData, 1237, 'hello world url2!');
  //     items = await bot.imageItems(botData);
  //     console.log("IMAGES:", items);
  //     expect(items.length).to.be.equal(3);
  //     await bot.removeItem(botData, 1235);
  //     await bot.removeItem(botData, 1236);
  //     items = await bot.items(botData);
  //     expect(items.length).to.be.equal(1);
  //     await bot.removeItem(botData, 1237);
  //     items = await bot.items(botData);
  //     expect(items.length).to.be.equal(0);
  //
  //     expect(data.title).to.be.equal(botData.title);
  //     expect(data.shortname).to.be.equal(botData.shortname);
  //     expect(data.server).to.be.equal(botData.server);
  //     expect(data.radius).to.be.equal(botData.radius);
  //     expect(data.description).to.be.equal(botData.description);
  //
  //     done();
  //   } catch (e) {
  //     done(e);
  //   }
  // });
  //
  // step("share bot headline", async function(done){
  //   try {
  //     bot.share(botData, [friend, 'friends'], 'headline');
  //     done();
  //   } catch (e){
  //     done(e);
  //   }
  // });
  //
  // step("retrieve list of own/following bots", async function(done){
  //   try {
  //     await botStore.start();
  //     expect(model.ownBots.list.length > 0).to.be.true;
  //     expect(model.followingBots.list.length > 0).to.be.true;
  //     done();
  //   } catch (e){
  //     done(e);
  //   }
  // });
  //
  // step("logout!", async function (done){
  //   await xmpp.disconnect(null);
  //   done();
  // });
  //
  // step("register/login friend and expect shared bot", async function(done){
  //   const data = testDataNew(12);
  //   const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //   const logged = await xmpp.connect(user, password, server);
  //
  //   await xmpp.disconnect(null);
  //   done();
  // });
  
  
  
  
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
  //     when(()=>statem.drawerTabs.active && model.profile && model.followingBots.list.length === 1, ()=> {
  //       try {
  //         // test serializet
  //         botFactory.clear();
  //         const ser = serialize(model);
  //         const des = deserialize(Model, ser);
  //
  //         console.log("SERR:", JSON.stringify(ser), des.bots.list[0].title);
  //         assert(des.bots.list.length === model.followingBots.list.length, "Length should be equal");
  //         assert(des.bots.list[0].title === model.followingBots.list[0].title, "Titles should be the same");
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