import {types, getParent} from 'mobx-state-tree'
import {ILocationStore} from './LocationStore'
// import {Location, IWocky} from 'wocky-client'

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
    homeMode: true,
    scrollIndex: 0,
  }))
  .actions(self => {
    let mapRef
    return {
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
      set(state) {
        Object.assign(self, state)
      },
      setMapRef(ref) {
        mapRef = ref
      },
      setCenterCoordinate(latitude: number, longitude: number, fit: boolean = false) {
        if (mapRef) {
          mapRef.animateToCoordinate({latitude, longitude})
        }
      },
    }
  })
  .actions(self => ({
    zoomToCurrentLocation() {
      const {locationStore}: {locationStore: ILocationStore} = getParent(self)
      const {latitude, longitude} = locationStore.location
      self.setCenterCoordinate(latitude, longitude)
    },
  }))

export default HomeStore

type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
