import React from 'react'
import MapView, {UrlTile, MapTypes} from 'react-native-maps'
import {StyleSheet, View, MapViewRegion, Image} from 'react-native'
import {getType} from 'mobx-state-tree'
import {observer, inject} from 'mobx-react/native'
import HackMarker from '../map/HackMarker'
import Bubble from '../map/Bubble'
import {observable, action, reaction} from 'mobx'
import {IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore, ISelectableCard} from '../../store/HomeStore'
import {Spinner, Avatar} from '../common'
import mapStyle from '../map/mapStyle'
import {colors} from '../../constants'
import Triangle from '../map/Triangle'
import commonStyles from '../styles'
import CurrentLocationIndicator from '../map/CurrentLocationIndicator'

const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005
const OPACITY_MIN = 0.6

interface IProps {
  locationStore?: ILocationStore
  wocky?: IWocky
  homeStore?: IHomeStore
}

interface ICardProps extends IProps {
  card: ISelectableCard
}

const YouMarker = observer(({wocky, locationStore, homeStore, card}: ICardProps) => {
  const {location} = locationStore
  const {latitude, longitude} = location
  const {profile} = wocky
  return (
    <HackMarker
      zIndex={1000}
      coordinate={{latitude, longitude}}
      onPress={() => {
        card.select()
        homeStore.setCenter(location)
      }}
      stopPropagation
    >
      {!profile.avatar && !profile.hidden.enabled ? (
        <Image source={require('../../../images/you.png')} />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Avatar size={52} profile={profile} hideDot borderColor={colors.PINK} />
          <Triangle
            width={10}
            height={4}
            color={profile.hidden.enabled ? colors.DARK_GREY : colors.PINK}
            direction="down"
          />
        </View>
      )}
    </HackMarker>
  )
})

// TODO: add in icons after bot creation flow is done
// const iconImg = require('../../../images/mapIcons/restaurant.png')
const defaultIcon = require('../../../images/mapIcons/question.png')

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
      <Bubble
        image={defaultIcon}
        style={{
          backgroundColor: 'white',
        }}
        outerStyle={{
          shadowOffset: {height: 2, width: 0},
          shadowRadius: 3,
          shadowOpacity: 0.12,
        }}
        imageStyle={{width: 20, height: 20}}
        size={isSelected ? 48 : 35}
      />
    </HackMarker>
  )
})

const markerMap: {[key: string]: any} = {
  YouCard: YouMarker,
  BotCard: BotMarker,
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
  reactions: any[] = []

  setCenterCoordinate = (location: Location) => {
    if (this.mapRef && location) {
      this.mapRef.animateToCoordinate(location)
    }
  }

  componentDidMount() {
    const {homeStore, wocky} = this.props
    if (!wocky.events.length) {
      this.loadMoreDiscoverList()
    } else {
      homeStore.addBotsToList('discover', wocky.events.list.map(event => event.bot))
    }

    this.reactions = [
      reaction(() => homeStore.center, (location: any) => this.setCenterCoordinate(location), {
        name: 'MapHome: re-center map on focused card',
      }),
      reaction(
        () => homeStore.discoverIndex === homeStore.discoverList.length - 1,
        (shouldLoadMore: boolean) => shouldLoadMore && this.loadMoreDiscoverList(),
        {name: 'MapHome: paging on discover list'}
      ),
    ]
  }

  componentWillUnmount() {
    this.reactions.forEach(disposer => disposer())
    this.reactions = []
  }

  loadMoreDiscoverList = async () => {
    const {wocky, homeStore} = this.props
    await wocky.events.load()
    // TODO: solve for the case where no new events have bots? (Until we have new backend query ready?)
    homeStore.addBotsToList('discover', wocky.events.list.map(event => event.bot))
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
      this.props.homeStore.addBotsToList('home', bots)
    }
  }

  render() {
    const {locationStore, homeStore} = this.props
    const {location} = locationStore
    if (!location) {
      return (
        <View style={styles.container}>
          <Spinner />
        </View>
      )
    }
    const {latitude, longitude} = location
    const {toggleFullscreen} = homeStore
    return (
      <View style={commonStyles.absolute}>
        <MapView
          provider={'google'}
          ref={r => (this.mapRef = r)}
          onPress={toggleFullscreen}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: INIT_DELTA,
            longitudeDelta: INIT_DELTA,
          }}
          style={commonStyles.absolute}
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
        <CurrentLocationIndicator onPress={() => this.setCenterCoordinate(location as any)} />
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
