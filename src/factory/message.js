import autobind from 'autobind-decorator';
import Message from '../model/Message';

@autobind
class MessageFactory {
  messages: {string: Message} = {};
  
  create = ({id, ...data}) => {
    if (!this.messages[id]){
      this.messages[id] = new Message({id, ...data});
    }
    const msg = this.messages[id];
    msg.load(data);
    return msg;
  };
}

export default new MessageFactory()