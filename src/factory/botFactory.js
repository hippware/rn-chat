import autobind from 'autobind-decorator';
import Bot, {LOCATION, IMAGE, NOTE} from '../model/Bot';
import assert from 'assert';
import {observable} from 'mobx';
import Utils from '../store/xmpp/utils';
@autobind
class BotFactory {
  @observable bots: {string: Bot} = {};
  
  constructor(){
    console.log("CREATE BOTFACTORY");
  }
  
  remove(bot){
    console.log("REMOVE BOT FROM FACTORY", bot.id);
    delete this.bots[bot.id];
  }
  
  add(bot){
    this.bots[bot.id] = bot;
  }
  
  create = ({id, type, ...data} = {}) => {
    if (data.fullId){
      id = data.fullId.split('/')[0];
    }
      console.log("BotFactory CREATE BOT", id, type, data);
    if (!id){
      return new Bot({type, ...data});
    }
    if (!this.bots[id]){
//      console.log("NO BOT EXISTS", id, data, JSON.stringify(Object.keys(this.bots)));
      if (!Object.keys(data).length){
        console.warn("CANNOT CREATE EMPTY BOT", id);
        return null;
      }
      this.bots[id] = new Bot({id, type, ...data});
    } else {
      this.bots[id].load(data);
    }
    //console.log("BotFactory RETURN CREATE BOT", id, type, this.bots[id].owner);
    return this.bots[id];
  }
  
  clear(){
    this.bots = {};
  }
  
  createLocation(data) {
    return this.create({...data, type:LOCATION});
  }
  
  createImage(data) {
    return this.create({...data, type:IMAGE});
  }
  
  createNote(data) {
    return this.create({...data, type:NOTE});
  }
  
}

export default new BotFactory()