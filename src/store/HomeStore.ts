import {types} from 'mobx-state-tree'
import {Bot} from 'wocky-client'

const LocationCard = types
  .model('LocationCard', {
    type: types.string,
    bot: types.maybe(Bot),
  })
  .volatile(self => ({
    onPress: null,
    renderClass: null,
  }))
  .actions(self => ({
    // these actions should be called by Home.tsx during mount
    setOnPress(handler) {
      self.onPress = handler
    },
    setRenderClass(clazz) {
      self.renderClass = clazz
    }, // OR alternatively we can just have something like setMapper(dict) action where dict is type<->{onPress, renderClass} map
  }))

const HomeStore = types
  .model('HomeStore', {
    listMode: 'home',
    fullScreenMode: false,
    ignoreZoom: false,
    discoverList: types.optional(types.array(LocationCard), []), // maintain separate list for each mode
    homeList: types.optional(types.array(LocationCard), []),
    index: 0, // if we need to maintain separate index, add discoverIndex and homeIndex
  })
  .views(self => ({
    // return the list for current mode
    get list() {
      return self.listMode === 'home' ? self.discoverList : self.homeList
    },
  }))
  .actions(self => ({
    // list here is array of LocationCard, should be set by Home.tsx that will call appropriate wocky methods
    setDiscoverList(list) {
      self.discoverList = list
      self.index = 0
    },
    setHomeList(list) {
      self.homeList = list
      self.index = 0
    },
    toggleListMode: () => {
      if (self.listMode === 'discover') {
        self.listMode = 'home'
      } else {
        self.listMode = 'discover'
      }
      self.fullScreenMode = false
      self.index = 0 // should we reset index here?
    },
    toggleFullscreen: () => {
      self.fullScreenMode = !self.fullScreenMode
    },
    postProcessSnapshot(snapshot: any) {
      // No need to persist this store
      return {}
    },
  }))

export default HomeStore
type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
