import {MobXProviderContext, useObserver} from 'mobx-react'
import React from 'react'
import {IWocky} from 'wocky-client'
import {ILocationStore} from 'src/store/LocationStore'
import {IHomeStore} from 'src/store/HomeStore'
import {Analytics} from './analytics'

// https://mobx-react.js.org/recipes-migration

export function useWocky(): IWocky {
  const {wocky}: {wocky: IWocky} = React.useContext(MobXProviderContext)
  return useObserver(() => wocky)
}

export function useLocationStore(): ILocationStore {
  const {locationStore}: {locationStore: ILocationStore} = React.useContext(MobXProviderContext)
  return useObserver(() => locationStore)
}

export function useHomeStore(): IHomeStore {
  const {homeStore}: {homeStore: IHomeStore} = React.useContext(MobXProviderContext)
  return useObserver(() => homeStore)
}

export function useAnalytics(): Analytics {
  const {analytics}: {analytics: Analytics} = React.useContext(MobXProviderContext)
  return analytics
}
