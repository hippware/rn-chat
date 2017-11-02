const MAM = 'urn:xmpp:mam:1';
const NS = 'hippware.com/hxep/media';
const RSM = 'http://jabber.org/protocol/rsm';

const GROUP = 'hippware.com/hxep/groupchat';
const DEFAULT_TITLE = '(no title)';
import Utils from './xmpp/utils';
import autobind from 'autobind-decorator';
import {when, action} from 'mobx';
import model from '../model/model';
import profileStore from './profileStore';
import fileStore from './fileStore';
import Message from '../model/Message';
import Profile from '../model/Profile';
import assert from 'assert';
import File from '../model/File';
import Chat from '../model/Chat';
import * as xmpp from './xmpp/xmpp';
import factory from '../factory/chatFactory';
import archive from './archiveStore';
import messageFactory from '../factory/messageFactory';
import * as log from '../utils/log';

@autobind
export class MessageStore {
  messages = xmpp.message.filter(msg => msg.body || msg.media || msg.image || msg.result);
  chats: {string: Message} = {};
  all;
  message;
  composing;
  pausing;
  archive;

  constructor() {
    this.messages.onValue(this.onMessage);
  }

  async start() {
    await archive.conversations();
  }

  onMessage(stanza) {
    log.log('message.onMessage', stanza);
    this.addMessage(this.processMessage({...stanza, unread: true}));
  }

  finish() {}

  @action
  create = (id) => {
    return factory.create(id);
  };

  async loadMore(chat: Chat) {
    if (!chat) {
      return;
    }
    if (!chat.loaded) {
      await archive.load(chat);
    }
  }

  async readAll(chat: Chat) {
    log.log('READ ALL');
    if (!chat) {
      log.log('NO CHAT');
      return;
    }
    if (chat.unread) {
      chat.readAll();
    } else {
      log.log('NO UNREAD');
    }
  }

  @action
  addMessage = (message: Message, isArchive: boolean = false) => {
    const chatId = message.from.isOwn ? message.to : message.from.user;
    const profile = message.from.isOwn ? profileStore.create(message.to) : message.from;
    const existingChat = model.chats.get(chatId);
    if (existingChat) {
      existingChat.addParticipant(profile);
      existingChat.addMessage(message);
      if (existingChat.active) {
        message.unread = false;
      }
    } else {
      const chat: Chat = this.create(chatId);
      chat.addParticipant(profile);
      chat.addMessage(message);
      model.chats.add(chat);
    }
  };

  async sendMedia({file, size, width, height, to}) {
    assert(to, 'sendMedia: to should be defined');
    const media: File = fileStore.create();
    media.load(file);

    const message: Message = this.createMessage({to, media});
    this.addMessage(message);

    const data = await fileStore.requestUpload({
      file,
      size,
      width,
      height,
      access: `user:${to}@${model.server}`,
    });
    log.log('UPLOADED', data);
    const newFile: File = fileStore.create(data);
    when(
      () => newFile.loaded,
      () => {
        message.media = newFile;
      },
    );
    this.sendMessageToXmpp({...message, media: data});
  }

  createMessage(msg) {
    // log.log("CREATE MESSAGE", msg);
    assert(msg, 'message should be defined');
    assert(msg.to, 'message.to should be defined');
    if (!msg.body && !msg.media) {
      return;
    }
    const time = Date.now();
    const id = Utils.generateID(time);
    return new Message({id, time, ...msg, unread: false, from: model.profile});
  }

  sendMessage(msg) {
    const message: Message = this.createMessage(msg);
    if (message) {
      this.addMessage(message);
      this.sendMessageToXmpp(message);
    }
  }

  sendMessageToXmpp(msg) {
    assert(msg, 'msg is not defined');
    assert(msg.to, 'msg.to is not defined');
    let stanza = $msg({to: `${msg.to}@${xmpp.provider.host}`, type: 'chat', id: msg.id})
      .c('body')
      .t(msg.body || '');
    if (msg.media) {
      stanza = stanza
        .up()
        .c('image', {xmlns: NS})
        .c('url')
        .t(msg.media);
    }
    xmpp.sendStanza(stanza);
  }

  createGroupChat(title: string, participants: [Profile]) {
    when(
      () => model.connected && model.profile && model.server,
      () => {
        this.requestGroupChat(title, participants)
          .then(data => log.log('DATA:', data))
          .catch(e => log.log('CHAT ERROR:', e));
      },
    );
  }

  async requestGroupChat(title: string = DEFAULT_TITLE, participants: [Profile]) {
    assert(title, 'Title should be defined');
    assert(participants && participants.length, 'participants should be defined');

    let iq = $iq({type: 'get'})
      .c('new-chat', {xmlns: GROUP})
      .c('title')
      .t(title)
      .up()
      .c('participants');

    for (const participant of participants) {
      iq = iq
        .c('participant')
        .t(`${participant.user}@${model.server}`)
        .up();
    }
    iq = iq
      .c('participant')
      .t(`${model.user}@${model.server}`)
      .up();
    const data = await xmpp.sendIQ(iq);
    log.log('GROUP CHAT DATA:', data);
    if (data['chat-created']) {
      return data['chat-created'].node;
    } else {
      throw new Error('Error creating chat');
    }
  }

  @action
  createChat(profile: Profile) {
    assert(profile && profile instanceof Profile, 'message.createChat: profile is not defined');
    const chat: Chat = message.create(profile.user);
    chat.addParticipant(profile);
    model.chats.add(chat);
    return chat;
  }

  @action
  async requestArchive() {
    assert(model.user, 'model.user is not defined');
    assert(model.server, 'model.server is not defined');
    while (!this.archive.completed) {
      let iq = $iq({type: 'set', to: `${model.user}@${model.server}`})
        .c('query', {queryid: this.archive.queryid, xmlns: MAM})
        .c('set', {xmlns: RSM})
        .c('max')
        .t(50)
        .up();
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
    for (const user of Object.keys(this.archive.archive)) {
      while (this.archive.archive[user].length) {
        this.addMessage(this.archive.archive[user].pop(), true);
      }
    }
  }

  processMessage(stanza) {
    log.log('PROCESS MESSAGE', stanza);
    let id = stanza.id;
    let archiveId;
    let time = Date.now();
    let unread = stanza.unread;
    let isArchived = false;
    if (stanza.result && stanza.result.forwarded) {
      if (stanza.result.forwarded.delay) {
        time = Utils.iso8601toDate(stanza.result.forwarded.delay.stamp).getTime();
        unread = false;
      }
      isArchived = true;
      id = stanza.result.id;
      archiveId = id;
      stanza = stanza.result.forwarded.message;
      if (stanza.id) {
        id = stanza.id;
      }
    }
    if (stanza.archived && !id) {
      id = stanza.archived.id;
    }
    const jid = stanza.from;
    const user = Utils.getNodeJid(jid);
    const from = profileStore.create(user);
    const type = stanza.type;
    const body = stanza.body || '';
    const to = Utils.getNodeJid(stanza.to);
    if (stanza.delay) {
      log.log('DELAY TIME:', stanza.delay.stamp);
      let stamp = stanza.delay.stamp;
      if (stanza.x) {
        stamp = stanza.x.stamp;
      }
      if (stamp) {
        time = Utils.iso8601toDate(stamp).getTime();
        log.log('ATIME:', time);
      }
    }
    if (!id) {
      log.log('No id is given, generate random one');
      id = Utils.generateID();
    }
    const msg: Message = messageFactory.create({
      from,
      body,
      archiveId,
      isArchived,
      to,
      type,
      id,
      time,
      unread,
    });
    if (stanza.image && stanza.image.url) {
      msg.media = fileStore.create(stanza.image.url);
    }
    return msg;
  }
}

const message = new MessageStore();
export default message;

Chat.serializeInfo.factory = context => message.create(context.json.id);
