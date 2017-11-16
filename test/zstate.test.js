import {expect, assert} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import bot from '../src/store/xmpp/botService';
import model, {Model} from '../src/model/model';
import {deserialize, serialize, createModelSchema, ref, list, child} from 'serializr';
import botFactory from '../src/factory/botFactory';
import botStore from '../src/store/botStore';
import {LOCATION} from '../src/model/Bot';

let botData;
let user, password, server;
describe('workflow', () => {
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
  //     when(()=>Actions.active, ()=> {
  //       console.log("REGISTER DATA2");
  //       setTimeout(()=>Actions.signIn(data));
  //     });
  //
  //     // enter handle
  //     when(()=>Actions.active, ()=> {
  //       console.log("UPDATE HANDLE2");
  //       setTimeout(()=>Actions.register({handle: 'test2'}));
  //     });
  //
  //     when(()=>Actions.active && model.profile && model.followingBots.list.length >= 1, ()=> {
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
  //     when(()=>Actions.active, ()=> {
  //       console.log("REGISTER DATA2");
  //       setTimeout(()=>Actions.signIn(data));
  //     });
  //
  //     // enter handle
  //     when(()=>Actions.active, ()=> {
  //       console.log("UPDATE HANDLE2");
  //       setTimeout(()=>Actions.register({handle: 'test2'}));
  //     });
  //
  //     when(()=>Actions.active, ()=> {
  //       try {
  //         setTimeout(()=>Actions.createBotContainer({botType:LOCATION}));
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //     when(()=>Actions.active, ()=> {
  //       try {
  //         botStore.create({type:LOCATION});
  //         setTimeout(()=>Actions.save());
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //     when(()=>Actions.active, ()=> {
  //       try {
  //         setTimeout(()=>statem.handle("setAddress", {bot: botStore.bot}));
  //       } catch (e) {
  //         done(e)
  //       }
  //     });
  //     when(()=>Actions.active, ()=> {
  //       when(()=>Actions.active, ()=> {
  //         try {
  //           setTimeout(()=>Actions.logout({remove: true}));
  //           when(()=>!model.connected, done);
  //         } catch (e) {
  //           done(e)
  //         }
  //       });
  //       try {
  //         setTimeout(()=>Actions.pop());
  //         when(()=>Actions.active, () => {
  //           try {
  //             setTimeout(()=>Actions.createBotContainer({botType:LOCATION}));
  //
  //             when(()=>Actions.active, ()=> {
  //               try {
  //                 botStore.create({type:LOCATION});
  //                 setTimeout(()=>Actions.save());
  //               } catch (e) {
  //                 done(e)
  //               }
  //             });
  //
  //             when(()=>Actions.active, ()=> {
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
