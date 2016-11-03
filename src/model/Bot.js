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
  @observable _images: [File] = [];
  removedItems = [];
  @computed get images() {
    return this._images;
  }
  
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
    return this.image_items;
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

  load({owner, location, image, images, ...data} = {}){
    Object.assign(this, data);
    if (owner){
      this.owner = typeof owner === 'string' ? profileFactory.create(owner) : owner;
    }
    if (image){
      this.image = typeof image === 'string' && image ? fileFactory.create(image) : image;
    }
    if (images){
      images.forEach(image=>this.addImage(image.id,  image.item));
    }
    if (location){
      this.location = new Location({...location});
    }
  }
  
  addImage(imageId, item) {
    if (this._images.find(image=>image.id === imageId)){
      console.log("Ignore image, it is already exist");
      return;
    }
    const file = fileFactory.create(imageId, {item, isNew: true});
    if (!this.image){
      this.image = file;
    }
    this._images.push(file);
    this.image_items = this.images.length;
  }
  
  clearImages(){
    this._images.splice(0);
  }
  
  async removeImage(itemId){
    console.log("Bot.removeImage", itemId, this.images.length);
    assert(itemId, "itemId is not defined");
    const index: File = this._images.findIndex(x=>x.item === itemId);
    assert(index !== -1, `image with item: ${itemId} is not found`);
    this._images.splice(index, 1);
    this.removedItems.push(itemId);
    console.log("Bot.removeImage2", itemId, this.images.length);
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
  _images: list(ref("image", (id, cb)=>cb(null, fileFactory.create(id)))),
  alerts: true,
  image_items: true,
});


Bot.serializeInfo.factory = (context) => botFactory.create(context.json);
