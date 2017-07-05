// @flow

import {createModelSchema, ref, list, child} from 'serializr';
import Profile from './Profile';
import Message from './Message';
import messageFactory from '../factory/messageFactory';
import chatFactory from '../factory/chatFactory';
import profileFactory from '../factory/profileFactory';
import botFactory from '../factory/botFactory';
import {observable, action} from 'mobx';
import autobind from 'autobind-decorator';
import Chats from './Chats';
import FriendList from './FriendList';
import EventList from './EventList';
import Bots from './Bots';

@autobind
export class Model {
  id: string = 'root';
  resource: ?string;
  @observable chats: Chats = new Chats();
  @observable followingBots: Bots = new Bots();
  @observable ownBots: Bots = new Bots();
  @observable geoBots = new Bots();
  @observable friends: FriendList = new FriendList();
  @observable profile: Profile;
  @observable profileComplete: boolean;
  profiles: Object;
  @observable user: ?string;
  @observable password: ?string;
  @observable server: ?string;
  @observable isDay: boolean = true;
  @observable connected: ?boolean = undefined;
  @observable connecting: boolean = false;
  @observable events: EventList = new EventList();
  messages: [Message] = [];
  isTesting: boolean = false;
  isStaging: boolean = false;
  registered = false;
  @observable sessionCount: number = 0;
  files: Object;
  error: ?string;

  @action init = () => {
    this.clear();
  };

  @action clear = () => {
    this.profile = undefined;
    this.profileComplete = false;
    this.registered = false;
    this.profiles = {};
    this.files = {};
    this.chats.clear();
    this.friends.clear();
    this.ownBots.clear();
    this.followingBots.clear();
    this.password = undefined;
    this.user = undefined;
    this.error = undefined;
    this.events.clear();
    this.server = undefined;
    this.resource = undefined;
    this.sessionCount = 0;

    botFactory.clear();
    profileFactory.clear();
    messageFactory.clear();
    chatFactory.clear();
  };

  @action load(d) {
    if (d.messages) {
      messageFactory.load(d.messages);
    }
    for (let key of Object.keys(d)) {
      this[key] = d[key];
    }
  }

  toJSON() {
    let res = {
      id: this.id,
      password: this.password,
      server: this.server,
      isDay: this.isDay,
      user: this.user,
    };
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
    id: {type: 'string', default: 'root'},
  },
};

export default new Model();

createModelSchema(Model, {
  id: true,
  registered: true,
  friends: child(FriendList),
  messages: list(child(Message)),
  followingBots: child(Bots),
  ownBots: child(Bots),
  chats: child(Chats),
  profile: child(Profile),
  profileComplete: true,
  events: child(EventList),
  user: true,
  server: true,
  password: true,
  resource: true,
  sessionCount: true,
});
