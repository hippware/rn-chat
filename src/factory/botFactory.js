// @flow

import autobind from 'autobind-decorator';
import {observable, when} from 'mobx';
import Bot, {LOCATION, IMAGE, NOTE} from '../model/Bot';

import Utils from '../store/xmpp/utils';
import * as log from '../utils/log';

type BotCreateData = {
  id: string,
  type: string,
  fullId: ?string,
};

@autobind
class BotFactory {
  bots: {[key: string]: Bot} = {};

  constructor() {
    log.log('CREATE BOTFACTORY', {level: log.levels.DEBUG});
  }

  load(bots) {
    if (bots) {
      for (let i = 0; i < bots._list.length; i++) {
        this.bots[bots._list[i].id] = bots._list[i];
      }
    }
  }

  remove(bot) {
    log.log('REMOVE BOT FROM FACTORY', bot.id, {level: log.levels.DEBUG});
    delete this.bots[bot.id];
  }

  add(bot) {
    this.bots[bot.id] = bot;
  }

  create = ({id, type, ...data}: BotCreateData = {}): ?Bot => {
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

  createAsync = (arg) => {
    const model = require('../model/model').default;
    return new Promise(resolve => when(() => model.connected, () => resolve(this.create(arg))));
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
