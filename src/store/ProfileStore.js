require("./xmpp/strophe");
import assert from 'assert';
import Utils from './xmpp/utils';
import autobind from 'autobind-decorator';
const NS = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';
import {observable, when, action, autorunAsync} from 'mobx';
import Model from '../model/Model';
import xmpp from './xmpp/xmpp';
import Profile from '../model/Profile';
import FileStore from './FileStore';
import File from '../model/File';

@autobind
export default class ProfileStore {
  model: Model;
  fileStore: FileStore;

  constructor(model : Model, fileStore: FileStore) {
    this.model = model;
    this.fileStore = fileStore;
  }

  // registers/login given user
  @action async register(resource, provider_data) {
    assert(resource, "resource should not be null");
    assert(provider_data, "provider_data should not be null");
    this.model.error = null;
    const user = 'register';
    const password = `$J$${JSON.stringify({provider: 'digits', resource, token: true, provider_data})}`;
    console.log("register::", resource, provider_data, password);
    try {
      await xmpp.connect(user, password);
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
          this.model.profile = this.createProfile(user, true);
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
    await xmpp.sendIQ($iq({type: 'set'}).c('delete', {xmlns: NS}));
  }
  
  async lookup(handle) {
    assert(handle, "Handle should not be null");
    const iq = $iq({type: 'get'}).c('lookup', {xmlns: HANDLE}).c('item', {id: handle});
    const stanza = await xmpp.sendIQ(iq);
    const {first_name, last_name, avatar, jid, error} = stanza.results.item;
    if (error) {
      throw error;
    }
    const user = Strophe.getNodeFromJid(jid);
    return {user, first_name, last_name, handle, avatar, username: user};
  }
  
  createProfile(user, isOwn = false){
    if (this.model.profile && this.model.profile.user == user){
      return this.model.profile;
    }
    const profile: Profile = new Profile(user, isOwn);
    when(()=> this.model.connected,
      ()=>this.request(user, isOwn).then(data=>this.loadProfile(profile, data)));
    return profile;
  }

  @action loadProfile(profile: Profile, data = {}){
    Object.assign(profile, data);
    if (data.avatar){
      profile.avatar = this.fileStore.createFile(data.avatar)
    }
    profile.loaded = true;
  }

  @action async uploadAvatar({file, size, width, height}) {
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
      const data = await this.fileStore.requestUpload({file, size, width, height, purpose});
      assert(data.reference_url, "reference_url is not defined");
      this.update({avatar: data.reference_url});
    } catch (error){
      this.model.error = error;
    }
    this.updating = false;
  }

  @action async request(user, isOwn = false) {
    if (!this.model.connected){
      return this.model.error = "Application is not connected";
    }
    this.model.error = null;
    assert(user, "User should not be null");
    const node = `user/${user}`;
    let fields = isOwn ?
      ['avatar', 'handle', 'first_name', 'last_name', 'email'] :
      ['avatar', 'handle', 'first_name', 'last_name'];
    assert(node, "Node should be defined");
    let iq = $iq({type: 'get'}).c('get', {xmlns: NS, node});
    for (let field of fields) {
      iq = iq.c('field', {var: field}).up()
    }
    const stanza = await xmpp.sendIQ(iq);
    if (stanza.type === 'error'){
      return {error : stanza.error.text};
    }

    let result = {};
    for (let item of stanza.fields.field) {
      result[item.var] = item.value;
    }
    return this.toCamelCase(result);
  }

  @action async update(d) {
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
      await xmpp.sendIQ(iq);
      this.loadProfile(this.model.profile, d);
    } catch (error){
      console.log("ERROR:", error);
      this.model.error = error;
    }
    this.model.updating = false;
  }

  toCamelCase(data){
    const {first_name, last_name, user, token, ...result} = data || {};
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
