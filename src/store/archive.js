import autobind from 'autobind-decorator';
import assert from 'assert';
import archive from './xmpp/archive';
import profile from './profile';
import Chat from '../model/Chat';
import Message from '../model/Message';
import factory from '../factory/message';
import chatFactory from '../factory/chat';
import profileFactory from '../factory/profile';
import model from '../model/model';

@autobind
class ArchiveService {
  async load(chat: Chat) {
    if (!chat.loaded && !chat.loading && chat.requestedId != chat.first.archiveId){
      chat.requestedId = chat.first.archiveId;
      chat.loading = true;
      const data = await archive.load(chat.id, chat.requestedId);
      chat.loading = false;
      console.log("ADATA:", data);
      if (data && data.fin && data.fin.set && data.fin.set.first && data.fin.set.first.index === '0') {
        console.log("CHAT COMPLETED!");
        chat.loaded = true;
      }
    }
  }
  async conversations(){
    if (!model.user){
      console.error("Current user is not defined", model.user);
      return;
    }
    const data = await archive.conversations();
    for (let item of data){
      const {id, message, timestamp, outgoing, other_jid} = item;
      const msg = factory.create({id, from: outgoing ? model.user : other_jid, ...message, time: new Date(timestamp), unread: false});
      //console.log("ARCHIVE MSG FROM:", msg.from.firstName, msg.from.isOwn, other_jid);
      const chat: Chat = chatFactory.create(other_jid);
      chat.addParticipant(profileFactory.create(other_jid));
      chat.addMessage(msg);
      model.chats.add(chat);
    }
    
  }
}



export default new ArchiveService();