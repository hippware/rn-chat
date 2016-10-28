import Profile from './Profile';
import Location from './Location';
import {createModelSchema, ref, list, child} from 'serializr';
import geocoding from '../store/geocoding';
import {observable, computed, reaction, autorun} from 'mobx';
import assert from 'assert';
import botFactory from '../factory/bot';
import profileFactory from '../factory/profile';
import fileFactory from '../factory/file';
import File from './File';
import autobind from 'autobind-decorator';
import moment from 'moment';

export const LOCATION = 'location';
export const IMAGE = 'image';
export const NOTE = 'note';

@autobind
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
  @observable image_items: integer = 0;
  @computed get imagesCount () {
    return this.image ? this.image_items + 1 : this.image_items;
  }
  followersSize: integer = 1;
  affiliates: [Profile] = [];
  subscribers: [Profile] = [];
  alerts: integer;
  type: string = LOCATION;
  _updated = 0;
  set updated(value){
    //console.log("SETTING DATE", value);
    this._updated = new Date(value).getTime();
  }
  get updated() {return new Date(this._updated)};
  @computed get date(){ return moment(this.updated).calendar()}

  get isNew() {
    return !this.id || (this.id.indexOf('s')===0);
  }

  constructor({id, type, ...data}){
    //console.log("CREATE BOT", id);
    assert(id, "id is required");
    assert(type, "type is required");
    this.id = id;
    this.type = type;
    this.load(data);
    autorun(()=> {
      if (this.location && !this.address) {
        //console.log("RUN geocoding.reverse", this.location);
        geocoding.reverse(this.location).then(data => {
          if (data.length) {
            this.address = data[0].place_name;
            //console.log("ADDRESS", this.address);
          }
        });
      }
    });
  }

  load({owner, location, image, ...data} = {}){
    Object.assign(this, data);
    if (owner){
      this.owner = typeof owner === 'string' ? profileFactory.create(owner) : owner;
    }
    if (image){
      this.image = typeof image === 'string' && image ? fileFactory.create(image) : image;
    }
    if (location){
      this.location = new Location({...location});
    }

  }
}

createModelSchema(Bot, {
  id: true,
  server: true,
  title: true,
  _updated: true,
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
  image_items: true,
});


Bot.serializeInfo.factory = (context) => botFactory.create(context.json);
