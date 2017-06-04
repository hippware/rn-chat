import autobind from 'autobind-decorator';
import Message from '../model/Message';
import model from '../model/model';
import assert from 'assert';
@autobind class MessageFactory {
  messages: {string: Message} = {};

  clear() {
    this.messages = {};
  }

  load(messages) {
    for (let i = 0; i < messages.length; i++) {
      this.messages[messages[i].id] = messages[i];
    }
  }

  create = ({id, time, ...data}) => {
    assert(id, 'id is not defined');
    if (!this.messages[id]) {
      this.messages[id] = new Message({id, time, ...data});
      if (data.body) {
        model.messages.push(this.messages[id]);
      }
    } else {
      this.messages[id].load(data);
      this.messages[id].unread = false;
    }
    return this.messages[id];
  };
}

export default new MessageFactory();
