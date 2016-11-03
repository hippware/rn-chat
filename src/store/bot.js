import autobind from 'autobind-decorator';
import {when, autorun, observable, reaction} from 'mobx';
import Address from '../model/Address';
import botFactory from '../factory/bot';
import location, {METRIC, IMPERIAL} from '../store/location';
import Location from '../model/Location';
import xmpp from './xmpp/bot';
import model from '../model/model';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import assert from 'assert';

@autobind
class BotStore {
  @observable bot: Bot;
  @observable address: Address = null;
  
  create(data){
    this.bot = botFactory.create(data);
    if (!this.bot.owner){
      when(()=>model.profile, ()=>{
        this.bot.owner = model.profile
      });
    }
    if (!this.address){
      when(()=>this.bot.location, ()=>{
        this.address = new Address(this.bot.location);
      });
//      this.address.clear();
    }
    console.log("BOT LOCATION:", this.bot.location);
    if (!this.bot.location){
      when(()=>location.location, ()=>{
        this.bot.location = new Location(location.location);
        this.bot.isCurrent = true;
      })
    }
//    this.address = new Address(this.bot.location);
  }
  
  createLocation(data){
    return this.create({...data, type:LOCATION});
  }
  
  createImage(data){
    return this.create({...data, type:IMAGE});
  }
  
  createNote(data){
    return this.create({...data, type:NOTE});
  }
  
  async save(){
    console.log("SAVING BOT WITH ID", this.bot.id, this.bot.server, this.bot.isNew, this.bot.allImages.length);
    const params = {...this.bot, isNew: this.bot.isNew};
    if (this.bot.image){
      console.log("ADD BOT IMAGE:",this.bot.image.id);
      params.image = this.bot.image.id;
    }
    const data = await xmpp.create(params);
    
    botFactory.remove(this.bot);
    this.bot.id = data.id;
    this.bot.server = data.server;
    
    // save/remove images
    for (const image of this.bot.images) {
      if (image.isNew) {
        await xmpp.publishImage(this.bot, image.item, image.id);
      }
    }
    for (const itemId of this.bot.removedItems){
      await xmpp.removeItem(this.bot, itemId);
    }
    console.log("ADDED BOT:", data);
    
    botFactory.add(this.bot);
    model.bots.add(this.bot);
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
    model.bots.remove(id);
  }
  
  async list(params = {}){
    let {user, server} = params;
    if (!user){
      user = model.user
    }
    if (!server) {
      server = model.server;
    }
    return xmpp.following(user, server);
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
  
  async start() {
    console.log("BOTSTORE START", model.user);
    try {
      const data = await this.list();
      for (let item of data.bots){
        const bot = botFactory.create(item);
        model.bots.add(bot);
      }
    } catch (e){
      console.error(e);
    }
  };
  
  finish = () => {
    
  };
  
}

export default new BotStore()
