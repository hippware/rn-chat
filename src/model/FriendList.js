import autobind from 'autobind-decorator';
import {action, map, ObservableMap, observable, toJS as toJSON, computed, autorunAsync} from 'mobx';
import Chat from './Chat';
import Profile from './Profile';
import assert from 'assert';

@autobind
export default class FriendList {
  @observable list:[Profile] = [];
  @computed get nearby(){return this.list.filter(x=>x.displayName.length<13)}
  @computed get all(){return this.list}
  @computed get current(){return this[this.filter]}
  @observable filter: string = "all";

  @action add(profile: Profile): Profile {
    assert(profile, "profile should be defined");
    profile.isFriend = true;
    if (!this.get(profile.user)){
      this.list.push(profile);
    }
    this.list.sort((a: Profile, b: Profile)=>{
      if (a.isMutual && !b.isMutual){
        return -1;
      }
      if (b.isMutual && !a.isMutual){
        return 1;
      }
      return a.displayName.toLocaleLowerCase()
        .localeCompare(b.displayName.toLocaleLowerCase());
    });
    return profile;
  }
  
  @action setFilter(filter: string){
    this.filter = filter;
  }

  get(user:string): Profile {
    return this.list.find(el=>el.user === user);
  }

  @action clear(){
    this.list.splice(0);
  }

  @action remove(user: string){
    assert(user, "user is not defined");
    const profile: Profile = this.get(user);
    if (profile){
      profile.isFriend = false;
      this.list.replace(this.list.filter(el=>el.user != user));
    }
  }
}