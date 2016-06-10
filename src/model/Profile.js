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
  @observable isFollower: boolean = false;
  @observable isFollowed: boolean = false;
  @observable isNew: boolean = false;
  @observable isBlocked: boolean = false;
  @computed get isMutual(): boolean { return this.isFollower && this.isFollowed };
  
  profile;
  model;
  file;
  get isOwn() {return this.model.profile && this.model.profile.user === this.user}

  static mock(user, data){
    assert(user, "user should be defined");
    assert(data, "data should be defined");
    return new Profile(undefined, undefined, undefined, user, data);
  }

  constructor(model, profile, file, user: string, data) {
    this.model = model;
    this.profile = profile;
    this.file = file;
    this.user = user;
    
    if (data){
      this.load(data);
    } else {
      when(()=>model && profile && model.connected,
        ()=>this.profile.request(user).then(this.load));
    }
  }

  @action load(data){
    this.loaded = true;
    Object.assign(this,data);
    if (data.avatar && (typeof data.avatar === 'string')){
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
      isFollower: this.isFollower,
      isBlocked: this.isBlocked,
      isFollowed: this.isFollowed,
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