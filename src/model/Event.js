import Profile from './Profile';
import {observable} from 'mobx';

export default class Event {
  @observable _isHidden: boolean = false;
  
  get isHidden(): boolean {
    return this._isHidden;
  }
  
  hide(){
    console.log("HIDE POST", this.id);
    this._isHidden = true;
  }
  
  unhide(){
    this._isHidden = false;
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
  
  isEqual(event){
    return this.id === event.id;
  }
  
}

