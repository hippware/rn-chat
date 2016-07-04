const KEY = "rnchat:model";
import {action, observable, autorunAsync} from 'mobx';
import model from '../../model/model';
import profileStore from '../profile';
import {USE_IOS_XMPP} from '../../globals';

var storage;
if (USE_IOS_XMPP){
  console.log("real AsyncStorage");
  storage = require('react-native').AsyncStorage;
} else {
  console.log("mock AsyncStorage");
  storage = {setItem:(x,d)=>{console.log("setItem:", x, d)}, getItem:()=>undefined}
}

export class LocalStorage {
  handler = null;
  
  constructor(){

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
        model.loaded = true;
      }
    });
    this.handler = autorunAsync(()=>{
      console.log("STORE:", model.toJSON());
      storage.setItem(KEY, JSON.stringify(model.toJSON()))
    });
  }

  @action load = (data) => {
    Object.assign(model, data);
    // test data
    // model.server = 'staging.dev.tinyrobot.com';
    // model.token = '$T$XheOEJNwXHA7WNUJEXZmoRTVcRVzOnEpfRnwgKgViTI=';
    // model.profile = '94efed34-29b6-11e6-8d1e-0e3188b56121';
    if (model.profile){
      model.profile = profileStore.create(model.profile);
    }
  };

  dispose(){
    this.handler();
  }
}

 