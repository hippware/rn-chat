import React from 'react'
import MapView, {UrlTile} from 'react-native-maps'
import {StyleSheet, View, Animated} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'
import {IWocky, IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore, INIT_DELTA, BOTTOM_MENU_HEIGHT} from '../../store/HomeStore'
import {observable, when, computed, autorun} from 'mobx'
import BubbleIcon from '../map/BubbleIcon'
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
  mounted: boolean = false
  @observable markerTrackChanges = true

  state = {
    bottom: new Animated.Value(0),
  }

  componentDidMount() {
    this.mounted = true
    autorun(() => {
      Animated.spring(this.state.bottom, {
        toValue: this.props.homeStore.showBottomMenu ? -BOTTOM_MENU_HEIGHT : 0,
        // overshootClamping: true,
      }).start()
    })
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
    const {mapType, opacity, onRegionChange, setMapRef} = homeStore
    const delta = INIT_DELTA
    return (
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.bottom}]}]}>
        <MapView
          provider={'google'}
          ref={setMapRef}
          onPress={homeStore.toggleFullscreen}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          style={styles.map}
          customMapStyle={mapStyle}
          mapType={mapType}
          onRegionChange={onRegionChange}
          rotateEnabled={false}
          onMapReady={this.onMapReady}
          {...this.props}
        >
          <View style={{flex: 1, opacity}} pointerEvents="none" />
          {homeStore.underMapType === 'satellite' && (
            <UrlTile urlTemplate={'http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'} />
          )}
          {this.botMarkerList}
          <HackMarker
            image={you}
            zIndex={1000}
            coordinate={{latitude, longitude}}
            onPress={homeStore.selectYou}
            tracksViewChanges={this.markerTrackChanges}
            stopPropagation
          />
        </MapView>
      </Animated.View>
    )
  }

  @computed
  get botMarkerList() {
    const {mapData, selectBot, selectedBotId} = this.props.homeStore
    return mapData.map((bot: IBot) => {
      const {latitude, longitude} = bot.location
      return (
        <HackMarker
          coordinate={{latitude, longitude}}
          // onPress={() => scrollListToBot(b.id)}
          onPress={() => selectBot(bot)}
          key={bot.id}
          stopPropagation
        >
          <BubbleIcon large={selectedBotId === bot.id} />
        </HackMarker>
      )
    })
  }

  onMapReady = () => {
    // allow "you" pin image to load
    when(
      () => !!this.props.locationStore!.location,
      () => {
        setTimeout(() => (this.markerTrackChanges = false), 400)
      }
    )
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
