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
    return this._list.length > 0 ? this._list[this._list.length - 1].id : null;
  }
  @observable finished: boolean = false;
  @observable loading: boolean = false;
  @observable _list: IObservableArray<Bot> = [];

  @computed
  get own(): Bot[] {
    return this._list.filter(bot => !bot.owner || bot.owner.isOwn);
  }

  @action
  unshift = (bot: Bot) => {
    this._list.unshift(bot);
  };

  @action
  add = (bot: Bot): Bot => {
    assert(bot, 'bot should be defined');
    const existingBot = this.get(bot.id);
    if (existingBot) {
      const index = this._list.findIndex(el => el.id === bot.id);
      this._list.splice(index, 1);
    }
    this._list.push(bot);
    return bot;
  };

  get(id: string): Bot {
    if (!id) {
      return undefined;
    }
    return this._list.find(el => el.id === id);
  }

  @action
  clear = () => {
    // don't allow disposing
    // this._list.forEach(bot => bot.dispose());
    this._list.clear();
  };

  @action
  remove = (id: string) => {
    assert(id, 'id is not defined');
    this._list.replace(this._list.filter(el => el.id !== id));
  };
}

createModelSchema(Bots, {
  _list: list(child(Bot)),
});
