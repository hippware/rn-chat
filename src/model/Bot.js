import Profile from './Profile';
import Location from './Location';
import {createModelSchema, ref, list, child} from 'serializr';
import geocoding from '../store/geocoding';
import {observable, reaction, autorun} from 'mobx';
import assert from 'assert';
import botFactory from '../factory/bot';

export default class Bot {
  id: string;
  server: string;
  @observable title: string = '';
  @observable shortname: string = '';
  owner: Profile;
  followMe: boolean = false;
  isCurrent: boolean = false;
  followMeMinutes: integer = 0;
  @observable description: string = '';
  @observable location: Location;
  @observable radius: integer = 30;//30.5;
  @observable address: string;
  visibility: integer;
  affiliates: [Profile] = [];
  subscribers: [Profile] = [];
  alerts: integer;
  
  constructor({id, location, ...data} = {}){
    assert(id, "id is required");
    Object.assign(this, data);
    this.id = id;
    console.log("Create new bot", location);
    autorun(()=> {
        if (this.location) {
          console.log("RUN geocoding.reverse", this.location);
          geocoding.reverse(this.location).then(data => {
            if (data.length) {
              this.address = data[0].place_name;
              console.log("ADDRESS", this.address);
            }
          });
        }
      });
    this.location = location;
  }
}

createModelSchema(Bot, {
  id: true,
  server: true,
  owner: ref("user", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}}))),
  followMe: true,
  description: true,
  location: child(Location),
  radius: true,
  address: true,
  visibility: true,
  subscribers: list(ref("subscriber", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}})))),
  affiliates: list(ref("affiliate", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}})))),
  alerts: true,
});


Bot.serializeInfo.factory = (context) => botFactory.create(context.json);
