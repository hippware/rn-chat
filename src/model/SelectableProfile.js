import Profile from './Profile';
import {observable} from 'mobx';

export default class SelectableProfile {
  @observable profile: Profile;
  @observable selected: boolean;
  
  constructor(profile: Profile, selected: boolean){
    this.profile = profile;
    this.selected = selected;
  }

}