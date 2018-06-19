import {types, getParent} from 'mobx-state-tree'
import {ILocationStore} from './LocationStore'
import {IWocky, IBot} from 'wocky-client'
import {when} from 'mobx'
import tutorialData from './tutorialData'

const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

const mapTypeEnum = types.enumeration([
  'standard',
  'satellite',
  'hybrid',
  'terrain',
  'none',
  'mutedStandard',
])

const HomeStore = types
  .model('HomeStore', {
    mapType: types.optional(mapTypeEnum, 'standard'),
    underMapType: types.optional(mapTypeEnum, 'none'),
    opacity: 1,
    region: types.optional(types.frozen, null),
    // selectedBotId: types.maybe(types.string),
  })
  .volatile(self => ({
    scrollIndex: 0,
    listMode: 'home', // TODO: enumeration
    fullScreenMode: false,
  }))
  .views(self => {
    const {wocky}: {wocky: IWocky} = getParent(self)
    return {
      get mapData(): IBot[] {
        if (self.listMode === 'home') {
          return wocky.profile && wocky.profile.subscribedBots.length > 0
            ? wocky.profile.subscribedBots.list
            : []
        } else {
          return wocky.events.length > 0 ? wocky.events.list.map(e => e.bot) : []
        }
      },
      get listStartIndex() {
        return 1 + tutorialData.length
      },
    }
  })
  .views(self => ({
    get listData() {
      if (self.fullScreenMode === true) return []
      return self.mapData.length ? ['you', ...tutorialData, ...self.mapData] : []
    },
  }))
  .views(self => ({
    get selectedBotId(): string | null {
      if (!self.listData.length) return null
      const selectedItem = self.listData[self.scrollIndex]
      if (typeof selectedItem === 'object') return (selectedItem as IBot).id
    },
  }))
  .actions(self => ({
    set(state) {
      Object.assign(self, state)
    },
  }))
  .actions(self => {
    let mapRef, listRef
    let ignoreZoom: boolean = false
    let pendingBotSelection: IBot | null = null

    function setCenterCoordinate(latitude: number, longitude: number, fit: boolean = false) {
      if (mapRef) {
        mapRef.animateToCoordinate({latitude, longitude})
      }
    }

    function zoomToCurrentLocation() {
      const {locationStore}: {locationStore: ILocationStore} = getParent(self)
      const {latitude, longitude} = locationStore.location
      setCenterCoordinate(latitude, longitude)
    }

    function zoomToBot(bot: IBot) {
      if (bot.location) {
        setCenterCoordinate(bot.location.latitude, bot.location.longitude)
      }
    }

    function scrollListToYou() {
      if (listRef) {
        listRef.snapToItem(0)
      }
    }

    function scrollListToFirstLocationCard() {
      if (listRef) {
        listRef.snapToItem(self.listStartIndex)
      }
    }

    function selectBot(bot: IBot) {
      // self.selectedBotId = bot.id
      if (self.fullScreenMode) {
        self.fullScreenMode = false
        // HACK: need to store bot selection until after horizontal list re-mounts.
        pendingBotSelection = bot
      }

      if (listRef) {
        const index = self.listData.findIndex((b: any) => b.id === bot.id)
        // ignoreZoom = self.fullScreenMode === false
        ignoreZoom = true
        if (index >= 0) listRef.snapToItem(index)
      }
    }

    function scrollListToIndex(index: number) {
      if (listRef) {
        listRef.snapToItem(index)
      }
    }

    return {
      scrollListToFirstLocationCard,
      selectBot,
      scrollListToIndex,
      setScrollIndex(index) {
        self.set({scrollIndex: index})
        if (ignoreZoom) {
          ignoreZoom = false
          return
        }
        if (index === 0) {
          zoomToCurrentLocation()
          // self.selectedBotId = null
        } else {
          if (typeof self.listData[index] === 'object') {
            const bot: IBot = self.listData[index] as IBot
            zoomToBot(bot)
            // self.selectedBotId = bot.id
          } else {
            // self.selectedBotId = null
          }
        }
      },
      onRegionChange(region) {
        if (region.latitudeDelta <= DEFAULT_DELTA) {
          self.underMapType = 'none'
          self.mapType = 'hybrid'
          self.opacity = 0.85
        } else if (region.latitudeDelta <= TRANS_DELTA) {
          self.underMapType = 'satellite'
          // TODO: figure out why MST error if using Region instead of 'frozen' here
          // Object.assign(self, {region})
          self.region = region
          self.opacity = OPACITY_MIN
        } else {
          self.mapType = 'standard'
          self.opacity = 1
        }
      },
      setMapRef(ref) {
        mapRef = ref
      },
      setListRef(ref) {
        listRef = ref
      },
      toggleListMode() {
        if (self.listMode === 'discover') {
          zoomToCurrentLocation()
          self.set({listMode: 'home', fullScreenMode: false})
          setTimeout(scrollListToYou, 200)
        } else {
          self.set({listMode: 'discover', fullScreenMode: false})
          setTimeout(scrollListToFirstLocationCard, 200)
        }
      },
      toggleFullscreen() {
        self.set({fullScreenMode: !self.fullScreenMode})
      },
      selectYou() {
        self.fullScreenMode = false
        scrollListToYou()
      },
      syncList() {
        if (!self.fullScreenMode) {
          if (pendingBotSelection) {
            selectBot(pendingBotSelection)
            pendingBotSelection = null
          } else {
            scrollListToIndex(self.scrollIndex)
          }
        }
      },
      afterAttach() {
        // TODO: move this to wocky
        // self.selectedBotId = null
        const wocky: IWocky = getParent(self).wocky
        when(() => !!wocky.profile, () => wocky.profile.subscribedBots.load())
      },
    }
  })

export default HomeStore

type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
