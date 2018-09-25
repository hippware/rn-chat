import React from 'react'
import MapView, {UrlTile, MapTypes} from 'react-native-maps'
import {StyleSheet, View, MapViewRegion} from 'react-native'
import {getType} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {observable, action, reaction} from 'mobx'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore} from '../../store/HomeStore'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'
import commonStyles from '../styles'
import UberMarker from './UberMarker'
import {Actions} from 'react-native-router-flux'
import BotMarker from './map-markers/BotMarker'
import YouMarker from './map-markers/YouMarker'
import {INavStore} from '../../store/NavStore'

const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
  navStore?: INavStore
}

const markerMap: {[key: string]: any} = {
  YouCard: YouMarker,
  BotCard: BotMarker,
}

@inject('locationStore', 'wocky', 'homeStore', 'navStore')
@observer
export default class MapHome extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  @observable mapType: MapTypes = 'standard'
  @observable showSatelliteOverlay: boolean = false
  @observable opacity: number = 0

  mapRef: any
  reactions: any[] = []
  region: any

  setCenterCoordinate = (location: Location) => {
    if (this.mapRef && location) {
      this.mapRef.animateToCoordinate(location)
    }
  }

  componentDidMount() {
    const {homeStore} = this.props
    // if (!wocky.events.length) {
    //   this.loadMoreDiscoverList()
    // } else {
    //   homeStore.addBotsToList('discover', wocky.events.list.map(event => event.bot))
    // }

    // Actions.botEdit({botId: '3627448a-2e25-11e8-a510-0a580a0205ef'})
    // Actions.botDetails({botId: 'a5cb8b80-21a4-11e8-92d5-0a580a020603'})

    this.reactions = [
      reaction(
        () => homeStore.focusedBotLocation,
        (location: any) => this.setCenterCoordinate(location),
        {
          name: 'MapHome: re-center map on focused card',
        }
      ),
      // reaction(
      //   () => homeStore.discoverIndex === homeStore.discoverList.length - 1,
      //   (shouldLoadMore: boolean) => shouldLoadMore && this.loadMoreDiscoverList(),
      //   {name: 'MapHome: paging on discover list'}
      // ),
    ]
  }

  componentWillUnmount() {
    this.reactions.forEach(disposer => disposer())
    this.reactions = []
  }

  // loadMoreDiscoverList = async () => {
  //   const {wocky, homeStore} = this.props
  //   await wocky.events.load()
  //   // TODO: solve for the case where no new events have bots? (Until we have new backend query ready?)
  //   homeStore.addBotsToList('discover', wocky.events.list.map(event => event.bot))
  // }

  @action
  onRegionChange = (region: MapViewRegion) => {
    const {homeStore} = this.props
    if (homeStore.focusedBotLocation) {
      homeStore.setFocusedLocation(undefined)
    }
    this.region = region
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
    const {addBotsToList, creationMode, setMapCenter} = this.props.homeStore!
    setMapCenter(region)
    // don't add bot during creation mode (to avoid replacing of new location)
    if (!creationMode) {
      const bots = await this.props.wocky.loadLocalBots(region)
      addBotsToList('home', bots)
    }
  }

  createFromLongPress = ({nativeEvent: {coordinate}}) => {
    this.setCenterCoordinate(coordinate)
    Actions.createBot()
  }

  onMapPress = () => {
    const {homeStore: {toggleFullscreen}, navStore: {scene}} = this.props
    if (['botCompose', 'botEdit', 'createBot'].includes(scene)) {
      return
    } else if (scene !== 'home') {
      Actions.popTo('home')
    } else {
      toggleFullscreen()
    }
  }

  render() {
    const {locationStore: {location}, homeStore: {list, creationMode}} = this.props
    if (!location) {
      return (
        <View style={styles.container}>
          <Spinner />
        </View>
      )
    }
    const {latitude, longitude} = location
    return (
      <View style={commonStyles.absolute}>
        <MapView
          provider={'google'}
          ref={r => (this.mapRef = r)}
          onPress={this.onMapPress}
          onLongPress={this.createFromLongPress}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: INIT_DELTA,
            longitudeDelta: INIT_DELTA,
          }}
          style={[commonStyles.absolute, {bottom: -15}]}
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

          {list.map((card, i) => {
            const Card = markerMap[getType(card).name]
            return Card && <Card {...this.props} key={`card${i}`} card={card} />
          })}
        </MapView>
        {creationMode && <UberMarker />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
