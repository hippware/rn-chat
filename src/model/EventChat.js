import {observable, computed} from 'mobx';
import Chat from './Chat';
import Event from './Event';
import {createModelSchema, child, list} from 'serializr';

export default class EventChat extends Event {
  @observable chat: Chat;
  @computed get date(): Date {
    return this.chat.last;
  }
  
  constructor(chat){
    super();
    this.chat = chat;
  }
  
  isEqual(event){
    if (!event instanceof EventChat){
      return false;
    }
    return this.chat.id === event.chat.id;
  }
  
}

createModelSchema(EventChat, {
  chat: child(Chat),
});
