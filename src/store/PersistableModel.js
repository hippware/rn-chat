// @flow

import {types, getType, flow, applySnapshot, getEnv} from 'mobx-state-tree';
import {reaction} from 'mobx';
import {Base} from 'wocky-client';
import _ from 'lodash';

export default types.compose(Base, types.model({id: 'Persistable'})).actions((self) => {
  const {logger, storage} = getEnv(self);

  async function loadFromStorage() {
    const modelName = getType(self).name;
    return new Promise((resolve, reject) => {
      storage.getItem(modelName, (error: Object, data: string) => {
        if (data) {
          let parsed;
          try {
            parsed = JSON.parse(data);
            // throw new Error('Hydrate minimally');
            // TODO: custom "migrations" of 'Store' snapshots based on version
            applySnapshot(self, JSON.parse(data));
          } catch (err) {
            logger.log('hydration error', modelName, parsed, err);
            if (modelName === 'MainStore' && parsed.wocky) {
              try {
                applySnapshot(self.wocky, _.pick(parsed.wocky, ['username', 'password', 'host', 'resource', 'profile']));
              } catch (err) {
                logger.warn('Minimal hydration error', err);
                reject(err);
              }
            }
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
