import React from 'react'
import MapView from 'react-native-maps'
import {StyleSheet, View, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore} from '../../store/HomeStore'
import HackMarker from '../map/HackMarker'

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

  mounted: boolean = false
  // @observable markerTrackChanges = true

  componentDidMount() {
    this.mounted = true
    // // allow "you" pin image to load
    // when(
    //   () => !!this.props.locationStore!.location,
    //   () => {
    //     setTimeout(() => (this.markerTrackChanges = false), 100)
    //   }
    // )
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
    const {region, mapType, underMapType, opacity, onRegionChange, setMapRef} = homeStore
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
          ref={setMapRef}
          // onPress={this.onPress}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          style={[styles.map, {opacity}]}
          customMapStyle={mapStyle}
          mapType={mapType}
          onRegionChange={onRegionChange}
          rotateEnabled={false}
          {...this.props}
        >
          {/* <Marker
            image={you}
            coordinate={{latitude, longitude}}
            onPress={this.youPress}
            tracksViewChanges={this.markerTrackChanges}
          /> */}
          <HackMarker coordinate={{latitude, longitude}}>
            <Image source={you} />
          </HackMarker>
        </MapView>
      </View>
    )
  }

  youPress = () => {
    // TODO
  }
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
