import Profile from './Profile';
import Location from './Location';
import {createModelSchema, ref, list, child} from 'serializr';
import geocoding from '../store/geocoding';
import {observable, reaction, autorun} from 'mobx';
import assert from 'assert';
import botFactory from '../factory/bot';
import profileFactory from '../factory/profile';
import fileFactory from '../factory/file';
import File from './File';


export const LOCATION = 'location';
export const IMAGE = 'image';
export const NOTE = 'note';

export default class Bot {
  id: string;
  server: string;
  @observable title: string = '';
  @observable shortname: string = '';
  @observable image: File = null;
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
  type: string = LOCATION;
  
  constructor({id, owner, location, image, ...data} = {}){
    console.log("CREATE BOT", id);
    assert(id, "id is required");
    Object.assign(this, data);
    this.id = id;
    this.owner = typeof owner === 'string' ? profileFactory.create(owner) : owner;
    this.image = typeof image === 'string' && image ? fileFactory.create(image) : null;
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
  type: true,
  visibility: true,
  subscribers: list(ref("subscriber", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}})))),
  affiliates: list(ref("affiliate", (user, cb) =>cb(null, Profile.serializeInfo.factory({json:{user}})))),
  image: child(File),
  alerts: true,
});


Bot.serializeInfo.factory = (context) => botFactory.create(context.json);
