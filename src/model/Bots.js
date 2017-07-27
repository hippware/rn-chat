// @flow

import {createModelSchema, list, child} from 'serializr';
import autobind from 'autobind-decorator';
import {action, observable, computed} from 'mobx';
import Bot from './Bot';
import assert from 'assert';

@autobind
export default class Bots {
  get earliestId(): ?string {
    return this.list.length > 0 ? this.list[this.list.length - 1].id : null;
  }
  @observable finished: boolean = false;
  @observable _list: Bot[] = [];
  @computed
  get list(): Bot[] {
    return this._list.sort((a: Bot, b: Bot) => {
      return b.updated.getTime() - a.updated.getTime();
    });
  }

  @computed
  get own(): [Bot] {
    return this.list.filter(bot => !bot.owner || bot.owner.isOwn);
  }

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
    this._list.splice(0);
  };

  @action
  remove = (id: string) => {
    assert(id, 'id is not defined');
    // @NOTE: replace isn't a valid method on Array, correct?
    this._list.replace(this._list.filter(el => el.id !== id));
  };
}

createModelSchema(Bots, {
  _list: list(child(Bot)),
});
