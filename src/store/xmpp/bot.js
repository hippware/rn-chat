require("./strophe");
var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';
import assert from 'assert';
const NS = 'hippware.com/hxep/bot';
import locationStore from './location';
import Utils from './utils';

/***
 * This class adds roster functionality to standalone XMPP service
 */
@autobind
class BotService {
  addField(iq, name, type) {
    iq.c('field', {var: name, type});
  }
  addValue(iq, name, value){
    if (value){
      const type = typeof value === 'string' ? 'string' : 'int';
      this.addField(iq, name, type);
      iq.c('value').t(value).up().up()
    }
  }
  
  addValues(iq, values){
    for (let key of Object.keys(values)){
      this.addValue(iq, key, values[key]);
    }
  }
  
  convert(data){
    return data.field.reduce((total: Bot, current: Bot)=>{
      if (current.var === 'followers+size') {
        total.followersSize = parseInt(current.value);
      } else if (current.type === 'geoloc'){
        total[current.var] = {latitude: parseFloat(current.geoloc.lat), longitude: parseFloat(current.geoloc.lon)};
      } else if (current.type === 'int') {
        total[current.var] = parseInt(current.value);
      } else if (current.var === 'owner') {
        total.owner = Utils.getNodeJid(current.value);
      } else if (current.var === 'radius') {
        total.radius = current.value/1000;
      } else if (current.var === 'updated') {
        total.updated = Utils.iso8601toDate(current.value).getTime();
      } else {
        total[current.var] = current.value;
      }
      return total;
    }, {});
  }
  
  async create(params = {}){
    let {title, type, shortname, image, description, address, location, visibility, radius, id, isNew, newAffiliates, removedAffilates} = params;
    if (isNew === undefined){
      isNew = true;
    }
    assert(type, 'type is required');
    assert(title, 'title is required');
    assert(location, 'location is required');
    assert(radius, 'radius is required');
    console.log("xmpp/bot start");
    const iq = isNew ? $iq({type: 'set'}).c('create', {xmlns: NS}) :  $iq({type: 'set'}).c('fields', {xmlns: NS, node:`bot/${id}`});
    
    this.addValues(iq, {title, shortname, description, radius:Math.round(radius), address, image, type, visibility});
    this.addField(iq, 'location', 'geoloc');
    locationStore.addLocation(iq, location);
    console.log("xmpp/bot before sent2:");
    const data = await xmpp.sendIQ(iq);
    console.log("RESPONSE:", data);
    if (data.error){
      if (data.error.conflict){
        let arr = data.error.conflict.field;
        if (!Array.isArray(arr)){
          arr = [arr];
        }
        const fields = arr.map(field=>field.var);
        throw fields.join(', ')+' not unique';
      }
      throw data.error.text ? data.error.text['#text'] : data.error;
    }
    const res = isNew ? this.convert(data.bot) : params;
    console.log("BOT RES:", res);
    if ((newAffiliates && newAffiliates.length) || (removedAffilates && removedAffilates.length)){
      await this.updateAffiliations(res, (newAffiliates||[]).map(x=>x.user), (removedAffilates || []).map(x=>x.user));
    }
    return res;
  }
  
  async retrieveAffiliates({id, server}){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server})
      .c('affiliations', {xmlns: NS, node:`bot/${id}`});
    console.log("RETRIEVE AFFILIATES");
    const data = await xmpp.sendIQ(iq);
    console.log("AFF RES:", data);
    if (data.error){
      throw data.error;
    }
    let arr = data.affiliations.affiliation;
    if (!arr){
      arr = [];
    }
    if (!Array.isArray(arr)){
      arr = [arr];
    }
    return arr.filter(x=>x.affiliation==='spectator').map(x=>Strophe.getNodeFromJid(x.jid));
  }
  
  async updateAffiliations({id, server}, newAffiliates = [], removedAffiliates = []) {
    console.log("UPDATE AFFILIATES", newAffiliates, removedAffiliates);
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('affiliations', {xmlns: NS, node:`bot/${id}`});
    
    for (const user of newAffiliates){
      iq.c('affiliation', {jid : user + '@' + xmpp.provider.host, affiliation:'spectator'}).up();
    }
    for (const user of removedAffiliates){
      iq.c('affiliation', {jid : user + '@' + xmpp.provider.host, affiliation:'none'}).up();
    }
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw `item ${id} not found`;
    }
    return data;
  }
  
  async remove({id, server}){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('delete', {xmlns: NS, node:`bot/${id}`});
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw `item ${id} not found`;
    }
    return data;
  }
  
  async load({id, server}){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server})
      .c('bot', {xmlns: NS, node:`bot/${id}`});
    //console.log("LOAD BOT:", iq.toString());
    const data = await xmpp.sendIQ(iq);
    //console.log("BOT RES:", data);
    if (data.error){
      throw data.error;
    }
    const res = this.convert(data.bot);
    // if (res['affiliates+size']){
    //   res.affiliations = await this.retrieveAffiliates({id, server});
    // }
    return res;
  }
  
  share({id, server}, recepients = [], message = '', type = 'chat') {
    const msg = $msg({from: xmpp.provider.username, type, to: xmpp.provider.host})
      .c('addresses', {xmlns: 'http://jabber.org/protocol/address'});
  
    recepients.forEach(user => {
      if (user === 'friends') {
        msg.c('address', {type: 'friends'}).up();
      } else if (user === 'followers') {
        msg.c('address', {type: 'followers'}).up();
      } else {
        msg.c('address', {type: 'to', jid: user + '@' + xmpp.provider.host}).up();
      }
    });
    msg.up();
    msg.c('body').t(message).up();
    msg.c('bot', {xmlns: NS})
      .c('jid').t(`${server}/bot/${id}`).up()
      .c('id').t(id).up()
      .c('server').t(server).up()
      .c('action').t('share');
    
    xmpp.sendStanza(msg);
  }
  
  async list(user, server, before, limit = 10){
    assert(user, 'bot.list: user is not defined!');
    assert(server, 'bot.list: server is not defined!');
    const iq = $iq({type: 'get', to: server})
      .c('bot', {xmlns: NS, user: user + '@' + server})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('max').t(limit).up();
  
    if (before){
      iq.c('before').t(before).up()
    } else {
      iq.c('before').up()
    }
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    const res = [];
    let bots = data.bots.bot;
    if (!bots){
      bots = [];
    }
    if (!Array.isArray(bots)){
      bots = [bots];
    }
    for (let item of bots){
      res.push(this.convert(item))
    }
    return {bots:res, last:data.bots.set.last, count:data.bots.set.count};
  }
  
  async items({id, server}, limit = 100, before){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server})
      .c('query', {xmlns: NS, node:`bot/${id}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('max').t(limit).up();
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    let res = data.query.item;
    if (!res){
      res = [];
    }
    if (!Array.isArray(res)){
      res = [res];
    }
    return res.map(x=>({id:x.id,...x.entry}));
  }
  
  async publishContent({id, server}, contentID, content, title = ''){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    assert(contentID, 'contentID is not defined');
    assert(content, 'content is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('publish', {xmlns: NS, node:`bot/${id}`})
      .c('item', {id:contentID, contentID})
      .c('entry', {xmlns:'http://www.w3.org/2005/Atom'})
      .c('title').t(title).up()
      .c('content').t(content).up()
  
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    return data;
  }
  
  async publishImage({id, server}, contentID, image, title = ''){
    console.log("bot.publishImage", id, server, contentID, image);
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    assert(contentID, 'contentID is not defined');
    assert(image, 'image is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('publish', {xmlns: NS, node:`bot/${id}`})
      .c('item', {id:contentID, contentID})
      .c('entry', {xmlns:'http://www.w3.org/2005/Atom'})
      .c('title').t(title).up()
      .c('image').t(image).up()
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    return data;
  }
  
  async imageItems({id, server}, before, limit = 6){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'get', to: server})
      .c('item_images', {xmlns: NS, node:`bot/${id}`})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('max').t(limit).up();
  
    if (before){
      iq.c('before').t(before).up()
    } else {
      iq.c('before').up()
    }
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    let res = data.item_images.image;
    if (!res){
      res = [];
    }
    if (!Array.isArray(res)){
      res = [res];
    }
    return res;
  }
  
  async removeItem({id, server}, contentID){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    assert(contentID, 'contentID is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('retract', {xmlns: NS, node:`bot/${id}`})
      .c('item', {id:contentID})
  
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    return true;
  }
  
  async subscribe({id, server}){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('subscribe', {xmlns: NS, node:`bot/${id}`})
      .c('follow').t('1')
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
  }
  
  async unsubscribe({id, server}){
    assert(id, 'id is not defined');
    assert(server, 'server is not defined');
    const iq = $iq({type: 'set', to: server})
      .c('unsubscribe', {xmlns: NS, node:`bot/${id}`})
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
  }
  
  async following(user, server, before, limit = 10){
    assert(user, 'bot.list: user is not defined!');
    assert(server, 'bot.list: server is not defined!');
    const iq = $iq({type: 'get', to: server})
      .c('following', {xmlns: NS, user: user + '@' + server})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
      .c('max').t(limit).up();
  
    if (before){
      iq.c('before').t(before).up()
    } else {
      iq.c('before').up()
    }
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    const res = [];
    let bots = data.bots.bot;
    if (!bots){
      bots = [];
    }
    if (!Array.isArray(bots)){
      bots = [bots];
    }
    for (let item of bots){
      res.push(this.convert(item))
    }
    return {bots:res, last:data.bots.set.last, count:data.bots.set.count};
  }
}

export default new BotService();