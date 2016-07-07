export default class Event {
  get id(): string {
    throw "Event.id is abstract method";
  }
  get date(): Date {
    throw "Event.date is abstract method";
  }
  
  isEqual(event): boolean {
    throw "Event.isEqual is abstract method";
  }
}

