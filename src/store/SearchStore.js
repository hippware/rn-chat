// @flow

import {types, getEnv, flow, getParent, getRoot, applySnapshot, getSnapshot} from 'mobx-state-tree';
import {reaction, when, autorun} from 'mobx';
import validate from 'validate.js';
import SelectableProfileList from './SelectableProfileList';

const SearchStore = types
  .model('SearchStore', {
    // we need deep observability for observers in afterAttach so we can't use volatile for these
    // https://github.com/mobxjs/mobx-state-tree#modelvolatile
    local: '',
    localResult: types.optional(SelectableProfileList, {}),
    global: '',
    globalResult: types.optional(SelectableProfileList, {}),
  })
  .views(self => ({
    get snapshot() {
      const res = {...getSnapshot(self)};
      delete res.global;
      delete res.globalResult;
      delete res.local;
      delete res.localResult;
      return res;
    },
  }))
  .actions(self => ({
    clear: () => {
      self.localResult.clear();
      self.globalResult.clear();
      self.local = '';
      self.global = '';
    },
  }))
  .actions((self) => {
    const {searchIndex} = getEnv(self);
    let wocky;

    function afterAttach() {
      ({wocky} = getParent(self));
      addUsernameValidator();
      reaction(() => self.global, text => self._searchGlobal(text), {fireImmediately: false, delay: 500});

      // set initial list to all friends
      when(() => wocky.friends.length > 0, () => self.localResult.replace(wocky.friends));

      autorun('SearchStore', () => {
        const {local} = self;
        if (wocky.connected) {
          self.localResult.replace(wocky.friends.filter((el) => {
            return (
              !el.isOwn &&
                (!local ||
                  (el.firstName && el.firstName.toLocaleLowerCase().startsWith(local.toLocaleLowerCase())) ||
                  (el.lastName && el.lastName.toLocaleLowerCase().startsWith(local.toLocaleLowerCase())) ||
                  (el.handle && el.handle.toLocaleLowerCase().startsWith(local.toLocaleLowerCase())))
            );
          }));
        } else {
          self.clear();
        }
      });
    }

    // TODO: cleanup on disconnect
    function beforeDestroy() {
      applySnapshot(self, {
        local: '',
        localResult: {},
        global: '',
        globalResult: '',
      });
    }

    const _searchGlobal = flow(function* searchGlobal(text) {
      if (!text.length) {
        self.globalResult.clear();
      } else {
        try {
          const data = yield search(text);
          const profileArr = yield Promise.all(data.hits.map(hit => wocky.getProfile(hit.objectID)));
          self.globalResult.replace(profileArr);
        } catch (err) {
          console.log('data hit err', err);
        }
      }
    });

    function addUsernameValidator() {
      validate.validators.usernameUniqueValidator = function (value) {
        if (!value) return new validate.Promise(res => res());
        return new validate.Promise((resolve) => {
          self.queryUsername(value).then((res) => {
            res ? resolve('not available') : resolve();
          });
        });
      };
    }

    function search(text) {
      return new Promise((resolve, reject) => {
        searchIndex.search(text, (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(content);
          }
        });
      });
    }

    const queryUsername = flow(function* queryUsername(text: string) {
      const res = yield self.search(text);
      return res && res.hits.length > 0 && res.hits[0].handle.toLowerCase() === text.toLowerCase();
    });

    function setGlobal(text: string) {
      self.global = text;
    }

    return {afterAttach, beforeDestroy, setGlobal, queryUsername, _searchGlobal};
  });

export default SearchStore;
