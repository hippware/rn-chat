import {createXmpp} from './support/testuser';
import {expect, assert} from 'chai';

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
  step('register and login2', async (done) => {
    let user1, user2;
    try {
      user1 = await createXmpp(7);
      user2 = await createXmpp(8);
      expect(user1.connected).to.be.true;
      expect(user2.connected).to.be.true;
      user2.message.onValue(msg => console.log('MESSAGE!!', msg));
      user1.sendMessage({body: 'hello', to: user2.username, id: '1'});
      done();
    } catch (e) {
      done(e);
    }
  });
});
