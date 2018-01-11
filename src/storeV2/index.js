// @flow

import {types} from 'mobx-state-tree';
import {AsyncStorage as storage, Image} from 'react-native';
import fs from 'react-native-fs';
import firebase from 'react-native-firebase';

import {BotStore} from './botStore';
import ProfileStore from './profileStore';
import FirebaseStore from './firebaseStore';
import FileStore from './fileStore';
import AppStore from './appStore';
import XmppService from '../store/xmpp/XmppService';
import * as logger from '../utils/log';
// todo: replace with the new botService when it's ready?
import botService from '../store/xmpp/botService';

/**
 * This root store is responsible for injecting child stores with dependencies for running "natively"
 * (as opposed to running in a test environment).
 */

async function getImageSize(uri: string) {
  return new Promise((resolve, reject) =>
    Image.getSize(`file://${uri}`, (width, height) => {
      if (!width || !height) {
        logger.log('Invalid file:', uri);
        resolve();
      } else {
        resolve({width, height});
      }
    }));
}

// TODO: what do I supply as the Provider? react-native-xmpp?
const service = new XmppService();
const auth = firebase.auth();

const Store = types
  .model('Store', {
    appStore: types.optional(AppStore, {}),
    botStore: types.optional(BotStore, {}),
    profileStore: ProfileStore.create({}),
    firebaseStore: FirebaseStore.create({}),
    fileStore: FileStore.create({}),
  })
  .views(self => ({
    get connected() {
      return service.connected;
    },
    get connecting() {
      return service.connecting;
    },
    // get profile() {
    //   return self.profileStore.profile;
    // },
  }))
  .actions((self) => {
    return {};
  });

export default Store.create({}, {service, auth, logger, fs, getImageSize, botService});
