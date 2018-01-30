// @flow

import {autorun} from 'mobx';
import {types, getEnv, addMiddleware} from 'mobx-state-tree';
import {connectReduxDevtools, simpleActionLogger, actionLogger} from 'mst-middlewares';
import {AsyncStorage as storage, Image} from 'react-native';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import PersistableModel from './PersistableModel';
import FirebaseStore from './FirebaseStore';
import fileService from './fileService';
import LocationStore from './LocationStore';
// import FileStore from "./fileStore";
// import AppStore from "./appStore";

import {Wocky} from 'wocky-client';
import {settings} from '../globals';
import XmppIOS from './xmpp/XmppIOS';
import * as logger from '../utils/log';

const provider = new XmppIOS();

const {geolocation} = navigator;

// NOTE: React Native Debugger is nice, but will require some work to reconcile with strophe's globals
// Also, was seeing a SocketRocket error when running with dev tools: https://github.com/facebook/react-native/issues/7914
// if (__DEV__) {
//   connectReduxDevtools(require('remotedev'), service);
// }

// todo: replace with the new botService when it's ready?
// import botService from "../store/xmpp/botService";

const auth = firebase.auth();
// environment
const env = {provider, storage, auth, logger, fileService, geolocation};
const wocky = Wocky.create({resource: DeviceInfo.getUniqueID(), host: settings.getDomain()}, env);

const Store = types
  .model('Store', {
    // appStore: types.optional(AppStore, {}),``
    // botStore: types.optional(BotStore, {}),
    wocky: Wocky,
    firebaseStore: FirebaseStore,
    locationStore: LocationStore,
    // firebaseStore: FirebaseStore.create({}),
    // fileStore: FileStore.create({})
  })
  .actions((self) => {
    return {};
  });

const PersistableStore = types.compose(PersistableModel, Store).named('MainStore');
const theStore = PersistableStore.create(
  {
    wocky,
    firebaseStore: FirebaseStore.create({wocky}, env),
    locationStore: LocationStore.create({wocky}, env),
  },
  env,
);

// simple logging
addMiddleware(theStore, simpleActionLogger);

// verbose action logging
// addMiddleware(theStore, actionLogger);

export default theStore;
