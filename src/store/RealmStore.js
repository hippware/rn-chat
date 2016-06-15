import Realm from 'realm';
import Profile from '../model/Profile';
import Model from '../model/Model';
import ProfileStore from './ProfileStore';

import {autorunAsync, toJS} from 'mobx';

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

const ModelSchema = {
  name: 'Model',
  primaryKey: 'id',
  properties: {
    server: {type: 'string', optional: true},
    token: {type: 'string', optional: true},
    profile: {type: 'Profile', optional: true},
    id: {type: 'string', default: 'root'}
  }
};

export default class RealmStore {
  static constitute() { return [Model, ProfileStore]};
  realm;

  constructor(model: Model, profile: ProfileStore){
    this.realm = new Realm({schema: [ProfileSchema, ModelSchema],
      schemaVersion: 1,
      migration: function(oldRealm, newRealm) {
      }
    });

    const loaded = this.realm.objects('Model');
    console.log("LOADED:", loaded);
    if (loaded.length){
      Object.assign(model, loaded[0]);
      if (model.profile) {
        model.profile = profile.create(loaded[0].profile.user);
        if (model.server && model.token && model.profile) {
          model.tryToConnect = true;
        }
      }
    }

    autorunAsync(()=>{
      this.realm.write(() => {
        this.realm.create('Model', model, true);
      });
    });
  }


}