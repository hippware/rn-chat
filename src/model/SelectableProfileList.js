import SelectableProfile from './SelectableProfile';
import Profile from './Profile';
import {action, computed, observable} from 'mobx';

export default class SelectableProfileList {
  @observable list: [SelectableProfile] = [];
  @computed get selected() { return this.list.filter(el=>el.selected).map(el=>el.profile) }

  constructor(list: [Profile]){
    if (list){
      this.replace(list);
    }
  }

  @action replace(list: [Profile]){
    this.list.replace(list.map(el=>new SelectableProfile(el, false)));
  }

  @action clear(){
    this.list.splice(0);
  }

}