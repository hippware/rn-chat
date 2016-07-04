import Profile from '../model/Profile';
import File from '../model/File';
import {observable, action, computed, autorunAsync, toJS as toJSON} from 'mobx';
import autobind from 'autobind-decorator';
import Chats from '../model/Chats';
import FriendList from '../model/FriendList';
import {createModelSchema, ref, list, child} from 'serializr';

@autobind
export class Model {
  id: string = "root";
  @observable chats: Chats = new Chats();
  @observable friends: FriendList = new FriendList();
  @observable profile: Profile;
  @observable user: string;
  @observable password: string;
  @observable server: string;
  @observable isDay: boolean = true;
  @observable connected: boolean = false;

  @action clear = () => {
    this.profile = undefined;
    this.profiles = {};
    this.files = {};
    this.chats.clear();
    this.friends.clear();
    this.password = undefined;
    this.user = undefined;
    this.error = undefined;
    this.server = undefined;
  };

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

createModelSchema(Model, {
  id: true,
  chats: child(Chats),
  friends: child(FriendList),
  profile: child(Profile),
  user: true,
  server: true,
  password: true,
});

export default new Model();
