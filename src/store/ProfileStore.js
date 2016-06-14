require("./xmpp/strophe");
import assert from 'assert';
import Utils from './xmpp/utils';
import autobind from 'autobind-decorator';
const NS = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';
import {observable, when, action, autorunAsync} from 'mobx';
import Model from '../model/Model';
import XMPP from './xmpp/xmpp';
import XmppStore from './XmppStore';
import Profile from '../model/Profile';
import FileStore from './FileStore';
@autobind
export default class ProfileStore {
  model: Model;
  fileStore: FileStore;
  xmpp: XMPP;
  xmppStore: XmppStore;
  
  static constitute() { return [Model, FileStore, XMPP, XmppStore]};
  constructor(model : Model, fileStore: FileStore, xmpp:XMPP, xmppStore:XmppStore) {
    this.model = model;
    this.fileStore = fileStore;
    this.xmpp = xmpp;
    this.xmppStore = xmppStore;
  }
  
  @action create = (user: string, data) => {
    if (!this.model.profiles[user]){
      this.model.profiles[user] = new Profile(this.model, this, this.fileStore, user);
    }
    if (data){
      this.model.profiles[user].load(this.toCamelCase(data));
    }
    return this.model.profiles[user];
  };

  // registers/login given user
  async register(resource, provider_data) {
    assert(resource, "resource should not be null");
    assert(provider_data, "provider_data should not be null");
    this.model.error = null;
    const user = 'register';
    const password = `$J$${JSON.stringify({provider: 'digits', resource, token: true, provider_data})}`;
    console.log("register::", resource, provider_data, password);
    try {
      await this.xmpp.connect(user, password);
    } catch (error) {
      const xml = new DOMParser().parseFromString(error, "text/xml").documentElement;
      const data = Utils.parseXml(xml).failure;
      if ('redirect' in data) {
        try {
          const {user, server, token} = JSON.parse(data.text);
          assert(user, "register response doesn't contain user");
          assert(server, "register response doesn't contain server");
          assert(token, "register response doesn't contain token");
          this.model.server = server;
          this.model.token = token;
          this.model.profile = this.create(user);
          this.model.tryToConnect = true;
        } catch (e){
          this.model.error = e;
        }
      } else {
        this.model.error = data.text;
      }
    }
  }
  
  async remove() {
    console.log("PROFILE REMOVE");
    await this.xmpp.sendIQ($iq({type: 'set'}).c('delete', {xmlns: NS}));
    this.xmppStore.logout();
  }
  
  @action logout = () => {
    this.xmppStore.logout();
  };
  
  async lookup(handle): Profile {
    assert(handle, "Handle should not be null");
    const iq = $iq({type: 'get'}).c('lookup', {xmlns: HANDLE}).c('item', {id: handle});
    const stanza = await this.xmpp.sendIQ(iq);
    const {first_name, last_name, avatar, jid, error} = stanza.results.item;
    if (error){
      throw error;
    }
    const user = Strophe.getNodeFromJid(jid);
    return this.create(user, {first_name, last_name, handle, avatar});
  }
  
  async uploadAvatar({file, size, width, height}) {
    if (!this.model.profile){
      return this.model.error = "No logged user is defined!";
    }
    if (!this.model.connected){
      return this.model.error = "Application is not connected";
    }
    if (!this.model.server){
      return this.model.error = "Server is not defined";
    }
    this.model.updating = true;
    try {
      const purpose = `avatar:${this.model.profile.user}@${this.model.server}`;
      const url = await this.fileStore.requestUpload({file, size, width, height, purpose});
      this.update({avatar: url});
    } catch (error){
      this.model.error = error;
    }
    this.updating = false;
  }

  async request(user) {
    assert(user, "User should not be null");
    console.log("REQUEST_ONLINE DATA FOR USER:", user);
    if (!this.model.connected){
      console.log("NOT CONNECTED!");
      return this.model.error = "Application is not connected";
    }
    this.model.error = null;
    const node = `user/${user}`;
    let fields = this.model.profile.user === user ?
      ['avatar', 'handle', 'first_name', 'last_name', 'email', 'phone_number'] :
      ['avatar', 'handle', 'first_name', 'last_name'];
    assert(node, "Node should be defined");
    let iq = $iq({type: 'get'}).c('get', {xmlns: NS, node});
    for (let field of fields) {
      iq = iq.c('field', {var: field}).up()
    }
    console.log("WAITING FOR IQ");
    const stanza = await this.xmpp.sendIQ(iq);
    console.log("GOT IQ");
    if (!stanza || stanza.type === 'error'){
      return {error : stanza && stanza.error ? stanza.error.text : 'empty data'};
    }

    let result = {};
    for (let item of stanza.fields.field) {
      result[item.var] = item.value;
    }
    return this.toCamelCase(result);
  }

  async update(d) {
    console.log("update::", d);
    assert(this.model.profile, "No logged profile is defined!");
    assert(this.model.profile.user, "No logged user is defined!");
    if (!this.model.connected){
      return this.model.error = "Application is not connected";
    }
    assert(d, "data should not be null");
    this.model.error = null;
    this.model.updating = true;
    try {
      const data = this.fromCamelCase(d);
      assert(data, "data should be defined");
      let iq = $iq({type: 'set'}).c('set', {xmlns: NS, node: 'user/' + this.model.profile.user});
      for (let field of Object.keys(data)) {
        if (data.hasOwnProperty(field) && data[field]) {
          iq = iq.c('field', {
            var: field,
            type: field === 'avatar' ? 'file' : 'string'
          }).c('value').t(data[field]).up().up()
        }
      }
      await this.xmpp.sendIQ(iq);
      this.model.profile.load(d);
    } catch (error){
      console.log("ERROR:", error);
      this.model.error = error;
    }
    this.model.updating = false;
  }

  toCamelCase(data){
    if (!data){
      return;
    }
    const {first_name, last_name, phone_number, user, token, ...result} = data || {};
    if (user){
      result.uuid = user;
    }
    if (token){
      result.sessionID = token;
    }
    if (first_name){
      result.firstName = first_name;
    }
    if (last_name){
      result.lastName = last_name;
    }
    if (phone_number){
      result.phoneNumber = phone_number;
    }
    return result;
  };

  fromCamelCase(data){
    const {firstName, userID, phoneNumber, lastName, sessionID, uuid, ...result} = data || {};
    if (phoneNumber) {
      result.phone_number = phoneNumber;
      result.phoneNumber = phoneNumber;

    }
    if (userID){
      result.auth_user = userID;
    }
    if (firstName) {
      result.first_name = firstName;
    }
    if (lastName){
      result.last_name = lastName;
    }
    if (sessionID){
      result.token = sessionID;
    }
    if (uuid){
      result.user = uuid;
    }
    return result;

  }

}
