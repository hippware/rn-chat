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

// import wocky from 'wocky-client';
import wocky from './wocky-client';
import {settings} from '../globals';
import XmppIOS from '../store/xmpp/XmppIOS';
import * as logger from '../utils/log';

const provider = new XmppIOS();
export const service = wocky.create({resource: 'testing', host: settings.getDomain()}, {provider, storage, logger});

// NOTE: React Native Debugger is nice, but will require some work to reconcile with strophe's globals
// Also, was seeing a SocketRocket error when running with dev tools: https://github.com/facebook/react-native/issues/7914
// if (__DEV__) {
//   connectReduxDevtools(require('remotedev'), service);
// }

// todo: replace with the new botService when it's ready?
// import botService from "../store/xmpp/botService";

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
