const CHATSTATES = 'http://jabber.org/protocol/chatstates';
const MAM = 'urn:xmpp:mam:1';
const NS = 'hippware.com/hxep/media';

import Utils from './xmpp/utils';
import xmpp from './xmpp/xmpp';
import autobind from 'autobind-decorator';
import {observable, when, action, autorunAsync} from 'mobx';
import Model from '../model/Model';
import ProfileStore from './ProfileStore';
import FileStore from './FileStore';
import Message from '../model/Message';
import Profile from '../model/Profile';
import assert from 'assert';
import File from '../model/File';

@autobind
export default class MessageStore {
  all;
  message;
  composing;
  pausing;
  profileStore: ProfileStore;
  fileStore: FileStore;
  model: Model;
  
  constructor(model: Model, profileStore: ProfileStore, fileStore: FileStore) {
    assert(model, "model is not defined");
    assert(profileStore, "profileStore is not defined");
    assert(fileStore, "fileStore is not defined");
    this.model = model;
    this.profileStore = profileStore;
    this.fileStore = fileStore;
    
    this.all = xmpp.message.map(this.processMessage).log('all');
    this.message = this.all.filter(msg=>msg.body);

    // add incoming messages
    this.message.onValue(msg=>this.model.chats.addMessage(msg) );
    this.composing = this.all.filter(msg=>msg.composing);
    this.pausing = this.all.filter(msg=>msg.paused);
    
    // request message archive once connected and we don't have any messages
    autorunAsync(()=>{
      model.connected && model.profile && model.server && !model.chats.list.length && this.requestArchive()
    });
    
  }
  
  @action async sendMessage(msg){
    assert(msg.to, "msg.to is not defined");
    when(()=>this.model.connected && this.model.profile && this.model.server,
      ()=>{
        console.log("sendMessage::", msg);
        let stanza = $msg({to: msg.to + "@" + this.model.server, type: 'chat', id:msg.id}).c('body').t(msg.body);
        if (msg.media){
          stanza = stanza.up().c('image', {xmlns:NS}).c('url').t(msg.media)
        }
        xmpp.sendStanza(stanza);
        
        this.model.chats.addMessage(new Message({
          ...msg,
          from: this.model.profile,
          to: this.profileStore.createProfile(msg.to)
        }));
      }
    )
  }
  
  requestArchive() {
    xmpp.sendIQ($iq({type: 'set', to: `${this.model.profile.user}@${this.model.server}`})
      .c('query', {queryid: Utils.getUniqueId('mam'), xmlns: MAM}));
  }
  
  processMessage(stanza) {
    let time = Date.now();
    if (stanza.result && stanza.result.forwarded) {
      if (stanza.result.forwarded.delay) {
        time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
      }
      stanza = stanza.result.forwarded.message;
    }
    const jid = stanza.from;
    const user = Utils.getNodeJid(jid);
    const type = stanza.type;
    const body = stanza.body;
    const id = stanza.id || `s${Date.now()}${Math.round(Math.random() * 1000)}`;
    const to = Utils.getNodeJid(stanza.to);
    if (stanza.delay && stanza.x) {
      const stamp = stanza.x.stamp;
      if (stamp) {
        time = Utils.iso8601toDate(stamp).getTime();
      }
    }
    const msg: Message = new Message({
      from: this.profileStore.createProfile(user),
      body,
      to: this.profileStore.createProfile(to),
      type,
      id,
      time
    });
    
    if (stanza.image && stanza.image.url) {
      msg.media = new File(this.fileStore, stanza.image.url);
    }
    return new Message(msg);
  }
}
