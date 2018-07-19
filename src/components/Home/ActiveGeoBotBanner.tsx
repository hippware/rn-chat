import React from 'react'
import {View, FlatList, StyleSheet, Animated, TouchableOpacity, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IBot, IWocky} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {k, width} from '../Global'
import {autorun, reaction, computed} from 'mobx'
import {IHomeStore} from '../../store/HomeStore'
import {RText} from '../common'
import Bubble from '../map/Bubble'
import {addAlpha} from '../../constants/colors'
import {Actions} from '../../../node_modules/react-native-router-flux'
import InvisibleModeOverlay from './InvisibleModeOverlay'
import {settings} from '../../globals'

type Props = {
  wocky?: IWocky
  analytics?: any
  homeStore?: IHomeStore
}

type State = {
  yOffset: Animated.Value
}

@inject('wocky', 'analytics', 'homeStore')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props> {
  state: State = {
    yOffset: new Animated.Value(0),
  }

  componentDidMount() {
    reaction(
      () => this.props.homeStore.fullScreenMode || this.showingPopup,
      hide =>
        Animated.spring(this.state.yOffset, {
          toValue: hide ? -180 : 0,
          // speed: 6,
        }).start()
    )
  }

  @computed
  get showingPopup() {
    // TODO: move this logic to rnrf
    return ['bottomMenu', 'locationDetails', 'createBot'].includes(Actions.currentScene)
  }

  render() {
    const {wocky} = this.props
    const {activeBots, profile} = wocky!
    return (
      <Animated.View
        style={{
          backgroundColor: 'white',
          paddingTop: 23 * k,
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

const PlaceholderNew = () => (
  <TouchableOpacity style={styles.outer} onPress={() => Actions.geoHeaderPrimer()}>
    <Bubble image={foot} imageStyle={{width: 20, height: 24}} size={50} />
    <View style={styles.newDot} />
    <RText color={colors.PINK} size={13} style={{textAlign: 'center'}}>
      New!
    </RText>
  </TouchableOpacity>
)

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
    top: 11,
    right: 17 * k, // TODO: adjust this value for different view sizes
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: dotWidth / 2,
    width: 10,
    height: 10,
    backgroundColor: colors.GOLD,
    zIndex: 1000,
  },
})
