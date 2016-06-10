import SelectableProfile from './SelectableProfile';
import Profile from './Profile';
import {action, computed, observable} from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class SelectableProfileList {
  @observable list: [SelectableProfile] = [];
  multiSelect: boolean = true;
  @computed get selected() { return this.list.filter(el=>el.selected).map(el=>el.profile) }

  constructor(list: [Profile], multiSelect: boolean = true){
    if (list){
      this.replace(list);
    }
    this.multiSelect = multiSelect;
  }

  @action replace(list: [Profile]){
    this.list.replace(list.map(el=>new SelectableProfile(el, false)));
  }

  @action clear(){
    this.list.splice(0);
  }
  
  @action deselectAll(){
    this.list.forEach(el=>{
      el.selected = false;
    });
  }
  
  @action selectAll(){
    this.list.forEach(el=>{
      el.selected = true;
    });
  }
  
  @action switch(row: SelectableProfile){
    if (!this.multiSelect){
      this.deselectAll();
    }
    row.selected = !row.selected;
    
  }
  
}