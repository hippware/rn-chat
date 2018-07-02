import React from 'react'
import MapView, {UrlTile, MapTypes} from 'react-native-maps'
import {StyleSheet, View, MapViewRegion} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'
import {IWocky, IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {computed, observable, action, when} from 'mobx'
import {Actions} from 'react-native-router-flux'
import BubbleIcon from '../map/BubbleIcon'
import HackMarker from '../map/HackMarker'
import HorizontalCardList from './HorizontalCardList'
import RightPanel from './RightPanel'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'
import tutorialData from '../../store/tutorialData'

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
}

const you = require('../../../images/you.png')
const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

@inject('locationStore', 'wocky')
@observer
export default class Home extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  @observable mapType: MapTypes = 'standard'
  @observable showSatelliteOverlay: boolean = false
  @observable opacity: number = 0
  @observable region?: MapViewRegion = undefined
  @observable fullScreenMode: boolean = false
  @observable listMode: 'discover' | 'home' = 'home'
  @observable scrollIndex: number = 0

  mapRef: any
  listRef: any
  pendingBotSelection?: IBot
  ignoreZoom: boolean = false

  componentDidMount() {
    const {wocky} = this.props
    when(() => !!wocky.profile, () => wocky.profile.subscribedBots.load())
  }

  render() {
    const {locationStore} = this.props
    const {location} = locationStore
    if (!location) {
      return (
        <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner />
        </View>
      )
    }
    const {latitude, longitude} = location
    const {mapType, opacity, toggleFullscreen, selectYou, onRegionChange} = this
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
          mapType={mapType}
          onRegionChange={onRegionChange}
          rotateEnabled={false}
          {...this.props}
        >
          {/* TODO: this opacity mask will always be transparent without a `backgroundColor` style */}
          <View style={{flex: 1, opacity}} pointerEvents="none" />

          {this.showSatelliteOverlay && (
            <UrlTile urlTemplate={'http://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'} />
          )}
          {this.botMarkers}
          <HackMarker
            image={you}
            zIndex={1000}
            coordinate={{latitude, longitude}}
            onPress={selectYou}
            stopPropagation
          />
        </MapView>
        <ActiveGeoBotBanner fullScreenMode={this.fullScreenMode} />
        {/* todo: fix these to allow for fullScreenMode and to slide out of view */}
        {!this.showingBottomPopup && (
          <RightPanel toggleListMode={this.toggleListMode} listMode={this.listMode} />
        )}
        {!this.showingBottomPopup && (
          <HorizontalCardList
            listData={this.listData}
            fullScreenMode={this.fullScreenMode}
            syncList={this.syncList}
            setScrollIndex={this.setScrollIndex}
            setListRef={r => (this.listRef = r)}
            listMode={this.listMode}
            scrollIndex={this.scrollIndex}
          />
        )}
      </View>
    )
  }

  @computed
  get botMarkers() {
    const {mapData, selectBot, selectedBotId} = this
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

  @computed
  get mapData(): IBot[] {
    // TODO: move to wocky
    const {wocky} = this.props
    if (this.listMode === 'home') {
      return wocky.profile && wocky.profile.subscribedBots.length > 0
        ? wocky.profile.subscribedBots.list
        : []
    } else {
      return wocky.events.length > 0 ? wocky.events.list.map(e => e.bot) : []
    }
  }

  // TODO: strategy pattern
  @computed
  get selectedBotId(): string | null {
    if (!this.listData.length) return null
    const selectedItem = this.listData[this.scrollIndex]
    if (typeof selectedItem === 'object') return (selectedItem as IBot).id
  }

  @computed
  get showingBottomPopup() {
    return ['bottomMenu', 'locationDetails'].includes(Actions.currentScene)
  }

  @computed
  get listData() {
    if (this.fullScreenMode === true) return []
    return this.mapData.length ? ['you', ...tutorialData, ...this.mapData] : []
  }

  @computed
  get listStartIndex() {
    return 1 + tutorialData.length
  }

  @action
  onRegionChange = (region: MapViewRegion) => {
    if (region.latitudeDelta <= DEFAULT_DELTA) {
      this.showSatelliteOverlay = false
      this.mapType = 'hybrid'
      this.opacity = 0.85
    } else if (region.latitudeDelta <= TRANS_DELTA) {
      this.showSatelliteOverlay = true
      this.opacity = OPACITY_MIN
    } else {
      this.showSatelliteOverlay = false
      this.mapType = 'standard'
      this.opacity = 1
    }
    this.region = region
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

  recenterMapForMenu = () => {
    const {locationStore} = this.props
    const {latitude, longitude} = locationStore.location
    if (this.mapRef) {
      let delta = INIT_DELTA
      if (this.region) {
        delta = this.region.longitudeDelta
      }
      this.mapRef.animateToRegion({
        latitude: latitude - delta / 3,
        longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      })
    }
  }

  zoomToBot = (bot: IBot) => {
    if (bot.location) {
      this.setCenterCoordinate(bot.location.latitude, bot.location.longitude)
    }
  }

  scrollListToYou = () => {
    if (this.listRef) {
      this.listRef.snapToItem(0)
    }
  }

  scrollListToFirstLocationCard = () => {
    if (this.listRef) {
      this.listRef.snapToItem(this.listStartIndex)
    }
  }

  @action
  selectBot = (bot: IBot) => {
    if (this.fullScreenMode) {
      this.fullScreenMode = false
      // HACK: need to store bot selection until after horizontal list re-mounts.
      this.pendingBotSelection = bot
    }

    if (this.listRef) {
      const index = this.listData.findIndex((b: any) => b.id === bot.id)
      // ignoreZoom = this.fullScreenMode === false
      this.ignoreZoom = true
      if (index >= 0) this.listRef.snapToItem(index)
    }
  }

  scrollListToIndex = (index: number) => {
    if (this.listRef) {
      this.listRef.snapToItem(index)
    }
  }

  @action
  toggleListMode = () => {
    if (this.listMode === 'discover') {
      this.zoomToCurrentLocation()
      this.listMode = 'home'
      this.fullScreenMode = false
      setTimeout(this.scrollListToYou, 200)
    } else {
      this.listMode = 'discover'
      this.fullScreenMode = false
      setTimeout(this.scrollListToFirstLocationCard, 200)
    }
  }

  @action
  toggleFullscreen = () => {
    this.fullScreenMode = !this.fullScreenMode
  }

  @action
  setFullscreen = value => {
    this.fullScreenMode = value
  }

  @action
  selectYou() {
    this.fullScreenMode = false
    this.scrollListToYou()
  }

  syncList = () => {
    if (!this.fullScreenMode) {
      if (this.pendingBotSelection) {
        this.selectBot(this.pendingBotSelection)
        this.pendingBotSelection = null
      } else {
        this.scrollListToIndex(this.scrollIndex)
      }
    }
  }

  @action
  setScrollIndex = index => {
    this.scrollIndex = index
    if (this.ignoreZoom) {
      this.ignoreZoom = false
      return
    }
    if (index === 0) {
      this.zoomToCurrentLocation()
    } else {
      if (typeof this.listData[index] === 'object') {
        const bot: IBot = this.listData[index] as IBot
        this.zoomToBot(bot)
      }
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
