import autobind from 'autobind-decorator';
import Chat from '../model/Chat';
import * as log from '../utils/log';

@autobind
class ChatFactory {
  chats: {string: Chat} = {};

  clear() {
    this.chats = {};
  }

  create = (id: string) => {
    if (!this.chats[id]) {
      log.log('CREATE CHAT', id, {level: log.levels.INFO});
      this.chats[id] = new Chat(id);
    }
    return this.chats[id];
  };
}

export default new ChatFactory();
