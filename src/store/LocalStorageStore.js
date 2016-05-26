import '../services/AsyncStorage';
import AsyncStorage from '../services/AsyncStorage';
const KEY = "rnchat:model";
import {observable, autorunAsync} from 'mobx';
import Model from '../model/Model';
import ProfileStore from './ProfileStore';

export default class LocalStorage {
  model: Model;
  profileStore: ProfileStore;
  handler = null;
  
  constructor(model : Model, profileStore: ProfileStore){
    this.model = model;
    this.profileStore = profileStore;

    // persistence
    AsyncStorage.getItem(KEY, (error, data) => {
      if (data){
        try {
          const {server, token, profile} = JSON.parse(data);
          if (server && token && profile) {
            this.model.token = token;
            this.model.server = server;
            this.model.profile = this.profileStore.createProfile(profile, true);
            this.model.tryToConnect = true;
          }
        } catch (error){
          console.log("ERROR PARSING JSON", data);
        }
      }
    });
    this.handler = autorunAsync(()=>{
      console.log("STORE:", model.toJS());
      AsyncStorage.setItem(KEY, JSON.stringify(model.toJS()))
    });
  }
  
  dispose(){
    this.handler();
  }
}

 