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
    console.log("SAVING BOT WITH ID", this.bot.id, this.bot.isNew);
    const params = {...this.bot, isNew: this.bot.isNew};
    if (this.bot.image){
      console.log("ADD BOT IMAGE:",this.bot.image.id);
      params.image = this.bot.image.id;
    }
    const data = await xmpp.create(params);
    console.log("ADDED BOT:", data);
    botFactory.remove(this.bot);
    this.bot.id = data.id;
    this.bot.server = data.server;
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
  
  async start() {
    console.log("BOTSTORE START", model.user);
    try {
      const data = await this.list();
      for (let item of data.bots){
        const bot = botFactory.create(item);
        console.log("ADD BOT:", item, JSON.stringify(bot))
        model.bots.add(bot);
        console.log("BOTS:", JSON.stringify(model.bots.list.map(x=>x)))
      }
    } catch (e){
      console.error(e);
    }
  };
  
  finish = () => {
    
  };
  
}

export default new BotStore()
