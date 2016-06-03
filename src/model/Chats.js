import autobind from 'autobind-decorator';
import {action, map, ObservableMap, observable, toJS, computed, autorunAsync} from 'mobx';
import Chat from './Chat';
import Message from './Message';
import Profile from './Profile';
import assert from 'assert';

@autobind
export default class Chats {
  @observable list:[Chat] = [];

  @action add(chat: Chat): Chat {
    assert(chat, "chat should be defined");
    console.log("Chats.add", chat.id);
    const existingChat = this.get(chat.id);
    if (!existingChat){
      this.list.push(chat);
    } else {
      console.log("Chat exists");
      return existingChat;
    }
    this.list.sort((a: Chat, b: Chat)=>{
      if (!a.last) return -1;
      if (!b.last) return 1;
      return b.last.time - a.last.time;
    });
    return chat;
  }
  
  get(id:string): Chat {
    return this.list.find(el=>el.id === id);
  }

  @action clear(){
    this.list.splice(0)
  }

  @action remove(id: string){
    assert(id, "id is not defined");
    this.list.replace(this.list.filter(el=>el.id != id));
  }

  toJSON(){
    return toJS(this.list);
  }
}