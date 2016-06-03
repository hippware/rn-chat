const KEY = "rnchat:model";
import {action, observable, autorunAsync} from 'mobx';
import Model from '../model/Model';
import ProfileStore from './ProfileStore';
import { Dependencies } from 'constitute'
import {USE_IOS_XMPP, HOST, SERVICE} from '../globals';

var storage;
if (USE_IOS_XMPP){
  console.log("real AsyncStorage");
  storage = require('react-native').AsyncStorage;
} else {
  console.log("mock AsyncStorage");
  storage = {setItem:(x,d)=>{console.log("setItem:", x, d)}, getItem:()=>undefined}
}

@Dependencies(Model, ProfileStore)
export default class LocalStorage {
  model: Model;
  profileStore: ProfileStore;
  handler = null;
  
  constructor(model : Model, profileStore: ProfileStore){
    this.model = model;
    this.profileStore = profileStore;

    // persistence
    storage.getItem(KEY, (error, data) => {
      if (data){
        try {
          const json = JSON.parse(data);
          console.log("CACHED DATA:", json);
          this.load(json);
        } catch (error){
          console.log("ERROR PARSING JSON", data);
        }
      } else {
        this.model.loaded = true;
      }
    });
    this.handler = autorunAsync(()=>{
      console.log("STORE:", model.toJSON());
      storage.setItem(KEY, JSON.stringify(model.toJSON()))
    });
  }

  @action load(data){
    Object.assign(this.model, data);
    this.model.loaded = true;
    if (data.profile){
      this.model.profile = this.profileStore.create(data.profile);
      if (this.model.server && this.model.token){
        this.model.tryToConnect = true;
      }
    }
  }

  dispose(){
    this.handler();
  }
}

 