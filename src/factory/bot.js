import autobind from 'autobind-decorator';
import Bot, {LOCATION, IMAGE, NOTE} from '../model/Bot';
import assert from 'assert';
@autobind
class BotFactory {
  bots: {string: Bot} = {};
  
  constructor(){
    console.log("CREATE BOTFACTORY");
  }
  
  create = ({id, type, ...data} = {}) => {
    if (!type){
      type = LOCATION;
    }
    if (!id){
      const time = Date.now();
      id = `s${time}${Math.round(Math.random() * 1000)}`;
    }
    if (!this.bots[id]){
      this.bots[id] = new Bot({id, type, ...data});
    } else {
      this.bots[id].load(data);
    }
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