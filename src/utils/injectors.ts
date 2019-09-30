import {MobXProviderContext, useObserver} from 'mobx-react'
import React from 'react'
import {IWocky} from 'wocky-client'
import {ILocationStore} from 'src/store/LocationStore'
import {IHomeStore} from 'src/store/HomeStore'
import {Analytics} from './analytics'
import {IFirebaseStore} from 'src/store/FirebaseStore'

// https://mobx-react.js.org/recipes-migration

type AllStores = {
  wocky: IWocky
  locationStore: ILocationStore
  homeStore: IHomeStore
  analytics: Analytics
  firebaseStore: IFirebaseStore
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
