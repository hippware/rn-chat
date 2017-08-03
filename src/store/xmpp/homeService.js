require('./strophe');

var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';
import utils from './utils';
import assert from 'assert';

const NS = 'hippware.com/hxep/publishing';
const RSM = 'http://jabber.org/protocol/rsm';
import Utils from './utils';
import * as log from '../../utils/log';

/** *
 * This class adds roster functionality to standalone XMPP service
 */
@autobind
class HomeService {
  async items(before, limit = 10) {
    log.log('REQUEST HS EVENTS', before, limit, {level: log.levels.VERBOSE});
    const iq = $iq({type: 'get', to: xmpp.provider.username}).c('items', {xmlns: NS, node: 'home_stream'}).c('set', {xmlns: RSM}).c('reverse').up().c('max').t(limit).up();

    if (before) {
      iq.c('before').t(before).up();
    } else {
      iq.c('before').up();
    }

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    let items = data.items && data.items.item ? data.items.item : [];
    if (!Array.isArray(items)) {
      items = [items];
    }
    return data.items ? {items, version: data.items.version, count: parseInt(data.items.set.count)} : {items};
  }

  request(version) {
    log.log('SEND REQUEST', version, {level: log.levels.VERBOSE});
    const iq = $pres({to: `${xmpp.provider.username}/home_stream`}).c('query', {
      xmlns: NS,
      version,
    });
    xmpp.sendStanza(iq);
  }

  async remove(id) {
    const iq = $iq({type: 'set', to: xmpp.provider.username}).c('publish', {xmlns: NS, node: 'home_stream'}).c('delete', {id});
    const data = await xmpp.sendIQ(iq);
    return data;
  }

  async publishMessage(msg) {
    const iq = $iq({type: 'set', to: xmpp.provider.username}).c('publish', {xmlns: NS, node: 'home_stream'}).c('item').c('message').c('body').t(msg);
    const data = await xmpp.sendIQ(iq);
    return data;
  }
}

export default new HomeService();
