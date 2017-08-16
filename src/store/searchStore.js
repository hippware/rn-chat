// @flow

import {observable, autorun, when, computed, action, reaction, autorunAsync} from 'mobx';
import algoliasearch from 'algoliasearch/reactnative';

const client = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89');
import {settings} from '../globals';
import profileStore from './profileStore';
import autobind from 'autobind-decorator';
import SelectableProfileList from '../model/SelectableProfileList';
import model from '../model/model';
import Profile from '../model/Profile';

@autobind
export class SearchStore {
  @observable local: string = '';
  @observable localResult: SelectableProfileList = new SelectableProfileList(null, false);

  @observable global: string = '';
  @observable globalResult: SelectableProfileList = new SelectableProfileList();
  index: any;

  constructor() {
    this.index = client.initIndex(settings.isStaging ? 'dev_wocky_users' : 'prod_wocky_users');
    reaction(
      () => this.global,
      (text) => {
        if (!text.length) {
          this.globalResult.clear();
        } else {
          return this.search(text).then((data) => {
            this.globalResult.replace(data.hits.map(el => profileStore.create(el.objectID, el)).filter((el: Profile) => !el.isOwn));
          });
        }
      },
      {fireImmediately: false, delay: 500},
    );

    // set initial list to all friends
    when(() => model.friends.list.length > 0, () => this.localResult.replace(model.friends.list));

    autorun(() => {
      const text = this.local;
      return this.localResult.replace(
        model.friends.list.filter((el) => {
          return (
            !el.isOwn &&
            (!text ||
              (el.firstName && el.firstName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())) ||
              (el.lastName && el.lastName.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())) ||
              (el.handle && el.handle.toLocaleLowerCase().startsWith(text.toLocaleLowerCase())))
          );
        }),
      );
    });
  }

  @action
  setLocal = (text) => {
    return (this.local = text);
  };

  search(text: string) {
    return new Promise((resolve, reject) => {
      this.index.search(text, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }

  async queryUsername(text: string) {
    const res = await this.search(text);
    return res && res.hits.length > 0 && res.hits[0].handle.toLowerCase() === text.toLowerCase();
  }

  clear() {
    this.setLocal('');
    this.localResult.deselectAll();
    return true;
  }

  @action
  setGlobal = (text: string) => {
    this.global = text;
  };
}

export default new SearchStore();
