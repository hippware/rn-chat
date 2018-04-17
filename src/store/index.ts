import {types, getEnv, addMiddleware} from 'mobx-state-tree'
import {useStrict} from 'mobx'
import {simpleActionLogger} from 'mst-middlewares'
import {AsyncStorage, AppState, NetInfo} from 'react-native'
import firebase from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info'
import algoliasearch from 'algoliasearch/reactnative'
import {Wocky, XmppTransport, HybridTransport, GraphQLTransport} from 'wocky-client'
import nativeEnv from 'react-native-native-env'
import backgroundGeolocation from 'react-native-background-geolocation'
import backgroundFetch from 'react-native-background-fetch'

import {settings} from '../globals'
import XmppIOS from './xmpp/XmppIOS'
import * as logger from '../utils/log'
import analytics from '../utils/analytics'
import PersistableModel from './PersistableModel'
import FirebaseStore from './FirebaseStore'
import fileService from './fileService'
import LocationStore from './LocationStore'
import SearchStore from './SearchStore'
import ProfileValidationStore from './ProfileValidationStore'
import GeocodingStore from './GeocodingStore'
import NewBotStore from './NewBotStore'
import NotificationStore from './NotificationStore'
import cp from './CodePushStore'
import rs from './ReportStore'
import PushStore from './PushStore'
import connectivityStore from './ConnectivityStore'
// import bugsnag from '../utils/errorReporting';

const algolia = algoliasearch('HIE75ZR7Q7', '79602842342e137c97ce188013131a89')
const searchIndex = algolia.initIndex(settings.isStaging ? 'dev_wocky_users' : 'prod_wocky_users')
const provider = new XmppIOS()
const xmppTransport = new XmppTransport(provider, fileService, DeviceInfo.getUniqueID())
const graphqlTransport = new GraphQLTransport(DeviceInfo.getUniqueID())
const transport = new HybridTransport(xmppTransport, graphqlTransport)

const {geolocation} = navigator

if (__DEV__) {
  useStrict(true)
}

// NOTE: React Native Debugger is nice, but will require some work to reconcile with strophe's globals
// Also, was seeing a SocketRocket error when running with dev tools: https://github.com/facebook/react-native/issues/7914
// if (__DEV__) {
//   connectReduxDevtools(require('remotedev'), service);
// }

const auth = firebase.auth()
const env = {
  transport,
  storage: AsyncStorage,
  auth,
  logger,
  fileService,
  geolocation,
  searchIndex,
  analytics,
  nativeEnv,
  backgroundFetch,
  backgroundGeolocation,
  connectivityStore,
}

const Store = types
  .model('Store', {
    wocky: Wocky,
    firebaseStore: FirebaseStore,
    locationStore: LocationStore,
    searchStore: SearchStore,
    profileValidationStore: ProfileValidationStore,
    geocodingStore: GeocodingStore,
    newBotStore: NewBotStore,
    version: types.string,
    // codePushChannel: types.string,
    locationPrimed: false,
    sharePresencePrimed: false,
  })
  .views(self => ({
    get getImageSize() {
      return getEnv(self).fileService.getImageSize
    },
  }))
  .actions(self => ({
    afterCreate() {
      connectivityStore.start(self.wocky, logger, AppState, NetInfo)
    },
    reload: () => {
      self.wocky.clearCache()
      self.firebaseStore.reset()
    },
    dismissLocationPrimer: () => {
      self.locationPrimed = true
    },
    dismissSharePresencePrimer: () => {
      self.sharePresencePrimed = true
    },
  }))

const PersistableStore = types.compose(PersistableModel, Store).named('MainStore')
const theStore = PersistableStore.create(
  {
    wocky: {host: settings.getDomain()},
    firebaseStore: {},
    locationStore: {},
    searchStore: {},
    profileValidationStore: {},
    geocodingStore: {},
    newBotStore: {},
    version: settings.version,
  },
  env
)

export const codePushStore = cp
export const reportStore = rs
export const pushStore = new PushStore(theStore.wocky, analytics)
export const notificationStore = new NotificationStore(theStore.wocky, connectivityStore)
// bugsnag(theStore.wocky);

// simple logging
addMiddleware(theStore, simpleActionLogger)

// verbose action logging
// addMiddleware(theStore, actionLogger);

export default theStore
