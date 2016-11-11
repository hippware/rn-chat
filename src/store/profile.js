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
import factory from '../factory/profile';



@autobind
class ProfileStore {
  
  constructor(){
    xmpp.disconnected.onValue(()=>{model.connected = false;model.connecting = false;console.log("PROFILESTORE onDisconnected", model.connected);});
    xmpp.connected.onValue(()=>{model.connected = true;model.connecting = false;console.log("PROFILESTORE onConnected", model.connected); });
    xmpp.authError.onValue(()=>{model.connected = false;model.connecting = false;console.log("PROFILESTORE onAuthError ", model.connected); });
  }

  @action create = (user: string, data) => {
    return factory.create(user, data);
  };
  
  async register(resource, provider_data){
    const {user, server, password} = await xmpp.register(resource, provider_data);
    return await this.connect(user, password, server);
  }
  
  @action async connect(user, password, server){
    console.log("ProfileStore.connect", user, password, server);
    if (model.connecting){
      console.log("CONNECTING IN PROGRESS");
      return;
    }
    if (!model.connected || !model.profile){
      console.log("PROFILECONNECT");
      try {
        model.connecting = true;
        await xmpp.connect(user, password, server);
      } catch (error){
        console.log("CONNECT ERROR:", error);
        return;
      } finally {
        model.connecting = false;
      }
      model.user = user;
      const profile = this.create(user);
      //console.log("SET PROFILE", profile)
      model.profile = profile;
      model.server = server;
      model.password = password;
      model.connected = true;
      console.log("CONNECTION SUCCESSFULL", model.profile);
    } else {
      console.log("ALREADY CONNECTED!", model.profile);
    }
    return model.profile;
  }

  async remove() {
    console.log("PROFILE REMOVE");
    await xmpp.sendIQ($iq({type: 'set'}).c('delete', {xmlns: NS}));
    this.profiles = {};
    model.clear();
    await xmpp.disconnect();
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
    const url = await fileStore.requestUpload({file, size, width, height, purpose, access:'all'});
    this.update({avatar: url});
  }
  
  async request(user, isOwn = false) {
    console.log("REQUEST_ONLINE DATA FOR USER:", user, isOwn);
    if (!user){
      return {error: "User should not be null" };
    }
    // try to connect
    if (!model.connected){
      console.log("Is not connected, will try to connect");
      if (!model.user || !model.server || !model.password){
        return {error: 'cannot connect, please try again'};
      }
      await this.connect(model.user, model.password, model.server);
    }
    const node = `user/${user}`;
    let fields = isOwn ?
      ['avatar', 'handle', 'first_name', 'last_name', 'email', 'phone_number'] :
      ['avatar', 'handle', 'first_name', 'last_name'];
    assert(node, "Node should be defined");
    let iq = $iq({type: 'get'}).c('get', {xmlns: NS, node});
    for (let field of fields) {
      iq = iq.c('field', {var: field}).up()
    }
    //console.log("WAITING FOR IQ");
    const stanza = await xmpp.sendIQ(iq);
    //console.log("GOT IQ", JSON.stringify(stanza));
    if (!stanza || stanza.type === 'error' || stanza.error){
      return {error : stanza && stanza.error ? stanza.error : 'empty data'};
    }

    let result = {};
    for (let item of stanza.fields.field) {
      result[item.var] = item.value;
    }
    const res = this.toCamelCase(result);
    // if (isOwn){
    //   model.profile = this.create(user, res);
    //   console.log("SETTING MODEL PROFILE", model.profile, model.profile.loaded);
    // }
    return res;
  }
  
  async logout({remove} = {}){
    console.log("PROFILE LOGOUT");
    if (remove){
      await this.remove();
    } else {
      console.log("PROFILE LOGOUT");
      this.profiles = {};
      model.clear();
      await xmpp.disconnect();
    }
    model.connected = false;
  }

  async update(d) {
    assert(model.profile, "No logged profile is defined!");
    assert(model.user, "No logged user is defined!");
    assert(d, "data should not be null");
    //console.log("update::", JSON.stringify(d), model);
    const data = this.fromCamelCase(d);
    assert(data, "file data should be defined");
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
    model.profile.loaded = true;
    //console.log("UPDATE COMPLETE", JSON.stringify(model.profile));
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
    profile.hidePosts = true;
  };
  
  @action showPosts = (profile: Profile) => {
    profile.hidePosts = false;
  }

}

export default new ProfileStore()
