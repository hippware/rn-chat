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
import {IPermissionStore} from 'src/store/PermissionStore'
import {NotificationStore} from 'src/store/NotificationStore'

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
  permissionStore: IPermissionStore
  notificationStore: NotificationStore
}

const getStores = (): AllStores => React.useContext(MobXProviderContext)

export function useWocky() {
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
  return firebaseStore
}

export function useSearchStore() {
  const {searchStore} = getStores()
  return searchStore
}

export function useProfileValidationStore() {
  const {profileValidationStore} = getStores()
  return profileValidationStore
}

export function useNavStore() {
  const {navStore} = getStores()
  return navStore
}

export function useCodepushStore() {
  const {codePushStore} = getStores()
  return codePushStore
}

export function useGeocodingStore() {
  const {geocodingStore} = getStores()
  return geocodingStore
}

export function usePermissionStore() {
  const {permissionStore} = getStores()
  return permissionStore
}

export function useNotificationsStore() {
  const {notificationStore} = getStores()
  return notificationStore
}
