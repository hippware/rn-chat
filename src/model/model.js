// @flow

import {createModelSchema, list, child, primitive, ref} from 'serializr';
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
  @observable subscribedBots: Bots = new Bots();
  @observable ownBots: Bots = new Bots();
  @observable geoBots: Bots = new Bots();
  // event bots is list of bots used by Home Stream. We will persist it to avoid reloading of all bots
  @observable eventBots: Bots = new Bots();
  @observable friends: FriendList = new FriendList();
  @observable profile: ?Profile;
  @observable user: ?string;
  @observable password: ?string;
  @observable server: ?string;
  @observable isDay: boolean = true;
  @observable connected: ?boolean = undefined;
  @observable connecting: boolean = false;
  @observable events: EventList = new EventList();
  @observable loaded = false;
  messages: Message[] = [];
  isTesting: boolean = false;
  isStaging: boolean = false;
  registered = false;
  @observable sessionCount: number = 0;
  @observable codePushChannel: ?string = null;
  @observable botsCreatedCount: number = 0;
  @observable bundleVersion: number[] = [0, 0, 0];

  @action
  init = () => {
    this.clear();
  };

  @action
  clear = (): void => {
    this.resetCache();
    this.profile && this.profile.dispose();
    this.profile = undefined;
    this.registered = false;
    this.password = undefined;
    this.user = undefined;
    this.server = undefined;
    this.resource = undefined;
    this.sessionCount = 0;
    this.botsCreatedCount = 0;
    this.sessionCount = 0;
  };

  @action
  resetCache = (): void => {
    this.chats.clear();
    this.friends.clear();
    this.ownBots.clear();
    this.subscribedBots.clear();
    this.eventBots.clear();
    this.geoBots.clear();
    this.events.clear();
    botFactory.clear();
    profileFactory.clear();
    messageFactory.clear();
    chatFactory.clear();
  };

  @action
  load(d: Object): void {
    if (d.messages) {
      messageFactory.load(d.messages);
    }
    botFactory.load(d.eventBots);
    botFactory.load(d.ownBots);
    botFactory.load(d.subscribedBots);
    Object.keys(d).forEach((key) => {
      this[key] = d[key];
    });
    this.loaded = true;
  }

  @action
  loadMinimal(data: Object): void {
    this.clear();
    const minimalKeys = ['password', 'user', 'server', 'resource'];
    Object.keys(data)
      .filter(k => minimalKeys.includes(k))
      .forEach(k => (this[k] = data[k]));
    this.loaded = true;
  }

  toJSON() {
    const res = {
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
  messages: list(ref('id', (id, cb) => cb(null, Message.serializeInfo.factory({json: {id}})))),
  subscribedBots: child(Bots),
  ownBots: child(Bots),
  eventBots: child(Bots),
  chats: child(Chats),
  profile: child(Profile),
  events: child(EventList),
  user: true,
  server: true,
  password: true,
  resource: true,
  sessionCount: true,
  codePushChannel: true,
  botsCreatedCount: true,
  bundleVersion: list(primitive()),
});
