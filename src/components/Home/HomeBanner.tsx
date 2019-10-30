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
import HeaderLocationOverlay from './HeaderLocationOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IWocky} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {k, isIphoneX, isIphone, minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import InvisibleModeOverlay from './InvisibleModeOverlay'
import {settings} from '../../globals'
import {INavStore} from '../../store/NavStore'
import {IHomeStore} from '../../store/HomeStore'
import ActiveLocationSharer from './ActiveLocationSharer'
import {observer} from 'mobx-react'
import {RText} from '../common'

const MAX_FRIENDS_COUNT = 2

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

const SeeAllFriends = () => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{flex: 1, marginTop: 28, marginLeft: 14, marginRight: 20}}
        onPress={Actions.allFriends}
      >
        <Image source={require('../../../images/seeAllFriends.png')} />
        <RText
          size={13}
          style={{textAlign: 'center', marginTop: 7}}
          numberOfLines={1}
          ellipsizeMode="tail"
          color={colors.PINK}
          weight="Medium"
        >
          See All
        </RText>
      </TouchableOpacity>
    </View>
  )
}

const HomeBanner = inject('wocky', 'analytics', 'homeStore', 'navStore')(
  observer(({enabled, wocky, navStore, homeStore, analytics}: Props) => {
    const [yOffset] = useState(new Animated.Value(0))

    useEffect(() => {
      Animated.spring(yOffset, {
        toValue: enabled ? 0 : -180,
        // speed: 6,
      }).start()
    }, [enabled])

    const renderBannerItem = ({item}) => (
      <ActiveLocationSharer profile={item} outerStyle={styles.outer} innerStyle={styles.inner} />
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
            data={homeStore!.headerItems.slice(0, MAX_FRIENDS_COUNT + 1)}
            horizontal
            keyExtractor={item => item.id}
            renderItem={renderBannerItem}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              homeStore!.headerItems.length === 1 ? (
                <ActiveBannerPlaceholder />
              ) : homeStore!.headerItems.length > MAX_FRIENDS_COUNT ? (
                <SeeAllFriends />
              ) : null
            }
            style={{paddingLeft: 8 * k}}
          />
          {!wocky!.connected && <View style={styles.overlay} />}
          <HeaderLocationOverlay />
          <InvisibleModeOverlay />
        </View>
        {navStore!.scene !== 'botCompose' && !homeStore!.fullScreenMode && (
          <Buttons hasUnread={wocky!.notifications.hasUnread} mapType={homeStore!.mapType} />
        )}
      </Animated.View>
    )
  })
)

export default HomeBanner

const Buttons = ({mapType, hasUnread}) => (
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
      {!!hasUnread && <View style={styles.newDot} />}
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
    width: 13,
    height: 13,
    backgroundColor: colors.GOLD,
  },
})
