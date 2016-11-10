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

export const VISIBILITY_WHITELIST = 10;
export const VISIBILITY_OWNER = 0;
export const VISIBILITY_FRIENDS = 20;
export const VISIBILITY_PUBLIC = 100;

export const SHARE_FOLLOWERS = 'followers';
export const SHARE_FRIENDS = 'friends';
export const SHARE_SELECT = 'select';

@autobind
export default class Bot {
  id: string;
  server: string;
  @observable title: string = '';
  @observable shortname: string = '';
  @observable image: File = null;
  @observable _images: [File] = [];
  removedItems = [];
  
  newAffiliates = [];
  removedAffiliates = [];
  originalAffiliates;
  
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
  @observable visibility: integer = 0;
  @observable visibilityShown = false;
  @observable image_items: integer = 0;
  @computed get imagesCount () {
    return this.image_items;
  }
  followersSize: integer = 1;
  @observable affiliates: [Profile] = [];
  @observable subscribers: [Profile] = [];
  alerts: integer;
  type: string = LOCATION;
  _updated = 0;
  set updated(value){
    //console.log("SETTING DATE", value);
    this._updated = new Date(value).getTime();
  }
  get updated() {return new Date(this._updated)};
  @computed get date(){ return moment(this.updated).calendar()}
  
  @observable shareSelect: [Profile] = [];
  @observable shareMode;

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
  
  insertImage(imageId, item) {
    assert(item, "image item (contentID) is not specified");
    if (this._images.find(image=>image.item === item)){
      console.log("Ignore image, it is already exist");
      return;
    }
    const file = fileFactory.create(imageId, {item, isNew: true});
    
    // insert into the beginning
    this._images.splice(0, 0, file);
    this.setMainPhoto();
    
  }
  
  addImage(imageId, item) {
    assert(item, "image item (contentID) is not specified");
    if (this._images.find(image=>image.item === item)){
      console.log("Ignore image, it is already exist");
      return;
    }
    const file = fileFactory.create(imageId, {item, isNew: true});
    
    // insert into the beginning
    this._images.push(file);
    this.setMainPhoto();
    
  }
  
  clearImages(){
    this._images.splice(0);
  }
  
  setMainPhoto(){
    // set icon to latest one
    if (this.images.length){
      this.image = this.images[0];
    } else {
      this.image = null;
    }
    this.image_items = this.images.length;
  }
  
  async removeImage(itemId){
    console.log("Bot.removeImage", itemId, this.images.length);
    assert(itemId, "itemId is not defined");
    const index: File = this._images.findIndex(x=>x.item === itemId);
    assert(index !== -1, `image with item: ${itemId} is not found`);
    this._images.splice(index, 1);
    this.removedItems.push(itemId);
    this.image_items = this.images.length;
    this.setMainPhoto();
  }
  
  async removeImageWithIndex(index){
    console.log("Bot.removeImageWithIndex", index, this.images.length);
    assert(index>=0 && index<this.images.length, `${index} is invalid, length: ${this.images.length}`);
    const itemId = this._images[index].item;
    this._images.splice(index, 1);
    this.removedItems.push(itemId);
    this.setMainPhoto();
  }
  
  
  setAffiliates(profiles:[Profile]){
    console.log("SET AFFILIATES", profiles.length);
    this.newAffiliates = [];
    this.removedAffiliates = [];
    if (!this.originalAffiliates){
      this.originalAffiliates =  [...this.affiliates];
    }
    
    // determine affiliates to remove
    const isAffiliate = {};
    const isNewAffiliate = {};
    profiles.forEach(profile=>{
      isNewAffiliate[profile.user] = true;
    });
    
    this.originalAffiliates.forEach(profile=>{
      isAffiliate[profile.user] = true;
      if (!isNewAffiliate[profile]){
        this.removedAffiliates.push(profile)
      }
    })
  
    this.affiliates.splice(0);
    profiles.forEach(profile=>{
      if (!isAffiliate[profile.user]){
        this.newAffiliates.push(profile);
      }
      this.affiliates.push(profile);
    });
    console.log("SET AFFILIATES", this.newAffiliates.length, this.removedAffiliates.length);
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
