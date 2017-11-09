// @flow

require('./strophe');

const {Strophe} = global;
import * as xmpp from './xmpp';
import assert from 'assert';

const NS = 'hippware.com/hxep/notifications';

class PushService {
  enable = async (token: string): Promise<void> => {
    assert(token, 'token is required');
    const iq = $iq({type: 'set'}).c('enable', {
      xmlns: NS,
      platform: 'apple',
      device: token,
    });
    const data = await xmpp.sendIQ(iq);
    if (!data || data.enabled !== '') throw data;
  };

  disable = async (): Promise<void> => {
    const iq = $iq({type: 'set'}).c('disable', {xmlns: NS});
    const data = await xmpp.sendIQ(iq);
    if (!data || !data.disabled) throw data;
  };
}

export default new PushService();
