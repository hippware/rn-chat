import React from 'react'
import MapView from 'react-native-maps'
import {StyleSheet, Text, Image, View, MapViewRegion} from 'react-native'
import {getType} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import {observable, action, reaction} from 'mobx'
import {IWocky, ILocation} from 'wocky-client'
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
import {k} from '../Global'

const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005

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
  @observable areaTooLarge = false

  @observable
  mapType: 'standard' | 'satellite' | 'hybrid' | 'terrain' | 'none' | 'mutedStandard' = 'standard'
  mapRef: MapView | null = null
  reactions: any[] = []

  setCenterCoordinate = (location: ILocation) => {
    if (this.mapRef && location) {
      this.mapRef.animateToCoordinate(location)
    }
  }

  componentDidMount() {
    const {homeStore} = this.props

    this.reactions = [
      reaction(
        () => homeStore!.focusedBotLocation,
        (location: any) => this.setCenterCoordinate(location),
        {
          name: 'MapHome: re-center map on focused card',
        }
      ),
    ]
  }

  componentWillUnmount() {
    this.reactions.forEach(disposer => disposer())
    this.reactions = []
  }

  @action
  onRegionChange = ({latitudeDelta}: MapViewRegion) => {
    // NOTE: this runs _very_ often while panning/scrolling the map
    if (latitudeDelta) {
      this.mapType = latitudeDelta <= TRANS_DELTA ? 'hybrid' : 'standard'
    }
  }

  onRegionChangeComplete = async (region: MapViewRegion) => {
    const {addBotsToList, creationMode, setMapCenter, setFocusedLocation} = this.props.homeStore!
    // don't add bot during creation mode (to avoid replacing of new location)
    setMapCenter(region)
    setFocusedLocation(null) // reset bot focused location, otherwise 'current location' CTA will not work
    if (!creationMode) {
      try {
        const bots = await this.props.wocky!.loadLocalBots(region)
        this.areaTooLarge = false
        addBotsToList(bots)
      } catch (e) {
        // TODO display UI for area too large
        this.areaTooLarge = true
      }
    }
  }
  // TODO MapView typing doesn't work for latest version - (value: { coordinate: LatLng, position: Point }) => void;
  createFromLongPress = (value: any) => {
    if (!this.props.homeStore!.creationMode) {
      this.setCenterCoordinate(value.nativeEvent.coordinate)
      Actions.createBot({focused: false})
    }
  }

  onMapPress = () => {
    const {homeStore, navStore} = this.props
    const {toggleFullscreen} = homeStore!
    const {scene} = navStore!
    if (['botCompose', 'botEdit', 'createBot'].includes(scene)) {
      return
    } else if (scene !== 'home') {
      Actions.popTo('home')
    } else {
      toggleFullscreen()
    }
  }

  render() {
    const {locationStore, homeStore} = this.props
    const {list, detailsMode, creationMode, fullScreenMode} = homeStore!
    const {location} = locationStore!
    if (!location) {
      return (
        <View style={[commonStyles.absolute, {bottom: -50 * k}, styles.container]}>
          <Spinner />
        </View>
      )
    }
    const {latitude, longitude} = location
    return (
      <View style={[commonStyles.absolute, {bottom: -50 * k}]}>
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
          style={commonStyles.absolute}
          customMapStyle={mapStyle}
          scrollEnabled={!detailsMode}
          mapType={this.mapType}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          rotateEnabled={false}
          pitchEnabled={false}
          {...this.props}
        >
          {list.map((card, i) => {
            const Card = markerMap[getType(card).name]
            return Card && <Card {...this.props} key={`card${i}`} card={card} />
          })}
        </MapView>
        {creationMode && <UberMarker />}
        {this.areaTooLarge && (
          <View style={[styles.areaTooLargeView, {bottom: fullScreenMode ? 40 : 160 * k}]}>
            <Image source={require('../../../images/areaTooLarge.png')} />
            <Text style={styles.areaTooLargeText}>Zoom In To See Locations</Text>
          </View>
        )}
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
  areaTooLargeView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 100,
  },
  areaTooLargeText: {
    fontFamily: 'Roboto-Medium',
    color: 'white',
    fontSize: 14,
    position: 'absolute',
  },
})
