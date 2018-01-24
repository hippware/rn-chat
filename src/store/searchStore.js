// @flow

// import {observable, autorun, when, computed, action, reaction, autorunAsync} from 'mobx';
import algoliasearch from 'algoliasearch/reactnative';

const client = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89');
import {settings} from '../globals';

export class SearchStore {
  index: any;

  constructor() {
    this.index = client.initIndex(settings.isStaging ? 'dev_wocky_users' : 'prod_wocky_users');
  }

  search = async (text: string) => {
    return new Promise((resolve, reject) => {
      this.index.search(text, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  };

  queryUsername = async (text: string) => {
    const res = await this.search(text);
    return res && res.hits.length > 0 && res.hits[0].handle.toLowerCase() === text.toLowerCase();
  };
}

export default new SearchStore();
