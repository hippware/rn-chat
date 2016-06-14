import Profile from '../model/Profile';
import File from '../model/File';
import {observable, action, computed, autorunAsync, toJS as toJSON} from 'mobx';
import autobind from 'autobind-decorator';
import Chats from '../model/Chats';
import FriendList from '../model/FriendList';

@autobind
export default class Model {
  @observable chats: Chats = new Chats();
  @observable friends: FriendList = new FriendList();
  @observable profile: Profile;
  @observable connected: boolean = false;
  @observable connecting: boolean = false;
  @observable tryToConnect: boolean = false;
  @observable updating: boolean = false;
  @observable token: string;
  @observable error: string = null;
  @observable server: string;
  @observable isDay: boolean = true;
  @observable loaded: boolean = false;
  
  @computed get scene(): string {
    if (this.error || !this.server){
      return "promo";
    }
    if (!this.loaded || this.connecting || this.tryToConnect || (this.connected && this.profile && !this.profile.loaded)){
      return "launch";
    } else {
      return this.profile && this.profile.loaded ? this.profile.handle ? "logged" : "signUp" : "promo";
    }
  }
  profiles: {string: Profile} = {};
  files: {string: File} = {};

  @action clear = () => {
    this.profile = null;
    this.profiles = {};
    this.files = {};
    this.chats.clear();
    this.friends.clear();
    this.connected = false;
    this.tryToConnect = false;
    this.updating = false;
    this.token = null;
    this.error = null;
    this.server = null;
  }

  toJSON(){
    let res = {token: this.token, server: this.server, isDay: this.isDay};
    if (this.profile){
      res.profile = this.profile.user;
    }
    return res;
  }

}