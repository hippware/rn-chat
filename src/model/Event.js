import Profile from './Profile';
import {observable} from 'mobx';

export default class Event {
  get id(): string {
    throw "Event.id is abstract method";
  }
  get date(): Date {
    throw "Event.date is abstract method";
  }
  
  get target(): Profile {
    throw "Event.target is abstract method";
  }
  
  isEqual(event): boolean {
    throw "Event.isEqual is abstract method";
  }
}

