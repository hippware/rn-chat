import {createModelSchema, ref, list, child} from 'serializr';
import Event from './Event';
import EventMessage from './EventMessage';
import EventContainer from './EventContainer';
import {action, computed, observable} from 'mobx';

export default class EventList {
  version;
  @observable _list: [EventContainer] = [];
  @computed get list(): [EventContainer] {
    return this._list.filter(el=>!el.event.isHidden);
  }
  
  @action clear = () => {
    this._list.replace([]);
  };
  
  @action addMessage = (event: EventMessage) => {
    this.add({message : event});
  };
  
  @action add = (data) => {
    const container = new EventContainer(data);
    const exist = this._list.findIndex(el=>el.isEqual(container));
    if (exist !== -1){
      // delete old
      console.log("Message already exist, replacing")
      this._list.splice(exist, 1);
    }
    this._list.splice(0, 0, container);
    return container;
  };
  
}

createModelSchema(EventList, {
  version: true,
  _list: list(child(EventContainer)),
});

