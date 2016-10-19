require("./strophe");
var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';
import utils from './utils';
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
    return data.field.reduce((total, current)=>{
      if (current.type === 'geoloc'){
        total[current.var] = {latitude: parseFloat(current.geoloc.lat), longitude: parseFloat(current.geoloc.lon)};
      } else if (current.type === 'int') {
        total[current.var] = parseInt(current.value);
      } else if (current.var === 'owner'){
        total.owner = Utils.getNodeJid(current.value);
      } else {
        total[current.var] = current.value;
      }
      return total;
    }, {});
  }
  
  async create({title, type, shortname, image, description, location, radius}){
    assert(type, 'type is required');
    assert(title, 'title is required');
    assert(location, 'location is required');
    assert(radius, 'radius is required');
    const iq = $iq({type: 'set'})
      .c('create', {xmlns: NS})
      
    this.addValues(iq, {title, shortname, description, radius, image, type});
    this.addField(iq, 'location', 'geoloc');
    locationStore.addLocation(iq, location);
    const data = await xmpp.sendIQ(iq);
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
    return this.convert(data.bot);
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
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw `item ${id} not found`;
    }
    return this.convert(data.bot);
  }
  
  async list(user, server, limit = 100, before){
    assert(user, 'bot.list: user is not defined!');
    assert(server, 'bot.list: server is not defined!');
    const iq = $iq({type: 'get', to: server})
      .c('bot', {xmlns: NS, user: user + '@' + server})
      .c('set', {xmlns: 'http://jabber.org/protocol/rsm'})
//      .c('before').up()
      .c('max').t(limit).up();
    
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