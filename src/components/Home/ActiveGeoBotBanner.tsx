import React from 'react'
import {View, FlatList, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import FirstLoadOverlay from './FirstLoadOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IBot, IWocky} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'
import {k} from '../Global'

type Props = {
  wocky?: IWocky
  analytics?: any
}

@inject('wocky', 'locationStore', 'analytics')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props> {
  render() {
    const {wocky} = this.props
    const {activeBots} = wocky!
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 38 * k,
          // shadowColor: 'red',
          shadowColor: colors.GREY,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 1,
          shadowRadius: 5,
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
      </View>
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
