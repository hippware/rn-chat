import {MobXProviderContext, useObserver} from 'mobx-react'
import React from 'react'
import {IWocky} from 'wocky-client'
import {ILocationStore} from 'src/store/LocationStore'
import {IHomeStore} from 'src/store/HomeStore'
import {Analytics} from './analytics'
import {IFirebaseStore} from 'src/store/FirebaseStore'
import {ISearchStore} from 'src/store/SearchStore'
import {INavStore} from 'src/store/NavStore'
import {ICodePushStore} from 'src/store/CodePushStore'
import {NotificationStore} from 'src/store/NotificationStore'
import {IAppInfo} from 'src/store/AppInfo'
import ContactStore from '../store/ContactStore'

// https://mobx-react.js.org/recipes-migration

type AllStores = {
  wocky: IWocky
  locationStore: ILocationStore
  homeStore: IHomeStore
  analytics: Analytics
  firebaseStore: IFirebaseStore
  searchStore: ISearchStore
  profileValidationStore: any
  navStore: INavStore
  codePushStore: ICodePushStore
  geocodingStore: any
  notificationStore: NotificationStore
  appInfo: IAppInfo
  contactStore: ContactStore
}

const getStores = (): AllStores => React.useContext(MobXProviderContext as any)

export function useWocky(): IWocky {
  const {wocky} = getStores()
  return useObserver(() => wocky)
}

export function useLocationStore() {
  const {locationStore} = getStores()
  return useObserver(() => locationStore)
}

export function useHomeStore() {
  const {homeStore} = getStores()
  return useObserver(() => homeStore)
}

export function useAnalytics() {
  const {analytics} = getStores()
  return analytics
}

export function useFirebaseStore() {
  const {firebaseStore} = getStores()
  return useObserver(() => firebaseStore)
}

export function useSearchStore() {
  const {searchStore} = getStores()
  return useObserver(() => searchStore)
}

export function useProfileValidationStore() {
  const {profileValidationStore} = getStores()
  return profileValidationStore
}

export function useNavStore() {
  const {navStore} = getStores()
  return useObserver(() => navStore)
}

export function useCodepushStore() {
  const {codePushStore} = getStores()
  return useObserver(() => codePushStore)
}

export function useGeocodingStore() {
  const {geocodingStore} = getStores()
  return geocodingStore
}

export function useNotificationsStore() {
  const {notificationStore} = getStores()
  return useObserver(() => notificationStore)
}

export function useAppInfo() {
  const {appInfo} = getStores()
  return useObserver(() => appInfo)
}

export function useContactStore() {
  const {contactStore} = getStores()
  return useObserver(() => contactStore)
}
