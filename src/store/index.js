// @flow

import {autorun} from 'mobx';
import {types, getEnv, addMiddleware} from 'mobx-state-tree';
import {connectReduxDevtools, simpleActionLogger, actionLogger} from 'mst-middlewares';
import {AsyncStorage as storage, AppState as appState, NetInfo as netInfo} from 'react-native';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import algoliasearch from 'algoliasearch/reactnative';
import {Wocky} from 'wocky-client';

import {settings} from '../globals';
import XmppIOS from './xmpp/XmppIOS';
import * as logger from '../utils/log';
import PersistableModel from './PersistableModel';
import FirebaseStore from './FirebaseStore';
import fileService from './fileService';
import LocationStore from './LocationStore';
import SearchStore from './SearchStore';
import analytics from '../utils/analytics';
// import AppStore from "./appStore";

const algolia = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89');
const provider = new XmppIOS();
const {geolocation} = navigator;

// NOTE: React Native Debugger is nice, but will require some work to reconcile with strophe's globals
// Also, was seeing a SocketRocket error when running with dev tools: https://github.com/facebook/react-native/issues/7914
// if (__DEV__) {
//   connectReduxDevtools(require('remotedev'), service);
// }

const auth = firebase.auth();
// environment
const env = {provider, storage, auth, logger, fileService, geolocation, algolia, appState, netInfo, analytics};
const wocky = Wocky.create({resource: DeviceInfo.getUniqueID(), host: settings.getDomain()}, env);

const Store = types
  .model('Store', {
    // appStore: types.optional(AppStore, {}),``
    // botStore: types.optional(BotStore, {}),
    wocky: Wocky,
    firebaseStore: FirebaseStore,
    locationStore: LocationStore,
    searchStore: SearchStore,
    // firebaseStore: FirebaseStore.create({}),
    // fileStore: FileStore.create({})
  })
  .actions(self => ({}));

const PersistableStore = types.compose(PersistableModel, Store).named('MainStore');
const theStore = PersistableStore.create(
  {
    wocky,
    firebaseStore: FirebaseStore.create({wocky}, env),
    locationStore: LocationStore.create({wocky}, env),
    searchStore: SearchStore.create({}, env),
  },
  env,
);

// simple logging
addMiddleware(theStore, simpleActionLogger);

// verbose action logging
// addMiddleware(theStore, actionLogger);

export default theStore;
