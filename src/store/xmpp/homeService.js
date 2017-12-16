// @flow

require('./strophe');

var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';

const NS = 'hippware.com/hxep/publishing';
const RSM = 'http://jabber.org/protocol/rsm';
import botService from './botService';
import * as log from '../../utils/log';

@autobind
class HomeService {
  async items(before?: string, limit: number = 3, excludeDeleted: boolean = false, version): Promise<Object> {
    log.log('REQUEST HS EVENTS', before, limit, excludeDeleted, version, {level: log.levels.VERBOSE});
    const iq = $iq({type: 'get', to: xmpp.provider.username});
    if (version) {
      iq.c('catchup', {xmlns: NS, node: 'home_stream', version});
    } else {
      iq.c('items', {xmlns: NS, node: 'home_stream'});
    }
    if (excludeDeleted) {
      iq.c('exclude-deleted').up();
    }
    iq
      .c('set', {xmlns: RSM})
      .c('reverse')
      .up()
      .c('max')
      .t(limit)
      .up();

    if (before) {
      iq
        .c('before')
        .t(before)
        .up();
    } else {
      iq.c('before').up();
    }

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    let items = data.items && data.items.item ? data.items.item : [];
    let bots = data.items && data.items['extra-data'] ? data.items['extra-data'].bot : [];
    if (!Array.isArray(bots)) {
      bots = [bots];
    }
    bots = bots.map(bot => botService.convert(bot));
    if (!Array.isArray(items)) {
      items = [items];
    }
    return data.items ? {items, bots, version: data.items.version, count: data.items.set ? parseInt(data.items.set.count) : 0} : {items, bots};
  }

  request(version: string): void {
    log.log('SEND REQUEST', version, {level: log.levels.VERBOSE});
    const iq = $pres({to: `${xmpp.provider.username}/home_stream`}).c('query', {
      xmlns: NS,
      version,
    });
    xmpp.sendStanza(iq);
  }

  async remove(id): Promise<Object> {
    const iq = $iq({type: 'set', to: xmpp.provider.username})
      .c('publish', {xmlns: NS, node: 'home_stream'})
      .c('delete', {id});
    const data = await xmpp.sendIQ(iq);
    return data;
  }

  async publishMessage(msg): Promise<Object> {
    const iq = $iq({type: 'set', to: xmpp.provider.username})
      .c('publish', {xmlns: NS, node: 'home_stream'})
      .c('item')
      .c('message')
      .c('body')
      .t(msg);
    const data = await xmpp.sendIQ(iq);
    return data;
  }
}

export default new HomeService();
