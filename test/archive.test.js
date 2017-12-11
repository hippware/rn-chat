import {expect} from 'chai';
import {when, spy} from 'mobx';
import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import archive from '../src/store/archiveStore';
import profile from '../src/store/profileStore';
import message from '../src/store/messageStore';
import model from '../src/model/model';
import Profile from '../src/model/Profile';

let user1, user2, user3;
describe('archive', () => {
  step('register/login user3', async (done) => {
    const data = testDataNew(7);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user3 = logged.user;
    model.server = server;
    await xmpp.disconnect(null);
    done();
  });
  step('register/login user1', async (done) => {
    const data = testDataNew(8);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user1 = logged.user;
    model.server = server;
    await xmpp.disconnect(null);
    done();
  });
  step('register/login user2', async (done) => {
    const data = testDataNew(9);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    user2 = logged.user;
    model.server = server;
    message.sendMessageToXmpp({body: 'hello world!', id: '1', to: user1});
    message.sendMessageToXmpp({body: 'hello world2!', id: '2', to: user3});
    message.sendMessageToXmpp({body: 'hello world3!', id: '3', to: user1});
    await xmpp.disconnectAfterSending(null);

    // Give the server half a second to catch up with its
    // message archiving, otherwise the next request may not
    // return the latest conversations
    setTimeout(done, 500);
  });

  step('register/login user2 again', async (done) => {
    const data = testDataNew(9);
    await profile.register(data.resource, data.provider_data);
    const logged = await profile.connect();
    user1 = logged.user;
    // start message module
    await message.start();
    // TODO restore this after server-side bug fix
    // expect(model.chats._list.length).to.be.equal(2);
    // expect(model.chats._list[0].messages.length).to.be.equal(1);
    // await archive.load(model.chats._list[0]);
    // console.log('LEN:', model.chats._list[0].messages.length);
    // expect(model.chats._list[0].messages.length).to.be.equal(2);
    message.finish();
    done();
  });
  step('delete user2', async (done) => {
    await profile.remove();
    done();
  });
  step('delete user3', async (done) => {
    const data = testDataNew(7);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    await profile.remove();
    done();
  });
  step('delete user1', async (done) => {
    const data = testDataNew(8);
    const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
    const logged = await xmpp.connect(user, password, server);
    await profile.remove();
    done();
  });
});
