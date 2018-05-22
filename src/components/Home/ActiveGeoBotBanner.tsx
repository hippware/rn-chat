import React from 'react'
import {View, FlatList, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {RText} from '../common'
import {colors} from '../../constants'
import ActiveGeofenceBot from './ActiveGeofenceBot'
import HeaderLocationOverlay from './HeaderLocationOverlay'
import FirstLoadOverlay from './FirstLoadOverlay'
import ActiveBannerPlaceholder from './ActiveBannerPlaceholder'
import {IBot, IWocky} from 'wocky-client'
import {analyticsGeoWidgetTap} from '../../utils/analytics'

type Props = {
  wocky?: IWocky
  onLayout: (nativeEvent: any) => void
  analytics?: any
}

@inject('wocky', 'locationStore', 'analytics')
@observer
export default class ActiveGeoBotBanner extends React.Component<Props> {
  render() {
    const {wocky, onLayout} = this.props
    const {activeBots} = wocky!
    return (
      <View
        style={{backgroundColor: 'white'}}
        onLayout={onLayout}
        onStartShouldSetResponder={() => {
          this.props.analytics.track(analyticsGeoWidgetTap)
          return false
        }}
      >
        <RText size={13} weight="Bold" color={colors.PINK} style={{margin: 15, marginBottom: 10}}>
          {"See Who's Here"}
        </RText>
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
