/* tslint:disable:max-classes-per-file */
import {types, applySnapshot, getRoot, Instance} from 'mobx-state-tree'
import {IProfile, Location, IWocky} from 'wocky-client'
import {autorun} from 'mobx'
import {INavStore} from './NavStore'

const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
export const INIT_DELTA = 0.04

const MapOptions = types.enumeration(['auto', 'satellite', 'street'])

const HomeStore = types
  .model('HomeStore', {
    fullScreenMode: false,
    focusedLocation: types.maybeNull(Location),
    mapCenterLocation: types.maybeNull(Location),
    selectedId: types.maybe(types.string),
    followingUser: false,
    mapOptions: types.optional(MapOptions, 'auto'),
  })
  .volatile(() => ({
    latitudeDelta: INIT_DELTA,
    friendFilter: '',
  }))
  .views(self => {
    const {navStore, wocky}: {navStore: INavStore; wocky: IWocky} = getRoot(self)
    return {
      get creationMode() {
        return (
          navStore && ['createBot', 'botCompose', 'botEdit', 'editNote'].includes(navStore.scene)
        )
      },
      get detailsMode() {
        return navStore && navStore.scene === 'botDetails' && !navStore.params.preview
      },
      get bottomViewMode() {
        if (navStore) {
          const {
            params: {preview, shiftMap},
          } = navStore
          return preview === false || shiftMap
        }
        return false
      },
      get isIconEditable() {
        return ['botCompose', 'botEdit'].includes(navStore.scene)
      },
      get headerItems(): IProfile[] {
        if (!wocky || !wocky.profile) {
          return []
        }
        return [wocky.profile, ...wocky.profile!.allFriends]
      },
      get mapType() {
        switch (self.mapOptions) {
          case 'satellite':
            return 'hybrid'
          case 'street':
            return 'standard'
          case 'auto':
          default:
            return self.latitudeDelta <= TRANS_DELTA ? 'hybrid' : 'standard'
        }
      },
    }
  })
  .actions(self => ({
    setFriendFilter(filter: string) {
      self.friendFilter = filter
    },
    setFocusedLocation(location) {
      if (!location) {
        self.focusedLocation = null
      } else {
        const {latitude, longitude, accuracy} = location
        // change center only if location is changed
        if (
          !self.focusedLocation ||
          self.focusedLocation.longitude !== longitude ||
          self.focusedLocation.latitude !== latitude
        ) {
          self.focusedLocation = Location.create({latitude, longitude, accuracy})
        }
      }
    },
    setMapCenter({latitude, longitude, accuracy}) {
      self.mapCenterLocation = Location.create({latitude, longitude, accuracy})
    },
    select(id: string) {
      self.selectedId = id
    },
  }))
  .actions(self => ({
    setLatitudeDelta(delta) {
      self.latitudeDelta = delta
    },
    logout() {
      applySnapshot(self, {})
    },
    toggleFullscreen: () => {
      self.fullScreenMode = !self.fullScreenMode
    },
    disableFullScreen: () => {
      self.fullScreenMode = false
    },
    start() {
      // empty
    },
    finish() {
      self.setFocusedLocation(null) // otherwise focused location will not be changed and reaction will not fire
    },
  }))
  .actions(self => {
    let disposer: any = null
    return {
      setMapOptions(value) {
        self.mapOptions = value
      },
      followUserOnMap(user: IProfile) {
        if (user.location) {
          if (disposer) disposer()
          self.followingUser = true
          disposer = autorun(() => self.setFocusedLocation(user.location), {
            name: 'FollowUserOnMap',
          })
        }
      },
      stopFollowingUserOnMap() {
        if (disposer) {
          disposer()
          disposer = null
        }
        self.followingUser = false
      },
    }
  })
  .postProcessSnapshot((snapshot: any) => {
    // store mapOptions
    return {mapOptions: snapshot.mapOptions}
  })
  .views(self => ({
    get filteredFriends() {
      const {wocky} = getRoot(self)
      if (!wocky || !wocky.profile) {
        return []
      }
      return wocky.profile!.allFriends.filter((value: IProfile) =>
        value.handle!.toLocaleLowerCase().startsWith(self.friendFilter.toLocaleLowerCase())
      )
    },
  }))

export default HomeStore

export interface IHomeStore extends Instance<typeof HomeStore> {}
