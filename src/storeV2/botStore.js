// @flow

import {types, getEnv} from 'mobx-state-tree';
import assert from 'assert';
// import Utils from '../store/xmpp/utils';
// import botFactory from '../factory/botFactory';
// import model from '../model/model';
import Bot from '../modelV2/Bot';

export const EXPLORE_NEARBY = 'explore-nearby-result';

export const BotStore = types
  .model('BotStore', {
    bot: types.maybe(Bot),
  })
  .actions((self) => {
    const {service} = getEnv(self);

    function afterCreate(): void {
      service.message.filter(msg => msg[EXPLORE_NEARBY]).onValue(val => processGeoResult(val[EXPLORE_NEARBY]));
    }

    function processGeoResult(result) {
      console.log('processGeoResult', result);
    }

    async function remove(id, server) {
      assert(id, 'id is required');
      assert(server, 'server is required');
      try {
        await service.remove({id, server});
      } catch (e) {
        if (e.indexOf('not found') === -1) {
          throw e;
        }
      }
      // model.subscribedBots.remove(id);
      // model.ownBots.remove(id);
      // model.geoBots.remove(id);
    }

    async function geosearch({latitude, longitude, latitudeDelta, longitudeDelta}): Promise<void> {
      try {
        // log.log('botStore.geosearch:', latitude, longitude, latitudeDelta, longitudeDelta);
        // service.geosearch({latitude, longitude, server: model.server, latitudeDelta, longitudeDelta});
        this.isGeoSearching = true;
      } catch (err) {
        // TODO: how do we handle errors here?
        this.isGeoSearching = false;
      }
    }

    return {afterCreate, remove, geosearch};
  });
