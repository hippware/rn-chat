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
  @computed get isHidden(){ return this.target ? this._isHidden || this.target.hidePosts : null };
  get id(){ return this.profile.user+"_messageevent"};
  @observable message: Message;
  @observable profile: Profile;
  @computed get target():Profile { return this.profile }
  @computed get time(): Date { return (this.message && this.message.time) || new Date() }
  @computed get date(): string { return moment(this.time).calendar() }
  
  constructor(profile, message){
    super();
    this.profile = profile;
    this.message = message;
  }
  
}

createModelSchema(EventMessage, {
  profile: ref("user", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}}))),
  message: ref("id", (id, cb) => (cb, null, Message.serializeInfo.factory({json:{id}}))),
  _isHidden: true,
});
