require("./xmpp/strophe");
var Strophe = global.Strophe;
const NS = 'jabber:iq:roster';
const NEW_GROUP = "__new__";
const BLOCKED_GROUP = "__block__";

import {observable, when, action, autorunAsync} from 'mobx';
import ProfileStore from './ProfileStore';
import Profile from '../model/Profile';
import Model from '../model/Model';
import XMPP from './xmpp/xmpp';
import assert from 'assert';
import autobind from 'autobind-decorator';
import Utils from './xmpp/utils';

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

    this.xmpp.presence.onValue(this.onPresence);
  }

  @action onPresence(stanza){
    const user = Utils.getNodeJid(stanza.from);
    if (stanza.type === 'subscribe') {
      // new follower
      const profile: Profile = this.profile.create(user);
      if (profile.isBlocked){
        console.log("IGNORE BLOCKED USER:", profile.user);
        return;
      }
      profile.isFollower = true;
      profile.isNew = true;
      // add to new group
      this.addToRoster(profile, NEW_GROUP);
      // authorize
      this.authorize(profile.user);
      // add to the model
      this.model.friends.add(profile);
    } else if (stanza.type === 'subscribed'){
      // new followed
      const profile: Profile = this.profile.create(user, {isFollowed: true, isNew: true});
      // add to new group
      this.addToRoster(profile, NEW_GROUP);
      // add to the model
      this.model.friends.add(profile);
    }
  }

  @action async requestRoster(){
    const iq = $iq({type: 'get', to: this.model.profile.user + '@' + this.model.server})
      .c('query', {xmlns: NS});
    console.log("AWAIT ROSTER REQUEST");
    try {
      const stanza = await this.xmpp.sendIQ(iq);
      console.log("RECEIVE ROSTER:", stanza);
      let children = stanza.query.item;
      if (children && !Array.isArray(children)) {
        children = [children];
      }
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const {first_name, handle, last_name, avatar, jid, group, subscription, ask} = children[i];
          // ignore other domains
          if (Strophe.getDomainFromJid(jid) != this.model.server) {
            continue;
          }
          const user = Strophe.getNodeFromJid(jid);
          const profile:Profile = this.profile.create(user,
            {first_name, last_name, handle, avatar,
              isNew: group === NEW_GROUP,
              isBlocked: group === BLOCKED_GROUP,
              isFollowed: subscription === 'to' || subscription === 'both' || ask === 'subscribe',
              isFollower: subscription === 'from' || subscription === 'both',
            });
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

  addToRoster(profile: Profile, group = ''){
    const iq = $iq({type: 'set', to: this.model.profile.user + '@' + this.model.server})
      .c('query', {xmlns: NS}).c('item', {jid: profile.user + '@' + this.model.server}).c('group').t(group);
    this.xmpp.sendIQ(iq);
  }

  @action add(profile: Profile){
    this.addToRoster(profile)
    this.subscribe(profile.user);
    profile.isFollowed = true;
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
  
  @action unfollow(profile: Profile) {
    assert(profile, "Profile is not defined to remove");
    const user = profile.user;
    this.unsubscribe(user);
    profile.isFollowed = false;
  }
  
  @action block(profile: Profile) {
    profile.isBlocked = true;
    profile.isNew = false;
    this.addToRoster(profile, BLOCKED_GROUP);
  }
  
  @action unblock(profile: Profile) {
    profile.isBlocked = false;
    profile.isNew = false;
    this.addToRoster(profile);
  }
  
  @action follow(profile: Profile) {
    profile.isBlocked = false;
    profile.isFollowed = true;
    this.subscribe(profile.user);
    this.addToRoster(profile);
  }
  
  removeFromRoster(profile: Profile){
    const user = profile.user;
    const iq = $iq({type: 'set', to: this.model.profile.user + '@' + this.model.server})
      .c('query', {xmlns: NS}).c('item', { jid:user + '@' + this.model.server, subscription:'remove'});
    this.xmpp.sendIQ(iq);
  }

}
