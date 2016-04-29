require("./strophe");
import Utils from './utils';
import assert from 'assert';
import service from './xmpp';

const NS = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';

class ProfileService {
  constructor(){
    this.requestProfile = this.requestProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.requestNode = this.requestNode.bind(this);
    this.lookup = this.lookup.bind(this);
  }

  async lookup(handle){
    assert(handle, "Handle should not be null");
    const iq = $iq({type: 'get', to: service.host})
      .c('lookup', {xmlns: HANDLE}).c('item', {id:handle});
    const stanza = await service.sendIQ(iq);
    const {first_name, last_name, avatar, jid, error} = stanza.results.item;
    if (error){
      throw error;
    }
    const user = Strophe.getNodeFromJid(jid);
    return {user, first_name, last_name, handle, avatar, username: user};
  }

  async requestNode(node, fieldsData, skipCache){
    let fields = fieldsData ||
      (node != 'user/'+service.username ?
        ['avatar', 'handle','first_name', 'last_name'] :
        ['avatar', 'handle', 'first_name', 'last_name','email']);
    assert(node, "Node should be defined");
    const file = tempDir + '/' + node.replace('/','_') +".json";
    //console.log("REQUEST NODE:", file);
    //if (!skipCache && await fileExists(file)){
    //    console.log("EXISTED FILE:", file);
    //    return {...JSON.parse(await readFile(file)), cached:true};
    //}
    let iq = $iq({type: 'get', to: service.host})
      .c('get', {xmlns: NS, node});
    for (let field of fields) {
      iq = iq.c('field', {var: field}).up()
    }
    const stanza = await service.sendIQ(iq);

    let data = stanza.fields.field;
    let result = {};
    for (let item of data) {
      result[item.var] = item.value;
    }
    let res = toCamelCase(result);
    res.node = stanza.fields.node;
    if (res.node == 'user/' + service.username) {
      res.own = true;
    } else {
      await writeFile(file, JSON.stringify(res));
    }
    return res;
  }
  /**
   * Send file upload request
   */
  async requestProfile(user, fields, skipCache = false) {
    assert(user || service.username, "No username is defined for profile request");
    const node = 'user/'+(user || service.username);
    return this.requestNode(node, fields, skipCache);
  }

  async updateProfile(node, d) {
    const data = fromCamelCase(d);
    if (!node) {
      node = service.username;
    }
    assert(node, "node should be defined");
    assert(data, "data should be defined");
    let iq = $iq({type: 'set', to: service.host})
      .c('set', {xmlns: NS, node: 'user/' + node});
    for (let field of Object.keys(data)) {
      if (data.hasOwnProperty(field) && data[field]) {
        iq = iq.c('field', {var: field, type: field==='avatar'? 'file': 'string'}).c('value').t(data[field]).up().up()
      }
    }
    await service.sendIQ(iq);
    let res = {...d};
    if (node == service.username) {
      res.own = true;
    }
    return res;
  }



}


export default new ProfileService();
