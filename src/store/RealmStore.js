import Realm from 'realm';
import Profile from '../model/Profile';
import Model from '../model/Model';
import ProfileStore from './ProfileStore';

import {autorunAsync, toJS} from 'mobx';
import autobind from 'autobind-decorator';

const ProfileSchema = {
  name: 'Profile',
  primaryKey: 'user',
  properties: {
    firstName: {type: 'string', optional: true},
    lastName: {type: 'string', optional: true},
    email: {type: 'string', optional: true},
    handle: {type: 'string', optional: true},
    phoneNumber: {type: 'string', optional: true},
    isNew: {type: 'bool', optional: true},
    isBlocked: {type: 'bool', optional: true},
    isFollower: {type: 'bool', optional: true},
    isFollowed: {type: 'bool', optional: true},
    user: 'string',
  }
};

@autobind
export default class RealmStore {
  static constitute() { return [Model, ProfileStore]};
  realm;
  model;

  constructor(model: Model, profile: ProfileStore){
    this.model = model;
    this.realm = new Realm({schema: [ProfileSchema, Model.schema],
      schemaVersion: 2,
      migration: function(oldRealm, newRealm) {
      }
    });

    // autorunAsync(()=>{
    //   this.realm.write(() => {
    //     this.realm.create('Model', model, true);
    //   });
    // });
  }


  load(){
    console.log("REALM STORAGE.LOAD");
    const loaded = this.realm.objects('Model');
    if (loaded.length){
      console.log("LOADED:", loaded[0]);
      return loaded[0];
    }

  }

  save(data){
    Object.assign(this.model, data);
    this.realm.write(() => {
      this.realm.create('Model', this.model, true);
    });
    return data;
  }


}