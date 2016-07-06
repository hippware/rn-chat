import Event from './Event';
import EventChat from './EventChat';
import EventFriend from './EventFriend';

import {createModelSchema, child, list} from 'serializr';
import {action, computed, observable} from 'mobx';

export default class EventContainer {
  @observable chat: EventChat;
  @observable friend: EventFriend;
  
  @computed get event(): Event {
    return this.chat || this.friend;
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
  friend: child(EventFriend)
});

