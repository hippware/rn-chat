import autobind from 'autobind-decorator';
import {when, autorun, observable, reaction} from 'mobx';
import Address from '../model/Address';
import botFactory from '../factory/bot';
import location, {METRIC, IMPERIAL} from '../store/location';
import Location from '../model/Location';
import xmpp from './xmpp/bot';
import model from '../model/model';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';

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
    const data = await xmpp.create(this.bot);
    console.log("ADDED BOT:", data);
    this.bot.id = data.id;
    model.ownBots.add(this.bot);
    
  }
  
  async list(params = {}){
    let {user, server} = params;
    if (!user){
      user = model.user
    }
    if (!server) {
      server = model.server;
    }
    return xmpp.list(user, server);
  }
  
  async start() {
    console.log("BOTSTORE START", model.user);
    try {
      const data = await this.list();
      for (let item of data.bots){
        const bot = botFactory.create(item);
        console.log("ADD BOT:", item, JSON.stringify(bot))
        model.ownBots.add(bot);
        console.log("BOTS:", JSON.stringify(model.ownBots.list.map(x=>x)))
      }
    } catch (e){
      console.error(e);
    }
  };
  
  finish = () => {
    
  };
  
}

export default new BotStore()
