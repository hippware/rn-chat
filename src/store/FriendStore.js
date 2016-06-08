require("./xmpp/strophe");
var Strophe = global.Strophe;
const NS = 'jabber:iq:roster';
import {observable, when, action, autorunAsync} from 'mobx';
import ProfileStore from './ProfileStore';
import Profile from '../model/Profile';
import Model from '../model/Model';
import XMPP from './xmpp/xmpp';
import assert from 'assert';
import autobind from 'autobind-decorator';

@autobind
export default class FriendStore {
  static constitute() { return [Model, ProfileStore, XMPP]};
  model: Model;
  xmpp: XMPP;
  profile: ProfileStore;

  constructor(model, profile, xmpp){
    this.model = model;
    this.xmpp = xmpp;
    this.profile = profile;

    // request message archive once connected and we don't have any messages
    autorunAsync(()=>{
      model.connected && model.profile && model.server && this.requestRoster();
    });
  }

  @action async requestRoster(){
    const iq = $iq({type: 'get', to: this.model.profile.user + '@' + this.model.server})
      .c('query', {xmlns: NS});
    console.log("AWAIT ROSTER REQUEST");
    try {
      const stanza = await this.xmpp.sendIQ(iq);
      console.log("RECEIVE ROSTER:", stanza);
      this.model.friends.clear();
      let children = stanza.query.item;
      if (children && !Array.isArray(children)) {
        children = [children];
      }
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const {first_name, handle, last_name, avatar, jid} = children[i];
          // ignore other domains
          if (Strophe.getDomainFromJid(jid) != this.model.server) {
            continue;
          }
          const user = Strophe.getNodeFromJid(jid);
          const profile:Profile = this.profile.create(user, {first_name, last_name, handle, avatar});
          this.model.friends.add(profile);
        }
      }
    } catch (error){
      console.log("ROSTER ERROR:", error);
    }
  }
  
  /**
   * Send 'subscribe' request for given user
   * @param username username to subscribe
   */
  subscribe(username){
    console.log("SUBSCRIBE::::", username);
    this.xmpp.sendPresence({to: username + "@" + this.model.server, type:'subscribe'});
  }

  /**
   * Send 'subscribed' request for given user
   * @param username user to send subscribed
   */
  authorize(username){
    this.xmpp.sendPresence({to: username + "@" + this.model.server, type:'subscribed'});
  }

  /**
   * unsubscribe from the user's with username presence
   * @param username username to unsubscribe
   */
  unsubscribe(username){
    this.xmpp.sendPresence({to: username + "@" + this.model.server, type:'unsubscribe'});
  }

  /**
   * Unauthorize the user with username to subscribe to the authenticated user's presence
   * @param username username to unauthorize
   */
  unauthorize(username){
    this.xmpp.sendPresence({to: username + "@" + this.model.server, type:'unsubscribed'});
  }

  @action add(profile: Profile){
    const iq = $iq({type: 'set', to: this.model.profile.user + '@' + this.model.server})
      .c('query', {xmlns: NS}).c('item', {jid: profile.user + '@' + this.model.server});
    this.xmpp.sendIQ(iq);
    this.subscribe(profile.user);
    this.model.friends.add(profile);
  }
  
  @action addAll(profiles: [Profile]){
    for (let profile of profiles.map(x=>x)){
      this.add(profile);
    }
  }
  
  @action async addByHandle(handle) {
    const profile:Profile = await this.profile.lookup(handle);
    this.add(profile);
  }
  
  @action async remove(user: string) {
    assert(user, "User is not defined to remove");
    const iq = $iq({type: 'set', to: this.model.profile.user + '@' + this.model.server})
      .c('query', {xmlns: NS}).c('item', { jid:user + '@' + this.model.server, subscription:'remove'});
    await this.xmpp.sendIQ(iq);
    this.model.friends.remove(user);
  }
  
}
