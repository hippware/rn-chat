import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Event from './Event';
import Profile from './Profile';
import moment from 'moment';

export default class EventFriend extends Event {
  @observable _isHidden = false;
  @computed get isHidden(){ return this._isHidden };
  get id(){ return this.profile.user+"_friendevent"};
  @observable profile: Profile;
  @observable _time: Date = Date.now();
  @computed get time(){ return this._time}
  @computed get target():Profile {return this.profile}
  
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

createModelSchema(EventFriend, {
  //profile: child(Profile),//ref("user", (user, cb) => cb(null, profile.create(user))),
  profile: ref("user", (user, cb) => cb(null, Profile.serializeInfo.factory({json:{user}}))),
  _time: true,
  _isHidden: true,
});
