import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import bot from '../src/store/xmpp/bot';
import statem from '../gen/state';
import model, {Model} from '../src/model/model';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';
import botFactory from '../src/factory/bot';

let botData;
let user, password, server;
describe("workflow", function() {
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
      res = await bot.create({address:'Home', type:'location', title:'Bot title', radius:10, shortname, description,
        location: {latitude:11.1, longitude:12.5, accuracy:2}});
      console.log("RES:", res);
      expect(res.id).to.be.not.undefined;
      expect(res.title).to.be.equal('Bot title');
      expect(res.shortname).to.be.equal(shortname);
      expect(res.description).to.be.equal(description);
      expect(res.address).to.be.equal('Home');
      botData = res;
      done();
    } catch (e){
      done(e)
    }
  });
  
  step("test workflow", async function(done) {
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
        setTimeout(()=>statem.signUpScene.register({handle: 'test2'}));
      });

      when(()=>statem.drawerTabs.active && model.profile && model.bots.list.length >= 1, ()=> {
        try {
          // test serializet
          botFactory.clear();
          const ser = serialize(model);
          const des = deserialize(Model, ser);

          console.log("SERR:", JSON.stringify(ser), des.bots.list[0].title, des.bots.list[0].date);
          assert(des.bots.list.length === model.bots.list.length, "Length should be equal");
          assert(des.bots.list[0].title === model.bots.list[0].title, "Titles should be the same");

          setTimeout(()=>statem.myAccountScene.logout({remove: true}));
          when(()=>!model.connected, done);
        } catch (e) {
          done(e)
        }
      });
    } catch (e) {
      done(e)
    }
  });
});