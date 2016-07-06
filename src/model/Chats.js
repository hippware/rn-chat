import autobind from 'autobind-decorator';
import {action, observable, computed} from 'mobx';
import Chat from './Chat';
import assert from 'assert';
import {createModelSchema, ref, child, list} from 'serializr';

@autobind
export default class Chats {
  @computed get unread(): number { return this._list.reduce((prev:number, current: Chat)=> prev + current.unread, 0) }
  @observable _list:[Chat] = [];
  @computed get list(): [Chat] {
    return this._list.filter(chat=>chat.participants.filter(p=>p.isFollowed).length).sort((a: Chat, b: Chat)=>{
      if (!a.last) return 1;
      if (!b.last) return -1;
      return b.last.time - a.last.time;
    });

  }

  @action add = (chat: Chat): Chat => {
    assert(chat, "chat should be defined");
    console.log("Chats.add", chat.id);
    const existingChat = this.get(chat.id);
    if (!existingChat){
      this._list.push(chat);
    } else {
      console.log("Chat exists");
      return existingChat;
    }
    return chat;
  };
  
  get(id:string): Chat {
    return this._list.find(el=>el.id === id);
  }

  @action clear = () => {
    this._list.splice(0)
  };

  @action remove = (id: string) => {
    assert(id, "id is not defined");
    this._list.replace(this._list.filter(el=>el.id != id));
  };

}

createModelSchema(Chats, {
  _list: list(child(Chat)),
});