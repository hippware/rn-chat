// @flow

// import {observable, autorun, when, computed, action, reaction, autorunAsync} from 'mobx';
import {observable, autorun, when, computed, action, reaction, autorunAsync} from 'mobx';
import {settings} from '../globals';

// @flow

import {types, getEnv, flow, getParent} from 'mobx-state-tree';

const SearchStore = types
  .model('SearchStore', {})
  .volatile(self => ({
    index: types.frozen,
    local: '',
    // TODO: localResult: SelectableProfileList = new SelectableProfileList(null, false);
    global: '',
    // TODO: globalResult: SelectableProfileList = new SelectableProfileList();
  }))
  .actions((self) => {
    const {logger, geolocation, algolia} = getEnv(self);
    // const {wocky} = self;

    function afterCreate() {
      self.index = algolia.initIndex(settings.isStaging ? 'dev_wocky_users' : 'prod_wocky_users');
    }

    function beforeDestroy() {}

    const search = flow(function* search(text: string) {
      yield new Promise((resolve, reject) => {
        self.index.search(text, (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(content);
          }
        });
      });
    });

    const queryUsername = flow(function* queryUsername(text: string) {
      const res = yield self.search(text);
      return res && res.hits.length > 0 && res.hits[0].handle.toLowerCase() === text.toLowerCase();
    });

    function setGlobal(text: string) {
      self.global = text;
    }

    return {afterCreate, beforeDestroy, setGlobal, queryUsername, search};
  });

export default SearchStore;
