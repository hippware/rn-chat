import PersistableModel from '../src/store/PersistableModel';
import {createWocky} from './utils/mockWocky';
import {Wocky} from 'wocky-client';
import {types, getEnv} from 'mobx-state-tree';

describe('PersistableModel', () => {
  it('test snapshot', async () => {
    const Store = types.model({wocky: Wocky});
    const PersistableStore = types.compose(PersistableModel, Store).named('MainStore');
    const wocky = createWocky({
      storage: {
        removeItem: () => {},
        getItem: (key, callback) => {
          if (key === 'rnchat:model') {
            const v1data = require('./files/v1storage.json');
            callback(undefined, JSON.stringify(v1data));
          } else {
            callback(undefined, '{}');
          }
        },
      },
    });
    const store = PersistableStore.create({wocky}, getEnv(wocky));
    expect(store.wocky.username).toEqual(null);
    expect(store.wocky.password).toEqual(null);
    expect(await store.hydrate()).toEqual(true);
    expect(store.wocky.username).toEqual('aa6b9246-4ce5-11e7-9306-0e2ac49618c7');
    expect(store.wocky.password).toEqual('$T$bu7UzdsAw604ihYjnXQa93f1a4WzGfiTDL1XOMkeTRo=');
    expect(store.wocky.host).toEqual('staging.dev.tinyrobot.com');
  });
});
