const CHATSTATES = 'http://jabber.org/protocol/chatstates';
const MAM = 'urn:xmpp:mam:1';
const NS = 'hippware.com/hxep/media';
const RSM = 'http://jabber.org/protocol/rsm';

const GROUP = 'hippware.com/hxep/groupchat';
const DEFAULT_TITLE = '(no title)';
import Utils from './xmpp/utils';
import autobind from 'autobind-decorator';
import {observable, when, toJS, action, autorunAsync} from 'mobx';
import model from '../model/model';
import profileStore from './profile';
import fileStore from './file';
import Message from '../model/Message';
import Profile from '../model/Profile';
import assert from 'assert';
import File from '../model/File';
import Chat from '../model/Chat';
import Chats from '../model/Chats';
import * as xmpp from './xmpp/xmpp';
import Archive from '../model/Archive';

const MAX_COUNT = 10;

@autobind
export class MessageStore {
  all;
  message;
  composing;
  pausing;
  archive = new Archive();

  start(){
    this.requestArchive();
    if (!this.messageHandler){
      this.messageHandler = xmpp.message.map(this.processMessage).filter(el=>!el.isArchived).onValue(this.addMessage);
    }
    if (!this.archiveHandler) {
      this.archiveHandler = xmpp.message.map(this.processMessage).filter(el=>el.isArchived).onValue(this.archive.addMessage);
    }
  }

  finish(){
    // this.archive = [];
    // this.messageHandler.offValue();
    // this.archiveHandler();
    // this.archiveEndHandler();
  }

  loadEarlierMessages(user) {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        for (let i=0;i<Math.min(MAX_COUNT, this.archive.archive[user].length);i++){
          this.addMessage(this.archive.archive[user].pop(), true);
        }
        resolve();
      }, 500)
    });
  }

  @action addMessage = (message: Message, isArchive: boolean = false) => {
    const chatId = message.from.isOwn ? message.to : message.from.user;
    const profile = message.from.isOwn ? profileStore.create(message.to) : message.from;
    const existingChat = model.chats.get(chatId);
    if (existingChat) {
      existingChat.addParticipant(profile);
      existingChat.addMessage(message);
    } else {
      const chat = new Chat([profile], chatId, Date.now(), true);
      model.chats.add(chat).addMessage(message);
    }
  };

  sendMedia({file, size, width, height, to}) {
    const media:File = fileStore.create();
    media.load(file);
  
    const message:Message = this.createMessage({to, media});
    this.addMessage(message);
  
    fileStore.requestUpload({
      file, size, width, height,
      purpose: `message_media:${to}@${model.server}`
    })
      .then(media => this.sendMessageToXmpp({to, media}))
  }
  
  createMessage(msg) {
    assert(msg, "message should be defined");
    assert(msg.to, "message.to should be defined");
    assert(msg.body || msg.media, "message.body or message media should be defined");
    const time = Date.now();
    const id = `s${time}${Math.round(Math.random() * 1000)}`;
    return new Message({id, time, ...msg, unread: false, from: model.profile});
  }

  sendMessage(msg){
    const message: Message = this.createMessage(msg);
    this.addMessage(message);
    this.sendMessageToXmpp(message);
  }

  sendMessageToXmpp(msg) {
    let stanza = $msg({to: msg.to + "@" + model.server, type: 'chat', id: msg.id})
      .c('body')
      .t(msg.body || '');
    if (msg.media) {
      stanza = stanza.up().c('image', {xmlns: NS}).c('url').t(msg.media)
    }
    xmpp.sendStanza(stanza);
  }

  createGroupChat(title: string, participants: [Profile]){
    when(()=>model.connected && model.profile && model.server,
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
      iq = iq.c('participant').t(`${participant.user}@${model.server}`).up()
    }
    iq = iq.c('participant').t(`${model.profile.user}@${model.server}`).up();
    const data = await xmpp.sendIQ(iq);
    console.log("GROUP CHAT DATA:", data);
    if (data['chat-created']){
      return data['chat-created'].node;
    } else {
      throw new Error("Error creating chat");
    }
  }
  
  openPrivateChat(profile: Profile): Chat {
    const chat: Chat = new Chat([profile], profile.user, new Date(), true);
    return model.chats.add(chat);
  }
  
  async requestArchive() {
    while (!this.archive.completed) {
    
      console.log("REQUEST ARCHIVE", this.archive.last);
      let iq = $iq({type: 'set', to: `${model.profile.user}@${model.server}`})
        .c('query', {queryid: this.archive.queryid, xmlns: MAM}).c('set', {xmlns: RSM}).c('max').t(50).up();
      if (this.archive.last) {
        iq = iq.c('after').t(this.archive.last);
      }
      const res = await xmpp.sendIQ(iq);
      console.log("COMPLETED ARCHIVE", this.archive.count);
      const s = res.fin.set;
      this.archive.first = s.first;
      this.archive.last = s.last;
      this.archive.count = s.count;
      this.archive.completed = res.fin.complete;
    }
    for (let user of Object.keys(this.archive.archive)) {
      for (let i = 0; i < Math.min(MAX_COUNT, this.archive.archive[user].length); i++) {
        this.addMessage(this.archive.archive[user].pop(), true);
      }
    }
  }
  
  processMessage(stanza) {
    let time = Date.now();
    let unread = true;
    let isArchived = false;
    if (stanza.result && stanza.result.forwarded) {
      if (stanza.result.forwarded.delay) {
        time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
        unread = false;
      }
      isArchived = true;
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
      from: profileStore.create(user),
      body,
      isArchived,
      to,
      type,
      id,
      time,
      unread
    });
    
    if (stanza.image && stanza.image.url) {
      msg.media = fileStore.create(stanza.image.url);
    }
    return new Message(msg);
  }
}

export default new MessageStore();
