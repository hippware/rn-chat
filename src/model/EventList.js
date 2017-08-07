// @flow

import {createModelSchema, list, child} from 'serializr';
import EventContainer from './EventContainer';
import {action, computed, observable} from 'mobx';
import type {IObservableArray} from 'mobx';
import Event from './Event';
import * as log from '../utils/log';

export default class EventList {
  @observable earliestId: ?string = '';
  @observable version: ?string = '';
  @observable finished: boolean = false;
  @observable _list: IObservableArray<EventContainer> = [];
  @computed
  get list(): IObservableArray<EventContainer> {
    return this._list.filter(el => !el.event.isHidden && el.event.target).sort((a: EventContainer, b: EventContainer) => {
      if (!a.event.date) {
        return 1;
      }
      if (!b.event.date) {
        return -1;
      }
      return b.event.date.getTime() - a.event.date.getTime();
    });
  }

  @action
  clear = (): void => {
    this.version = undefined;
    this.earliestId = undefined;
    this.finished = false;
    this._list.replace([]);
  };

  @action
  add = (event: Event) => {
    const data = event.asMap();
    const container = new EventContainer(data);
    const exist = this._list.findIndex(el => el.isEqual(container));
    if (exist !== -1) {
      // delete old
      this._list.splice(exist, 1);
    } else {
      log.log(`Message is new, inserting ${container.event.id}`);
    }
    this._list.splice(0, 0, container);
    // log.log("EVENT LIST after add:", JSON.stringify(this._list.map(x=>x.event.id)));
    return container;
  };

  @action
  remove = (id: string) => {
    const exist = this._list.findIndex(el => el.event.id === id);
    if (exist !== -1) {
      this._list.splice(exist, 1);
    } else {
      log.log('EventList.remove Cannot find id', id);
    }
  };
}

createModelSchema(EventList, {
  version: true,
  earliestId: true,
  _list: list(child(EventContainer)),
});
