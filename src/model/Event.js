import Profile from './Profile';

export default class Event {
  get isHidden(): boolean {
    return false;
  }
  
  get id(): string {
    throw "Event.id is abstract method";
  }
  get time(): Date {
    throw "Event.date is abstract method";
  }
  get date(){
    throw "Event.date is abstract method";
    // return moment(this.time).calendar()
  }
  
  get target(): Profile {
    throw "Event.target is abstract method";
  }
  
  isEqual(event): boolean {
    throw "Event.isEqual is abstract method";
  }
}

