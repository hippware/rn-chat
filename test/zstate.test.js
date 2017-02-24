import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import bot from '../src/store/xmpp/bot';
import statem from '../gen/state';
import model, {Model} from '../src/model/model';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';
import botFactory from '../src/factory/bot';
import botStore from '../src/store/bot';
import {LOCATION} from '../src/model/Bot';

let botData;
let user, password, server;
describe("workflow", function() {
  // step("expect creation", async function(done){
  //   try {
  //     const data = testDataNew(11);
  //     const shortname = undefined;
  //     const description = 'bot desc';
  //     const response = await xmpp.register(data.resource, data.provider_data);
  //     user = response.user;
  //     password = response.password;
  //     server = response.server;
  //     const logged = await xmpp.connect(user, password, server);
  //     res = await bot.create({address:'Home', type:'location', title:'Bot title', radius:10, shortname, description,
  //       location: {latitude:11.1, longitude:12.5, accuracy:2}});
  //     console.log("RES:", res);
  //     expect(res.id).to.be.not.undefined;
  //     expect(res.title).to.be.equal('Bot title');
  //     expect(res.shortname).to.be.equal(shortname);
  //     expect(res.description).to.be.equal(description);
  //     expect(res.address).to.be.equal('Home');
  //     botData = res;
  //     await xmpp.disconnect(null);
  //     done();
  //   } catch (e){
  //     done(e)
  //   }
  // });
  //
  // step("test workflow", async function(done) {
  //   try {
  //     model.clear();
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
  //     when(()=>statem.drawerTabs.active && model.profile && model.followingBots.list.length >= 1, ()=> {
  //       try {
  //         // test serializet
  //         botFactory.clear();
  //         const ser = serialize(model);
  //         const des = deserialize(Model, ser);
  //
  //         assert(des.followingBots.list.length === model.followingBots.list.length, "Length should be equal");
  //         assert(des.followingBots.list[0].title === model.followingBots.list[0].title, "Titles should be the same");
  //
  //         done();
  //
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //   } catch (e) {
  //     done(e)
  //   }
  // });
  //
  // step("test bot creation", async function(done) {
  //   try {
  //     model.clear();
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
  //     when(()=>statem.drawerTabs.active, ()=> {
  //       try {
  //         setTimeout(()=>statem.logged.createBotContainer({botType:LOCATION}));
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //     when(()=>statem.createBot.active, ()=> {
  //       try {
  //         botStore.create({type:LOCATION});
  //         setTimeout(()=>statem.createBot.save());
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //     when(()=>statem.botInfo.active, ()=> {
  //       try {
  //         setTimeout(()=>statem.handle("setAddress", {bot: botStore.bot}));
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //     when(()=>statem.botAddress.active, ()=> {
  //       when(()=>statem.botInfo.active, ()=> {
  //         try {
  //           setTimeout(()=>statem.myAccountScene.logout({remove: true}));
  //           when(()=>!model.connected, done);
  //         } catch (e) {
  //           done(e)
  //         }
  //       });
  //       try {
  //         setTimeout(()=>statem.logged.pop());
  //         when(()=>statem.drawerTabs.active, () => {
  //           try {
  //             setTimeout(()=>statem.logged.createBotContainer({botType:LOCATION}));
  //
  //             when(()=>statem.createBot.active, ()=> {
  //               try {
  //                 botStore.create({type:LOCATION});
  //                 setTimeout(()=>statem.createBot.save());
  //               } catch (e) {
  //                 done(e)
  //               }
  //             });
  //
  //             when(()=>statem.botInfo.active, ()=> {
  //               try {
  //                 setTimeout(()=>statem.handle("setAddress", {bot: botStore.bot}));
  //               } catch (e) {
  //                 done(e)
  //               }
  //             });
  //           } catch (e) {
  //             done(e)
  //           }
  //         });
  //
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //   } catch (e) {
  //     done(e)
  //   }
  // });
  
});