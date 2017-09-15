// @flow

import {USE_IOS_XMPP} from '../globals';
import autobind from 'autobind-decorator';
import {deserialize, serialize} from 'serializr';
import model, {Model} from '../model/model';
import {autorunAsync, action, observable} from 'mobx';
import * as log from '../utils/log';

let Provider;
if (USE_IOS_XMPP) {
  log.log('real RealmStore');
  Provider = require('./storage/LocalStorageStore').default;
  //  Provider = require('./storage/RealmStore').default;
} else {
  log.log('mock AsyncStorage');
  Provider = require('./storage/TestStorage').default;
}

@autobind
class Storage {
  provider = new Provider();
  loaded: boolean = false;

  constructor() {
    autorunAsync(() => {
      try {
        if (model.loaded) {
          const data = serialize(model);
          // console.log('STORE MODEL', data);
          this.provider.save(data);
        }
      } catch (e) {
        log.log('STORE ERROR', e);
        model.clear();
      }
    });
  }

  @action
  async load() {
    if (this.loaded) return model;
    const res = await this.provider.load();
    let d = {};
    try {
      d = deserialize(Model, res) || {};
    } catch (e) {
      console.warn('SERIALIZE ERROR:', e);
    }
    model.load(d);

    if (!model.user || !model.password || !model.server || !model.resource) {
      log.log('STORAGE EMPTY', model.user, model.password, model.server);
      throw 'no user credentials';
    }
    this.loaded = true;
    return model;
  }

  save() {
    return model;
  }
}
export default new Storage();
