import React from 'react'
import MapView, {Marker} from 'react-native-maps'
import {StyleSheet, View} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {when} from 'mobx'
import {Spinner} from '../common'
// import {colors} from '../../constants/index'
import mapStyle from '../map/mapStyle'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
// import {width, height} from '../Global'
import {IHomeStore} from '../../store/HomeStore'

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
}

const you = require('../../../images/you.png')

@inject('locationStore', 'wocky', 'homeStore')
@observer
export default class MapHome extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  _map?: any
  mounted: boolean = false

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const {locationStore, homeStore} = this.props
    const {location} = locationStore
    if (!location) {
      return (
        <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner />
        </View>
      )
    }
    const {latitude, longitude} = location
    const {region, mapType, underMapType, opacity, onRegionChange} = homeStore
    const delta = 0.04
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          region={region}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          provider={'google'}
          style={[styles.map, {opacity: 0.4}]}
          mapType={underMapType}
        />
        <MapView
          provider={'google'}
          ref={this.setMapRef}
          // onPress={this.onPress}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          style={[styles.map, {opacity}]}
          customMapStyle={mapStyle}
          mapType={mapType}
          onRegionChange={onRegionChange}
          rotateEnabled={false}
          {...this.props}
        >
          <Marker
            image={you}
            coordinate={{latitude, longitude}}
            onPress={this.youPress}
            tracksViewChanges={false}
          />
        </MapView>
      </View>
    )
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

  youPress = () => {
    // TODO
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
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
