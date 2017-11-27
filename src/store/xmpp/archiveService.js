require('./strophe');

var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';
import utils from './utils';
import assert from 'assert';

const NS = 'hippware.com/hxep/conversations';
const RSM_NS = 'http://jabber.org/protocol/rsm';
const MAM_NS = 'urn:xmpp:mam:1';
const MAX = 50;
const MAXINT = 1000;
import Utils from './utils';
import * as log from '../../utils/log';

/** *
 * This class adds roster functionality to standalone XMPP service
 */
@autobind
class ArchiveService {
  async load(jid, last) {
    log.log('LOADING MESSAGES', last, {level: log.levels.VERBOSE});
    if (!xmpp.provider.username) {
      log.log("CAN'T LOAD ARCHIVE because no username");
      return;
    }
    const iq = $iq({type: 'set', to: xmpp.provider.username})
      .c('query', {xmlns: MAM_NS})
      .c('x', {xmlns: 'jabber:x:data', type: 'submit'})
      .c('field', {var: 'FORM_TYPE', type: 'hidden'})
      .c('value')
      .t('urn:xmpp:mam:1')
      .up()
      .up()
      .c('field', {var: 'reverse'})
      .c('value')
      .t('true')
      .up()
      .up()
      .c('field', {var: 'with'})
      .c('value')
      .t(`${jid}@${xmpp.provider.host}`)
      .up()
      .up()
      .up()
      .c('set', {xmlns: RSM_NS})
      .c('max')
      .t(20)
      .up()
      .c('before');
    if (last) {
      iq.t(last).up();
    }
    return await xmpp.sendIQ(iq);
  }

  async conversations(max = MAX) {
    if (!xmpp.provider.username) {
      return [];
    }
    const items = [];
    let count = MAXINT;
    let last;
    while (items.length < count) {
      const iq = $iq({type: 'get', to: xmpp.provider.username})
        .c('query', {xmlns: NS})
        .c('set', {xmlns: RSM_NS});

      if (last) {
        iq
          .c('after')
          .t(last)
          .up();
      }
      iq.c('max').t(max);
      const data = await xmpp.sendIQ(iq);
      if (!data || !data.query || !data.query.item) {
        return [];
      }
      let res = data.query.item;
      count = data.query.set.count;
      last = data.query.set.last;
      if (!Array.isArray(res)) {
        res = [res];
      }
      for (const item of res) {
        items.push({
          ...item,
          other_jid: utils.getNodeJid(item.other_jid),
          message: {...item.message, to: utils.getNodeJid(item.message.to)},
          timestamp: Utils.iso8601toDate(item.timestamp).getTime(),
          outgoing: item.outgoing === 'true',
        });
      }
    }
    return items;
  }
}

export default new ArchiveService();
