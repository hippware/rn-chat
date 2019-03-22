import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IBot, IWocky} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {k, isIphoneX, isIphone, minHeight} from '../Global'
import {Actions} from 'react-native-router-flux'
import InvisibleModeOverlay from './InvisibleModeOverlay'
import {settings} from '../../globals'
import {INavStore} from '../../store/NavStore'
import {IHomeStore} from '../../store/HomeStore'
import {computed} from 'mobx'
import {ILocationShare} from 'third-party/wocky-client/src/model/LocationShare'
import {getType} from 'mobx-state-tree'
import ActiveLocationSharer from './ActiveLocationSharer'

type Props = {
  wocky?: IWocky
  navStore?: INavStore
  homeStore?: IHomeStore
  analytics?: any
  enabled: boolean
}

type State = {
  yOffset: Animated.Value
}

export interface IActiveBannerItem {
  outerStyle: ViewStyle
  innerStyle: ViewStyle
}

@inject('wocky', 'analytics', 'homeStore', 'navStore')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props, State> {
  state: State = {
    yOffset: new Animated.Value(0),
  }

  @computed
  get bannerItems(): Array<ILocationShare | IBot> {
    const {profile, activeBots} = this.props.wocky!
    return profile ? [...profile.locationSharers.list.slice(), ...activeBots.slice()] : []
  }

  componentWillReceiveProps(newProps) {
    if (newProps.enabled !== this.props.enabled) {
      const hide = !newProps.enabled
      Animated.spring(this.state.yOffset, {
        toValue: hide ? -180 : 0,
        // speed: 6,
      }).start()
    }
  }

  render() {
    const {wocky, navStore, homeStore} = this.props
    return (
      <Animated.View
        style={{
          transform: [{translateY: this.state.yOffset}],
        }}
        onStartShouldSetResponder={() => {
          this.props.analytics.track(analyticsGeoWidgetTap)
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
          }}
        >
          <FlatList
            data={this.bannerItems}
            horizontal
            keyExtractor={this.keyExtractor}
            renderItem={this.renderActiveBot}
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
  }

  keyExtractor = item => item.id

  renderActiveBot = ({item}: {item: IBot | ILocationShare}) =>
    getType(item).name === 'Bot' ? (
      <ActiveGeofenceBot bot={item as IBot} outerStyle={styles.outer} innerStyle={styles.inner} />
    ) : (
      <ActiveLocationSharer
        sharer={item as ILocationShare}
        outerStyle={styles.outer}
        innerStyle={styles.inner}
      />
    )
}

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
