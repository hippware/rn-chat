import React from 'react'
import MapView, {UrlTile, MapTypes} from 'react-native-maps'
import {StyleSheet, View, MapViewRegion} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'
import {IWocky, IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore} from '../../store/HomeStore'
import {computed, observable, action, reaction} from 'mobx'
import {Actions} from 'react-native-router-flux'
import BubbleIcon from '../map/BubbleIcon'
import HackMarker from '../map/HackMarker'
import HorizontalCardList from './HorizontalCardList'
import RightPanel from './RightPanel'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
}

const you = require('../../../images/you.png')
const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

@inject('locationStore', 'wocky', 'homeStore')
@observer
export default class Home extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  @observable mapType: MapTypes = 'standard'
  @observable showSatelliteOverlay: boolean = false
  @observable opacity: number = 0

  mapRef: any
  pendingBotSelectedId?: string // HACK: need to prevent zooming to bots selected by tapping on the map

  componentDidMount() {
    const {homeStore} = this.props

    reaction(
      () => homeStore.selectedBot,
      (bot: IBot) => {
        if (bot && bot.id !== this.pendingBotSelectedId) {
          this.zoomToBot(bot)
        }
        this.pendingBotSelectedId = undefined
      }
    )
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
    const delta = INIT_DELTA
    return (
      <View style={{flex: 1}} testID="screenHome">
        <MapView
          provider={'google'}
          ref={r => (this.mapRef = r)}
          onPress={toggleFullscreen}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
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
          {this.botMarkers}
          <HackMarker
            image={you}
            zIndex={1000}
            coordinate={{latitude, longitude}}
            // onPress={this.selectYou}
            stopPropagation
          />
        </MapView>
        <ActiveGeoBotBanner />
        {/* todo: fix these to allow for fullScreenMode and to slide out of view */}
        {!this.showingBottomPopup && <RightPanel />}

        <HorizontalCardList />
      </View>
    )
  }

  @computed
  get botMarkers() {
    const {mapData, selectPin} = this.props.homeStore
    return mapData.map(data => {
      const {bot, isSelected} = data
      const {latitude, longitude} = bot.location
      return (
        <HackMarker
          coordinate={{latitude, longitude}}
          // onPress={() => scrollListToBot(b.id)}
          onPress={() => {
            this.pendingBotSelectedId = bot.id
            selectPin(data)
          }}
          key={bot.id}
          stopPropagation
        >
          <BubbleIcon large={isSelected} />
        </HackMarker>
      )
    })
  }

  @computed
  get showingBottomPopup() {
    // TODO: move this logic to rnrf
    return ['bottomMenu', 'locationDetails'].includes(Actions.currentScene)
  }

  @action
  onRegionChange = (region: MapViewRegion) => {
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
      this.props.homeStore.setHomeList(bots)
    }
  }

  setCenterCoordinate = (latitude: number, longitude: number, fit: boolean = false) => {
    if (this.mapRef) {
      this.mapRef.animateToCoordinate({latitude, longitude})
    }
  }

  zoomToCurrentLocation = () => {
    const {locationStore} = this.props
    if (locationStore.location) {
      const {latitude, longitude} = locationStore.location
      this.setCenterCoordinate(latitude, longitude)
    }
  }

  zoomToBot = (bot: IBot) => {
    if (bot.location) {
      this.setCenterCoordinate(bot.location.latitude, bot.location.longitude)
    }
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
