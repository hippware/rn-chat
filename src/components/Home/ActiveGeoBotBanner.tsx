import React from 'react'
import {View, FlatList, StyleSheet, Animated, TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IBot, IWocky} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {k, width, isIphoneX} from '../Global'
import {RText} from '../common'
import Bubble from '../map/Bubble'
import {addAlpha} from '../../constants/colors'
import {Actions} from 'react-native-router-flux'
import InvisibleModeOverlay from './InvisibleModeOverlay'
import {settings} from '../../globals'
import {INavStore} from '../../store/NavStore'

type Props = {
  wocky?: IWocky
  navStore?: INavStore
  analytics?: any
  enabled: boolean
}

type State = {
  yOffset: Animated.Value
}

@inject('wocky', 'analytics', 'homeStore', 'navStore')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props> {
  state: State = {
    yOffset: new Animated.Value(0),
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
    const {wocky, navStore} = this.props
    const {activeBots, profile} = wocky!
    return (
      <Animated.View
        style={{
          backgroundColor: 'white',
          paddingTop: isIphoneX ? 28 * k : 23 * k,
          shadowColor: colors.GREY,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 1,
          shadowRadius: 5,
          transform: [{translateY: this.state.yOffset}],
        }}
        onStartShouldSetResponder={() => {
          this.props.analytics.track(analyticsGeoWidgetTap)
          return false
        }}
      >
        <View>
          <FlatList
            data={profile && profile.hasUsedGeofence ? activeBots : placeholderItems}
            horizontal
            keyExtractor={this.keyExtractor}
            renderItem={
              profile && profile.hasUsedGeofence ? this.renderActiveBot : this.renderPlaceholder
            }
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<ActiveBannerPlaceholder />}
          />
          {!wocky!.connected && <View style={styles.overlay} />}
        </View>
        <HeaderLocationOverlay />
        <InvisibleModeOverlay />
        {navStore.scene !== 'botCompose' && (
          <TouchableOpacity
            onPress={() => Actions.bottomMenu()}
            onLongPress={() => settings.isStaging && Actions.debugScreen()}
            style={{
              position: 'absolute',
              bottom: -45 * k,
              right: 10 * k,
            }}
          >
            <Image source={settingsImg} />
          </TouchableOpacity>
        )}
      </Animated.View>
    )
  }

  keyExtractor = item => item.id

  renderActiveBot = ({item}: {item: IBot}) => (
    <ActiveGeofenceBot bot={item} outerStyle={styles.outer} innerStyle={styles.inner} />
  )

  renderPlaceholder = ({item}: {item: any}) => {
    const Comp = item.render || Placeholder
    return <Comp />
  }
}

const settingsImg = require('../../../images/settingsBtn.png')

const placeholderItems = [
  {
    id: '0',
    render: () => <PlaceholderNew />,
  },
  {id: '1'},
  {id: '2'},
  {id: '3'},
]

const foot = require('../../../images/footIconWhite.png')
const lightPink = addAlpha(colors.PINK, 0.15)

const PlaceholderNew = () => {
  return (
    <TouchableOpacity style={styles.outer} onPress={() => Actions.geoHeaderPrimer()}>
      <Bubble image={foot} imageStyle={{width: 20, height: 24}} size={50} gradient>
        <View style={styles.newDot} />
      </Bubble>
      <RText color={colors.PINK} size={13} style={{textAlign: 'center'}}>
        New!
      </RText>
    </TouchableOpacity>
  )
}

const Placeholder = () => (
  <View style={styles.outer}>
    <Bubble
      size={50}
      style={{backgroundColor: 'white', borderColor: lightPink}}
      triangleColor={lightPink}
    />
  </View>
)

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
    padding: 15,
    width: width / 4,
    alignItems: 'center',
  },
  inner: {
    width: 75,
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
