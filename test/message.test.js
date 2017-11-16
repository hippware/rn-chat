import {expect} from 'chai';
import {testDataNew} from './support/testuser';
import {when, spy} from 'mobx';
import profileStore from '../src/store/profileStore';
import model from '../src/model/model';
import message from '../src/store/messageStore';
import * as xmpp from '../src/store/xmpp/xmpp';
import toArray from 'stream-to-array';

let profile2;
let user1, user2;

describe('message', () => {
  step('register/login user2', async (done) => {
    const data = testDataNew(9);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user2 = logged.user;
    done();
  });
  step('logout!', async (done) => {
    await xmpp.disconnect(null);
    done();
  });
  step('register/login user1', async (done) => {
    const data = testDataNew(8);
    await profileStore.register(data.resource, data.provider_data);
    const logged = await profileStore.connect();
    user1 = logged.user;
    done();
  });
  // step('update profile', async function (done) {
  //   model.user = user1;
  //   model.profile = profileStore.create(user1);
  //   try {
  //     await profileStore.update({handle: 'test8'});
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   when(() => model.profile.handle == 'test8', done);
  // });
  // step('upload avatar', async function (done) {
  //   let fileName = __dirname + '/img/test.jpg';
  //   let body = fs.readFileSync(fileName);
  //   let file = {
  //     name: fileName.substring(fileName.lastIndexOf('/') + 1),
  //     body,
  //     type: 'image/jpeg',
  //   };
  //   let data = {height: 300, width: 300, size: 3801, file};
  //   try {
  //     await profileStore.uploadAvatar(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   when(
  //     () =>
  //       model.profile &&
  //       model.profile.avatar &&
  //       (model.profile.avatar.source || model.profile.avatar.error),
  //     () => {
  //       console.log('SOURCE:', model.profile.avatar);
  //       done();
  //       // console.log(body);
  //       // console.log(fs.readFileSync(model.profile.avatar.source.uri));
  //       //
  //       // expect(fs.readFileSync(model.profile.avatar.source.uri).compare(body)).to.be.equal(0);
  //       // done();
  //     }
  //   );
  // });
  step('logout', async (done) => {
    await profileStore.logout({remove: true});
    done();
  });
  //
  //   step("send message to user2", function(done){
  //     message.sendMessage({body: "hello world2", to:user2, id:"1234"});
  //     when(()=>model.chats.list.length > 0, done);
  //   });
  //
  //   step("logout", function (done){
  //     xmppStore.logout();
  //     when(()=>!model.connected && !model.profile, done)
  //   });
  //
  //   step("register/login user1 and get updated value", function(done){
  //     const register = testDataNew(8);
  //     profile.register(register.resource, register.provider_data);
  // //    when(()=>model.profile && model.profile.handle === 'test8', done);
  //     when(()=>model.profile && model.profile.avatar && model.profile.handle === 'test8', done);
  //   });
  //
  //   step("logout", function (done){
  //     xmppStore.logout();
  //     when(()=>!model.connected, done)
  //   });
  //
  //   step("register/login user2 and expect messages", function(done){
  //     expect(model.chats.list.length).to.be.equal(0);
  //     const register = testDataNew(9);
  //     profile.register(register.resource, register.provider_data);
  //     when(()=> model.profile && model.profile.loaded && model.chats.list.length === 1, done);
  //   });
  //
  //   step("remove", function (done){
  //     profile.remove();
  //     when(()=>!model.connected, done)
  //   });
  //
  //
  //   step("register/login user1", function(done){
  //     const register = testDataNew(8);
  //     profile.register(register.resource, register.provider_data);
  //     when(()=>model.profile && model.profile.loaded, done);
  //   });
  //
  //   step("remove", function (done){
  //     profile.remove();
  //     when(()=>!model.connected, done)
  //   });
});
('');
// describe('message', function () {
//   beforeEach(function () {
//     console.log('CREATE STATEM');
//     statem.start();
//   });
//   // after(async function(done){
//   //   for (let data of [testDataNew(7), testDataNew(8)]) {
//   //     const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
//   //     await profileStore.connect(user, password, server);
//   //     await profileStore.remove();
//   //   }
//   //   done();
//   // });
//   step('register/login8', function (done) {
//     const register = testDataNew(8);
//
//     // register
//     when(
//       () => Actions.active,
//       () => {
//         console.log('REGISTER DATA2');
//         setTimeout(() => Actions.signIn(register));
//       }
//     );
//
//     // enter handle
//     when(
//       () => Actions.active,
//       async () => {
//         console.log('UPDATE HANDLE2');
//         await profileStore.update({handle: 'test2'});
//         setTimeout(() => Actions.success());
//       }
//     );
//
//     when(
//       () => Actions.active && model.profile,
//       () => {
//         profile2 = model.profile;
//         setTimeout(Actions.logout);
//         when(() => Actions.active, done);
//       }
//     );
//   });
//   step('register/login7', function (done) {
//     const register = testDataNew(7);
//
//     // register
//     when(
//       () => Actions.active,
//       () => {
//         console.log('REGISTER DATA');
//         setTimeout(() => Actions.signIn(register));
//       }
//     );
//
//     // enter handle
//     when(
//       () => Actions.active,
//       async () => {
//         console.log('UPDATE HANDLE');
//         await profileStore.update({handle: 'test'});
//         setTimeout(() => Actions.success());
//       }
//     );
//
//     // go to create message
//     when(
//       () => Actions.active,
//       () => {
//         console.log('GO TO CREATE MESSAGE');
//         setTimeout(() => Actions.selectFriends());
//       }
//     );
//
//     // go to create message
//     when(
//       () => Actions.active,
//       () => {
//         console.log('CREATE MESSAGE');
//         setTimeout(() => Actions.createMessage(profile2));
//       }
//     );
//
//     // go to create message
//     when(
//       () => Actions.active && model.profile,
//       async () => {
//         // let fileName = "test/img/test.jpg";
//         // let file = {name: fileName.substring(fileName.lastIndexOf("/")+1), body:fs.createReadStream('test/img/test.jpg'),
//         //   type: 'image/jpeg'};
//         // let data = {height:300, width:300, size:3801, file};
//         // await message.sendMedia({...data, to: profile2.user});
//         try {
//           await message.sendMessage({to: profile2.user, body: 'hello world!'});
//           setTimeout(Actions.logout);
//           when(() => Actions.active, done);
//         } catch (e) {
//           done(e);
//         }
//       }
//     );
//   });
//
//   step('register/login8 and expect messages', function (done) {
//     const register = testDataNew(8);
//
//     // register
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.signIn(register));
//       }
//     );
//
//     // enter handle
//     when(
//       () => Actions.active && model.chats._list.length > 0,
//       () => {
//         setTimeout(Actions.logout);
//         when(() => Actions.active, done);
//       }
//     );
//   });
//
//   step('register/login N1 test data', function (done) {
//     const register = testDataNew(21);
//
//     // register
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.signIn(register));
//       }
//     );
//
//     // enter handle
//     when(
//       () => Actions.active && model.profile.loaded,
//       async () => {
//         await profileStore.update({handle: 'test111'});
//         setTimeout(() => Actions.success());
//       }
//     );
//
//     // go to my account
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.profileDetails({item: model.profile.user}));
//       }
//     );
//
//     // go to my account
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(Actions.myAccountScene);
//       }
//     );
//
//     // remove
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.logout({remove: true}));
//         when(() => !model.connected, done);
//       }
//     );
//   });
//   step('register/login N1 again', function (done) {
//     const register = testDataNew(21);
//
//     // register
//     when(
//       '1',
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.signIn(register));
//       }
//     );
//
//     // enter handle
//     when(
//       '2',
//       () => Actions.active && model.profile.loaded,
//       async () => {
//         await profileStore.update({handle: 'test222'});
//         setTimeout(() => Actions.success());
//       }
//     );
//
//     // go to my account
//     when(
//       '3',
//       () => Actions.active,
//       () => {
//         setTimeout(Actions.myAccountScene);
//       }
//     );
//
//     // remove
//     when(
//       '4',
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.logout({remove: true}));
//         when(() => !model.connected, done);
//       }
//     );
//   });
//
//   step('register/login N7 again', function (done) {
//     const register = testDataNew(7);
//
//     // register
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.signIn(register));
//       }
//     );
//
//     // go to my account
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(Actions.myAccountScene);
//       }
//     );
//
//     // remove
//     when(
//       () => Actions.active,
//       () => {
//         setTimeout(() => Actions.logout({remove: true}));
//         when(() => !model.connected, done);
//       }
//     );
//   });
// });
