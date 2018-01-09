import {createXmpp} from './support/testuser';
import {expect, assert} from 'chai';

let user1, user2;

describe('xmpp', () => {
  // step('register and login', async (done) => {
  //   const data = testDataNew(7);
  //   try {
  //     expect(xmppStore.connected).to.be.false;
  //     const {user, password} = await xmppStore.register(data.resource, data.provider_data);
  //     await xmppStore.login(user, password, data.resource);
  //     expect(xmppStore.connected).to.be.true;
  //     console.log(getSnapshot(xmppStore))
  //     done();
  //   } catch (e) {
  //     done(e);
  //   }
  // });
  step('send message', async (done) => {
    try {
      user1 = await createXmpp(17);
      user2 = await createXmpp(18);
      expect(user1.connected).to.be.true;
      expect(user2.connected).to.be.true;
      await user1.addToRoster(user2.username);
      await user2.addToRoster(user1.username);
      user2.message.onValue(msg => msg.body === 'hello' && msg.from === `${user1.username}@${user1.server}/testing` && done());
      user1.sendMessage({body: 'hello', to: user2.username});
    } catch (e) {
      done(e);
    }
  });
  step('remove accounts', async (done) => {
    try {
      await user1.remove();
      await user2.remove();
      expect(user1.connected).to.be.false;
      expect(user2.connected).to.be.false;
      done();
    } catch (e) {
      done(e);
    }
  });
});
