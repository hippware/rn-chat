import React, {useEffect, useState, useRef} from 'react'
import MapView from 'react-native-maps'
import {StyleSheet, Image, View, Animated} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {autorun} from 'mobx'
import {IWocky, ILocation, IProfile} from 'src/wocky'
import {ILocationStore} from '../../store/LocationStore'
import {IHomeStore, INIT_DELTA} from '../../store/HomeStore'
import {Spinner, RText} from '../common'
import mapStyle from '../map/mapStyle'
import UberMarker from './UberMarker'
import {Actions} from 'react-native-router-flux'
import BotMarker from './map-markers/BotMarker'
import ProfileMarker from './map-markers/ProfileMarker'
import {INavStore} from '../../store/NavStore'
import {k} from '../Global'
import _ from 'lodash'

type Props = {
  locationStore?: ILocationStore
  homeStore?: IHomeStore
  navStore?: INavStore
  wocky?: IWocky
}

const MapHome = inject(
  'locationStore',
  'wocky',
  'homeStore',
  'navStore'
)(
  observer((props: Props) => {
    const {locationStore, homeStore, navStore, wocky} = props
    const {
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
    const [yOffset] = useState(new Animated.Value(0))

    useEffect(() => {
      let reactions = [
        autorun(() => setCenterCoordinate(homeStore!.focusedLocation as ILocation), {
          name: 'MapHome: re-center map on focused card',
        }),
      ]

      autorun(() => slideSceneTo(homeStore!.bottomViewMode ? -200 : 0), {
        name: 'Animate map up/down based on bottomView mode',
      })

      return () => {
        reactions.forEach(disposer => disposer())
        reactions = []
      }
    }, [])

    function slideSceneTo(toHeight) {
      Animated.spring(yOffset, {
        toValue: toHeight,
        useNativeDriver: true,
      }).start()
    }

    const setCenterCoordinate = (loc: ILocation) => {
      if (mapRef && loc) {
        mapRef.current!.animateCamera({center: loc})
      }
    }

    // NOTE: this runs _very_ often while panning/scrolling the map...thus the throttling
    const onRegionChange = _.throttle(({latitudeDelta}) => {
      homeStore!.setLatitudeDelta(latitudeDelta)
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
      const {scene, params} = navStore!
      if (['botCompose', 'botEdit', 'createBot'].includes(scene)) {
        return
      } else if (scene !== 'home' && !params.preview) {
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
    if (!wocky!.profile) return null
    const {latitude, longitude} = location
    const profiles: IProfile[] = [
      wocky!.profile!,
      ...wocky!.profile!.friends.list.filter(profile => profile.sharesLocation),
    ]
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            bottom: -50 * k,
            transform: [
              {
                translateY: yOffset,
              },
            ],
          },
        ]}
      >
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
          {!(creationMode || areaTooLarge) &&
            wocky!.localBots.list.map(b => <BotMarker key={b.id} bot={b} {...props} />)}
          {!creationMode && profiles.map(p => <ProfileMarker key={p.id} profile={p} {...props} />)}
        </MapView>
        {creationMode && <UberMarker />}
        <ZoomInNotification areaTooLarge={areaTooLarge} fullScreenMode={fullScreenMode} />
      </Animated.View>
    )
  })
)

const ZoomInNotification = ({areaTooLarge, fullScreenMode}) => {
  const [opacity] = useState(new Animated.Value(areaTooLarge ? 1 : 0))

  useEffect(() => {
    if (areaTooLarge) {
      opacity.setValue(1)
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start()
      }, 3500)
    } else {
      opacity.setValue(0)
    }
  }, [areaTooLarge])
  return (
    <Animated.View
      style={[styles.areaTooLargeView, {bottom: fullScreenMode ? 40 : 160 * k, opacity}]}
    >
      <Image source={require('../../../images/areaTooLarge.png')} />
      <RText style={styles.areaTooLargeText}>Zoom In To See Locations</RText>
    </Animated.View>
  )
}

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
