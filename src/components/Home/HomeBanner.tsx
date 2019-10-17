import React, {useEffect, useState} from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native'
import {inject} from 'mobx-react'

import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IBot, IWocky, IOwnProfile, OwnProfile, Bot} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {k, isIphoneX, isIphone, minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import InvisibleModeOverlay from './InvisibleModeOverlay'
import {settings} from '../../globals'
import {INavStore} from '../../store/NavStore'
import {IHomeStore} from '../../store/HomeStore'
import {ILocationShare} from 'third-party/wocky-client/src/model/LocationShare'
import ActiveLocationSharer from './ActiveLocationSharer'
import {observer} from 'mobx-react'
import {getType} from 'mobx-state-tree'

type Props = {
  wocky?: IWocky
  navStore?: INavStore
  homeStore?: IHomeStore
  analytics?: any
  enabled: boolean
}

export interface IActiveBannerItem {
  outerStyle: ViewStyle
  innerStyle: ViewStyle
}

const HomeBanner = inject('wocky', 'analytics', 'homeStore', 'navStore')(
  observer(({enabled, wocky, navStore, homeStore, analytics}: Props) => {
    const [yOffset] = useState(new Animated.Value(0))

    const {profile, activeBots} = wocky!
    const bannerItems = profile
      ? [profile, ...profile.locationSharers.list.slice(), ...activeBots.slice()]
      : []

    useEffect(() => {
      Animated.spring(yOffset, {
        toValue: enabled ? 0 : -180,
        // speed: 6,
      }).start()
    }, [enabled])

    const renderBannerItem = ({item}: {item: IBot | ILocationShare | IOwnProfile}) =>
      getType(item).is(Bot) ? (
        <ActiveGeofenceBot bot={item as IBot} outerStyle={styles.outer} innerStyle={styles.inner} />
      ) : (
        <ActiveLocationSharer
          profile={
            getType(item).is(OwnProfile)
              ? (item as IOwnProfile)
              : (item as ILocationShare).sharedWith
          }
          outerStyle={styles.outer}
          innerStyle={styles.inner}
        />
      )

    return (
      <Animated.View
        style={{
          transform: [{translateY: yOffset}],
        }}
        onStartShouldSetResponder={() => {
          analytics.track(analyticsGeoWidgetTap)
          return false
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: isIphoneX ? 28 * k : isIphone ? 23 * k : 0,
            shadowColor: homeStore!.mapType === 'hybrid' ? '#333' : colors.GREY,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 3,
          }}
        >
          <FlatList
            data={bannerItems}
            horizontal
            keyExtractor={item => item.id}
            renderItem={renderBannerItem}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<ActiveBannerPlaceholder />}
            style={{paddingLeft: 8 * k}}
          />
          {!wocky!.connected && <View style={styles.overlay} />}
          <HeaderLocationOverlay />
          <InvisibleModeOverlay />
        </View>
        {navStore!.scene !== 'botCompose' && !homeStore!.fullScreenMode && (
          <Buttons mapType={homeStore!.mapType} />
        )}
      </Animated.View>
    )
  })
)

export default HomeBanner

const Buttons = ({mapType}) => (
  <View
    style={{
      marginRight: 10,
      marginTop: 15,
      alignItems: 'center',
      alignSelf: 'flex-end',
    }}
    pointerEvents="box-none"
  >
    <TouchableOpacity
      onPress={() => Actions.bottomMenu()}
      onLongPress={() => settings.allowDebugScreen && Actions.debugScreen()}
      testID="bottomMenuButton"
    >
      <Image source={settingsImg} />
    </TouchableOpacity>
    <TouchableOpacity style={{marginTop: 15}} onPress={() => Actions.attribution()}>
      <Image source={mapType === 'hybrid' ? infoImgWhite : infoImg} />
    </TouchableOpacity>
  </View>
)

const settingsImg = require('../../../images/settingsBtn.png')
const infoImgWhite = require('../../../images/iButtonWhite.png')
const infoImg = require('../../../images/info.png')
const dotWidth = 12

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.addAlpha(colors.WHITE, 0.7),
  },
  outer: {
    marginHorizontal: 7.5 * k,
    paddingVertical: 15,
    width: 71,
    alignItems: 'center',
    marginTop: 6 * minHeight,
  },
  inner: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newDot: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: dotWidth / 2,
    width: 10,
    height: 10,
    backgroundColor: colors.GOLD,
  },
})
