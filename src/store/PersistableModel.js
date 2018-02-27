// @flow

import {types, getType, flow, applySnapshot, getEnv} from 'mobx-state-tree';
import {reaction} from 'mobx';
import {Base} from 'wocky-client';
import _ from 'lodash';

export default types.compose(Base, types.model({id: 'Persistable'})).actions((self) => {
  const {logger, storage, analytics} = getEnv(self);

  function loadFromStorage(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      storage.getItem(key, (error: Object, data: string) => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  }

  function loadMinimal(parsed: Object) {
    logger.log('loadMinimal');
    try {
      const {username, password} = parsed.wocky;
      applySnapshot(self.wocky, {...self.wocky, username, password});
    } catch (err) {
      logger.warn('Minimal hydration error', err);
      analytics.track('loadMinimal_fail', parsed);
      throw err;
    }
  }

  // try to migrate cached data from 1.x.x to 2.x.x
  async function tryMigrate() {
    let data;
    try {
      analytics.track('migration_try');
      const key = 'rnchat:model';
      data = await loadFromStorage(key);
      const {user, password, server} = JSON.parse(data);
      applySnapshot(self.wocky, {...self.wocky, username: user, password, host: server});
      storage.removeItem(key);
      analytics.track('migration_success', self.wocky.toJSON());
    } catch (err) {
      logger.warn('Data migration error:', err);
      analytics.track('migration_fail', data);
    }
  }

  async function load() {
    // Nice way to impersonate QA (it is Miranda's account)
    // return loadMinimal({
    //   wocky: {
    //     id: 'wocky',
    //     username: '1a175ee4-55d5-11e6-8fee-0eea5386eb69',
    //     password: '$T$kpVJzlwJgNw3dX85f6+CVU2/gLeaigUGpjLwFvZBDDo=',
    //     resource: 'cli-resource-ac35c6fb',
    //   },
    // });
    const modelName = getType(self).name;
    let parsed;
    try {
      const data = await loadFromStorage(modelName);
      parsed = JSON.parse(data);
      // throw new Error('Hydrate minimally');
      applySnapshot(self, parsed);
    } catch (err) {
      logger.log('hydration error', modelName, parsed, err);
      if (modelName === 'MainStore' && parsed && parsed.wocky) {
        loadMinimal(parsed);
      } else {
        await tryMigrate();
      }
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
