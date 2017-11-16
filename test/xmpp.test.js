import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import profile from '../src/store/profileStore';
import model from '../src/model/model';
import Profile from '../src/model/Profile';

let user1, user2;
describe('xmpp', () => {
  step('register/login user2', async (done) => {
    const data = testDataNew(9);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user2 = logged.user;
    done();
  });
  step('logout', async (done) => {
    await xmpp.disconnect(null);
    setTimeout(done, 500);
  });
  step('register/login user1', async (done) => {
    const data = testDataNew(8);
    await profile.register(data.resource, data.provider_data);
    const logged = await profile.connect();
    user1 = logged.user;
    when(() => model.profile && model.profile.loaded, done);
  });
  step('update profile', async (done) => {
    const handle = 'test8123';
    try {
      await profile.update({handle});
    } catch (e) {
      console.error(e);
    }
    when(() => model.profile && model.profile.handle === handle, done);
  });
  // step('get batch request', async function (done) {
  //     try {
  //         await profile.requestBatch([user1, user1]);
  //     } catch (e) {
  //         console.error(e);
  //     }
  //     when(() => model.profile && model.profile.handle === 'test8', done);
  // });
  step('upload avatar', async (done) => {
    const fileName = `${__dirname}/img/test.jpg`;
    const fileNameThumbnail = `${__dirname}/img/test-thumbnail.jpg`;
    try {
      const file = {name: fileName.substring(fileName.lastIndexOf('/') + 1), body: fs.readFileSync(fileName), type: 'image/jpeg'};
      const data = {height: 300, width: 300, size: 3801, file};
      model.profile.avatar = null;
      await profile.uploadAvatar(data);
    } catch (e) {
      console.error(e);
    }
    when(
      () => model.profile && model.profile.avatar && model.profile.avatar.source,
      () => {
        try {
          console.log('FILE:', model.profile.avatar.source.uri);
          var expectBuf = fs.readFileSync(fileNameThumbnail);
          var testBuf = fs.readFileSync(model.profile.avatar.source.uri);
          expect(expectBuf.toString()).to.be.equal(testBuf.toString());
          done();
        } catch (e) {
          console.error(e);
        }
      },
    );
  });
  step('remove', (done) => {
    profile.remove();
    when(() => !model.connected, done);
  });
});
