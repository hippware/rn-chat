import {observable, computed, action, reaction, autorunAsync} from 'mobx';
import algoliasearch from 'algoliasearch/reactnative';
const client = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89');
const index = client.initIndex('dev_wocky_users');
import Profile from '../model/Profile';
import ProfileStore from './ProfileStore';
import autobind from 'autobind-decorator';
import SelectableProfileList from '../model/SelectableProfileList';
import Model from '../model/Model';

@autobind
export default class SearchStore {
  profile: ProfileStore;
  model: Model;
  @observable local: string =  '';
  @observable localResult = new SelectableProfileList(null, false);
  
  @observable global: string = '';
  @observable globalResult: SelectableProfileList = new SelectableProfileList();

  static constitute() { return [Model, ProfileStore]}
  constructor(model: Model, profile: ProfileStore) {
    this.model = model;
    this.profile = profile;
  
    reaction(()=> this.global, text => {
      if (!text.length) {
        this.globalResult.clear();
      } else {
        return this.search(text).then(data=> {
          this.globalResult.replace(data.hits.map(el=>this.profile.create(el.objectID, el)).filter(el=>!el.isOwn));
        });
      }
    }, false, 500);

    autorunAsync(()=>{
      this.localResult.replace(this.model.friends.list.filter(el=>{
        return !el.isOwn && (!this.local
          || (el.firstName && el.firstName.toLocaleLowerCase().startsWith(this.local.toLocaleLowerCase()))
            || (el.lastName && el.lastName.toLocaleLowerCase().startsWith(this.local.toLocaleLowerCase()))
            || (el.handle && el.handle.toLocaleLowerCase().startsWith(this.local.toLocaleLowerCase())))

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

  @action setGlobal = (text: string) => {
    this.global = text;
  }


}

