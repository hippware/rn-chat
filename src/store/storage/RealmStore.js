import Realm from 'realm';
import Profile from '../../model/Profile';
import model, {Model} from '../../model/model';
import profileStore from '../profile';

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
  realm;

  constructor(){
    this.realm = new Realm({schema: [ProfileSchema, Model.schema],
      schemaVersion: 2,
      migration: function(oldRealm, newRealm) {
      }
    });

    // autorunAsync(()=>{
    //   // console.log("MODEL CHANGED:", model);
    //   // this.realm.write(() => {
    //   //   this.realm.create('Model', model, true);
    //   // });
    // });
  }


  load(){
    console.log("REALM STORAGE.LOAD");
    //return {user:"94efed34-29b6-11e6-8d1e-0e3188b56121", password:"$T$Qck2RvPau+hVEJMEj3h9I2SKbzIvDbwMb27hpX/AT7E="};
    const loaded = this.realm.objects('Model');
    if (loaded.length){
      console.log("LOADED:", loaded[0]);
      return loaded[0];
    }

  }

  save(data){
    Object.assign(model, data);
    this.realm.write(() => {
      this.realm.create('Model', model, true);
    });
    return data;
  }


}