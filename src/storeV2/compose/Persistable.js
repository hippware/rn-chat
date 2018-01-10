// @flow

import {types, getEnv, getSnapshot, applySnapshot, getType, getRoot} from 'mobx-state-tree';
import {when, reaction} from 'mobx';
import assert from 'assert';

import * as log from '../../utils/log';

const Persistable = types
  .model()
  .views(self => ({
    get store() {
      return getRoot(self);
    },
  }))
  .actions((self) => {
    const {storage} = getEnv(self);

    function afterCreate() {
      when(
        () => storage && self.store.connected,
        () => {
          hydrate();
          reaction(
            () => getSnapshot(self),
            (json) => {
              storage.setItem(getType(self).name, JSON.stringify(json));
            },
          );
        },
      );
    }

    function hydrate(): void {
      const modelName = getType(self).name;
      storage.getItem(modelName, (error, data) => {
        if (data) {
          try {
            applySnapshot(self, JSON.parse(data));
          } catch (err) {
            log.log(`${modelName} hydration error`, data, err, {level: log.levels.ERROR});
            throw err;
          }
        }
      });
    }

    return {afterCreate};
  });

export default Persistable;
