// @flow

import {types, getType, flow, applySnapshot, getSnapshot, getEnv} from 'mobx-state-tree';
import {reaction} from 'mobx';

export default types.model({}).actions((self) => {
  const {logger, storage} = getEnv(self);

  async function loadFromStorage() {
    const modelName = getType(self).name;
    return new Promise((resolve, reject) => {
      storage.getItem(modelName, (error: Object, data: string) => {
        if (data) {
          // console.log('loadFromStorage', modelName, data);
          try {
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
          () => getSnapshot(self),
          (json) => {
            // console.log('persist state:', json);
            storage.setItem(getType(self).name, JSON.stringify(json));
          },
        );
        return true;
      }
    }),
  };
});
