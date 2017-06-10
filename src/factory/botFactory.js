import autobind from 'autobind-decorator';
import Bot, {LOCATION, IMAGE, NOTE} from '../model/Bot';
import assert from 'assert';
import {observable} from 'mobx';
import Utils from '../store/xmpp/utils';
import * as log from '../utils/log';

@autobind class BotFactory {
  @observable bots: {string: Bot} = {};

  constructor() {
    log.log('CREATE BOTFACTORY', {level: log.levels.INFO});
  }

  remove(bot) {
    log.log('REMOVE BOT FROM FACTORY', bot.id, {level: log.levels.INFO});
    delete this.bots[bot.id];
  }

  add(bot) {
    this.bots[bot.id] = bot;
  }

  create = ({id, type, ...data} = {}) => {
    if (data.fullId) {
      id = data.fullId.split('/')[0];
    }
    if (!id) {
      return new Bot({type, ...data});
    }
    if (!this.bots[id]) {
      if (!Object.keys(data).length) {
        console.warn('CANNOT CREATE EMPTY BOT', id);
        return null;
      }
      this.bots[id] = new Bot({id, type, ...data});
    } else {
      this.bots[id].load(data);
    }
    return this.bots[id];
  };

  clear() {
    this.bots = {};
  }

  createLocation(data) {
    return this.create({...data, type: LOCATION});
  }

  createImage(data) {
    return this.create({...data, type: IMAGE});
  }

  createNote(data) {
    return this.create({...data, type: NOTE});
  }
}

export default new BotFactory();
