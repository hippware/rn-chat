import React from 'react'
import MapView, {UrlTile, MapTypes} from 'react-native-maps'
import {StyleSheet, View, MapViewRegion} from 'react-native'
import {getType} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import HackMarker from '../map/HackMarker'
import BubbleIcon from '../map/BubbleIcon'
import {observable, action, reaction} from 'mobx'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore} from '../../store/HomeStore'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'

const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

const YouMarker = observer(({locationStore, homeStore, card}) => {
  const {location} = locationStore
  const {latitude, longitude} = location
  return (
    <HackMarker
      image={require('../../../images/you.png')}
      zIndex={1000}
      coordinate={{latitude, longitude}}
      onPress={() => {
        card.select()
        homeStore.setCenter(location)
      }}
      stopPropagation
    />
  )
})

const BotMarker = observer(({card}) => {
  const {bot, isSelected} = card
  const {latitude, longitude} = bot.location
  return (
    <HackMarker
      coordinate={{latitude, longitude}}
      zIndex={isSelected ? 500 : 1}
      onPress={card.select}
      key={card.bot.id}
      stopPropagation
    >
      <BubbleIcon large={isSelected} />
    </HackMarker>
  )
})

const markerMap: {[key: string]: any} = {
  YouCard: YouMarker,
  BotCard: BotMarker,
}

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
}

@inject('locationStore', 'wocky', 'homeStore')
@observer
export default class MapHome extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  @observable mapType: MapTypes = 'standard'
  @observable showSatelliteOverlay: boolean = false
  @observable opacity: number = 0

  mapRef: any

  setCenterCoordinate = (location: Location) => {
    if (this.mapRef && location) {
      this.mapRef.animateToCoordinate(location)
    }
  }

  componentDidMount() {
    const {homeStore, wocky} = this.props
    // TODO more advanced logic to implement paging?
    homeStore.setDiscoverList(wocky.events.list.map(event => event.bot))
    reaction(() => homeStore.center, (location: any) => this.setCenterCoordinate(location))
  }

  @action
  onRegionChange = (region: MapViewRegion) => {
    const {homeStore} = this.props
    homeStore.setCenter(undefined)
    if (region.latitudeDelta <= TRANS_DELTA) {
      this.showSatelliteOverlay = true
      this.opacity = OPACITY_MIN
    } else {
      this.showSatelliteOverlay = false
      this.mapType = 'standard'
      this.opacity = 1
    }
  }

  onRegionChangeComplete = async (region: MapViewRegion) => {
    if (this.props.homeStore.listMode === 'home') {
      const bots = await this.props.wocky.loadLocalBots(region)
      this.props.homeStore.addBotsToHomeList(bots)
    }
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
    const {toggleFullscreen} = homeStore
    return (
      <MapView
        provider={'google'}
        ref={r => (this.mapRef = r)}
        onPress={toggleFullscreen}
        initialRegion={{latitude, longitude, latitudeDelta: INIT_DELTA, longitudeDelta: INIT_DELTA}}
        style={styles.map}
        customMapStyle={mapStyle}
        mapType={this.mapType}
        onRegionChange={this.onRegionChange}
        onRegionChangeComplete={this.onRegionChangeComplete}
        rotateEnabled={false}
        {...this.props}
      >
        {/* TODO: this opacity mask will always be transparent without a `backgroundColor` style */}
        <View style={{flex: 1, opacity: this.opacity}} pointerEvents="none" />

        {this.showSatelliteOverlay && (
          <UrlTile urlTemplate={'http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'} />
        )}
        {homeStore.list.map((card, i) => {
          const Card = markerMap[getType(card).name]
          return Card && <Card {...this.props} key={`card${i}`} card={card} />
        })}
      </MapView>
    )
  }
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
