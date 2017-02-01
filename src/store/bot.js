import autobind from 'autobind-decorator';
import {when, autorun, observable, reaction} from 'mobx';
import Address from '../model/Address';
import botFactory from '../factory/bot';
import profileFactory from '../factory/profile';
import location, {METRIC, IMPERIAL} from '../store/location';
import Location from '../model/Location';
import xmpp from './xmpp/bot';
import model from '../model/model';
import Bot, {LOCATION, NOTE, IMAGE, SHARE_FOLLOWERS, SHARE_FRIENDS, SHARE_SELECT} from '../model/Bot';
import assert from 'assert';

@autobind
class BotStore {
  @observable bot: Bot;
  @observable address: Address = null;
  
  create(data){
    this.bot = botFactory.create(data);
    if (!this.bot.owner){
      when("bot.create: fill owner", ()=>model.profile, ()=>{
        this.bot.owner = model.profile
      });
    }
    if (!this.address){
      when("bot.create: set address", ()=>this.bot.location, ()=>{
        this.address = new Address(this.bot.location);
      });
//      this.address.clear();
    }
    console.log("BOT LOCATION:", this.bot.location);
    if (!this.bot.location){
      when("bot.create: set location", ()=>location.location, ()=>{
        this.bot.location = new Location(location.location);
        this.bot.isCurrent = true;
      })
    }
//    this.address = new Address(this.bot.location);
  }
  
  createLocation(data){
    this.create({...data, type:LOCATION});
  }
  
  createImage(data){
    this.create({...data, type:IMAGE});
  }
  
  createNote(data){
    this.create({...data, type:NOTE});
  }
  
  async save(){
    try {
      const isNew = this.bot.isNew;
      console.log("SAVE BOT", this.bot.isNew);
      this.bot.isSubscribed = true;
      this.bot.followersSize = 1;
      const params = {...this.bot, isNew};
      if (this.bot.image) {
        console.log("ADD BOT IMAGE:", this.bot.image.id);
        params.image = this.bot.image.id;
      }
      const data = await xmpp.create(params);
      
      // publish note if description is changed
      if (!isNew && this.bot.descriptionChanged) {
        const time = Date.now();
        const item = `s${time}${Math.round(Math.random() * 1000)}`;
        xmpp.publishContent(this.bot, item, this.bot.description);
      }
      
      botFactory.remove(this.bot);
      this.bot.id = data.id;
      this.bot.server = data.server;
      
      // save/remove images
      if (isNew) {
        for (const image of this.bot.images) {
          console.log("PUBLISH IMAGE", image.item);
          await xmpp.publishImage(this.bot, image.item, image.id);
        }
        for (const itemId of this.bot.removedItems) {
          await xmpp.removeItem(this.bot, itemId);
        }
      }
      console.log("ADDED BOT:", isNew, this.bot.images.length, data, model.followingBots.list.length);
      
      botFactory.add(this.bot);
      model.followingBots.add(this.bot);
      model.ownBots.add(this.bot);
      console.log("ADDED BOT2:", data, model.followingBots.list.length);
    } catch (e){
      console.error(e);
    }
  }
  
  async remove(id, server){
    assert(id, "id is required");
    assert(server, "server is required");
    try {
      await xmpp.remove({id, server});
    } catch (e){
      if (e.indexOf('not found')===-1){
        throw e;
      }
    }
    model.followingBots.remove(id);
  }
  
  async following(before){
    console.log("GETTING FOLLOWING BOTS", before);
    const data = await xmpp.following(model.user, model.server, before);
    if (!before){
      model.followingBots.clear();
      model.ownBots.clear();
    }
    for (let item of data.bots){
      const bot: Bot = botFactory.create(item);
      bot.isSubscribed = true;
      model.followingBots.add(bot);
      model.followingBots.earliestId = bot.id;
      
      if (!before && bot.owner.isOwn){
        model.ownBots.add(bot);
      }
    }
  }
  
  async list(before){
    console.log("GETTING OWN BOTS", before);
    const data = await xmpp.list(model.user, model.server, before);
    for (let item of data.bots){
      const bot: Bot = botFactory.create(item);
      bot.isSubscribed = true;
      model.ownBots.add(bot);
      model.ownBots.earliestId = bot.id;
    }
  }
  
  async load(){
    if (this.bot.image_items){
      await this.loadImages();
    }
    if (this.bot.owner && this.bot.owner.isOwn){
      await this.loadAffiliations();
    }
  }
  
  async loadImages(){
    const images = await xmpp.imageItems({id:this.bot.id, server:this.bot.server});
    console.log("LOAD IMAGES:", images);
    this.bot.clearImages();
    for (const image of images){
      this.bot.addImage(image.url, image.item);
    }
    console.log("LOAD IMAGES2:", this.bot.images.length);
  }
  
  async loadAffiliations(){
    const affiliations = await xmpp.retrieveAffiliates({id:this.bot.id, server:this.bot.server});
    console.log("LOAD AFFILIATES:", affiliations);
    this.bot.affiliates.splice(0);
    for (const af of affiliations){
      this.bot.affiliates.push(profileFactory.create(af));
    }
  }
  
  async publishImage(itemId, url) {
    if (!this.bot.isNew){
      await xmpp.publishImage(this.bot, itemId, url);
    }
    this.bot.insertImage(url, itemId);
  }
  
  async publishNote(itemId, note) {
    await xmpp.publishContent(this.bot, itemId, note);
    this.bot.addNote(note);
  }
  
  async removeItem(itemId) {
    if (!this.bot.isNew){
      await xmpp.removeItem(this.bot,  itemId);
    }
    this.bot.removeImage(itemId);
  }
  
  async removeImageWithIndex(index) {
    assert(index>=0 && index<this.bot.images.length, `${index} is invalid, length: ${this.bot.images.length}`);
    const itemId = this.bot.images[index].item;
    await this.removeItem(itemId);
  }
  
  async subscribe(){
    this.bot.isSubscribed = true;
    this.bot.followersSize += 1;
    model.followingBots.add(this.bot);
    xmpp.subscribe(this.bot);
  }
  
  async unsubscribe(){
    this.bot.isSubscribed = false;
    if (this.bot.followersSize > 1){
      this.bot.followersSize -= 1;
    }
    xmpp.unsubscribe(this.bot);
  }
  
  share(message, type){
    if (this.bot.shareMode === SHARE_FRIENDS){
      xmpp.share(this.bot, ['friends'], message, type);
    } else if (this.bot.shareMode === SHARE_FOLLOWERS) {
      xmpp.share(this.bot, ['followers'], message, type);
    } else {
      xmpp.share(this.bot, this.bot.shareSelect.map(profile=>profile.user), message, type);
    }
  }
  
  async start() {
    console.log("BOTSTORE START", model.user);
    try {
      await this.following();
      await this.list();
    } catch (e){
      console.error(e);
    }
  };
  
  finish = () => {
    
  };
  
}

export default new BotStore()
