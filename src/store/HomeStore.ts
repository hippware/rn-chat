import {types, getParent} from 'mobx-state-tree'
import {ILocationStore} from './LocationStore'
import {IWocky, IBot} from 'wocky-client'
import {when} from 'mobx'
import tutorialData from './tutorialData'

const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

// const Region = types
//   .model('Region', {
//     latitude: types.number,
//     longitude: types.number,
//     latitudeDelta: types.number,
//     longitudeDelta: types.number,
//   })

// type RegionType = typeof Region.Type

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
    // region: types.maybe(Region),
    region: types.optional(types.frozen, null),
  })
  .volatile(self => ({
    scrollIndex: 0,
    listMode: 'home', // TODO: enumeration
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

    function scrollListToBot(botId: string) {
      if (listRef) {
        const index = self.listData.findIndex((b: any) => b.id === botId)
        if (index >= 0) listRef.snapToItem(index)
      }
    }

    return {
      scrollListToYou,
      scrollListToFirstLocationCard,
      scrollListToBot,
      setScrollIndex(index) {
        self.set({scrollIndex: index})
        if (index === 0) zoomToCurrentLocation()
        else {
          if (typeof self.listData[index] === 'object') {
            zoomToBot(self.listData[index] as IBot)
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
          self.set({listMode: 'home'})
          setTimeout(scrollListToYou, 200)
        } else {
          self.set({listMode: 'discover'})
          setTimeout(scrollListToFirstLocationCard, 200)
        }
      },
      afterAttach() {
        // TODO: move this to wocky
        const wocky: IWocky = getParent(self).wocky
        when(() => !!wocky.profile, () => wocky.profile.subscribedBots.load())
      },
    }
  })

export default HomeStore

type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
