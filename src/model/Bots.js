// @flow

import {createModelSchema, list, child} from 'serializr';
import autobind from 'autobind-decorator';
import {action, observable, computed} from 'mobx';
import type {IObservableArray} from 'mobx';
import Bot from './Bot';
import assert from 'assert';

@autobind
export default class Bots {
  @computed
  get earliestId(): ?string {
    return this.list.length > 0 ? this.list[this.list.length - 1].id : null;
  }
  @observable finished: boolean = false;
  @observable loading: boolean = false;
  @observable list: IObservableArray<Bot> = [];

  @computed
  get own(): [Bot] {
    return this.list.filter(bot => !bot.owner || bot.owner.isOwn);
  }

  @action
  unshift = (bot: Bot) => {
    this.list.unshift(bot);
  };

  @action
  add = (bot: Bot): Bot => {
    assert(bot, 'bot should be defined');
    const existingBot = this.get(bot.id);
    if (existingBot) {
      const index = this.list.findIndex(el => el.id === bot.id);
      this.list.splice(index, 1);
    }
    this.list.push(bot);
    return bot;
  };

  get(id: string): Bot {
    if (!id) {
      return undefined;
    }
    return this.list.find(el => el.id === id);
  }

  @action
  clear = () => {
    // don't allow disposing
    // this.list.forEach(bot => bot.dispose());
    this.list.clear();
  };

  @action
  remove = (id: string) => {
    assert(id, 'id is not defined');
    this.list.replace(this.list.filter(el => el.id !== id));
  };
}

createModelSchema(Bots, {
  list: list(child(Bot)),
});
