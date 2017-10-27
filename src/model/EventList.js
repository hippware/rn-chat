// @flow

import {createModelSchema, list, child} from 'serializr';
import EventContainer from './EventContainer';
import {action, computed, observable} from 'mobx';
import type {IObservableArray} from 'mobx';
import Event from './Event';
import * as log from '../utils/log';

export default class EventList {
  @observable earliestId: ?string = undefined;
  @observable version: ?string = undefined;
  @observable nextVersion: string = '';
  @observable finished: boolean = false;
  @observable _list: IObservableArray<EventContainer> = [];
  @observable listToAdd: IObservableArray<EventContainer> = [];

  @computed
  get list(): IObservableArray<EventContainer> {
    return this.activeList.sort((a: EventContainer, b: EventContainer) => {
      if (!a.event.date) {
        return 1;
      }
      if (!b.event.date) {
        return -1;
      }
      return b.event.date.getTime() - a.event.date.getTime();
    });
  }

  @computed
  get idsToDelete(): IObservableArray<string> {
    return this._list.filter(ev => ev.isPendingDelete);
  }

  @computed
  get activeList(): IObservableArray<EventContainer> {
    return this._list.filter(el => !el.event.isHidden && el.event.target);
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

  remove = (id: string): void => {
    console.log('& remove by event id', id, this._list.map(l => l.event.id));
    try {
      const exist = this._list.findIndex(el => el.event.id === id);
      this._removeByIndex(exist);
    } catch (err) {
      log.log('& error finding ', id, err);
      throw err;
    }
  };

  removeByBotId = (botId: string): void => {
    console.log('& remove by bot id', botId, this._list.filter(el => el.event.bot));
    const exist = this._list.findIndex(el => el.event.bot && el.event.bot.id === botId);
    this._removeByIndex(exist);
  };

  @action
  _removeByIndex = (index: number) => {
    if (index !== -1) {
      console.log('& eventlist removing', index);
      this._list.splice(index, 1);
    } else {
      log.log('& EventList.remove doesnt exist');
    }
  };

  @action
  flagForDelete = (id: string) => {
    const eventContainer = this._list.find(el => el.event.id === id);
    if (eventContainer) eventContainer.event.isPendingDelete = true;
    else log.log('& cannot find event to delete', id, this._list.map(l => l.event.id));
  };
}

createModelSchema(EventList, {
  version: true,
  nextVersion: true,
  earliestId: true,
  _list: list(child(EventContainer)),
});
