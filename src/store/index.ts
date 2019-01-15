import {types, getEnv, addMiddleware, flow, Instance} from 'mobx-state-tree'
import {simpleActionLogger} from 'mst-middlewares'
import {AsyncStorage} from 'react-native'
import firebase, {RNFirebase, Firebase} from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info'
import {Wocky, Transport, AppInfo, IAppInfo} from 'wocky-client'
import nativeEnv from 'react-native-native-env'

import {settings} from '../globals'
import * as logger from '../utils/log'
import analytics, {Analytics} from '../utils/analytics'
import PersistableModel from './PersistableModel'
import FirebaseStore from './FirebaseStore'
import {BypassStore} from 'wocky-client'
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
import OnceStore from './OnceStore'
const jsVersion = require('../../package.json').version
const transport = new Transport(DeviceInfo.getUniqueID())
const {geolocation} = navigator

// NOTE: React Native Debugger is nice, but will require some work to reconcile with strophe's globals
// Also, was seeing a SocketRocket error when running with dev tools: https://github.com/facebook/react-native/issues/7914
// if (__DEV__) {
//   connectReduxDevtools(require('remotedev'), service);
// }

const auth = firebase.auth()
const codePushStore = CodepushStore.create({})
export const appInfo = AppInfo.create({
  nativeVersion: DeviceInfo.getVersion(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  deviceId: DeviceInfo.getDeviceId(),
  uniqueId: DeviceInfo.getUniqueID(),
  jsVersion,
  codepushVersion: codePushStore.updateInfo,
})
export type IEnv = {
  transport: Transport
  storage: AsyncStorage
  auth: RNFirebase.auth.Auth
  firebase: Firebase
  logger: any
  geocodingStore: any
  fileService: any
  geolocation: Geolocation
  analytics: Analytics
  nativeEnv: any
  appInfo: IAppInfo
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
  appInfo,
}

const Store = types
  .model('Store', {
    wocky: Wocky,
    homeStore: HomeStore,
    firebaseStore: FirebaseStore,
    bypassStore: BypassStore,
    locationStore: LocationStore,
    searchStore: SearchStore,
    profileValidationStore: ProfileValidationStore,
    codePushStore: CodepushStore,
    navStore: NavStore,
    onceStore: OnceStore,
  })
  .views(self => ({
    get getImageSize() {
      return getEnv(self).fileService.getImageSize
    },
  }))
  .actions(self => ({
    login: flow(function*(data) {
      try {
        yield self.wocky.login(data.providerName)
        return true
      } catch (error) {
        analytics.track('error_connection', {error})
      }
      return false
    }),
    logout: flow(function*() {
      self.homeStore.onLogout()
      self.locationStore.onLogout()
      return yield self.wocky.logout()
    }),
    afterCreate() {
      analytics.identify(self.wocky)
    },
  }))

const PersistableStore = types.compose(PersistableModel, Store).named(STORE_NAME)

export interface IStore extends Instance<typeof Store> {}

const theStore = PersistableStore.create(
  {
    ...cleanState,
    codePushStore,
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
