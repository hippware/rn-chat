import {testDataNew} from './support/testuser';
import * as xmpp from '../src/store/xmpp/xmpp';
import {settings} from '../src/globals';
import push from '../src/store/xmpp/pushService';
import pushStore from '../src/store/pushStore';
import profile from '../src/store/profileStore';
import model from '../src/model/model';

describe('push', () => {
  step('enable', async (done) => {
    try {
      const data = testDataNew(11);
      const {user, password, server} = await xmpp.register(data.resource, data.provider_data);
      await xmpp.connect(user, password, server);
      await push.enable('123');
      await pushStore.start();
      settings.pushNotificationToken = '1234';
      model.connected = true;
      done();
    } catch (e) {
      done(e);
    }
  });

  step('disable', async (done) => {
    try {
      await push.disable();
      await profile.remove();
      done();
    } catch (e) {
      done(e);
    }
  });
});
