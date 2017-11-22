// @flow

require('./strophe');

import * as xmpp from './xmpp';
import utils from './utils';

const NS = 'hippware.com/hxep/conversations';
const RSM_NS = 'http://jabber.org/protocol/rsm';
const MAM_NS = 'urn:xmpp:mam:1';
const MAX = 50;
const MAXINT = 1000;
import * as log from '../../utils/log';

class ArchiveService {
  load = async (jid: string, last: string): Promise<void> => {
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
    await xmpp.sendIQ(iq);
  };

  conversations = async (max: number = MAX): Promise<Array<any>> => {
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
      const data = await xmpp.sendIQ(iq); // eslint-disable-line
      if (!data || !data.query || !data.query.item) {
        return [];
      }
      let res = data.query.item;
      ({count, last} = data.query.set);
      if (!Array.isArray(res)) {
        res = [res];
      }
      res.forEach((item) => {
        items.push({
          ...item,
          other_jid: utils.getNodeJid(item.other_jid),
          message: {...item.message, to: utils.getNodeJid(item.message.to)},
          timestamp: utils.iso8601toDate(item.timestamp).getTime(),
          outgoing: item.outgoing === 'true',
        });
      });
    }
    return items;
  };
}

export default new ArchiveService();
