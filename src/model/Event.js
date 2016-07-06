import {createModelSchema, child} from 'serializr';
import {observable, computed} from 'mobx';

export default class Event {
  get date(){
    throw "Event.date is abstract class";
  }
  
  isEqual(event){
    throw "Event.isEqual is abstract class";
  }
}

