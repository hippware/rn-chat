import React from 'react'
import MapView from 'react-native-maps'
import {StyleSheet, Text, Image, View, MapViewRegion} from 'react-native'
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
import ProfileMarker from './map-markers/ProfileMarker'
import {INavStore} from '../../store/NavStore'
import {k} from '../Global'

const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005

type Props = {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
  navStore?: INavStore
}

const markerMap: {[key: string]: any} = {
  YouCard: YouMarker,
  BotCard: BotMarker,
  LocationSharerCard: ProfileMarker,
}

@inject('locationStore', 'wocky', 'homeStore', 'navStore')
@observer
export default class MapHome extends React.Component<Props> {
  static defaultProps = {
    autoZoom: true,
  }
  @observable areaTooLarge = false

  mapRef: MapView | null = null
  reactions: any[] = []
  animating: boolean = false

  setCenterCoordinate = (location: ILocation) => {
    if (this.mapRef && location) {
      this.animating = true
      this.mapRef.animateCamera({center: location})
    }
  }

  componentDidMount() {
    const {homeStore} = this.props

    this.reactions = [
      reaction(
        () => homeStore!.focusedLocation,
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
    if (!this.animating) this.props.homeStore!.stopFollowingUserOnMap()
    if (latitudeDelta) {
      this.props.homeStore!.setMapType(latitudeDelta <= TRANS_DELTA ? 'hybrid' : 'standard')
    }
  }

  onRegionChangeComplete = async (region: MapViewRegion) => {
    this.animating = false
    const {creationMode, setMapCenter, setFocusedLocation} = this.props.homeStore!
    setMapCenter(region)
    setFocusedLocation(null) // reset bot focused location, otherwise 'current location' CTA will not work

    // don't add bot during creation mode (to avoid replacing of new location)
    if (!creationMode) {
      try {
        await this.props.wocky!.loadLocalBots(region)
        this.areaTooLarge = false
      } catch (e) {
        // TODO display UI for area too large
        this.areaTooLarge = true
      }
    }
  }
  // TODO MapView typing doesn't work for latest version - (value: { coordinate: LatLng, position: Point }) => void;
  createFromLongPress = (value: any) => {
    if (!this.props.homeStore!.creationMode) {
      const newCoordinate = value.nativeEvent.coordinate
      Actions.createBot({focused: false})
      setTimeout(() => {
        this.animating = true
        this.setCenterCoordinate(newCoordinate)
      }, 1000)
    }
  }

  onMapPress = () => {
    const {homeStore, navStore} = this.props
    if (['botCompose', 'botEdit', 'createBot'].includes(navStore!.scene)) {
      return
    } else if (navStore!.scene !== 'home') {
      Actions.popTo('home')
    } else {
      homeStore!.toggleFullscreen()
    }
  }

  render() {
    const {locationStore, homeStore} = this.props
    const {list, detailsMode, creationMode, fullScreenMode, mapType} = homeStore!
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
          mapType={mapType}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          rotateEnabled={false}
          pitchEnabled={false}
          {...this.props}
        >
          {list.map((card, i) => {
            const Card = markerMap[card.name]
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
