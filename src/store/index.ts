import {types, getEnv, addMiddleware, Instance} from 'mobx-state-tree'
import {autorun} from 'mobx'
import {simpleActionLogger} from 'mst-middlewares'
import {AsyncStorage} from 'react-native'
import firebase, {RNFirebase, Firebase} from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info'
import {Transport, AppInfo, IAppInfo} from 'wocky-client'
import * as logger from '../utils/log'
import analytics, {Analytics} from '../utils/analytics'
import PersistableModel from './PersistableModel'
import FirebaseStore from './FirebaseStore'
import AuthStore from './AuthStore'
import fileService from './fileService'
import LocationStore from './LocationStore'
import SearchStore from './SearchStore'
import ProfileValidationStore from './ProfileValidationStore'
import NotificationStore from './NotificationStore'
import CodepushStore from './CodePushStore'
import HomeStore from './HomeStore'
import NavStore from './NavStore'
import rs from './ReportStore'
import initializePushNotifications from '../utils/pushNotifications'
import {cleanState, STORE_NAME} from './PersistableModel'
import IconStore from './IconStore'
import geocodingStore from './geocodingService'
import OnceStore from './OnceStore'
import ContactStore from './ContactStore'
import {settings} from '../globals'
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
  appInfo,
}

const Store = types
  .model('Store', {
    homeStore: HomeStore,
    firebaseStore: FirebaseStore,
    authStore: AuthStore,
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

const PersistableStore = types
  .compose(
    PersistableModel,
    Store
  )
  .named(STORE_NAME)
  .actions(self => ({
    afterCreate() {
      analytics.identify(self.wocky)
    },
  }))

export interface IStore extends Instance<typeof PersistableStore> {}

const theStore = PersistableStore.create(
  {
    ...cleanState,
    codePushStore,
    wocky: {host: settings.host},
  },
  env
)

export const reportStore = rs
export const iconStore = new IconStore()
export const notificationStore = new NotificationStore(theStore.wocky)
export const contactStore = new ContactStore(theStore.wocky)

autorun(() => {
  appInfo.setCodepushVersion(codePushStore.updateInfo)
})

initializePushNotifications(theStore.wocky.enablePush)

// simple logging
addMiddleware(theStore, simpleActionLogger)

// verbose action logging
// addMiddleware(theStore, actionLogger);

export default theStore
