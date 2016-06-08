const CHATSTATES = 'http://jabber.org/protocol/chatstates';
const MAM = 'urn:xmpp:mam:1';
const NS = 'hippware.com/hxep/media';
const GROUP = 'hippware.com/hxep/groupchat';
const DEFAULT_TITLE = '(no title)';
import Utils from './xmpp/utils';
import autobind from 'autobind-decorator';
import {observable, when, toJS, action, autorunAsync} from 'mobx';
import Model from '../model/Model';
import ProfileStore from './ProfileStore';
import FileStore from './FileStore';
import Message from '../model/Message';
import Profile from '../model/Profile';
import assert from 'assert';
import File from '../model/File';
import Chat from '../model/Chat';
import Chats from '../model/Chats';
import XMPP from './xmpp/xmpp';

@autobind
export default class MessageStore {
  static constitute() { return [Model, ProfileStore, FileStore, XMPP]};
  all;
  message;
  composing;
  pausing;
  profileStore: ProfileStore;
  fileStore: FileStore;
  model: Model;
  xmpp: XMPP;
  
  constructor(model: Model, profileStore: ProfileStore, fileStore: FileStore, xmpp: XMPP) {
    assert(model, "model is not defined");
    assert(profileStore, "profileStore is not defined");
    assert(fileStore, "fileStore is not defined");
    this.model = model;
    this.profileStore = profileStore;
    this.fileStore = fileStore;
    this.xmpp = xmpp;
    this.xmpp.message.map(this.processMessage).onValue(this.addMessage);

    // request message archive once connected and we don't have any messages
    autorunAsync(()=>{
      model.connected && model.profile && model.server && !model.chats.list.length && this.requestArchive()
    });
    
  }

  @action addMessage(message: Message){
    const chatId = message.from.isOwn ? message.to : message.from.user;
    const profile = message.from.isOwn ? this.profileStore.create(message.to) : message.from;
    const existingChat = this.model.chats.get(chatId);
    if (existingChat) {
      existingChat.addParticipant(profile);
      existingChat.addMessage(message);
    } else {
      const chat = new Chat([profile], chatId, Date.now(), true);
      this.model.chats.add(chat).addMessage(message);
    }
  }

  @action sendMedia({file, size, width, height, to}) {
    const media: File = this.fileStore.create();
    media.load(file);

    const message: Message = this.createMessage({to, media});
    this.addMessage(message);

    when (()=>this.model.connected && this.model.profile && this.model.server,
      ()=>{
        this.fileStore.requestUpload({file, size, width, height,
          purpose:`message_media:${to}@${this.model.server}`})
          .then(media => this.sendMessageToXmpp({to, media}))
      });
  }
  
  createMessage(msg) {
    assert(msg, "message should be defined");
    assert(msg.to, "message.to should be defined");
    assert(msg.body || msg.media, "message.body or message media should be defined");
    const time = Date.now();
    const id = `s${time}${Math.round(Math.random() * 1000)}`;
    return new Message({id, time, ...msg, unread: false, from: this.model.profile});
  }

  @action sendMessage(msg){
    const message: Message = this.createMessage(msg);
    this.addMessage(message);
    this.sendMessageToXmpp(message);
  }

  sendMessageToXmpp(msg){
    when (()=>this.model.connected && this.model.profile && this.model.server,
      ()=> {
        let stanza = $msg({to: msg.to + "@" + this.model.server, type: 'chat', id:msg.id})
          .c('body')
          .t(msg.body || '');
        if (msg.media) {
          stanza = stanza.up().c('image', {xmlns: NS}).c('url').t(msg.media)
        }
        this.xmpp.sendStanza(stanza);
      });
  }





  createGroupChat(title: string, participants: [Profile]){
    when(()=>this.model.connected && this.model.profile && this.model.server,
      ()=>{
        this.requestGroupChat(title, participants).then(data=>console.log("DATA:", data)).catch(e=>console.log("CHAT ERROR:",e));
     });
  }

  async requestGroupChat(title: string = DEFAULT_TITLE, participants: [Profile]) {
    assert(title, "Title should be defined");
    assert(participants && participants.length, "participants should be defined");

    let iq = $iq({type: 'get'})
      .c('new-chat', {xmlns: GROUP}).c('title').t(title).up()
      .c('participants');

    for (let participant of participants) {
      iq = iq.c('participant').t(participant.user).up()
    }
    iq = iq.c('participant').t(this.model.profile.user).up()
    console.log("REQUEST GROUP CHAT IQ");
    const data = await this.xmpp.sendIQ(iq);
    return data;
  }
  
  @action openPrivateChat(profile: Profile): Chat {
    const chat: Chat = new Chat([profile], profile.user, new Date(), true);
    return this.model.chats.add(chat);
  }
  
  requestArchive() {
    this.xmpp.sendIQ($iq({type: 'set', to: `${this.model.profile.user}@${this.model.server}`})
      .c('query', {queryid: Utils.getUniqueId('mam'), xmlns: MAM}));
  }
  
  processMessage(stanza) {
    let time = Date.now();
    let unread = true;
    if (stanza.result && stanza.result.forwarded) {
      if (stanza.result.forwarded.delay) {
        time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
        unread = false;
      }
      stanza = stanza.result.forwarded.message;
    }
    const jid = stanza.from;
    const user = Utils.getNodeJid(jid);
    const type = stanza.type;
    const body = stanza.body || '';
    const id = stanza.id || `s${Date.now()}${Math.round(Math.random() * 1000)}`;
    const to = Utils.getNodeJid(stanza.to);
    if (stanza.delay && stanza.x) {
      const stamp = stanza.x.stamp;
      if (stamp) {
        time = Utils.iso8601toDate(stamp).getTime();
      }
    }
    const msg: Message = new Message({
      from: this.profileStore.create(user),
      body,
      to,
      type,
      id,
      time,
      unread
    });
    
    if (stanza.image && stanza.image.url) {
      msg.media = this.fileStore.create(stanza.image.url);
    }
    return new Message(msg);
  }
}
