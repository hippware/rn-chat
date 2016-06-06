import {action, when, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Location from './Location';
import autobind from 'autobind-decorator';
import assert from 'assert';
import File from './File';

@autobind
export default class Profile {
  user: string;
  @observable firstName: string;
  @observable lastName: string;
  @observable handle: string;
  @observable avatar: File = null;
  @observable email: string;
  @observable error: string;
  @observable phoneNumber: string;
  @observable location: Location;
  @observable loaded: boolean = false;
  @observable isMutual: boolean = false;
  @observable isFriend: boolean = false;
  profile;
  model;
  file;
  get isOwn() {return this.model.profile && this.model.profile.user === this.user}

  constructor(model, profile, file, user: string, data) {
    this.model = model;
    this.profile = profile;
    this.file = file;
    this.user = user;
    
    if (data){
      this.load(data);
    } else {
      when(()=>model.connected, ()=>this.profile.request(user).then(this.load).catch(e=>{this.error=e;console.log("PROFILE ERROR:",e)}));
    }
  }

  @action load(data){
    console.log("PROFILE LOADED:", data);
    this.loaded = true;
    Object.assign(this, data);
    if (data.avatar){
      this.avatar = this.file.create(data.avatar);
    }
  }

  toJSON(){
    let res = {
      user: this.user,
      handle: this.handle,
      phoneNumber: this.phoneNumber,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
    if (this.avatar){
      res.avatar = this.avatar.toJSON();
    }
    return res;
  }

  @computed get displayName(): string {
    if (this.firstName && this.lastName){
      return this.firstName + " " + this.lastName;
    } else if (this.firstName){
      return this.firstName;
    } else if (this.lastName){
      return this.lastName;
    } else if (this.handle){
      return this.handle;
    } else {
      return ' ';//this.user;
    }
  }
}