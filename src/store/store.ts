import {
  types,
  getEnv,
  addMiddleware,
  Instance,
  getSnapshot,
  applySnapshot,
  flow,
} from 'mobx-state-tree'
import {simpleActionLogger} from 'mst-middlewares'
// todo: use react-native-community version instead
import {AsyncStorage, Geolocation} from 'react-native'
import firebase, {RNFirebase, Firebase} from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info'
import {Transport, Wocky} from 'wocky-client'
import analytics from '../utils/analytics'
import FirebaseStore from './FirebaseStore'
import AuthStore from './AuthStore'
import fileService from './fileService'
import LocationStore from './LocationStore'
import SearchStore from './SearchStore'
import ProfileValidationStore from './ProfileValidationStore'
import NotificationStore from './NotificationStore'
import {PermissionStore} from './PermissionStore'
import CodepushStore from './CodePushStore'
import HomeStore from './HomeStore'
import NavStore from './NavStore'
import initializePushNotifications from '../utils/pushNotifications'
import IconStore from './IconStore'
import GeocodingStore from './GeocodingStore'
import {AppInfo} from './AppInfo'
import ContactStore from './ContactStore'
import reportStore from './ReportStore'
import {log} from 'src/utils/logger'
import {autorun} from 'mobx'
import {settings} from '../globals'

const jsVersion = require('../../package.json').version
const transport = new Transport(DeviceInfo.getUniqueID())
const {geolocation} = navigator
const auth = firebase.auth()

const appInfo = {
  nativeVersion: DeviceInfo.getVersion(),
  jsVersion,
}

const STORE_NAME = 'MainStore'

export type IEnv = {
  transport: Transport
  auth: RNFirebase.auth.Auth
  firebase: Firebase
  fileService: any
  geolocation: Geolocation
}

const env: IEnv = {
  transport,
  auth,
  firebase,
  fileService,
  geolocation,
}

const cleanState = {
  firebaseStore: {},
  authStore: {},
  locationStore: {},
  searchStore: {},
  profileValidationStore: {},
  homeStore: {},
  navStore: {},
  codePushStore: {},
  geocodingStore: {},
  permissionStore: {},
  wocky: {host: settings.host},
}

const Store = types
  .model(STORE_NAME, {
    wocky: Wocky,
    homeStore: HomeStore,
    firebaseStore: FirebaseStore,
    authStore: AuthStore,
    locationStore: LocationStore,
    searchStore: SearchStore,
    profileValidationStore: ProfileValidationStore,
    codePushStore: CodepushStore,
    navStore: NavStore,
    geocodingStore: GeocodingStore,
    permissionStore: PermissionStore,
    appInfo: AppInfo,
  })
  .views(self => ({
    get getImageSize() {
      return getEnv(self).fileService.getImageSize
    },
  }))
  .actions(self => ({
    afterCreate() {
      analytics.identify(self.wocky)
    },
    resetCache: flow(function*() {
      const data = yield AsyncStorage.getItem(STORE_NAME)
      const parsed = data && JSON.parse(data)
      const newState = {
        ...cleanState,
        ...getMinimalStoreData(parsed),
        appInfo,
      }
      self.wocky.beforeDestroy()
      applySnapshot(self, newState)
      self.wocky.afterCreate()
      yield AsyncStorage.setItem(STORE_NAME, JSON.stringify(newState))
    }),
  }))

export interface IStore extends Instance<typeof Store> {}

/**
 * Return only the mstStore data needed to prevent logout
 * @param data - serialized mstStore object
 */
function getMinimalStoreData(data?: {authStore: object}): object {
  log('loadMinimal', data)
  return {
    authStore: data && data.authStore ? data.authStore : {},
  }
}

// migrate 3.9.3 users to 4.x.x
// ToDo: Remove this migration once 3.9.3 is no longer supported and/or most/all users have updated to 4.x.x
function tryMigrate(parsed): object {
  // get phone from old FirebaseStore and put it in new AuthStore
  if (parsed && parsed.firebaseStore && parsed.firebaseStore.phone) {
    // if this is a 3.9.3 user then we want to start with just enough information to login and an otherwise clean cache
    return {authStore: {phone: parsed.firebaseStore.phone, stategyName: 'firebase'}}
  }
  return parsed
}

/**
 * Pull store data from the cache (if any) and return a store hydrated with that data
 */
export async function createStore() {
  let storeData
  try {
    const data = await AsyncStorage.getItem(STORE_NAME)
    storeData = data && JSON.parse(data)
    storeData = tryMigrate(storeData)

    // throw new Error('Hydrate minimally')

    const pendingCodepush =
      storeData && storeData.codePushStore && storeData.codePushStore.pendingUpdate

    // parsed.version (pre-appInfo) or parsed.appInfo.version (post-appInfo)
    const oldBinaryVersion: string | undefined =
      (storeData && storeData.version) ||
      (storeData && storeData.appInfo && storeData.appInfo.nativeVersion)
    const isNewBinaryVersion = oldBinaryVersion && oldBinaryVersion !== DeviceInfo.getVersion()

    // on a codepush update or new binary version, reset the cache
    if (pendingCodepush || isNewBinaryVersion) {
      // todo: can we move this out of persistence and into codepushStore?
      storeData = {...getMinimalStoreData(storeData), codePushStore: {pendingUpdate: false}}
    }
  } catch (err) {
    log('hydration error', err, storeData)
    storeData = getMinimalStoreData(storeData)
  }
  const mstStore = Store.create(
    {
      ...cleanState,
      ...storeData,
      appInfo,
    },
    env
  )

  const requestPushPermissions = initializePushNotifications(mstStore.wocky.enablePush)
  addMiddleware(mstStore, simpleActionLogger)
  autorun(
    () => {
      const state = getSnapshot(mstStore!)
      AsyncStorage.setItem(STORE_NAME, JSON.stringify(state))
    },
    {delay: 1000}
  )
  autorun(
    async () => {
      const {wocky, permissionStore} = mstStore
      if (wocky.connected && !!wocky.profile && permissionStore.allowsNotification)
        requestPushPermissions()
    },
    {delay: 1000}
  )

  return {
    mstStore,
    reportStore,
    iconStore: new IconStore(),
    notificationStore: new NotificationStore(mstStore.wocky),
    contactStore: new ContactStore(mstStore.wocky),
  }
}
