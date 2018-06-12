import React from 'react'
import MapView, {MapViewProps} from 'react-native-maps'
import {Alert, StyleSheet, View, InteractionManager} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable, computed, when} from 'mobx'
import {isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import * as log from '../../utils/log'
import {Spinner} from '../common'
import {colors} from '../../constants/index'
import mapStyle from '../map/mapStyle'
import {IBot, IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'

export const DELTA_FULL_MAP = 0.04
export const DELTA_BOT_PROFILE = 0.2
export const DELTA_GEOFENCE = 0.01

// interface IProps extends MapViewProps {
interface IProps {
  // children?: any
  locationStore?: ILocationStore
  wocky?: IWocky
}

// type RegionProps = {
//   latitude: number
//   longitude: number
//   latitudeDelta: number
//   longitudeDelta: number
// }

@inject('locationStore', 'wocky')
@observer
export default class Map extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  latitude: number = 0
  longitude: number = 0
  latitudeDelta: number
  longitudeDelta: number
  _map: any
  _alert: any
  loaded: boolean = false
  handler: () => void
  mounted: boolean = false

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
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

  // onRegionDidChange = async ({latitude, longitude, latitudeDelta, longitudeDelta}: RegionProps) => {
  //   log.log('& onRegionDidChange', latitude, longitude, latitudeDelta, longitudeDelta)
  //   if (!this.props.showOnlyBot) {
  //     this.latitude = latitude
  //     this.longitude = longitude
  //     this.latitudeDelta = latitudeDelta
  //     this.longitudeDelta = longitudeDelta
  //     InteractionManager.runAfterInteractions(() => {
  //       MessageBarManager.hideAlert()
  //       // rough radius calculation - one latitude is 111km
  //       this.props.wocky.geosearch({latitude, longitude, latitudeDelta, longitudeDelta})
  //     })
  //   }
  // }

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

  // onOpenAnnotation = ({nativeEvent}) => {
  //   if (this.props.showOnlyBot || this.props.marker) {
  //     return
  //   }

  //   const list = Array.from(this.props.wocky.geoBots.values())

  //   const annotation = list.find(b => nativeEvent.id === b.id)
  //   if (!annotation) {
  //     return
  //   }
  //   if (annotation.id === this.selectedBot) {
  //     this.selectedBot = ''
  //     MessageBarManager.hideAlert()
  //     return
  //   }
  //   this.selectedBot = annotation.id
  //   const bot: IBot = annotation
  //   if (!bot) {
  //     Alert.alert('Cannot find bot with id:', annotation.id)
  //   }
  // }

  // onPress = () => {
  //   if (this.props.onMapPress) {
  //     setTimeout(() => !this.markerSelected && this.props.onMapPress())
  //   }
  // }

  // onMarkerSelect = () => {
  //   this.markerSelected = true
  //   setTimeout(() => (this.markerSelected = false), 100)
  // }

  setMapRef = r => (this._map = r)

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
          provider={'google'}
          ref={this.setMapRef}
          // onPress={this.onPress}
          // onMarkerPress={this.onMarkerSelect}
          style={styles.container}
          customMapStyle={mapStyle}
          // onRegionChangeComplete={this.onRegionDidChange}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          {...this.props}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
