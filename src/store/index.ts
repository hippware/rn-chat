import {types, getEnv, addMiddleware, Instance, getSnapshot, applySnapshot} from 'mobx-state-tree'
import {simpleActionLogger} from 'mst-middlewares'
// todo: use react-native-community version instead
import {AsyncStorage} from 'react-native'
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
import CodepushStore from './CodePushStore'
import HomeStore from './HomeStore'
import NavStore from './NavStore'
import initializePushNotifications from '../utils/pushNotifications'
import IconStore from './IconStore'
import GeocodingStore from './geocodingService'
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
  }))

export interface IStore extends Instance<typeof Store> {}

/**
 * Return only the mstStore data needed to prevent logout
 * @param data - serialized mstStore object
 */
function getMinimalStoreData(data?: {authStore: object}): object {
  log('loadMinimal', data)
  return {authStore: data && data.authStore}
}

let mstStore: IStore | undefined

export async function resetCache() {
  if (!mstStore) return
  const data = await AsyncStorage.getItem(STORE_NAME)
  const parsed = data && JSON.parse(data)
  const {wocky} = mstStore
  // shut down wocky
  wocky.clearCache()
  wocky.disposeReactions()

  const newState = {
    ...cleanState,
    ...getMinimalStoreData(parsed),
    wocky: {host: settings.host},
    appInfo,
  }
  // wipe out old state and apply clean
  applySnapshot(mstStore, newState)
  wocky.startReactions()
  await AsyncStorage.setItem(STORE_NAME, JSON.stringify(newState))
}

/**
 * Pull store data from the cache (if any) and return a store hydrated with that data
 */
export async function createStore() {
  if (!!mstStore) return
  let storeData
  try {
    const data = await AsyncStorage.getItem(STORE_NAME)
    storeData = data && JSON.parse(data)

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
  mstStore = Store.create(
    {
      ...cleanState,
      ...storeData,
      appInfo,
    },
    env
  )

  initializePushNotifications(mstStore.wocky.enablePush)
  addMiddleware(mstStore, simpleActionLogger)
  autorun(
    () => {
      const state = getSnapshot(mstStore!)
      AsyncStorage.setItem(STORE_NAME, JSON.stringify(state))
    },
    {delay: 1000}
  )

  return {
    ...mstStore,
    reportStore,
    iconStore: new IconStore(),
    notificationStore: new NotificationStore(mstStore.wocky),
    contactStore: new ContactStore(mstStore.wocky),
  }
}
