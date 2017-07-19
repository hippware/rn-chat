import autobind from 'autobind-decorator';
import assert from 'assert';
import archive from './xmpp/archiveService';
import profile from './profileStore';
import Chat from '../model/Chat';
import Message from '../model/Message';
import factory from '../factory/messageFactory';
import chatFactory from '../factory/chatFactory';
import profileFactory from '../factory/profileFactory';
import model from '../model/model';
import * as log from '../utils/log';

@autobind
class ArchiveService {
  async load(chat: Chat) {
    if (!chat.loaded && !chat.loading && chat.requestedId != chat.first.archiveId) {
      chat.requestedId = chat.first.archiveId;
      chat.loading = true;
      const data = await archive.load(chat.id, chat.requestedId);
      chat.loading = false;
      log.log('ADATA:', data, {level: log.levels.VERBOSE});
      if (data && data.fin && data.fin.set && data.fin.set.first && data.fin.set.first.index === '0') {
        log.log('CHAT COMPLETED!', {level: log.levels.VERBOSE});
        chat.loaded = true;
      }
    }
  }

  async conversations() {
    if (!model.user) {
      console.error('Current user is not defined', model.user);
      return;
    }
    const data = await archive.conversations();
    for (const item of data) {
      const {id, message, timestamp, outgoing, other_jid} = item;
      if (other_jid) {
        const msg = factory.create({
          id,
          from: outgoing ? model.user : other_jid,
          ...message,
          time: new Date(parseInt(timestamp)),
          unread: false,
        });
        log.log('ARCHIVE MSG FROM:', msg.from.firstName, msg.from.user, msg.id, msg.from.isOwn, other_jid, msg.body, model.user, {
          level: log.levels.VERBOSE,
        });
        const chat: Chat = chatFactory.create(other_jid);
        chat.addParticipant(profileFactory.create(other_jid));
        chat.addMessage(msg);
        model.chats.add(chat);
      }
    }
  }
}

export default new ArchiveService();
