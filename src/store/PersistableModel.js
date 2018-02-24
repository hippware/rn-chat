// @flow

import {types, getType, flow, applySnapshot, getEnv} from 'mobx-state-tree';
import {reaction} from 'mobx';
import {Base} from 'wocky-client';
import _ from 'lodash';

// const migrations = {
//   '2.0.0': {
//     getState: (storage) => {
//       storage.getItem(modelName, (error: Object, data: string) => {
//       return storage.getItem('rnchat:model')
//     },
//     migrate: (previousState) => {
//       return _.pick(previousState, ['user', 'server', 'password', 'resource'])
//     }
//   }
// }

function loadFromStorage(storage, key: string) {
  return new Promise((resolve, reject) => {
    storage.getItem(key, (error: Object, data: string) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

export default types.compose(Base, types.model({id: 'Persistable'})).actions((self) => {
  const {logger, storage} = getEnv(self);

  function loadMinimal(parsed: Object, modelName: string) {
    logger.log('loadMinimal');
    try {
      applySnapshot(self.wocky, _.pick(parsed.wocky, ['username', 'password', 'host', 'resource', 'profile']));
    } catch (err) {
      logger.warn('Minimal hydration error', err);
      // TODO: mixpanel
      throw err;
    }
  }

  async function load() {
    const modelName = getType(self).name;
    let parsed;
    try {
      const data = await loadFromStorage(storage, modelName);
      parsed = JSON.parse(data);
      // throw new Error('Hydrate minimally');
      applySnapshot(self, parsed);
    } catch (err) {
      logger.log('hydration error', modelName, parsed, err);
      modelName === 'MainStore' && parsed.wocky && loadMinimal(parsed, modelName);
    }
  }

  return {
    hydrate: flow(function* hydrate() {
      if (storage) {
        yield load();
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
      return false;
    }),
  };
});
