require("./strophe");
var Strophe = global.Strophe;
import * as xmpp from './xmpp';
import autobind from 'autobind-decorator';
import utils from './utils';
import assert from 'assert';
const NS = 'hippware.com/hxep/publishing';
const RSM = 'http://jabber.org/protocol/rsm';
import Utils from './utils';

/***
 * This class adds roster functionality to standalone XMPP service
 */
@autobind
class HomeService {
  async items(limit = 100, before){
    const iq = $iq({type: 'get', to: xmpp.provider.username})
      .c('items', {xmlns: NS, node:'home_stream'})
      .c('set', {xmlns: RSM})
      .c('before').up()
      .c('max').t(limit).up();
    
    const data = await xmpp.sendIQ(iq);
    if (data.error){
      throw data.error;
    }
    let items = data.items ? data.items.item : [];
    if (!Array.isArray(items)){
      items = [items];
    }
    return data.items ? {items, version: data.items.version} : {items};
  }
  
  request(version){
    const iq = $pres({ to: xmpp.provider.username+'/home_stream'})
      .c('query', {xmlns: NS, version})
    xmpp.sendStanza(iq);
  }
  
  async publish(msg){
    const iq = $iq({type: 'set', to: xmpp.provider.username})
      .c('publish', {xmlns: NS, node:'home_stream'})
      .c('item',{id:2})
      .c('message')
      .c('body').t(msg);
    const data = await xmpp.sendIQ(iq);
    return data;
  }
}

export default new HomeService();