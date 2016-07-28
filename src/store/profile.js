require("./xmpp/strophe");
import assert from 'assert';
import autobind from 'autobind-decorator';
const NS = 'hippware.com/hxep/user';
const HANDLE = 'hippware.com/hxep/handle';
import {observable, when, action, autorunAsync} from 'mobx';
import model from '../model/model';
import * as xmpp from './xmpp/xmpp';
import Profile from '../model/Profile';
import fileStore from './file';
@autobind
class ProfileStore {
  profiles: {string: Profile} = {};

  @action create = (user: string, data) => {
    if (!this.profiles[user]){
      this.profiles[user] = new Profile(user);
    }
    if (data){
      this.profiles[user].load(this.toCamelCase(data));
    }
    return this.profiles[user];
  };
  
  async register({resource, provider_date}){
    
  }

  async remove() {
    console.log("PROFILE REMOVE");
    await xmpp.sendIQ($iq({type: 'set'}).c('delete', {xmlns: NS}));
    xmpp.disconnect();
  }

  async lookup(handle): Profile {
    assert(handle, "Handle should not be null");
    const iq = $iq({type: 'get'}).c('lookup', {xmlns: HANDLE}).c('item', {id: handle});
    const stanza = await xmpp.sendIQ(iq);
    const {first_name, last_name, avatar, jid, error} = stanza.results.item;
    if (error){
      throw error;
    }
    const user = Strophe.getNodeFromJid(jid);
    return this.create(user, {first_name, last_name, handle, avatar});
  }

  async uploadAvatar({file, size, width, height}) {
    assert(model.user, "model.user should not be null");
    assert(model.server, "model.server should not be null");
    const purpose = `avatar`;//:${model.user}@${model.server}`;
    const url = await fileStore.requestUpload({file, size, width, height, purpose});
    this.update({avatar: url});
  }
  
  async loadProfile(user, isOwn = true){
    assert(user, "user should not be null");
    const res = await this.request(user, isOwn);
    const profile = this.create(user, res);
    console.log("ProfileStore.loadProfile", JSON.stringify(profile));
    return profile;
  }
  
  async request(user, isOwn = false) {
    assert(user, "User should not be null");
    console.log("REQUEST_ONLINE DATA FOR USER:", user, isOwn);
    const node = `user/${user}`;
    let fields = isOwn ?
      ['avatar', 'handle', 'first_name', 'last_name', 'email', 'phone_number'] :
      ['avatar', 'handle', 'first_name', 'last_name'];
    assert(node, "Node should be defined");
    let iq = $iq({type: 'get'}).c('get', {xmlns: NS, node});
    for (let field of fields) {
      iq = iq.c('field', {var: field}).up()
    }
    console.log("WAITING FOR IQ");
    const stanza = await xmpp.sendIQ(iq);
    console.log("GOT IQ", stanza);
    if (!stanza || stanza.type === 'error'){
      return {error : stanza && stanza.error ? stanza.error.text : 'empty data'};
    }

    let result = {};
    for (let item of stanza.fields.field) {
      result[item.var] = item.value;
    }
    return this.toCamelCase(result);
  }
  
  logout(){
    model.clear();
    xmpp.disconnect();
  }

  async update(d) {
    console.log("update::", d);
    assert(model.profile, "No logged profile is defined!");
    assert(model.user, "No logged user is defined!");
    assert(d, "data should not be null");
    const data = this.fromCamelCase(d);
    assert(data, "data should be defined");
    let iq = $iq({type: 'set'}).c('set', {xmlns: NS, node: 'user/' + model.user});
    for (let field of Object.keys(data)) {
      if (data.hasOwnProperty(field) && data[field]) {
        iq = iq.c('field', {
          var: field,
          type: field === 'avatar' ? 'file' : 'string'
        }).c('value').t(data[field]).up().up()
      }
    }
    await xmpp.sendIQ(iq);
    model.profile.load(d);
    return model.profile;
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
  
  @action hidePosts = (profile: Profile) => {
    console.log("HIDE POSTS");
    profile.hideNotifications = true;
  };
  
  @action showPosts = (profile: Profile) => {
    console.log("SHOW POSTS");
    profile.hideNotifications = false;
  }

}

export default new ProfileStore()
