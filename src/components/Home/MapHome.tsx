import React from 'react'
import MapView from 'react-native-maps'
import {StyleSheet, View} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {when, observable, action} from 'mobx'
import {Spinner} from '../common'
// import {colors} from '../../constants/index'
import mapStyle from '../map/mapStyle'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {width, height} from '../Global'

export const DELTA_FULL_MAP = 0.04
export const DELTA_BOT_PROFILE = 0.2
export const DELTA_GEOFENCE = 0.01

const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
}

type RegionProps = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

type MapType = 'standard' | 'satellite' | 'hybrid' | 'terrain' | 'none' | 'mutedStandard'

@inject('locationStore', 'wocky')
@observer
export default class Map extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  latitude: number = 0
  longitude: number = 0
  latitudeDelta: number = 0
  longitudeDelta: number = 0

  @observable mapType: MapType = 'standard'
  @observable underMapType: MapType = 'none'
  // @observable underMapType: MapType = 'satellite'
  @observable opacity: number = 1
  @observable region?: RegionProps

  _map: any
  mounted: boolean = false

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const {locationStore} = this.props
    const {location} = locationStore
    if (!location) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner />
        </View>
      )
    }
    const {latitude, longitude} = location
    const delta = 0.04
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <MapView
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          region={this.region}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          provider={'google'}
          style={[styles.map, {opacity: 0.4}]}
          mapType={this.underMapType}
        />
        <MapView
          provider={'google'}
          // ref={this.setMapRef}
          // onPress={this.onPress}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          style={[styles.map, {opacity: this.opacity}]}
          customMapStyle={mapStyle}
          mapType={this.mapType}
          onRegionChange={this.onRegionChange}
          // onRegionChangeComplete={this.onRegionDidChange}
          rotateEnabled={false}
          {...this.props}
        />
      </View>
    )
  }

  @action
  onRegionChange = (region: RegionProps) => {
    if (region.latitudeDelta <= DEFAULT_DELTA) {
      this.underMapType = 'none'
      this.mapType = 'hybrid'
      this.opacity = 0.85
    } else if (region.latitudeDelta <= TRANS_DELTA) {
      this.underMapType = 'satellite'
      this.region = region
      this.opacity = OPACITY_MIN
    } else {
      this.mapType = 'standard'
      this.opacity = 1
    }
  }

  onRegionDidChange = async ({latitude, longitude, latitudeDelta, longitudeDelta}: RegionProps) => {
    // log.log('& onRegionDidChange', latitude, longitude, latitudeDelta, longitudeDelta)
    this.latitude = latitude
    this.longitude = longitude
    this.latitudeDelta = latitudeDelta
    this.longitudeDelta = longitudeDelta
    // InteractionManager.runAfterInteractions(() => {
    // rough radius calculation - one latitude is 111km
    this.props.wocky.geosearch({latitude, longitude, latitudeDelta, longitudeDelta})
    // })
  }

  setCenterCoordinate = (latitude: number, longitude: number, fit: boolean = false) => {
    if (!this._map) {
      return
    }
    // if (
    //   ((this.props.bot && this.props.bot.location) || (this.props.location && this.props.marker)) &&
    //   fit
    // ) {
    //   this._map.fitToCoordinates(
    //     [this.props.location || this.props.bot.location, {latitude, longitude}],
    //     {
    //       edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
    //       animated: true,
    //     }
    //   )
    // } else {
    if (this._map) this._map.animateToCoordinate({latitude, longitude})
    // }
  }

  goToUser = async () => {
    const {locationStore} = this.props
    const {location, loading} = locationStore
    when(
      () => !loading && !!location,
      () =>
        this.setCenterCoordinate(
          locationStore.location.latitude,
          locationStore.location.longitude,
          true
        )
    )
  }

  setMapRef = r => (this._map = r)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
