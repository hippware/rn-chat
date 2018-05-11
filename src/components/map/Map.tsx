import React from 'react'
import MapView, {MapViewProps, Marker} from 'react-native-maps'
import ClusteredMapView from 'react-native-maps-super-cluster'
import {Alert, StyleSheet, Image, View, InteractionManager, Text} from 'react-native'
import {k} from '../Global'
import {observer, inject} from 'mobx-react/native'
import {observable, computed, when} from 'mobx'
import {isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import {MessageBar, MessageBarManager} from 'react-native-message-bar'
import * as log from '../../utils/log'
import {RText, Spinner} from '../common'
import BotMarker from './BotMarker'
import CurrentLocationIndicator from './CurrentLocationIndicator'
import CurrentLocationMarker from './CurrentLocationMarker'
import {colors} from '../../constants/index'
import Geofence from './Geofence'
import mapStyle from './mapStyle'
import {IBot, IWocky, ILocationSnapshot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'

export const DELTA_FULL_MAP = 0.04
export const DELTA_BOT_PROFILE = 0.2
export const DELTA_GEOFENCE = 0.01

interface IProps extends MapViewProps {
  selectedBot?: string
  bot?: IBot
  followUser?: boolean
  showUser?: boolean
  showOnlyBot?: boolean
  fullMap: boolean
  geofence?: boolean
  location?: any
  children?: any
  marker?: any
  onMapPress?: () => void
  scale?: number
  autoZoom?: boolean
  locationStore?: ILocationStore
  wocky?: IWocky
  style: any
}

type RegionProps = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

@inject('locationStore', 'wocky')
@observer
export default class Map extends React.Component<IProps> {
  static defaultProps = {
    autoZoom: true,
  }

  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
  _map: any
  _alert: any
  loaded: boolean = false
  handler: () => void
  @observable selectedBot: string
  @observable followUser: boolean
  @observable markerSelected: boolean = false
  mounted: boolean = false

  @computed
  get botMarkerList(): any[] {
    const {wocky, bot} = this.props
    const list = (wocky.geoBots && wocky.geoBots.values().filter(b => isAlive(b))) || []

    if (bot && list.indexOf(bot) === -1) {
      list.push(bot)
    }
    const bots = list.filter(
      b =>
        (!this.props.showOnlyBot || (this.props.bot && this.props.bot.id === b.id)) &&
        b &&
        b.location &&
        b.location.latitude
    )
    // const res = bots.map((b, index) => (
    //   <BotMarker
    //     style={{zIndex: index + (this.selectedBot === b.id ? 1000 : 0)}}
    //     key={this.selectedBot === b.id ? 'selected' : b.id || 'newBot'}
    //     scale={0}
    //     bot={b}
    //     onImagePress={this.onOpenAnnotation}
    //   />
    // ))

    // bots
    //   .filter(b => b.geofence)
    //   .map(b => <Geofence coords={{...b.location}} key={`${b.id}circle`} />)
    //   .forEach(rec => res.push(rec))
    // return res
    return bots
  }

  constructor(props: IProps) {
    super(props)
    this.latitude = 0
    this.longitude = 0
    this.selectedBot = props.selectedBot || ''
    this.followUser = props.followUser
  }

  componentDidMount() {
    this.mounted = true
    if (!this.props.showOnlyBot) {
      if (this._alert) MessageBarManager.registerMessageBar(this._alert)
      else log.warn("Can't register message-bar ref!")
    }
  }

  componentWillUnmount() {
    this.mounted = false
    if (!this.props.showOnlyBot) {
      MessageBarManager.unregisterMessageBar()
    }
    if (this.handler) {
      this.handler()
    }
  }

  componentWillReceiveProps(newProps: IProps) {
    if (newProps.fullMap === false && this.selectedBot) {
      this.selectedBot = ''
      MessageBarManager.hideAlert()
    }
    if (
      newProps.geofence !== this.props.geofence ||
      (this.props.location &&
        newProps.location &&
        this.latitude !== newProps.location.latitude &&
        this.longitude !== newProps.location.longitude)
    ) {
      this.goToCoords(newProps)
    } else if (
      newProps.scale &&
      newProps.scale !== this.props.scale &&
      this.props.bot &&
      this.props.bot.location
    ) {
      // center bot for scale > 0
      setTimeout(() => this._map && this._map.animateToCoordinate({...this.props.bot.location}))
    }
  }

  goToCoords = ({scale, geofence, location, autoZoom}: any) => {
    const config: any = {
      latitude: location.latitude,
      longitude: location.longitude,
    }
    if (autoZoom) {
      const delta = geofence ? DELTA_GEOFENCE : scale === 0 ? DELTA_FULL_MAP : DELTA_BOT_PROFILE
      config.latitudeDelta = delta
      config.longitudeDelta = delta
    }
    if (this._map && this.mounted) {
      this._map.animateToRegion(config)
    } else {
      // HACK for slow loading map on deeplink. https://github.com/hippware/rn-chat/issues/1986
      setTimeout(() => this.mounted && this._map && this._map.animateToRegion(config), 1000)
    }
  }

  setCenterCoordinate = (latitude: number, longitude: number, fit: boolean = false) => {
    if (!this._map) {
      return
    }
    if (
      ((this.props.bot && this.props.bot.location) || (this.props.location && this.props.marker)) &&
      fit
    ) {
      this._map.fitToCoordinates(
        [this.props.location || this.props.bot.location, {latitude, longitude}],
        {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
          animated: true,
        }
      )
    } else {
      if (this._map) this._map.animateToCoordinate({latitude, longitude})
    }
  }

  onRegionDidChange = async ({latitude, longitude, latitudeDelta, longitudeDelta}: RegionProps) => {
    log.log('& onRegionDidChange', latitude, longitude, latitudeDelta, longitudeDelta)
    if (!this.props.showOnlyBot) {
      this.latitude = latitude
      this.longitude = longitude
      this.latitudeDelta = latitudeDelta
      this.longitudeDelta = longitudeDelta
      InteractionManager.runAfterInteractions(() => {
        this.selectedBot = ''
        MessageBarManager.hideAlert()
        // rough radius calculation - one latitude is 111km
        this.props.wocky.geosearch({latitude, longitude, latitudeDelta, longitudeDelta})
      })
    }
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

  onCurrentLocation = () => {
    this.goToUser()
    this.followUser = true
  }

  onOpenAnnotation = ({nativeEvent}) => {
    if (this.props.showOnlyBot || this.props.marker) {
      return
    }

    const list = this.props.wocky.geoBots.values()

    const annotation = list.find(b => nativeEvent.id === b.id)
    if (!annotation) {
      return
    }
    if (annotation.id === this.selectedBot) {
      this.selectedBot = ''
      MessageBarManager.hideAlert()
      return
    }
    this.selectedBot = annotation.id
    const bot: IBot = annotation
    if (!bot) {
      Alert.alert('Cannot find bot with id:', annotation.id)
    }
    MessageBarManager.showAlert({
      title: bot.title,
      titleNumberOfLines: 1,
      messageNumberOfLines: 1,
      shouldHideOnTap: false,
      message: bot.address,
      avatar: bot.image ? bot.image.source : require('../../../images/avatarNoPic.png'),
      position: 'bottom',
      titleStyle: {color: colors.DARK_PURPLE, fontSize: 18, fontFamily: 'Roboto-Medium'},
      messageStyle: {color: colors.DARK_PURPLE, fontSize: 16, fontFamily: 'Roboto-Regular'},
      avatarStyle: {height: 40, width: 40, borderRadius: 20},
      stylesheetSuccess: {backgroundColor: 'white', strokeColor: 'transparent'},
      onTapped: () => {
        MessageBarManager.hideAlert()
        this.selectedBot = ''
        Actions.botDetails({item: bot.id})
      },
      shouldHideAfterDelay: false,
      alertType: 'success',
      // See Properties section for full customization
      // Or check `index.ios.js` or `index.android.js` for a complete example
    })
  }

  onPress = () => {
    if (this.props.onMapPress) {
      setTimeout(() => !this.markerSelected && this.props.onMapPress())
    }
  }

  onMarkerSelect = () => {
    this.markerSelected = true
    setTimeout(() => (this.markerSelected = false), 100)
  }

  setMapRef = map => {
    this._map = map && map.getMapRef
    // console.log('& this._map', this._map)
  }

  setAlert = r => {
    // NOTE: this ref alternates between null and value...weird
    this._alert = r
  }

  renderMarker = (b: IBot, index: number) => (
    <BotMarker
      style={{zIndex: index + (this.selectedBot === b.id ? 1000 : 0)}}
      key={this.selectedBot === b.id ? 'selected' : b.id || 'newBot'}
      scale={0}
      bot={b}
      onImagePress={this.onOpenAnnotation}
    />
  )

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId

    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    // const clusteringEngine = this.map.getClusteringEngine(),
    //   clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            borderColor: colors.PINK,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RText size={20} color={colors.PINK}>
            {pointCount}
          </RText>
        </View>
        {/*
            Eventually use <Callout /> to
            show clustered point thumbs, i.e.:
            <Callout>
              <ScrollView>
                {
                  clusteredPoints.map(p => (
                    <Image source={p.image}>
                  ))
                }
              </ScrollView>
            </Callout>

            IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
           */}
      </Marker>
    )
  }

  render() {
    const {locationStore, showUser, geofence, marker, fullMap, children, location} = this.props
    const currentLoc = locationStore.location
    const coords = location || currentLoc
    if (!coords || !coords.latitude) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner />
        </View>
      )
    }
    // NOTE: seems dirty that this logic is in render
    this.longitude = coords.longitude
    this.latitude = coords.latitude
    const heading = coords && coords.heading
    const delta = this.props.geofence
      ? DELTA_GEOFENCE
      : this.props.fullMap ? DELTA_FULL_MAP : DELTA_BOT_PROFILE
    const latitude = coords && coords.latitude
    const longitude = coords && coords.longitude
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: this.props.scale === 0.5 ? -180 : 0,
          right: 0,
          left: 0,
        }}
      >
        <ClusteredMapView
          provider={'google'}
          ref={this.setMapRef}
          onPress={this.onPress}
          onMarkerPress={this.onMarkerSelect}
          style={styles.container}
          customMapStyle={mapStyle}
          onRegionChangeComplete={this.onRegionDidChange}
          initialRegion={{latitude, longitude, latitudeDelta: delta, longitudeDelta: delta}}
          data={this.botMarkerList}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          {...this.props}
        >
          {geofence &&
            coords && <Geofence coords={coords} key={`${coords.longitude}-${coords.latitude}`} />}
          {/* {marker || this.botMarkerList} */}
          {(this.followUser || showUser) && <CurrentLocationMarker />}
        </ClusteredMapView>
        {fullMap && <CurrentLocationIndicator onPress={this.onCurrentLocation} />}
        {children}
        <MessageBar ref={this.setAlert} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
