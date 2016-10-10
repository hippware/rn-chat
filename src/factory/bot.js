import autobind from 'autobind-decorator';
import Bot from '../model/Bot';
import assert from 'assert';
@autobind
class BotFactory {
  bots: {string: Bot} = {};
  
  constructor(){
    console.log("CREATE BOTFACTORY");
  }
  
  create = ({id, ...data} = {}) => {
    if (!id){
      const time = Date.now();
      id = `s${time}${Math.round(Math.random() * 1000)}`;
    }
    return new Bot({id, ...data});
    if (!this.bots[id]){
      this.bots[id] = new Bot({id, ...data});
      console.log("CREATE BOT", id, this.bots[id]);
    }
    return this.bots[id];
  }
}

export default new BotFactory()