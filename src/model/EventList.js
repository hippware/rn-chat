import {createModelSchema, ref, list, child} from 'serializr';
import Event from './Event';
import EventContainer from './EventContainer';
import {action, computed, observable} from 'mobx';

export default class EventList {
  @observable _list: [EventContainer] = [];
  @computed get list() {
    return this._list.sort((a: EventContainer, b: EventContainer)=>{
      if (!a.event.date) return 1;
      if (!b.event.date) return -1;
      return b.event.date.time - a.event.date.time;
    });
  }
  
  
  @action add = (data) => {
    const container = new EventContainer(data);
    const exist = this._list.find(el=>el.isEqual(container));
    if (!exist){
      this._list.push(container);
    } else {
      console.log("EventList.add: ITEM ALREADY EXISTS");
    }
  }
  
}

createModelSchema(EventList, {
  _list: list(child(EventContainer)),
});

