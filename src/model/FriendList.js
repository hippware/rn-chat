import {createModelSchema, ref, list, child} from 'serializr';
import autobind from 'autobind-decorator';
import {action, map, ObservableMap, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Chat from './Chat';
import Profile from './Profile';
import assert from 'assert';

export default class FriendList {
  @observable _list:[Profile] = [];
  @computed get list():[Profile] {
    return this._list.sort((a:Profile, b:Profile)=> {
      if (a.isMutual && !b.isMutual) {
        return -1;
      }
      if (b.isMutual && !a.isMutual) {
        return 1;
      }
      return a.displayName.toLocaleLowerCase()
        .localeCompare(b.displayName.toLocaleLowerCase());
    });
  }
  @computed get length(){return _list.length};
  @computed get all(){return this.list.filter(x=>!x.isBlocked && x.isFollowed)}
  @computed get nearby(){return this.all}
  @computed get followers(){return this.list.filter(x=>!x.isBlocked && x.isFollower && !x.isFollowed)}
  @computed get blocked(){return this.list.filter(x=>x.isBlocked)}
  @computed get newFollowers(){return this.followers.filter(x=>x.isNew)}
  
  observe = (listener) => {
    return this._list.observe(listener);
  };
  
  @action add = (profile: Profile): Profile => {
    assert(profile, "profile should be defined");
    if (!this.get(profile.user)){
      this._list.push(profile);
    }
    return profile;
  };

  get = (user:string): Profile => {
    const res = this._list.find(el=>el.user === user);
    return res;
  }

  @action clear = () => {
    this._list.splice(0);
  };

  @action remove = (profile: Profile) => {
    assert(profile, "profile is not defined");
    this._list.replace(this._list.filter(el=>el.user != profile.user));
  };
}


createModelSchema(FriendList, {
  _list: list(child(Profile)),
});

