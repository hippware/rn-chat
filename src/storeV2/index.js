// @flow

import {autorun} from 'mobx';
import {types} from 'mobx-state-tree';
import {connectReduxDevtools} from 'mst-middlewares';
import {AsyncStorage as storage, Image} from 'react-native';
import fs, {MainBundlePath} from 'react-native-fs';
import firebase from 'react-native-firebase';

import {BotStore} from './botStore';
import ProfileStore from './profileStore';
// import FirebaseStore from "./firebaseStore";
// import FileStore from "./fileStore";
// import AppStore from "./appStore";
// import XmppService from 'wocky-client';
import wocky from 'wocky-client';
import {settings} from '../globals';
import XmppIOS from '../store/xmpp/XmppIOS';
// import XmppStrophe from './wocky-client/src/XmppStropheV2';

// let XmppConnect;

const provider = new XmppIOS();

// const provider = new XmppStrophe((level, msg) => {
//   console.log('STROPHE: ', level, msg);
// });

const service = wocky.create({resource: 'testing', host: settings.getDomain()}, {provider});

connectReduxDevtools(require('remotedev'), service);

import * as logger from '../utils/log';
// todo: replace with the new botService when it's ready?
// import botService from "../store/xmpp/botService";

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

// const service = new XmppService();
const auth = firebase.auth();

const Store = types
  .model('Store', {
    // appStore: types.optional(AppStore, {}),
    // botStore: types.optional(BotStore, {}),
    profileStore: types.optional(ProfileStore, {}),
    // firebaseStore: FirebaseStore.create({}),
    // fileStore: FileStore.create({})
  })
  .views(self => ({
    get connected() {
      return service.connected;
    },
    get connecting() {
      return service.connecting;
    },
    // get connect() {
    //   return service.
    // }
    // get profile() {
    //   return self.profileStore.profile;
    // },
  }))
  .actions((self) => {
    return {};
  });

export default Store.create({}, {service, auth, logger, fs, getImageSize});
