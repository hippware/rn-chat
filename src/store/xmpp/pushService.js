require('./strophe');

var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';
import utils from './utils';
import assert from 'assert';

const NS = 'hippware.com/hxep/notifications';

/** *
 * This class adds roster functionality to standalone XMPP service
 */
@autobind
class PushService {
  async enable(token) {
    assert(token, 'token is required');
    const iq = $iq({type: 'set'}).c('enable', {
      xmlns: NS,
      platform: 'apple',
      device: token,
    });
    const data = await xmpp.sendIQ(iq);
    return data;
  }

  async disable() {
    const iq = $iq({type: 'set'}).c('disable', {xmlns: NS});
    const data = await xmpp.sendIQ(iq);
    return data;
  }
}

export default new PushService();
