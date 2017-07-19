require('./strophe');

var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';
import assert from 'assert';

const NS = 'hippware.com/hxep/bot';
import locationStore from './locationService';
import Utils from './utils';
import * as log from '../../utils/log';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/** *
 * This class adds roster functionality to standalone XMPP service
 */
@autobind
class BotService {
  addField(iq, name, type) {
    iq.c('field', {var: name, type});
  }

  addValue(iq, name, value) {
    if (value !== undefined && value !== null) {
      const type = typeof value === 'string' ? 'string' : 'int';
      this.addField(iq, name, type);
      iq.c('value').t(value).up().up();
    }
  }

  addValues(iq, values) {
    for (const key of Object.keys(values)) {
      this.addValue(iq, key, values[key]);
    }
  }

  convert(data) {
    return data.field.reduce((total: Bot, current: Bot) => {
      if (current.var === 'subscribers+size') {
        total.followersSize = parseInt(current.value);
      } else if (current.type === 'geoloc') {
        total[current.var] = {
          latitude: parseFloat(current.geoloc.lat),
          longitude: parseFloat(current.geoloc.lon),
        };
      } else if (current.type === 'int') {
        total[current.var] = parseInt(current.value);
      } else if (current.type === 'bool') {
        total[current.var] = current.value === 'true';
        total[`is${capitalizeFirstLetter(current.var)}`] = current.value === 'true';
      } else if (current.var === 'owner') {
        total.owner = Utils.getNodeJid(current.value);
      } else if (current.var === 'radius') {
        total.radius = current.value / 1000;
      } else if (current.var === 'updated') {
        total.updated = Utils.iso8601toDate(current.value).getTime();
      } else {
        total[current.var] = current.value;
      }
      return total;
    }, {});
  }

  async generateId() {
    const iq = $iq({type: 'set'}).c('new-id', {xmlns: NS});
    const data = await xmpp.sendIQ(iq);
    if (data['new-id']) {
      if (data['new-id']['#text']) {
        return data['new-id']['#text'];
      } else {
        return data['new-id'];
      }
    } else {
      return null;
    }
  }

  async create(params = {}) {
    let {title, type, shortname, image, description, address, location, visibility, radius, id, isNew, newAffiliates, removedAffilates} = params;
    if (isNew === undefined) {
      isNew = true;
    }
    if (!type) {
      type = 'location';
    }
    assert(title, 'title is required');
    assert(location, 'location is required');
    assert(radius, 'radius is required');
    log.log('xmpp/bot start', {level: log.levels.VERBOSE});
    const iq = isNew
      ? $iq({type: 'set'}).c('create', {xmlns: NS})
      : $iq({type: 'set'}).c('fields', {
        xmlns: NS,
        node: `bot/${id}`,
      });

    this.addValues(iq, {
      id,
      title,
      shortname,
      description,
      radius: Math.round(radius),
      address,
      image,
      type,
      visibility,
    });
    this.addField(iq, 'location', 'geoloc');
    locationStore.addLocation(iq, location);
    const data = await xmpp.sendIQ(iq);
    log.log('RESPONSE:', data, {level: log.levels.VERBOSE});
    if (data.error) {
      if (data.error.conflict) {
        let arr = data.error.conflict.field;
        if (!Array.isArray(arr)) {
          arr = [arr];
        }
        const fields = arr.map(field => field.var);
        throw `${fields.join(', ')} not unique`;
      }
      throw data.error.text ? data.error.text['#text'] : data.error;
    }
    const res = isNew ? this.convert(data.bot) : params;
    log.log('BOT CREATE RES:', res, {level: log.levels.VERBOSE});
    return res;
  }

  async remove({id, server}) {
    log.log(`botService.remove: ${id}`, {level: log.levels.VERBOSE});
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'set', to: server}).c('delete', {xmlns: NS, node: `bot/${id}`});
    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw `item ${id} not found: ${data.error}`;
    }
    return data;
  }

  async subscribers({id, server}) {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server}).c('subscribers', {
      xmlns: NS,
      node: `bot/${id}`,
    });
    const data = await xmpp.sendIQ(iq);
    log.log('SUBSCRIBERS RES:', data, {level: log.levels.VERBOSE});
    if (data.error) {
      throw data.error;
    }
    let arr = data.subscribers.subscriber;
    if (!Array.isArray(arr)) {
      arr = [arr];
    }
    return arr.map(rec => rec.jid.split('@')[0]);
  }

  async load({id, server}) {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server}).c('bot', {xmlns: NS, node: `bot/${id}`});
    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    const res = this.convert(data.bot);
    // if (res['affiliates+size']){
    //   res.affiliations = await this.retrieveAffiliates({id, server});
    // }
    return res;
  }

  share({id, server}, recepients = [], message = '', type = 'chat') {
    const msg = $msg({
      from: xmpp.provider.username,
      type,
      to: xmpp.provider.host,
    }).c('addresses', {xmlns: 'http://jabber.org/protocol/address'});

    recepients.forEach((user) => {
      if (user === 'friends') {
        msg.c('address', {type: 'friends'}).up();
      } else if (user === 'followers') {
        msg.c('address', {type: 'followers'}).up();
      } else {
        msg.c('address', {type: 'to', jid: `${user}@${xmpp.provider.host}`}).up();
      }
    });
    msg.up();
    msg.c('body').t(message).up();
    msg.c('bot', {xmlns: NS}).c('jid').t(`${server}/bot/${id}`).up().c('id').t(id).up().c('server').t(server).up().c('action').t('share');

    xmpp.sendStanza(msg);
  }

  async geosearch({server, latitude, longitude}) {
    const iq = $iq({type: 'get', to: server}).c('bots', {
      xmlns: NS,
      lat: latitude,
      lon: longitude,
    });

    const data = await xmpp.sendIQ(iq);
    log.log('GEOSEARCH RES:', data, {level: log.levels.VERBOSE});

    if (data.error) {
      throw data.error;
    }
    const res = [];
    let bots = data.bots.bot;
    if (!bots) {
      bots = [];
    }
    if (!Array.isArray(bots)) {
      bots = [bots];
    }
    for (const item of bots) {
      res.push(this.convert(item));
    }
    return res;
  }

  async list(user, server, before, limit = 10) {
    assert(user, 'bot.list: user is not defined!');
    assert(server, 'bot.list: server is not defined!');
    const iq = $iq({type: 'get', to: server})
      .c('bot', {xmlns: NS, user: `${user}@${server}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('reverse')
      .up()
      .c('max')
      .t(limit)
      .up();

    if (before) {
      iq.c('before').t(before).up();
    } else {
      iq.c('before').up();
    }

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    const res = [];
    let bots = data.bots.bot;
    if (!bots) {
      bots = [];
    }
    if (!Array.isArray(bots)) {
      bots = [bots];
    }
    for (const item of bots) {
      res.push(this.convert(item));
    }
    return {bots: res, last: data.bots.set.last, count: parseInt(data.bots.set.count)};
  }

  async items({id, server}, limit = 100, before) {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server})
      .c('query', {xmlns: NS, node: `bot/${id}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('reverse')
      .up()
      .c('max')
      .t(limit)
      .up();

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    let res = data.query.item;
    if (!res) {
      res = [];
    }
    if (!Array.isArray(res)) {
      res = [res];
    }
    return res.map(x => ({id: x.id, ...x.entry}));
  }

  async publishContent({id, server}, contentID, content, title = '') {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    assert(contentID, 'contentID is not defined');
    assert(content, 'content is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('publish', {xmlns: NS, node: `bot/${id}`})
      .c('item', {id: contentID, contentID})
      .c('entry', {xmlns: 'http://www.w3.org/2005/Atom'})
      .c('title')
      .t(title)
      .up()
      .c('content')
      .t(content)
      .up();

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    return data;
  }

  async publishImage({id, server}, contentID, image, title = '') {
    log.log('bot.publishImage', id, server, contentID, image, {level: log.levels.VERBOSE});
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    assert(contentID, 'contentID is not defined');
    assert(image, 'image is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('publish', {xmlns: NS, node: `bot/${id}`})
      .c('item', {id: contentID, contentID})
      .c('entry', {xmlns: 'http://www.w3.org/2005/Atom'})
      .c('title')
      .t(title)
      .up()
      .c('image')
      .t(image)
      .up();

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    return data;
  }

  async imageItems({id, server}, before, limit = 6) {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server})
      .c('item_images', {xmlns: NS, node: `bot/${id}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('reverse')
      .up()
      .c('max')
      .t(limit)
      .up();

    if (before) {
      iq.c('before').t(before).up();
    } else {
      iq.c('before').up();
    }

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw `Cannot load bot images for bot=${id} error: ${data.error}`;
    }
    let res = data.item_images.image;
    if (!res) {
      res = [];
    }
    if (!Array.isArray(res)) {
      res = [res];
    }
    return res;
  }

  async removeItem({id, server}, contentID) {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    assert(contentID, 'contentID is not defined');
    const iq = $iq({type: 'set', to: server}).c('retract', {xmlns: NS, node: `bot/${id}`}).c('item', {id: contentID});

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    return true;
  }

  async subscribe({id, server}) {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'set', to: server}).c('subscribe', {
      xmlns: NS,
      node: `bot/${id}`,
    });

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
  }

  async unsubscribe({id, server}) {
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'set', to: server}).c('unsubscribe', {
      xmlns: NS,
      node: `bot/${id}`,
    });

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
  }

  async following(user, server, before, limit = 10) {
    assert(user, 'bot.list: user is not defined!');
    assert(server, 'bot.list: server is not defined!');
    const iq = $iq({type: 'get', to: server})
      .c('following', {xmlns: NS, user: `${user}@${server}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('reverse')
      .up()
      .c('max')
      .t(limit)
      .up();

    if (before) {
      iq.c('before').t(before).up();
    } else {
      iq.c('before').up();
    }

    const data = await xmpp.sendIQ(iq);
    if (data.error) {
      throw data.error;
    }
    const res = [];
    let bots = data.bots.bot;
    if (!bots) {
      bots = [];
    }
    if (!Array.isArray(bots)) {
      bots = [bots];
    }
    for (const item of bots) {
      res.push(this.convert(item));
    }
    return {bots: res, last: data.bots.set.last, count: parseInt(data.bots.set.count)};
  }
}

export default new BotService();
