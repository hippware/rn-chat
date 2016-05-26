import {action, when, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import File from './File';
import Location from './Location';
import autobind from 'autobind-decorator';
import assert from 'assert';

@autobind
export default class Profile {
  user: string;
  @observable firstName: string;
  @observable lastName: string;
  @observable handle: string;
  @observable avatar: File;
  @observable email: string;
  @observable error: string;
  @observable phoneNumber: string;
  @observable location: Location;
  @observable loaded: boolean = false;
  isOwn: boolean;

  constructor(user: string, isOwn: boolean){
    assert(user, "user is not defined");
    this.user = user;
    this.loaded = false;
    this.isOwn = isOwn;
  }

  toJS(){
    let res = {
      handle: this.handle,
      phoneNumber: this.phoneNumber,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
    if (this.avatar){
      res.avatar = this.avatar.id;
    }
    return res;
  }

  @computed get displayName(){
    if (this.firstName && this.lastName){
      return this.firstName + " " + this.lastName;
    } else if (this.firstName){
      return this.firstName;
    } else if (this.lastName){
      return this.lastName;
    } else if (this.handle){
      return this.handle;
    }
    return ' ';
  }
}