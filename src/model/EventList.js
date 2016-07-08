import {createModelSchema, ref, list, child} from 'serializr';
import Event from './Event';
import EventContainer from './EventContainer';
import {action, computed, observable} from 'mobx';

export default class EventList {
  @observable _list: [EventContainer] = [];
  @computed get list() {
    return this._list.filter(el=>!el.isHidden).sort((a: EventContainer, b: EventContainer)=>{
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.time - a.date.time;
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
  };
  
  @action remove = (event) => {
    event.isHidden = true;
    //this._list.replace(this._list.filter(el=>el.event.id !== data.id));
  }
  
}

createModelSchema(EventList, {
  _list: list(child(EventContainer)),
});

