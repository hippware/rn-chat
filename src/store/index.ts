import {types, getEnv, addMiddleware, flow} from 'mobx-state-tree'
import {simpleActionLogger} from 'mst-middlewares'
import {AsyncStorage} from 'react-native'
import firebase, {RNFirebase, Firebase} from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info'
import {
  Wocky,
  XmppTransport,
  HybridTransport,
  GraphQLTransport,
  IWockyTransport,
} from 'wocky-client'
import nativeEnv from 'react-native-native-env'

import {settings} from '../globals'
import XmppIOS from './xmpp/XmppIOS'
import * as logger from '../utils/log'
import analytics, {Analytics} from '../utils/analytics'
import PersistableModel from './PersistableModel'
import FirebaseStore from './FirebaseStore'
import fileService from './fileService'
import LocationStore from './LocationStore'
import SearchStore from './SearchStore'
import ProfileValidationStore from './ProfileValidationStore'
import NotificationStore from './NotificationStore'
import CodepushStore from './CodePushStore'
import HomeStore from './HomeStore'
import NavStore from './NavStore'
import rs from './ReportStore'
import PushStore from './PushStore'
import {cleanState, STORE_NAME} from './PersistableModel'
import IconStore from './IconStore'
import geocodingStore from './geocodingService'

const provider = new XmppIOS()
const xmppTransport = new XmppTransport(provider, DeviceInfo.getUniqueID())
const graphqlTransport = new GraphQLTransport(DeviceInfo.getUniqueID())
const transport = new HybridTransport(xmppTransport, graphqlTransport)

const {geolocation} = navigator

// NOTE: React Native Debugger is nice, but will require some work to reconcile with strophe's globals
// Also, was seeing a SocketRocket error when running with dev tools: https://github.com/facebook/react-native/issues/7914
// if (__DEV__) {
//   connectReduxDevtools(require('remotedev'), service);
// }

const auth = firebase.auth()

export type IEnv = {
  transport: IWockyTransport
  storage: AsyncStorage
  auth: RNFirebase.auth.Auth
  firebase: Firebase
  logger: any
  geocodingStore: any
  fileService: any
  geolocation: Geolocation
  analytics: Analytics
  nativeEnv: any
}

const env = {
  transport,
  storage: AsyncStorage,
  auth,
  firebase,
  logger,
  geocodingStore,
  fileService,
  geolocation,
  analytics,
  nativeEnv,
}

const Store = types
  .model('Store', {
    wocky: Wocky,
    homeStore: HomeStore,
    firebaseStore: FirebaseStore,
    locationStore: LocationStore,
    searchStore: SearchStore,
    profileValidationStore: ProfileValidationStore,
    codePushStore: CodepushStore,
    navStore: NavStore,
    version: types.string,
    locationPrimed: false,
    sharePresencePrimed: false,
    guestOnce: false,
  })
  .views(self => ({
    get getImageSize() {
      return getEnv(self).fileService.getImageSize
    },
  }))
  .actions(self => ({
    logout: flow(function*() {
      self.homeStore.logout()
      self.locationStore.logout()
      return yield self.firebaseStore.logout()
    }),
    afterCreate() {
      analytics.identify(self.wocky)
    },
    dismissLocationPrimer: () => {
      self.locationPrimed = true
    },
    dismissSharePresencePrimer: () => {
      self.sharePresencePrimed = true
    },
    dismissFirstTimeGuestPrimer: () => {
      self.guestOnce = true
    },
  }))

const PersistableStore = types.compose(PersistableModel, Store).named(STORE_NAME)

const theStore = PersistableStore.create(
  {
    ...cleanState,
    version: settings.version,
    wocky: {host: settings.getDomain()},
  },
  env
)

export const reportStore = rs
export const iconStore = new IconStore()
export const pushStore = new PushStore(theStore.wocky, analytics)
export const notificationStore = new NotificationStore(theStore.wocky)

// simple logging
addMiddleware(theStore, simpleActionLogger)

// verbose action logging
// addMiddleware(theStore, actionLogger);

export default theStore
