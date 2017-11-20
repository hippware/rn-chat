import Profile from './Profile';
import {observable} from 'mobx';
import * as log from '../utils/log';

export default class Event {
  @observable ordering: number = 0;
  @observable _isHidden: boolean = false;
  @observable isPendingDelete: boolean = false;

  get isHidden(): boolean {
    return this._isHidden || !this.target;
  }

  hide() {
    log.log('HIDE POST', this.id);
    this._isHidden = true;
  }

  unhide() {
    this._isHidden = false;
  }

  get date(): Date {
    throw 'Event.dateAsString is abstract method';
  }

  get dateAsString(): string {
    throw 'Event.dateAsString is abstract method';
    // return moment(this.date).calendar()
  }

  get target(): Profile {
    throw 'Event.target is abstract method';
  }

  isEqual(event) {
    return this.id === event.id;
    // if (!this.target || !event.target){
    //   log.log(`Event ${this.id} doesn't have target`);
    //   return this.id === event.id;
    // }
    // return this.target.user === event.target.user;
  }

  presenterClass() {
    throw 'Event.presenterClass is abstract method';
  }

  // / return itself as map
  asMap() {
    throw 'Event.asMap is abstract method';
  }
}
