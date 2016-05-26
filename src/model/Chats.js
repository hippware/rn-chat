import autobind from 'autobind-decorator';
import {action, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Chat from './Chat';
import Message from './Message';
import Profile from './Profile';

@autobind
export default class Chats {
  @observable list: [Chat] = [];
  map: {string: Chat} = {};
  
  @action addMessage(message: Message){
    const profile = message.from.isOwn ? message.to : message.from;
    if (this.map[profile.user]){
      this.map[profile.user].addMessage(message);
    } else {
      const chat: Chat = new Chat(profile, message);
      this.list.push(chat);
      this.map[profile.user] = chat;
    }
  }
  
  @action clear(){
    this.list = [];
    this.map = {};
  }
}