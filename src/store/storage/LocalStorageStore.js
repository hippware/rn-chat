const KEY = 'rnchat:model';
import {USE_IOS_XMPP} from '../../globals';
import autobind from 'autobind-decorator';
let storage;
import * as log from '../../utils/log';

if (USE_IOS_XMPP) {
  log.log('real AsyncStorage', {level: log.levels.VERBOSE});
  storage = require('react-native').AsyncStorage;
} else {
  log.log('mock AsyncStorage', {level: log.levels.VERBOSE});
  storage = {
    setItem: (x, d) => {
      log.log('setItem:', x, d);
    },
    getItem: () => undefined,
  };
}

@autobind
export default class LocalStorage {
  load() {
    return new Promise((resolve, reject) => {
      // persistence
      storage.getItem(KEY, (error, data) => {
        if (data) {
          try {
            const json = JSON.parse(data);
            // log.log("CACHED DATA:", json);
            resolve(json);
          } catch (error) {
            log.log('ERROR PARSING JSON', data, {level: log.levels.ERROR});
            reject(error);
          }
        } else {
          resolve();
        }
      });
    });
  }

  save(data) {
    // log.log("STORING:", data)
    storage.setItem(KEY, JSON.stringify(data));
  }
}
