import {MobXProviderContext, useObserver} from 'mobx-react'
import React from 'react'
import {IWocky} from 'wocky-client'
import {ILocationStore} from 'src/store/LocationStore'

// https://mobx-react.js.org/recipes-migration
function getStores() {
  return React.useContext(MobXProviderContext)
}

export function useWocky(): IWocky {
  const {wocky}: {wocky: IWocky} = getStores()
  return useObserver(() => wocky)
}

export function useLocationStore(): ILocationStore {
  const {locationStore}: {locationStore: ILocationStore} = getStores()
  return useObserver(() => locationStore)
}
