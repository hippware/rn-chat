import {observable, autorun, when, computed, action, reaction, autorunAsync} from 'mobx';
import algoliasearch from 'algoliasearch/reactnative';
const client = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89');
const index = client.initIndex('dev_wocky_users');
import Profile from '../model/Profile';
import profileStore from './profile';
import autobind from 'autobind-decorator';
import SelectableProfileList from '../model/SelectableProfileList';
import model from '../model/model';
import message from './message';
import statem from '../../gen/state';

@autobind
export class SearchStore {
  @observable local: string =  '';
  @observable localResult = new SelectableProfileList(null, false);
  
  @observable global: string = '';
  @observable globalResult: SelectableProfileList = new SelectableProfileList();
  
  constructor() {
    reaction(()=> this.global, text => {
      if (!text.length) {
        this.globalResult.clear();
      } else {
        return this.search(text).then(data=> {
          this.globalResult.replace(data.hits.map(el=>profileStore.create(el.objectID, el)).filter(el=>!el.isOwn));
        });
      }
    }, false, 500);
  
    when (()=>model.friends.list.length > 0, ()=>this.localResult.replace(model.friends.list));
    
    autorun(()=> {
      const text = this.local;
      return this.localResult.replace(model.friends.list.filter(el=>{
        return !el.isOwn && (!text
          || (el.firstName && el.firstName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()))
          || (el.lastName && el.lastName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()))
          || (el.handle && el.handle.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())))
        
      }));
    });
  }
  @action setLocal = (text) => {
    return this.local = text;
  };
  
  search(text){
    return new Promise((resolve, reject) => {
      index.search(text, function searchDone(err, content) {
        if (err){
          reject(err);
        } else {
          console.log("CONTENT:", content);
          resolve(content);
        }
      });
    });
  }
  
  clear(){
    this.setLocal('');
    this.localResult.deselectAll();
    return true;
  }
  
  @action setGlobal = (text: string) => {
    this.global = text;
  }
  
  
}

export default new SearchStore();
