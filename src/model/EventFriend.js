import {observable, computed} from 'mobx';
import Event from './Event';
import {createModelSchema, child, list} from 'serializr';
import Profile from './Profile';

export default class EventFriend extends Event {
  @observable profile: Profile;
  @observable date = new Date();
  
  constructor(profile){
    super();
    this.profile = profile;
  }
  
  isEqual(event){
    if (!event instanceof EventFriend){
      return false;
    }
    return this.profile.user === event.profile.user;
  }
  
}

createModelSchema(EventFriend, {
  profile: child(Profile),
  date: true,
});
