import autobind from 'autobind-decorator';
import Bot, {LOCATION, IMAGE, NOTE} from '../model/Bot';
import assert from 'assert';
import {observable} from 'mobx';
import Utils from '../store/xmpp/utils';
@autobind
class BotFactory {
  @observable bots: {string: Bot} = {};
  
  constructor(){
    //console.log("CREATE BOTFACTORY");
  }
  
  remove(bot){
    delete this.bots[bot.id];
  }
  
  add(bot){
    this.bots[bot.id] = bot;
  }
  
  create = ({id, type, ...data} = {}) => {
    console.log("BotFactory CREATE BOT", id, type, data);
    if (data.fullId){
      id = data.fullId.split('/')[0];
    }
    if (!id || !this.bots[id]){
      this.bots[id] = new Bot({id, type, ...data});
    } else {
      console.log("EXISTING", JSON.stringify(this.bots[id]))
      this.bots[id].load(data);
    }
    //console.log("BotFactory CREATE BOT", id, type, this.bots[id].loaded);
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