// @flow

import {types, getEnv} from 'mobx-state-tree';
import assert from 'assert';
import Utils from './xmpp/utils';
import botFactory from '../factory/botFactory';
import model from '../model/model';

export const EXPLORE_NEARBY = 'explore-nearby-result';

export const Bot = types.model('Bot', {
  // fullId: types.string,
  // id: types.string,
  // jid: types.string,
});

export const BotStore = types
  .model('BotStore', {
    bot: types.optional(Bot, {}),
  })
  .actions((self) => {
    function afterCreate(): void {
      const {service} = getEnv(self);
      service.message.filter(msg => msg[EXPLORE_NEARBY]).onValue(val => processGeoResult(val[EXPLORE_NEARBY]));
    }

    function processGeoResult(result) {
      console.log('processGeoResult', result);
    }

    return {afterCreate};
  });
