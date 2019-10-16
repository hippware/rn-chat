import React, {useEffect, useState, useRef} from 'react'
import MapView from 'react-native-maps'
import {StyleSheet, Text, Image, View} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {autorun} from 'mobx'
import {IWocky, ILocation} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore} from '../../store/HomeStore'
import {Spinner} from '../common'
import mapStyle from '../map/mapStyle'
import UberMarker from './UberMarker'
import {Actions} from 'react-native-router-flux'
import BotMarker from './map-markers/BotMarker'
import YouMarker from './map-markers/YouMarker'
import ProfileMarker from './map-markers/ProfileMarker'
import {INavStore} from '../../store/NavStore'
import {k} from '../Global'
import _ from 'lodash'

const INIT_DELTA = 0.04
const DEFAULT_DELTA = 0.00522
const TRANS_DELTA = DEFAULT_DELTA + 0.005

type Props = {
  locationStore?: ILocationStore
  homeStore?: IHomeStore
  navStore?: INavStore
  wocky?: IWocky
}

const markerMap: {[key: string]: any} = {
  YouCard: YouMarker,
  BotCard: BotMarker,
  LocationSharerCard: ProfileMarker,
}

const MapHome = inject('locationStore', 'wocky', 'homeStore', 'navStore')(
  observer((props: Props) => {
    const {locationStore, homeStore, navStore, wocky} = props
    const {
      list,
      detailsMode,
      creationMode,
      fullScreenMode,
      mapType,
      setMapCenter,
      setFocusedLocation,
    } = homeStore!
    const {location} = locationStore!

    const [areaTooLarge, setAreaTooLarge] = useState(false)
    const mapRef = useRef<MapView>(null)

    useEffect(() => {
      let reactions = [
        autorun(() => setCenterCoordinate(homeStore!.focusedLocation as ILocation), {
          name: 'MapHome: re-center map on focused card',
        }),
      ]

      return () => {
        reactions.forEach(disposer => disposer())
        reactions = []
      }
    }, [])

    const setCenterCoordinate = (loc: ILocation) => {
      if (mapRef && loc) {
        mapRef.current!.animateCamera({center: loc})
      }
    }

    // NOTE: this runs _very_ often while panning/scrolling the map...thus the throttling
    const onRegionChange = _.throttle(({latitudeDelta}) => {
      if (latitudeDelta) {
        homeStore!.setMapType(latitudeDelta <= TRANS_DELTA ? 'hybrid' : 'standard')
      }
    }, 1000)

    const onRegionChangeComplete = async region => {
      setMapCenter(region)
      setFocusedLocation(null) // reset bot focused location, otherwise 'current location' CTA will not work

      // don't add bot during creation mode (to avoid replacing of new location)
      if (!creationMode) {
        try {
          await wocky!.loadLocalBots(region)
          setAreaTooLarge(false)
        } catch (e) {
          // warn(e)
          setAreaTooLarge(true)
        }
      }
    }
    // // TODO MapView typing doesn't work for latest version - (value: { coordinate: LatLng, position: Point }) => void;
    const createFromLongPress = (value: any) => {
      if (!homeStore!.creationMode) {
        const newCoordinate = value.nativeEvent.coordinate
        Actions.createBot({focused: false})
        setTimeout(() => {
          setCenterCoordinate(newCoordinate)
        }, 1000)
      }
    }

    function onMapPress() {
      if (['botCompose', 'botEdit', 'createBot'].includes(navStore!.scene)) {
        return
      } else if (navStore!.scene !== 'home') {
        Actions.popTo('home')
      } else {
        homeStore!.toggleFullscreen()
      }
    }

    // HACK: more details at https://github.com/hippware/rn-chat/issues/3692#issuecomment-492857934
    function onMapTapOrPan(event) {
      const {followingUser, stopFollowingUserOnMap} = homeStore!
      if (followingUser) {
        stopFollowingUserOnMap()
      }
      return false
    }

    if (!location) {
      return (
        <View style={[StyleSheet.absoluteFill, {bottom: -50 * k}, styles.container]}>
          <Spinner />
        </View>
      )
    }
    const {latitude, longitude} = location
    return (
      <View style={[StyleSheet.absoluteFill, {bottom: -50 * k}]}>
        <MapView
          provider={'google'}
          ref={mapRef}
          onPress={onMapPress}
          onLongPress={createFromLongPress}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: INIT_DELTA,
            longitudeDelta: INIT_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          customMapStyle={mapStyle}
          scrollEnabled={!detailsMode}
          onStartShouldSetResponder={onMapTapOrPan}
          mapType={mapType as any}
          onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChangeComplete}
          rotateEnabled={false}
          pitchEnabled={false}
          {...props}
        >
          {list.map((card, i) => {
            const Card = markerMap[card.name]
            return Card && <Card {...props} key={`card${i}`} card={card} />
          })}
        </MapView>
        {!!creationMode && <UberMarker />}
        {!!areaTooLarge && (
          <View style={[styles.areaTooLargeView, {bottom: fullScreenMode ? 40 : 160 * k}]}>
            <Image source={require('../../../images/areaTooLarge.png')} />
            <Text style={styles.areaTooLargeText}>Zoom In To See Locations</Text>
          </View>
        )}
      </View>
    )
  })
)

export default MapHome

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
