import {createModelSchema, ref, list, child} from 'serializr';
import Event from './Event';
import EventMessage from './EventMessage';
import EventContainer from './EventContainer';
import {action, computed, observable} from 'mobx';

export default class EventList {
  @observable _list: [EventContainer] = [];
  @computed get list() {
    return this._list.filter(el=>!el.event.isHidden)
      .sort((a: EventContainer, b: EventContainer)=>{
      if (!a.time) return 1;
      if (!b.time) return -1;
      return b.time - a.time;
    });
  }
  
  @action clear = () => {
    this._list.replace([]);
  };
  
  @action addMessage = (event: EventMessage) => {
    const res: EventContainer = this.add({message : event});
    console.log("EventList.addMessage", JSON.stringify(event.message), JSON.stringify(res.event.message));
    if (event.message && (!res.event.time || res.event.time < event.time)){
      res.event.message = event.message;
      console.log("Overwrite message");
    }
  };
  
  @action add = (data) => {
    const container = new EventContainer(data);
    const exist = this._list.findIndex(el=>el.isEqual(container));
    if (exist !== -1){
      if (!this._list[exist].event.time || this._list[exist].event.time < container.event.time){
        console.log("EventList.add replace", container.event.target.user, JSON.stringify(container.event.message));
        this._list.push(container);
        this._list.splice(exist, 1);
      } else {
        console.log("EventList.add ignore",  this._list[exist].event.time, container.event.time, container.event.target.user, JSON.stringify(container.event.message))
      }
    } else {
      console.log("EventList.add push", container.event.target.user, JSON.stringify(container.event.message));
      this._list.push(container);
    }
    return container;
  };
  
}

createModelSchema(EventList, {
  _list: list(child(EventContainer)),
});

