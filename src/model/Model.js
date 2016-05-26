import Profile from '../model/Profile';
import {observable, action, computed, autorunAsync, toJS as toJSON} from 'mobx';
import autobind from 'autobind-decorator';
import Chats from '../model/Chats';

@autobind
export default class Model {
  @observable chats: Chats = new Chats();
  @observable profile: Profile;
  @observable connected: boolean = false;
  @observable tryToConnect: boolean = false;
  @observable updating: boolean = false;
  @observable token: string;
  @observable error: string;
  @observable server: string;

  @action clear(){
    this.profile = null;
    this.chats.clear();
    this.connected = false;
    this.tryToConnect = false;
    this.updating = false;
    this.token = null;
    this.error = null;
    this.server = null;
  }

  toJS(){
    let res = {token: this.token, server: this.server};
    if (this.profile){
      res.profile = this.profile.user;
    }
    return res;
  }

}