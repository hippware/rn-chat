import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Event from './Event';
import Profile from './Profile';
import moment from 'moment';

export default class EventFriend extends Event {
  get id(){ return this.profile.user+"_friendevent"};
  @observable profile: Profile;
  @observable _time: Date = Date.now();
  @computed get date(){ return moment(this._time).calendar()}
  
  constructor(profile){
    super();
    this.profile = profile;
  }
  
  isEqual(event){
    if (!(event instanceof EventFriend)){
      return false;
    }
    return this.profile.user === event.profile.user;
  }
  
}

