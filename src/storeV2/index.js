// @flow

import {types, getSnapshot} from 'mobx-state-tree';
import {when, reaction} from 'mobx';
import {AsyncStorage as storage} from 'react-native';

import {BotStore} from './botStore';
import ProfileStore from './profileStore';
import AppStore from './appStore';
import xmpp from '../store/xmpp/xmpp';

/**
 * This root store is responsible for injecting native dependencies for running on a sim or device
 * (as opposed to running in a test environment).
 */

const Store = types
  .model('Store', {
    appStore: AppStore.create({}),
    botStore: BotStore.create({}, {service: xmpp, storage}),
    profileStore: ProfileStore.create({}),
  })
  .views(self => ({
    connected: self.profileStore.connected,
  }))
  .actions((self) => {
    return {};
  });

export default Store;
