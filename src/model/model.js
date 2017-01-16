import {createModelSchema, ref, list, child} from 'serializr';
import Profile from './Profile';
import Message from './Message';
import messageFactory from '../factory/message';
import ProfileFactory from '../factory/profile';
import File from './File';
import {observable, action, autorun, computed, autorunAsync, toJS as toJSON} from 'mobx';
import autobind from 'autobind-decorator';
import Chats from './Chats';
import FriendList from './FriendList';
import EventList from './EventList';
import Event from './Event';
import Bots from './Bots';

@autobind
export class Model {
  id: string = "root";
  @observable chats: Chats = new Chats();
  @observable bots: Bots = new Bots();
  @observable friends: FriendList = new FriendList();
  @observable profile: Profile;
  @observable user: string;
  @observable password: string;
  @observable server: string;
  @observable isDay: boolean = true;
  @observable connected: boolean = undefined;
  @observable connecting: boolean = false;
  @observable events: EventList = new EventList();
  messages: [Message] = [];
  isTesting: boolean = false;
  registered = false;
  
  constructor(){
    console.log("MODEL CREATE");
  }

  @action clear = () => {
    console.log("MODEL CLEAR");
    this.profile = undefined;
    this.registered = false;
    this.profiles = {};
    this.files = {};
    this.chats.clear();
    this.friends.clear();
    this.bots.clear();
    this.password = undefined;
    this.user = undefined;
    this.error = undefined;
    this.events.clear();
    this.server = undefined;
  };
  
  @action load(d) {
    if (d.messages){
      messageFactory.load(d.messages);
    }
    for (let key of Object.keys(d)){
      this[key] = d[key];
    }
  }

  toJSON(){
    let res = {id: this.id, password: this.password, server: this.server, isDay: this.isDay, user: this.user};
    return res;
  }

}

Model.schema = {
  name: 'Model',
  primaryKey: 'id',
  properties: {
    server: {type: 'string', optional: true},
    password: {type: 'string', optional: true},
    user: {type: 'string', optional: true},
    profile: {type: 'Profile', optional: true},
    id: {type: 'string', default: 'root'}
  }
  
};

export default new Model();

createModelSchema(Model, {
  id: true,
  registered: true,
  friends: child(FriendList),
  messages: list(child(Message)),
  bots: child(Bots),
  chats: child(Chats),
  profile: child(Profile),
  events: child(EventList),
  user: true,
  server: true,
  password: true,
});

