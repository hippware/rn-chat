// @flow

import {types, getEnv, flow, getParent} from 'mobx-state-tree';
import {settings} from '../globals';
import validate from 'validate.js';

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
      addUsernameValidator();
    }

    function beforeDestroy() {}

    function addUsernameValidator() {
      validate.validators.usernameUniqueValidator = function (value) {
        // console.log('username unique v', value);
        if (!value) return new validate.Promise(res => res());
        return new validate.Promise((resolve) => {
          self.queryUsername(value).then((res) => {
            // console.log('qun res', res);
            res ? resolve('not available') : resolve();
          });
        });
      };
    }

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
