// @flow

import {autorun} from 'mobx';
import {types, getEnv, addMiddleware} from 'mobx-state-tree';
import {AsyncStorage, AppState, NetInfo} from 'react-native';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import algoliasearch from 'algoliasearch/reactnative';
import {Wocky} from 'wocky-client';
import nativeEnv from 'react-native-native-env';

import {settings} from '../globals';
import XmppIOS from './xmpp/XmppIOS';
import * as logger from '../utils/log';
import analytics from '../utils/analytics';
import PersistableModel from './PersistableModel';
import FirebaseStore from './FirebaseStore';
import fileService from './fileService';
import LocationStore from './LocationStore';
import SearchStore from './SearchStore';
import ProfileValidationStore from './ProfileValidationStore';
import GeocodingStore from './GeocodingStore';
import NewBotStore from './NewBotStore';
import NotificationStore from './NotificationStore';
import cp from './CodePushStore';

// import AppStore from "./appStore";

const algolia = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89');
const searchIndex = algolia.initIndex(settings.isStaging ? 'dev_wocky_users' : 'prod_wocky_users');
const provider = new XmppIOS();
const {geolocation} = navigator;

// NOTE: React Native Debugger is nice, but will require some work to reconcile with strophe's globals
// Also, was seeing a SocketRocket error when running with dev tools: https://github.com/facebook/react-native/issues/7914
// if (__DEV__) {
//   connectReduxDevtools(require('remotedev'), service);
// }

const auth = firebase.auth();
const env = {provider, storage: AsyncStorage, auth, logger, fileService, geolocation, searchIndex, appState: AppState, netInfo: NetInfo, analytics, nativeEnv};

const Store = types
  .model('Store', {
    // appStore: types.optional(AppStore, {}),``
    wocky: Wocky,
    firebaseStore: FirebaseStore,
    locationStore: LocationStore,
    searchStore: SearchStore,
    profileValidationStore: ProfileValidationStore,
    geocodingStore: GeocodingStore,
    newBotStore: NewBotStore,
    version: types.string,
  })
  .views(self => ({
    get getImageSize() {
      return getEnv(self).fileService.getImageSize;
    },
  }))
  .actions(self => ({}));

const PersistableStore = types.compose(PersistableModel, Store).named('MainStore');
const theStore = PersistableStore.create(
  {
    wocky: {resource: DeviceInfo.getUniqueID(), host: settings.getDomain()},
    firebaseStore: {},
    locationStore: {},
    searchStore: {},
    profileValidationStore: {},
    geocodingStore: {},
    newBotStore: {},
    version: settings.version,
  },
  env,
);

export const notificationStore = new NotificationStore(theStore.wocky);
export const codePushStore = cp;

// simple logging
// addMiddleware(theStore, simpleActionLogger);

// verbose action logging
// addMiddleware(theStore, actionLogger);

export default theStore;
