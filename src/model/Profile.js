import {action, when, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Location from './Location';
import autobind from 'autobind-decorator';
import assert from 'assert';
import File from './File';
import model from './model';
import file from '../store/file';
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
  
  get isOwn() {return model.profile && model.profile.user === this.user}
  
  constructor(user){
    this.user = user;
  }

  load(data){
    this.loaded = true;
    Object.assign(this,data);
    if (data.avatar && (typeof data.avatar === 'string')){
      this.avatar = file.create(data.avatar);
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

Profile.schema = {
  name: 'Profile',
  primaryKey: 'user',
  properties: {
    firstName: {type: 'string', optional: true},
    lastName: {type: 'string', optional: true},
    email: {type: 'string', optional: true},
    handle: {type: 'string', optional: true},
    phoneNumber: {type: 'string', optional: true},
    isNew: {type: 'bool', optional: true},
    isBlocked: {type: 'bool', optional: true},
    isFollower: {type: 'bool', optional: true},
    isFollowed: {type: 'bool', optional: true},
    user: 'string',
  }
};