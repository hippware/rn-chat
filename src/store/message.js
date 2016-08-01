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
import EventChat from '../model/EventChat';
import EventContainer from '../model/EventContainer';
import EventFriend from '../model/EventFriend';
import EventList from '../model/EventList';
import {createModelSchema, child, list} from 'serializr';

@autobind
export class MessageStore {
  chats: {string: Message} = {};
  all;
  message;
  composing;
  pausing;
  archive;

  start(){
//    if (!model.chats.list.length){
    this.archive = new Archive();
    console.log("REQUEST ARCHIVE");
      this.requestArchive();
//    }
    if (!this.messageHandler){
      this.messageHandler = xmpp.message.onValue(stanza=>{
        const message = this.processMessage(stanza);
        if (message.isArchived){
          this.archive.addMessage(message);
        } else if (message.body || message.media){
          console.log("MESSAGE FROM:", message.from)
          this.addMessage(message);
        }
      });
    }
  }

  finish(){
    // this.archive = [];
    // this.messageHandler.offValue();
    // this.archiveHandler();
    // this.archiveEndHandler();
  }
  
  @action create = (id) => {
    if (!this.chats[id]){
      console.log("CREATE CHAT", id);
      this.chats[id] = new Chat(id);
    }
    return this.chats[id];
  };
  
  
  
  @action addMessage = (message: Message, isArchive: boolean = false) => {
    const chatId = message.from.isOwn ? message.to : message.from.user;
    const profile = message.from.isOwn ? profileStore.create(message.to) : message.from;
    console.log("message.addMessage", chatId, message.id);
    const existingChat = model.chats.get(chatId);
    if (existingChat) {
      existingChat.addParticipant(profile);
      existingChat.addMessage(message);
    } else {
      const chat: Chat = this.create(chatId);
      chat.addParticipant(profile);
      chat.addMessage(message);
      model.chats.add(chat);
    }
  };

  async sendMedia({file, size, width, height, to}) {
    const media:File = fileStore.create();
    media.load(file);
  
    const message:Message = this.createMessage({to, media});
    this.addMessage(message);
  
    const data = await fileStore.requestUpload({
      file, size, width, height,
      purpose: 'message_media',
      access: `${to}@${model.server}`
    });
    this.sendMessageToXmpp({to, media:data});
  }
  
  createMessage(msg) {
    console.log("CREATE MESSAGE", msg);
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
    iq = iq.c('participant').t(`${model.user}@${model.server}`).up();
    const data = await xmpp.sendIQ(iq);
    console.log("GROUP CHAT DATA:", data);
    if (data['chat-created']){
      return data['chat-created'].node;
    } else {
      throw new Error("Error creating chat");
    }
  }
  
  @action createChat(profile: Profile) {
    console.log("message.creatChat, profile:", profile);
    assert(profile && profile instanceof Profile, "message.createChat: profile is not defined");
    const chat: Chat = message.create(profile.user);
    chat.addParticipant(profile);
    model.chats.add(chat);
    return chat;
  }
  
  @action async requestArchive() {
    while (!this.archive.completed) {
      let iq = $iq({type: 'set', to: `${model.user}@${model.server}`})
        .c('query', {queryid: this.archive.queryid, xmlns: MAM}).c('set', {xmlns: RSM}).c('max').t(50).up();
      if (this.archive.last) {
        iq = iq.c('after').t(this.archive.last);
      }
      const res = await xmpp.sendIQ(iq);
      const s = res.fin.set;
      this.archive.first = s.first;
      this.archive.last = s.last;
      this.archive.count = s.count;
      this.archive.completed = res.fin.complete;
    }
    for (let user of Object.keys(this.archive.archive)) {
      while(this.archive.archive[user].length) {
        this.addMessage(this.archive.archive[user].pop(), true);
      }
    }
  }
  
  processMessage(stanza) {
    let id = stanza.id;
    const jid = stanza.from;
    const user = Utils.getNodeJid(jid);
    const from = profileStore.create(user);
    let time = Date.now();
    let unread = true;
    let isArchived = false;
    if (stanza.result && stanza.result.forwarded) {
      if (stanza.result.forwarded.delay) {
        time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
        unread = false;
      }
      isArchived = true;
      id = stanza.result.id;
      stanza = stanza.result.forwarded.message;
      if (stanza.id){
        id = stanza.id;
      }
    }
    if (stanza.archived && !id){
      id = stanza.archived.id;
    }
    const type = stanza.type;
    const body = stanza.body || '';
    const to = Utils.getNodeJid(stanza.to);
    if (stanza.delay) {
      let stamp = stanza.delay.stamp;
      if (stanza.x){
        stamp = stanza.x.stamp;
      }
      if (stamp) {
        time = Utils.iso8601toDate(stamp).getTime();
      }
    }
    const msg: Message = new Message({
      from,
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
    return msg;
  }
}

const message = new MessageStore();
export default message;

Chat.serializeInfo.factory = (context) => message.create(context.json.id);
