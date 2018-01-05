import {testDataNew} from './support/testuser';
import XmppService from '../src/store/xmpp/XmppStropheV2';
import XmppStore from '../src/store/xmpp/XmppStore';

const provider = new XmppService('testing.dev.tinyrobot.com', console.log);
const xmppStore = XmppStore.create({}, {provider});

describe('xmpp', () => {
  step('register and login', async (done) => {
    const data = testDataNew(7);
    try {
      const {user, password} = await xmppStore.register(data.resource, data.provider_data);
      await xmppStore.login(user, password, data.resource);
      done();
    } catch (e) {
      done(e);
    }
  });
});
