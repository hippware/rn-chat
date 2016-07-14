import {createModelSchema, ref, list, child} from 'serializr';
import Event from './Event';
import EventChat from './EventChat';
import EventFriend from './EventFriend';
import {action, computed, observable} from 'mobx';

export default class EventContainer {
  @observable chat: EventChat;
  @observable friend: EventFriend;
  
  @computed get event(): Event {
    return this.chat || this.friend;
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
    Object.assign(this, data);
  }
}

createModelSchema(EventContainer, {
  chat: child(EventChat),
  friend: child(EventFriend),
});

