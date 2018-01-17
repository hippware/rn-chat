// @flow

import {autorun} from 'mobx';
import {types, getEnv} from 'mobx-state-tree';
import {connectReduxDevtools} from 'mst-middlewares';
import {AsyncStorage as storage, Image} from 'react-native';
import fs, {MainBundlePath} from 'react-native-fs';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import PersistableModel from './PersistableModel';
import FirebaseStore from './FirebaseStore';
// import FileStore from "./fileStore";
// import AppStore from "./appStore";

import Wocky from 'wocky-client';
import {settings} from '../globals';
import XmppIOS from './xmpp/XmppIOS';
import * as logger from '../utils/log';

const provider = new XmppIOS();

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

const auth = firebase.auth();

// compose stores here for final store
// const Store = types.compose(FirebaseStore, Wocky, PersistableModel).named('MainStore');
const Store = types.compose(Wocky, PersistableModel).named('MainStore');

export default Store.create({resource: DeviceInfo.getUniqueID(), host: settings.getDomain()}, {provider, storage, auth, logger, fs, getImageSize});
