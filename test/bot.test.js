import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import bot from '../src/store/xmpp/bot';
import statem from '../gen/state';
import model, {Model} from '../src/model/model';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';

let botData;
let user, password, server;
describe("bot", function() {
  // step("expect title", async function(done){
  //   try {
  //     const data = testDataNew(11);
  //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
  //     const logged = await xmpp.connect(user, password, server);
  //     await bot.create({});
  //     await xmpp.disconnect();
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
  //     await xmpp.disconnect();
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
  //     await xmpp.disconnect();
  //     done('error should be thrown');
  //   } catch (e){
  //     expect(e).to.be.equal('Missing shortnamefield')
  //     done()
  //   }
  // });
  
  step("expect creation", async function(done){
    try {
      const data = testDataNew(11);
      const shortname = undefined;
      const description = 'bot desc';
      const response = await xmpp.register(data.resource, data.provider_data);
      user = response.user;
      password = response.password;
      server = response.server;
      const logged = await xmpp.connect(user, password, server);
      res = await bot.create({type:'location', title:'Bot title', radius:10, shortname, description,
        location: {latitude:11.1, longitude:12.5, accuracy:2}});
      expect(res.id).to.be.not.undefined;
      expect(res.title).to.be.equal('Bot title');
      expect(res.shortname).to.be.equal(shortname);
      expect(res.description).to.be.equal(description);
      botData = res;
      done();
    } catch (e){
      done(e)
    }
  });
  
  step("retrieve existing bot", async function(done){
    try {
      const data = await bot.load({id:botData.id, server:botData.server});
      console.log("DATA:", data);
      expect(data.id).to.be.equal(botData.id);
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
  
  step("test workflow", async function(done){
    try {
      statem.start();
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
      
      when(()=>statem.drawerTabs.active && model.profile && model.ownBots.list.length === 1 , ()=>{
        // test serialize
        const ser = serialize(model);
        assert(deserialize(Model, ser).ownBots.list.length === model.ownBots.list.length, "Length should be equal");
        done();
      });
    } catch (e){
      done(e)
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
  
  step("remove account", async function(done) {
    when(()=>statem.drawerTabs.active && model.profile, ()=>{
      setTimeout(()=>statem.myAccountScene.logout({remove:true}));
      when(()=>statem.promoScene.active, done);
    });
  });
  
});