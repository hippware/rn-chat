import React from 'react'
import {View, FlatList, StyleSheet, Animated} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import FirstLoadOverlay from './FirstLoadOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IBot, IWocky} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {k} from '../Global'
import {IHomeStore} from '../../store/HomeStore'
import {autorun} from 'mobx'

type Props = {
  wocky?: IWocky
  analytics?: any
  homeStore?: IHomeStore
}

type State = {
  marginTop: Animated.Value
}

@inject('wocky', 'analytics', 'homeStore')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props> {
  state: State = {
    marginTop: new Animated.Value(0),
  }

  componentDidMount() {
    autorun(() =>
      Animated.spring(this.state.marginTop, {
        toValue: this.props.homeStore.fullScreenMode ? -250 : 0,
        // speed: 6,
      }).start()
    )
  }

  render() {
    const {wocky} = this.props
    const {activeBots} = wocky!
    return (
      <Animated.View
        style={{
          backgroundColor: 'white',
          paddingTop: 38 * k,
          shadowColor: colors.GREY,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 1,
          shadowRadius: 5,
          marginTop: this.state.marginTop,
        }}
        onStartShouldSetResponder={() => {
          this.props.analytics.track(analyticsGeoWidgetTap)
          return false
        }}
      >
        <View>
          <FlatList
            data={activeBots}
            horizontal
            keyExtractor={this.keyExtractor}
            renderItem={this.renderActiveBot}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<ActiveBannerPlaceholder />}
          />
          {!wocky!.connected && <View style={styles.overlay} />}
        </View>
        <HeaderLocationOverlay />
        <FirstLoadOverlay />
      </Animated.View>
    )
  }

  keyExtractor = (item: IBot) => item.id

  renderActiveBot = ({item}: {item: IBot}) => <ActiveGeofenceBot bot={item} />
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.addAlpha(colors.WHITE, 0.7),
  },
})
