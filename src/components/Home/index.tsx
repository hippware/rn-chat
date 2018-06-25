import React from 'react'
import MapView, {UrlTile} from 'react-native-maps'
import {StyleSheet, View} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'
import {IWocky, IBot} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore, INIT_DELTA} from '../../store/HomeStore'
import {computed} from 'mobx'
import {Actions} from 'react-native-router-flux'
import BubbleIcon from '../map/BubbleIcon'
import HackMarker from '../map/HackMarker'
import HorizontalCardList from './HorizontalCardList'
import RightPanel from './RightPanel'
import Connectivity from '../Connectivity'
import ActiveGeoBotBanner from './ActiveGeoBotBanner'

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
      <View style={{flex: 1}} testID="screenHome">
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
            stopPropagation
          />
        </MapView>
        <ActiveGeoBotBanner />
        {Actions.currentScene !== 'bottomMenu' && <RightPanel />}
        {Actions.currentScene !== 'bottomMenu' && <HorizontalCardList />}
        <Connectivity />
      </View>
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
