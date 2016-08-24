import {createModelSchema, ref, list, child} from 'serializr';
import Event from './Event';
import EventChat from './EventChat';
import EventFriend from './EventFriend';
import EventMessage from './EventMessage';

import {action, computed, observable} from 'mobx';

export default class EventContainer {
  @observable chat: EventChat;
  @observable friend: EventFriend;
  @observable message: EventMessage;
  
  @computed get event(): Event {
    return this.chat || this.friend || this.message;
  }
  
  @computed get date(): Date {
    return this.event.date;
  }
  
  @computed get time(): Date {
    return this.event.time;
  }
  
  isEqual(container: EventContainer){
    return this.event.isEqual(container.event);
  }
  
  constructor(data = {}){
    console.log("EventContainer constructor", data);
    Object.assign(this, data);
  }
}

createModelSchema(EventContainer, {
  chat: child(EventChat),
  friend: child(EventFriend),
  message: child(EventMessage),
});

