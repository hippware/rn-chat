import autobind from 'autobind-decorator';
import {when, autorun, observable, reaction} from 'mobx';
import Address from '../model/Address';
import botFactory from '../factory/bot';
import location, {METRIC, IMPERIAL} from '../store/location';
import Location from '../model/Location';
import xmpp from './xmpp/bot';
import model from '../model/model';

@autobind
class BotStore {
  @observable bot: Bot;
  @observable address: Address = null;
  
  create(data){
    this.bot = botFactory.create(data);
    if (!this.address){
      when(()=>this.bot.location, ()=>{
        this.address = new Address(this.bot.location);
      });
//      this.address.clear();
    }
    if (!this.bot.location){
      when(()=>location.location, ()=>{
        this.bot.location = new Location(location.location);
      })
    }
//    this.address = new Address(this.bot.location);
  }
  
  async save(){
    return await xmpp.create(this.bot);
  }
  
  async list({user} = {}){
    if (!user){
      
    }
  }
  
  async start() {
    try {
      console.log("BOTSTORE START",model.user, model.server);
      const data = await xmpp.list(model.user, model.server);
      console.log("BOTS:", data);
    } catch (e){
      console.error(e);
    }
  };
  
  finish = () => {
    
  };
  
}

export default new BotStore()
