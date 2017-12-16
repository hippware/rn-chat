// @flow

import {USE_IOS_XMPP} from '../globals';
import autobind from 'autobind-decorator';
import {deserialize, serialize} from 'serializr';
import model, {Model} from '../model/model';
import {autorunAsync, action, toJS} from 'mobx';
import * as log from '../utils/log';
import analyticsStore from './analyticsStore';

// TODO: clean up below (isn't currently used?)
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
    const res = (await this.provider.load()) || {};
    let d = {};
    try {
      // throw new Error('bonk!');
      d = deserialize(Model, res);
      model.load(d);
    } catch (e) {
      log.log('SERIALIZE ERROR:', e);
      // TODO: report error with mixpanel? bugsnag?
      try {
        model.loadMinimal(res);
      } catch (em) {
        log.log('LOAD MINIMAL ERROR:', em);
        analyticsStore.track('error_load_minimal', {error: e});
      }
    } finally {
      // need to set loaded flag in case of exceptions, i.e. data corruptions, otherwise Firebase will not be registered
      model.loaded = true;
    }
    if (!model.user || !model.password || !model.server || !model.resource) {
      log.log('STORAGE EMPTY', model.user, model.password, model.server);
      this.loaded = false;
      throw new Error('no user credentials');
    }
    this.loaded = true;
    return model;
  }

  save() {
    return model;
  }
}
export default new Storage();
