import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Message from './Message';
import Event from './Event';
import Profile from './Profile';
import moment from 'moment';
import autobind from 'autobind-decorator';

@autobind
export default class EventMessage extends Event {
  // don't show card if it is hidden or profile is not followed or no message from that profile
  id: string;
  @computed get isHidden(){ return this.target ? this._isHidden || this.target.hidePosts : null };
  @observable message: Message;
  @observable profile: Profile;
  @computed get target():Profile { return this.profile }
  @computed get time(): Date { return this.message && this.message.time }
  @computed get date(): string { return moment(this.time).calendar() }
  
  constructor(id, profile, message){
    super();
    this.id = id;
    this.profile = profile;
    this.message = message;
  }
  
  isEqual(event){
    return this.id === event.id || this.message.from === event.message.from;
  }
}

createModelSchema(EventMessage, {
  id: true,
  profile: ref("user", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}}))),
  message: ref("id", (id, cb) => (cb, null, Message.serializeInfo.factory({json:{id}}))),
  _isHidden: true,
});
