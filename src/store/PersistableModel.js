// @flow

import {types, getType, flow, applySnapshot, getSnapshot, getEnv} from 'mobx-state-tree';
import {reaction} from 'mobx';
import {Base} from 'wocky-client';

export default types.compose(Base, types.model({id: 'Persistable'})).actions((self) => {
  const {logger, storage} = getEnv(self);
  const prevSnapshot = {};

  async function loadFromStorage() {
    const modelName = getType(self).name;
    return new Promise((resolve, reject) => {
      storage.getItem(modelName, (error: Object, data: string) => {
        if (data) {
          // console.log('loadFromStorage', modelName, data);
          try {
            // TODO: custom "migrations" of 'Store' snapshots based on version
            applySnapshot(self, JSON.parse(data));
          } catch (err) {
            logger.warn(`${modelName} hydration error`, data, err);
            // reject(err)
          }
        } else if (error) {
          logger.warn(`${modelName} hydration error`, error);
        }
        resolve();
      });
    });
  }

  return {
    hydrate: flow(function* hydrate() {
      if (storage) {
        // console.log('trying to load from storage');
        yield loadFromStorage();
        reaction(
          () => self.snapshot,
          (json) => {
            // console.log('persist state:', JSON.stringify(json));
            storage.setItem(getType(self).name, JSON.stringify(json));
          },
          {fireImmediately: false, delay: 1000},
        );
        return true;
      }
    }),
  };
});
