import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Chat from './Chat';
import Event from './Event';

export default class EventChat extends Event {
  get id(){ return this.chat.id+"_chatevent"};
  @observable chat: Chat;
  @computed get date(): Date {
    return this.chat.last;
  }
  
  constructor(chat){
    super();
    this.chat = chat;
  }
  
  isEqual(event){
    if (!(event instanceof EventChat)){
      return false;
    }
    return this.chat.id === event.chat.id;
  }
  
}

createModelSchema(EventChat, {
//  chat: child(Chat),
  chat: ref("id", (id, cb) =>cb(null, Chat.serializeInfo.factory({json:{id}})))
});
