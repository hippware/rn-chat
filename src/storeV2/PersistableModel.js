import {types, getType, flow, applySnapshot, getSnapshot, getEnv} from 'mobx-state-tree';

export default types
  .model({})
  .named('PersistableModel')
  .actions((self) => {
    const {provider} = getEnv(self);
    async function loadFromStorage() {
      const modelName = getType(self).name;
      logger.log('WOCKY: loadFromStorage', modelName);
      return new Promise((resolve, reject) => {
        storage.getItem(modelName, (error: Object, data: string) => {
          if (data) {
            try {
              applySnapshot(self, JSON.parse(data));
            } catch (err) {
              logger.warn(`${modelName} hydration error`, data, err);
              // reject(err)
            }
          } else if (error) {
            logger.warn(`${modelName} hydration error`, error);
          }
          logger.log('WOCKY: loadFromStorage resolving..');
          resolve();
        });
      });
    }
    return {
      hydrate: flow(function* load() {
        logger.log('WOCKY: hydrate');
        if (storage) {
          yield loadFromStorage();
          reaction(
            () => getSnapshot(self),
            (json) => {
              console.log('WOCKY: store', json);
              storage.setItem(getType(self).name, JSON.stringify(json));
            },
          );
          logger.log('WOCKY: hydrated');
          return true;
        }
      }),
    };
  });
